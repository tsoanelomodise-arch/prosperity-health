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
        content = content.replace(/@import url\('.*?'\);/g, "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;700&display=swap');");
        content = content.replace(/--font-sans: "Roboto".*?;/g, '--font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;');
        content = content.replace(/--font-serif: "Roboto".*?;/g, '--font-serif: "Montserrat", ui-sans-serif, system-ui, sans-serif;');
        
        // CSS vars replacements for precision
        content = content.replace(/--color-primary: #.*/g, '--color-primary: #27A19C;');
        content = content.replace(/--color-primary-dark: #.*/g, '--color-primary-dark: #1D7A76;');
        content = content.replace(/--color-primary-light: #.*/g, '--color-primary-light: #8BD2CF;');
        content = content.replace(/--color-accent: #.*/g, '--color-accent: #BED62F;');
        content = content.replace(/--color-accent-light: #.*/g, '--color-accent-light: #DBE890;');
        content = content.replace(/--color-wood: #.*/g, '--color-wood: #6E8B8A;');
        content = content.replace(/--color-off-white: #.*/g, '--color-off-white: #F1F8F8;');
        content = content.replace(/--color-text: #.*/g, '--color-text: #0A3B39;');
        content = content.replace(/--color-text-light: #.*/g, '--color-text-light: #6E8B8A;');
      }

      // Replace hex codes across ALL files (including tailwind inline classes)
      content = content.replace(/#EDF9F1/gi, '#F1F8F8');
      content = content.replace(/#EDEDED/gi, '#E5F2F2');
      
      content = content.replace(/#1E293B/gi, '#0A3B39');
      content = content.replace(/#121F2B/gi, '#072625');
      
      content = content.replace(/#7EBBE0/gi, '#27A19C');
      content = content.replace(/#5A9BC0/gi, '#1D7A76');
      content = content.replace(/#A4D4ED/gi, '#8BD2CF');
      
      content = content.replace(/#8DD086/gi, '#BED62F');
      content = content.replace(/#BDF2B8/gi, '#DBE890');
      
      content = content.replace(/#A2A4A7/gi, '#6E8B8A');

      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

replaceInDir('src');
console.log('Applied new brand colors and fonts!');
