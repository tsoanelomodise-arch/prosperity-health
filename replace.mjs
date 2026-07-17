import fs from 'fs';

const filePath = 'src/views/HomeView.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace dark text / dark backgrounds (#1A1A1A -> #051910)
content = content.replace(/#1A1A1A/g, '#051910');

// Replace beige/off-white backgrounds (#F4F2EC -> #E8EFEA)
content = content.replace(/#F4F2EC/g, '#E8EFEA');

// Replace off-whites / greys
content = content.replace(/#F5FAF7/g, '#E8EFEA');
content = content.replace(/#F8FAF9/g, '#E8EFEA');
content = content.replace(/#FBFBFA/g, '#F1F6F3');
content = content.replace(/#f0f4f2/g, '#DBE7E0');
content = content.replace(/#EBF4EE/g, '#D3E2D8');
content = content.replace(/#D1E6DB/g, '#BEE0CE');
content = content.replace(/#C2D1D1/g, '#A4C4B5');
content = content.replace(/#EBE3D5/g, '#E2EBE5');
content = content.replace(/#FDFDFD/g, '#F1F6F3');
content = content.replace(/#0F2D1A/g, '#042a1b');
content = content.replace(/#2a3632/g, '#042a1b');
content = content.replace(/#0d2a19/g, '#0B2B1B');
content = content.replace(/#0E1116/g, '#051910');
content = content.replace(/#333333/g, '#1A5034');

// Interactive Clinical Catalog overlay overlay dark greens
content = content.replace(/#0f1a16/g, '#0B2B1B');
content = content.replace(/#2c5f44/gi, '#1A5034'); // wait, #2c5f44 is green

// Replace accents
content = content.replace(/#A3D977/g, '#9AEA96');
content = content.replace(/#12A89D/g, '#1e7853');
content = content.replace(/#F3A5B8/g, '#9AEA96'); // pink to light green

// WhatsApp greens
content = content.replace(/#4ade80/gi, '#42B376');
content = content.replace(/#22c55e/gi, '#28A061');
content = content.replace(/#16a34a/gi, '#1A874F');

fs.writeFileSync(filePath, content, 'utf8');

console.log('Colors replaced successfully');
