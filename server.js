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
  const baseDir = path.resolve(__dirname);
  const resolvedPath = path.resolve(safePath);

  if (!resolvedPath.startsWith(baseDir + path.sep) && resolvedPath !== path.join(baseDir, 'index.html')) {
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
  // Origin check on WebSocket upgrade handshake
  const origin = req.headers['origin'];
  if (origin) {
    try {
      const u = new URL(origin);
      const allowedHosts = [
        'localhost',
        '127.0.0.1',
        'dimaag-ka-falooda.vercel.app',
        'aditya2438.github.io'
      ];
      const isAllowed = allowedHosts.some(h => u.hostname === h || u.hostname.endsWith('.' + h));
      if (!isAllowed) {
        socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
        socket.destroy();
        return;
      }
    } catch (e) {
      socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
      socket.destroy();
      return;
    }
  }

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
  socket.messageTimestamps = [];

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

      // Enforce max frame payload length cap (16 KB) against unbounded memory DoS
      if (payloadLength > 16384) {
        console.warn('Frame payload length exceeds 16KB limit; disconnecting client.');
        socket.destroy();
        return;
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
        // Enforce per-socket rate limiter: max 20 messages per 10 seconds
        const now = Date.now();
        socket.messageTimestamps = (socket.messageTimestamps || []).filter(t => now - t < 10000);
        if (socket.messageTimestamps.length >= 20) {
          console.warn('Rate limit exceeded for client socket; disconnecting.');
          socket.destroy();
          return;
        }
        socket.messageTimestamps.push(now);

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

function generateServerPattern(length = 4) {
  const seq = [];
  while (seq.length < length) {
    const r = Math.floor(Math.random() * 9);
    if (!seq.includes(r)) seq.push(r);
  }
  return seq;
}

const KNOWN_AVATARS = [
  'cutting_chai', 'sharma_beta', 'auto_rocket', 'chintu_pro',
  'gabbar_mustache', 'desi_alien', 'samosa_ninja', 'babu_rao'
];

function handleWebSocketMessage(socket, data) {
  if (!data || typeof data !== 'object') return;
  const { action, roomCode, handle, avatar, tileIndex, progress, score, roundSeq } = data;
  if (!action || typeof action !== 'string') return;

  switch (action) {
    case 'join_room': {
      if (typeof roomCode !== 'string' || !/^[A-Z0-9]{4}$/i.test(roomCode)) return;
      const code = roomCode.toUpperCase();
      const safeHandle = (typeof handle === 'string' && /^[A-Za-z0-9_]{3,20}$/.test(handle))
        ? handle
        : 'OPERATIVE';
      const safeAvatar = (typeof avatar === 'string' && KNOWN_AVATARS.includes(avatar))
        ? avatar
        : 'cutting_chai';

      socket.roomCode = code;
      socket.playerHandle = safeHandle;
      socket.playerAvatar = safeAvatar;

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
          const initialSequence = generateServerPattern(4);
          room.targetSequence = initialSequence;

          sendWsText(socket, JSON.stringify({
            type: 'room_joined',
            roomCode: code,
            playerNumber: 2,
            opponentHandle: room.p1.playerHandle,
            opponentAvatar: room.p1.playerAvatar,
            status: 'OPPONENT_CONNECTED',
            targetSequence: initialSequence
          }));

          // Notify Player 1 that opponent has arrived
          sendWsText(room.p1, JSON.stringify({
            type: 'opponent_joined',
            opponentHandle: socket.playerHandle,
            opponentAvatar: socket.playerAvatar,
            status: 'OPPONENT_CONNECTED',
            targetSequence: initialSequence
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
      if (!socket.roomCode || !duelRooms.has(socket.roomCode)) return;
      const room = duelRooms.get(socket.roomCode);
      if (room && Array.isArray(roundSeq) && roundSeq.length === 4 && roundSeq.every(n => Number.isInteger(n) && n >= 0 && n <= 8)) {
        room.targetSequence = roundSeq;
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
      if (!socket.roomCode || !duelRooms.has(socket.roomCode)) return;
      if (!Number.isInteger(tileIndex) || tileIndex < 0 || tileIndex > 8) return;
      if (!Number.isInteger(progress) || progress < 0 || progress > 4) return;
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
              score: Number.isInteger(score) ? score : 0
            }));
          }
        });
      }
      break;
    }

    case 'player_stun': {
      if (!socket.roomCode || !duelRooms.has(socket.roomCode)) return;
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
      if (!socket.roomCode || !duelRooms.has(socket.roomCode)) return;
      const room = duelRooms.get(socket.roomCode);
      if (room && room.players.includes(socket)) {
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
      // Validate incoming record before broadcasting to prevent broadcast injection
      const rec = data.record;
      if (
        rec &&
        typeof rec === 'object' &&
        typeof rec.username === 'string' &&
        /^[A-Za-z0-9_]{3,20}$/.test(rec.username) &&
        typeof rec.avatar === 'string' &&
        KNOWN_AVATARS.includes(rec.avatar) &&
        Number.isInteger(rec.high_score) &&
        rec.high_score >= 0 &&
        rec.high_score <= 150000 &&
        Number.isInteger(rec.max_level) &&
        rec.max_level >= 1 &&
        rec.max_level <= 30
      ) {
        broadcastAll({
          type: 'leaderboard_sync',
          record: {
            username: rec.username,
            avatar: rec.avatar,
            high_score: rec.high_score,
            max_level: rec.max_level
          }
        });
      }
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
  console.log(`>> DIMAAG KA FALOODA: BEAT RUN 2.0 (Ultra Funky Live Edition)`);
  console.log(`>> Local Web Game: http://localhost:${PORT}`);
  console.log(`>> Native WebSocket Live Multiplayer Server: Active`);
  console.log(`>> Press Ctrl + C to stop.`);
  console.log(`=======================================================`);
});
