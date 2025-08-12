// Script to replace all view counts in Tips.tsx
const fs = require('fs');

let content = fs.readFileSync('src/pages/Tips.tsx', 'utf8');

// Replace all view counts with 0
content = content.replace(/views: \d+,/g, 'views: 0,');

fs.writeFileSync('src/pages/Tips.tsx', content);
console.log('All view counts set to 0');