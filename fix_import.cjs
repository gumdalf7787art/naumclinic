const fs = require('fs');

const files = [
  'src/components/About.jsx',
  'src/components/Worship.jsx',
  'src/components/Education.jsx',
  'src/components/Fellowship.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  if (!content.includes("import useSubMenus")) {
    content = "import useSubMenus from '../hooks/useSubMenus';\n" + content;
    fs.writeFileSync(f, content);
  }
});

console.log('Successfully fixed useSubMenus import');
