const fs = require('fs');
const path = require('path');

const wwwDir = path.join(__dirname, 'www');

console.log('Cleaning and preparing www directory for Android build...');
if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

// Core web game files
const filesToCopy = [
  'index.html',
  'style.css',
  'game.js',
  'config.js',
  'manifest.json',
  'sw.js'
];

for (const file of filesToCopy) {
  const src = path.join(__dirname, file);
  const dest = path.join(wwwDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> www/${file}`);
  } else {
    console.warn(`Warning: ${file} not found at ${src}`);
  }
}

// Copy audio assets
const audioSrc = path.join(__dirname, 'audio');
const audioDest = path.join(wwwDir, 'audio');
if (fs.existsSync(audioSrc)) {
  fs.cpSync(audioSrc, audioDest, { recursive: true });
  const audioFiles = fs.readdirSync(audioDest);
  console.log(`Copied audio/ (${audioFiles.length} audio tracks) -> www/audio/`);
} else {
  console.warn('Warning: audio/ directory not found');
}

console.log('Mobile assets preparation complete! Ready for Capacitor sync.');
