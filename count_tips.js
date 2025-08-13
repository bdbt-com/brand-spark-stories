const fs = require('fs');

const content = fs.readFileSync('src/pages/Tips.tsx', 'utf8');

// Find the tipCategories array
const start = content.indexOf('const tipCategories = [');
const end = content.indexOf('];', start);
const arrayContent = content.substring(start, end + 2);

// Count the number of objects by counting the pattern "icon:"
const iconMatches = arrayContent.match(/icon:/g);
const count = iconMatches ? iconMatches.length : 0;

console.log(`Number of tips found: ${count}`);