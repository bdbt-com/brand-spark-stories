const fs = require('fs');
const path = require('path');

// Get all uploaded image files
const uploadsDir = 'public/lovable-uploads';
const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith('.png'));

console.log(`Found ${files.length} uploaded images:`);
files.forEach((file, i) => {
  console.log(`${i+1}. ${file}`);
});

console.log(`\nTotal images: ${files.length}`);