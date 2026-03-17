const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

async function updateReferences(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await updateReferences(fullPath);
    } else if (entry.isFile() && /\.(jsx|js|css)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Replace .png with .webp
      let newContent = content.replace(/\.png/gi, '.webp');
      
      // Revert if it was letnext.png or favicon.png
      newContent = newContent.replace(/letnext\.webp/gi, 'letnext.png');
      newContent = newContent.replace(/favicon\.webp/gi, 'favicon.png');
      
      // Also add loading="lazy" if not present and not hero image?
      // I'll handle loading lazy separately in specific files using another logic or manual replaces.
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf-8');
        console.log(`Updated references in: ${fullPath}`);
      }
    }
  }
}

async function main() {
  console.log('Starting reference updates...');
  await updateReferences(SRC_DIR);
  console.log('Reference updates complete.');
}

main();
