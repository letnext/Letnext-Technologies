const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, 'public');

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name)) {
      const ext = path.extname(entry.name);
      // Skip favicon or specific files if needed
      if (entry.name === 'favicon.png' || entry.name === 'letnext.png') {
        console.log(`Skipping ${fullPath}`);
        continue;
      }
      
      const newPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');

      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(newPath);
        
        console.log(`Converted: ${fullPath} -> ${newPath}`);
        
        // Delete original file
        fs.unlinkSync(fullPath);
        console.log(`Deleted original: ${fullPath}`);
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err);
      }
    }
  }
}

async function main() {
  console.log('Starting image conversion to WebP...');
  await processDirectory(PUBLIC_DIR);
  console.log('Image conversion complete.');
}

main();
