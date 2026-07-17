import fs from 'fs';

const filesToUpdate = [
  'src/views/HomeView.tsx',
  'src/views/ServiceDetailView.tsx',
  'src/views/ContactView.tsx',
  'src/views/TeamView.tsx',
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx',
  'src/App.tsx'
];

for (const filePath of filesToUpdate) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace colors
  // Off whites
  content = content.replace(/#E8EFEA/gi, '#EAECEB');
  content = content.replace(/#F1F6F3/gi, '#F2F6F5');
  content = content.replace(/#FBFBFA/gi, '#F4F8F7');
  
  // Darks
  content = content.replace(/#051910/gi, '#17362E');
  content = content.replace(/#0B2B1B/gi, '#1A372D');
  content = content.replace(/#042a1b/gi, '#122E25');
  
  // Greens/Teals
  content = content.replace(/#1A5034/gi, '#598D83');
  content = content.replace(/#1e7853/gi, '#7AACA3');
  content = content.replace(/#1A874F/gi, '#88BDB4');
  content = content.replace(/#28A061/gi, '#A2DDD1');
  content = content.replace(/#42B376/gi, '#B8EBE0');
  content = content.replace(/#9AEA96/gi, '#D1F0EA');
  content = content.replace(/#DBE7E0/gi, '#C6E8E1');
  content = content.replace(/#D3E2D8/gi, '#BCE4DC');
  content = content.replace(/#BEE0CE/gi, '#B8EBE0');
  content = content.replace(/#A4C4B5/gi, '#8EBEB5');
  content = content.replace(/#E2EBE5/gi, '#EBF5F3');
  
  content = content.replace(/#F4CC43/gi, '#B8EBE0');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Colors replaced successfully');
