const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

// Standard MIME types for static web assets
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

// ============================================================================
// 1. STATIC HTTP FILE SERVER
// ============================================================================
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const safePath = path.normalize(path.join(__dirname, reqPath));
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA Fallback: Serve index.html
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(safePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

// ============================================================================
// 2. ZERO-DEPENDENCY NATIVE WEBSOCKET SERVER (RFC 6455)
// ============================================================================
const WS_MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const activeClients = new Set();
const duelRooms = new Map(); // roomCode -> { players: Set(ws), p1: ws, p2: ws, state: {...} }

function sendWsText(socket, text) {
  if (socket.destroyed) return;
  const payload = Buffer.from(text, 'utf8');
  const length = payload.length;

  let header;
  if (length <= 125) {
    header = Buffer.alloc(2);
    header[0] = 0x81; // FIN + text opcode
    header[1] = length;
  } else if (length <= 65535) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  socket.write(Buffer.concat([header, payload]));
}

function broadcastAll(data) {
  const msg = JSON.stringify(data);
  for (const client of activeClients) {
    sendWsText(client, msg);
  }
}

server.on('upgrade', (req, socket, head) => {
  const wsKey = req.headers['sec-websocket-key'];
  if (!wsKey) {
    socket.destroy();
    return;
  }

  const acceptKey = crypto
    .createHash('sha1')
    .update(wsKey + WS_MAGIC)
    .digest('base64');

  const responseHeaders = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`
  ];

  socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
  activeClients.add(socket);
  socket.roomCode = null;
  socket.playerNumber = null;
  socket.playerHandle = 'PLAYER';

  let buffer = Buffer.alloc(0);

  socket.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);

    while (buffer.length >= 2) {
      const byte0 = buffer[0];
      const byte1 = buffer[1];
      const opcode = byte0 & 0x0f;
      const isMasked = (byte1 & 0x80) !== 0;
      let payloadLength = byte1 & 0x7f;
      let offset = 2;

      if (payloadLength === 126) {
        if (buffer.length < 4) return;
        payloadLength = buffer.readUInt16BE(2);
        offset = 4;
      } else if (payloadLength === 127) {
        if (buffer.length < 10) return;
        payloadLength = Number(buffer.readBigUInt64BE(2));
        offset = 10;
      }

      const maskLength = isMasked ? 4 : 0;
      if (buffer.length < offset + maskLength + payloadLength) {
        return; // Incomplete frame, wait for more data
      }

      let payload = buffer.subarray(offset + maskLength, offset + maskLength + payloadLength);
      if (isMasked) {
        const maskKey = buffer.subarray(offset, offset + 4);
        const unmasked = Buffer.alloc(payloadLength);
        for (let i = 0; i < payloadLength; i++) {
          unmasked[i] = payload[i] ^ maskKey[i % 4];
        }
        payload = unmasked;
      }

      buffer = buffer.subarray(offset + maskLength + payloadLength);

      // Handle Opcode
      if (opcode === 0x8) {
        // Close frame
        socket.end();
        return;
      } else if (opcode === 0x9) {
        // Ping -> Pong
        const pong = Buffer.alloc(2);
        pong[0] = 0x8a;
        pong[1] = 0;
        socket.write(pong);
      } else if (opcode === 0x1) {
        // Text message
        try {
          const messageStr = payload.toString('utf8');
          const data = JSON.parse(messageStr);
          handleWebSocketMessage(socket, data);
        } catch (e) {
          console.warn('Malformed WS message:', e.message);
        }
      }
    }
  });

  socket.on('close', () => {
    activeClients.delete(socket);
    handleClientDisconnect(socket);
  });

  socket.on('error', () => {
    activeClients.delete(socket);
    handleClientDisconnect(socket);
  });

  // Welcome message to client
  sendWsText(socket, JSON.stringify({ type: 'connected', clientsCount: activeClients.size }));
});

function handleWebSocketMessage(socket, data) {
  const { action, roomCode, handle, avatar, tileIndex, progress, score, roundSeq } = data;

  switch (action) {
    case 'join_room': {
      const code = (roomCode || 'MIND').toUpperCase();
      socket.roomCode = code;
      socket.playerHandle = handle || 'OPERATIVE';
      socket.playerAvatar = avatar || 'cutting_chai';

      if (!duelRooms.has(code)) {
        duelRooms.set(code, {
          players: [socket],
          p1: socket,
          p2: null,
          targetSequence: []
        });
        socket.playerNumber = 1;
        sendWsText(socket, JSON.stringify({
          type: 'room_joined',
          roomCode: code,
          playerNumber: 1,
          status: 'WAITING_FOR_OPPONENT'
        }));
      } else {
        const room = duelRooms.get(code);
        if (room.players.length === 1 && room.players[0] !== socket) {
          room.players.push(socket);
          room.p2 = socket;
          socket.playerNumber = 2;

          sendWsText(socket, JSON.stringify({
            type: 'room_joined',
            roomCode: code,
            playerNumber: 2,
            opponentHandle: room.p1.playerHandle,
            opponentAvatar: room.p1.playerAvatar,
            status: 'OPPONENT_CONNECTED'
          }));

          // Notify Player 1 that opponent has arrived
          sendWsText(room.p1, JSON.stringify({
            type: 'opponent_joined',
            opponentHandle: socket.playerHandle,
            opponentAvatar: socket.playerAvatar,
            status: 'OPPONENT_CONNECTED'
          }));
        } else {
          // Room full or rejoining
          sendWsText(socket, JSON.stringify({
            type: 'room_joined',
            roomCode: code,
            playerNumber: 2,
            status: 'ROOM_FULL'
          }));
        }
      }
      break;
    }

    case 'sync_round': {
      if (!socket.roomCode) return;
      const room = duelRooms.get(socket.roomCode);
      if (room) {
        room.targetSequence = roundSeq || [];
        // Broadcast synchronized sequence to both players
        room.players.forEach(p => {
          sendWsText(p, JSON.stringify({
            type: 'round_started',
            targetSequence: room.targetSequence
          }));
        });
      }
      break;
    }

    case 'tap_progress': {
      if (!socket.roomCode) return;
      const room = duelRooms.get(socket.roomCode);
      if (room) {
        // Forward progress to opponent
        room.players.forEach(p => {
          if (p !== socket) {
            sendWsText(p, JSON.stringify({
              type: 'opponent_progress',
              playerNumber: socket.playerNumber,
              tileIndex,
              progress,
              score
            }));
          }
        });
      }
      break;
    }

    case 'player_stun': {
      if (!socket.roomCode) return;
      const room = duelRooms.get(socket.roomCode);
      if (room) {
        room.players.forEach(p => {
          if (p !== socket) {
            sendWsText(p, JSON.stringify({
              type: 'opponent_stunned',
              playerNumber: socket.playerNumber,
              duration: 1500
            }));
          }
        });
      }
      break;
    }

    case 'duel_victory': {
      if (!socket.roomCode) return;
      const room = duelRooms.get(socket.roomCode);
      if (room) {
        room.players.forEach(p => {
          sendWsText(p, JSON.stringify({
            type: 'match_over',
            winner: socket.playerNumber,
            winnerHandle: socket.playerHandle
          }));
        });
      }
      break;
    }

    case 'leaderboard_update': {
      // Broadcast live leaderboard record to ALL active players
      broadcastAll({
        type: 'leaderboard_sync',
        record: data.record
      });
      break;
    }
  }
}

function handleClientDisconnect(socket) {
  if (socket.roomCode && duelRooms.has(socket.roomCode)) {
    const room = duelRooms.get(socket.roomCode);
    room.players = room.players.filter(p => p !== socket);
    if (room.players.length === 0) {
      duelRooms.delete(socket.roomCode);
    } else {
      room.players.forEach(p => {
        sendWsText(p, JSON.stringify({
          type: 'opponent_disconnected',
          message: 'Opponent disconnected from the duel.'
        }));
      });
    }
  }
}

// ============================================================================
// 3. SERVER START
// ============================================================================
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`>> BLIND MATRIX: MEMORY RUN 2.0 (Ultra Funky Live Edition)`);
  console.log(`>> Local Web Game: http://localhost:${PORT}`);
  console.log(`>> Native WebSocket Live Multiplayer Server: Active`);
  console.log(`>> Press Ctrl + C to stop.`);
  console.log(`=======================================================`);
});
