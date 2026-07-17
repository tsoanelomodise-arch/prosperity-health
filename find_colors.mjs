import fs from 'fs';
import path from 'path';

function findColors(dir, colors = new Set()) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findColors(filePath, colors);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(/#[0-9a-fA-F]{6}/g);
      if (matches) {
        matches.forEach(m => colors.add(m.toUpperCase()));
      }
    }
  }
  return colors;
}

const colors = findColors('src');
console.log(Array.from(colors).sort().join('\n'));
