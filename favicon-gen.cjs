const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'public', 'logo-mark.png');
const output = path.join(__dirname, 'public', 'favicon.png');

sharp(input)
  .resize(256, 256, {
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 0 }
  })
  .png()
  .toFile(output)
  .then(info => {
    console.log('Favicon generated:', info);
  })
  .catch(err => {
    console.error('Error:', err);
  });
