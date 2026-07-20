const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /CONTRACT_ADDRESSES\.CELO/g, to: 'CONTRACT_ADDRESSES.ELECTRONEUM' },
  { from: /CELO_NETWORK/g, to: 'ELECTRONEUM_NETWORK' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (['node_modules', '.git', '.next', 'smartcontract'].includes(file)) continue;
      processDirectory(fullPath);
    } else {
      if (['.ts', '.tsx'].includes(path.extname(fullPath))) {
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

processDirectory(__dirname);
console.log('Replacement complete.');
