const fs = require('fs');

// Read the Tips.tsx file
let content = fs.readFileSync('src/pages/Tips.tsx', 'utf8');

// Remove all view counts, readTime, and rating properties from tip objects
content = content.replace(/views: \d+,\s*/g, 'views: 0,\n      ');
content = content.replace(/readTime: "[^"]*",\s*/g, '');
content = content.replace(/rating: [\d.]+,\s*/g, '');

// Remove the rating and readTime display from the JSX
content = content.replace(
  /<div className="flex items-center gap-4 text-sm text-muted-foreground">\s*<span className="flex items-center">\s*<Eye className="w-4 h-4 mr-1" \/>\s*\{tip\.views\.toLocaleString\(\)\} views\s*<\/span>\s*<span className="flex items-center">\s*<Clock className="w-4 h-4 mr-1" \/>\s*\{tip\.readTime\}\s*<\/span>\s*<span className="flex items-center">\s*<Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" \/>\s*\{tip\.rating\}\s*<\/span>\s*<\/div>/g,
  '<div className="flex items-center gap-4 text-sm text-muted-foreground">\n                      <span className="flex items-center">\n                        <Eye className="w-4 h-4 mr-1" />\n                        {tip.views.toLocaleString()} views\n                      </span>\n                    </div>'
);

// Remove difficulty level badges by removing level property and its display
content = content.replace(/level: "[^"]*",\s*/g, '');
content = content.replace(/duration: "[^"]*",\s*/g, '');

// Write the updated content back
fs.writeFileSync('src/pages/Tips.tsx', content);
console.log('Tips.tsx updated successfully!');