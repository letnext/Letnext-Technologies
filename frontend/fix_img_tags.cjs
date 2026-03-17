const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

function fixAll(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      fixAll(fullPath);
    } else if (entry.isFile() && /\.(jsx|js)$/i.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;

      // Pattern: a line that is ONLY whitespace + `/ decoding="async">`
      // This happens when a img had loading="lazy" already on its own line
      // and the script added `/ decoding="async">` as a new line after.
      // Fix: remove the `/ ` prefix and change `>` to `/>`, and add decoding
      content = content.replace(
        /^(\s*)\/\s*decoding="async">/gm,
        '$1decoding="async" />'
      );

      // Also catch any remaining `/ loading="lazy" decoding="async">` we may have missed
      content = content.replace(
        /(\s*)\/\s*loading="lazy"\s*decoding="async">/gm,
        ' loading="lazy" decoding="async" />'
      );

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Fixed: ${fullPath}`);
      }
    }
  }
}

console.log('Running comprehensive img tag fix...');
fixAll(SRC_DIR);
console.log('Done!');
