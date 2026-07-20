const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /CELO/g, to: 'ELECTRONEUM' },
  { from: /celo/g, to: 'electroneum' },
  { from: /Celo/g, to: 'Electroneum' },
  { from: /Alfajores/g, to: 'Testnet' },
  { from: /alfajores/g, to: 'testnet' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (['node_modules', 'out', 'cache', 'broadcast', 'lib'].includes(file)) continue;
      processDirectory(fullPath);
    } else {
      if (['.sol', '.md', '.template', '.sh', '.json', '.toml'].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let original = content;
        
        for (const { from, to } of replacements) {
          content = content.replace(from, to);
        }
        
        if (content !== original) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

processDirectory(path.join(__dirname, 'smartcontract'));
console.log('Smartcontract replacement complete.');
