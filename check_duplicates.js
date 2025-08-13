const fs = require('fs');

const content = fs.readFileSync('src/pages/Tips.tsx', 'utf8');

// Extract the tipCategories array
const start = content.indexOf('const tipCategories = [');
const end = content.indexOf('];', start);
const arrayContent = content.substring(start + 'const tipCategories = ['.length, end);

// Extract all titles
const titleMatches = arrayContent.match(/title: "([^"]+)"/g);
const titles = titleMatches ? titleMatches.map(match => match.replace('title: "', '').replace('"', '')) : [];

console.log(`Total tips found: ${titles.length}`);
console.log(`Unique tips: ${new Set(titles).size}`);

// Find duplicates
const seen = new Set();
const duplicates = [];
titles.forEach(title => {
  if (seen.has(title)) {
    duplicates.push(title);
  } else {
    seen.add(title);
  }
});

if (duplicates.length > 0) {
  console.log('\nDuplicates found:');
  duplicates.forEach(dup => console.log(`- ${dup}`));
} else {
  console.log('\nNo duplicates found!');
}

// Show first few titles
console.log('\nFirst 10 titles:');
titles.slice(0, 10).forEach((title, i) => console.log(`${i+1}. ${title}`));