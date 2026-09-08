const sharp = require('sharp');
const path = require('path');

const inputFile = 'C:\\Users\\검달프\\.gemini\\antigravity\\brain\\0dec7b3f-5371-4662-871a-fb2bbb77cb99\\.user_uploaded\\media_1788769624062.jpg';
const outputFile = path.join(__dirname, 'public', 'spine-symptoms.webp');

async function optimize() {
  try {
    await sharp(inputFile)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputFile);
    console.log('Image optimized successfully:', outputFile);
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimize();
