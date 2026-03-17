const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

async function updateImages(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await updateImages(fullPath);
    } else if (entry.isFile() && /\.(jsx|js)$/i.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let modified = false;

      // naive regex to find <img ... />
      content = content.replace(/<img\s([^>]+)>/gi, (match, attrs) => {
        let newAttrs = attrs;
        if (!/loading=/i.test(newAttrs)) {
          newAttrs += ' loading="lazy"';
          modified = true;
        }
        if (!/decoding=/i.test(newAttrs)) {
          newAttrs += ' decoding="async"';
          modified = true;
        }
        // If width and height are missing, we could try to add them but it might break layouts without knowing the image. 
        // We will just add the attributes and rely on CSS or the fact that lazy loading + decoding async helps.
        return `<img ${newAttrs}>`;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated images in: ${fullPath}`);
      }
    }
  }
}

async function main() {
  console.log('Starting image tag updates...');
  await updateImages(SRC_DIR);
  console.log('Image tag updates complete.');
}

main();
