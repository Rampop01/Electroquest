const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Specific variable replacements
    content = content.replace(/celoQuestProgress/g, 'electroQuestProgress');
    content = content.replace(/CeloQuest/g, 'Electroquest');
    content = content.replace(/celoQuest/g, 'electroQuest');
    content = content.replace(/questType: "celo"/g, 'questType: "electroneum"');
    content = content.replace(/questType === "celo"/g, 'questType === "electroneum"');
    content = content.replace(/questType === 'celo'/g, "questType === 'electroneum'");
    content = content.replace(/questType\?: 'ethereum' \| 'celo'/g, "questType?: 'ethereum' | 'electroneum'");
    content = content.replace(/type: "ethereum" \| "celo"/g, 'type: "ethereum" | "electroneum"');
    content = content.replace(/questType: "ethereum" \| "celo"/g, 'questType: "ethereum" | "electroneum"');
    content = content.replace(/isCeloRoute/g, 'isElectroRoute');
    
    // Component name replacements
    content = content.replace(/CeloArtifact/g, 'ElectroArtifact');
    content = content.replace(/CeloScrollPage/g, 'ElectroScrollPage');
    content = content.replace(/CeloQuizPage/g, 'ElectroQuizPage');
    content = content.replace(/CeloVictoryPage/g, 'ElectroVictoryPage');

    // Text replacements
    content = content.replace(/Celo Dollar/g, 'Electroneum Token');
    content = content.replace(/CELO/g, 'ETN');
    content = content.replace(/Celo/g, 'Electroneum');
    content = content.replace(/celo/g, 'electroneum');
    content = content.replace(/cUSD/g, 'USDT');
    content = content.replace(/cusd/g, 'usdt');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir(path.join(__dirname, 'app'));
walkDir(path.join(__dirname, 'components'));
walkDir(path.join(__dirname, 'lib'));
