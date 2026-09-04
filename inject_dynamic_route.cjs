const fs = require('fs');

const files = [
  'src/components/About.jsx',
  'src/components/Worship.jsx',
  'src/components/Education.jsx',
  'src/components/Fellowship.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  if (!content.includes('DynamicSubPage')) {
    // Add import right after react-router-dom import
    content = content.replace(
      "import { Link, useLocation } from 'react-router-dom';",
      "import { Link, useLocation } from 'react-router-dom';\nimport DynamicSubPage from './DynamicSubPage';"
    );

    // Some components might have different imports, check if we added it
    if (!content.includes('DynamicSubPage')) {
      content = "import DynamicSubPage from './DynamicSubPage';\n" + content;
    }

    // Replace </Routes> with <Route path="*" element={<DynamicSubPage />} />\n              </Routes>
    content = content.replace(
      /<\/Routes>/,
      `  <Route path="*" element={<DynamicSubPage />} />\n              </Routes>`
    );

    fs.writeFileSync(f, content);
  }
});

console.log('Successfully injected DynamicSubPage to layout components');
