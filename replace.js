const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /celo-quests/g, to: 'electro-quests' },
  { from: /celo-victory/g, to: 'electro-victory' },
  { from: /celo-quest-data/g, to: 'electro-quest-data' },
  { from: /celo-rooms/g, to: 'electro-rooms' },
  { from: /CeloQuest/g, to: 'Electroquest' },
  { from: /celoquest/g, to: 'electroquest' },
  { from: /Celo Quests/g, to: 'Electro Quests' },
  { from: /Celo blockchain/g, to: 'Electroneum blockchain' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (['node_modules', '.git', '.next'].includes(file)) continue;
      processDirectory(fullPath);
    } else {
      if (['.ts', '.tsx', '.md', '.json'].includes(path.extname(fullPath))) {
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
