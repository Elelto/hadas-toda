const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Admin.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Generate a safe ID from the label text
function generateId(text) {
  // Convert Hebrew/English text to a clean ascii-like ID or just base64 it or hash it.
  // Actually, we can just use a simple counter for uniqueness, plus a prefix.
  return 'field-';
}

let counter = 1;

// We'll replace the label and the immediately following input/textarea/select
const regex = /<label className="form-group-label">([^<]+)<\/label>\s*<(input|textarea|select)/g;

content = content.replace(regex, (match, labelText, tagType) => {
  const id = `admin-field-${counter++}`;
  return `<label className="form-group-label" htmlFor="${id}">${labelText}</label>\n<${tagType} id="${id}"`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated labels and inputs in Admin.jsx');
