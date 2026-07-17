import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceInDir(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace fonts in index.css
      if (filePath.endsWith('index.css')) {
        content = content.replace(/@import url\('.*?'\);/g, "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');");
        content = content.replace(/--font-sans: "Outfit".*?;/g, '--font-sans: "Roboto", ui-sans-serif, system-ui, sans-serif;');
        content = content.replace(/--font-serif: "Playfair Display".*?;/g, '--font-serif: "Roboto", ui-sans-serif, system-ui, sans-serif;');
        
        // Update CSS variables
        content = content.replace(/--color-primary: #.*/g, '--color-primary: #7EBBE0;');
        content = content.replace(/--color-primary-dark: #.*/g, '--color-primary-dark: #5A9BC0;');
        content = content.replace(/--color-primary-light: #.*/g, '--color-primary-light: #A4D4ED;');
        content = content.replace(/--color-accent: #.*/g, '--color-accent: #8DD086;');
        content = content.replace(/--color-accent-light: #.*/g, '--color-accent-light: #BDF2B8;');
        content = content.replace(/--color-wood: #.*/g, '--color-wood: #A2A4A7;');
        content = content.replace(/--color-off-white: #.*/g, '--color-off-white: #EDF9F1;');
        content = content.replace(/--color-text: #.*/g, '--color-text: #1E293B;');
        content = content.replace(/--color-text-light: #.*/g, '--color-text-light: #A2A4A7;');
      }

      // Off Whites / Backgrounds
      content = content.replace(/#EAECEB/gi, '#EDF9F1');
      content = content.replace(/#F2F6F5/gi, '#EDEDED');
      content = content.replace(/#F4F8F7/gi, '#FFFFFF');
      content = content.replace(/#EBF5F3/gi, '#EDF9F1');
      
      // Darks / Text
      content = content.replace(/#17362E/gi, '#1E293B');
      content = content.replace(/#1A372D/gi, '#1E293B');
      content = content.replace(/#122E25/gi, '#121F2B'); // slightly darker slate
      
      // Greens/Teals to Poolside Blue / Sage Green
      content = content.replace(/#598D83/gi, '#7EBBE0');
      content = content.replace(/#7AACA3/gi, '#7EBBE0');
      content = content.replace(/#88BDB4/gi, '#7EBBE0');
      content = content.replace(/#A2DDD1/gi, '#8DD086'); // accent
      content = content.replace(/#B8EBE0/gi, '#8DD086'); // accent
      content = content.replace(/#D1F0EA/gi, '#EDF9F1'); // surface
      content = content.replace(/#C6E8E1/gi, '#EDEDED'); // borders
      content = content.replace(/#BCE4DC/gi, '#EDEDED');
      content = content.replace(/#8EBEB5/gi, '#A2A4A7'); // muted
      content = content.replace(/#4A6E64/gi, '#A2A4A7'); // muted

      // Check if there are styling issues with fonts classes
      // We don't need to replace `font-sans` or `font-serif` because we mapped them both to Roboto in index.css

      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

replaceInDir('src');
console.log('Colors and fonts updated!');
