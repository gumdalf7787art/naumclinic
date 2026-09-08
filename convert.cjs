const sharp = require('sharp');
const path = require('path');

const input = 'C:/Users/검달프/.gemini/antigravity/brain/0dec7b3f-5371-4662-871a-fb2bbb77cb99/.user_uploaded/media_1788794499060.jpg';
const output = path.join(__dirname, 'public', 'postop-stage4.webp');

sharp(input)
  .webp({ quality: 80 })
  .toFile(output)
  .then(info => {
    console.log('Conversion successful:', info);
  })
  .catch(err => {
    console.error('Error during conversion:', err);
  });
