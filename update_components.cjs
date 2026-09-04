const fs = require('fs');

const files = [
  { path: 'src/components/About.jsx', defaultPath: '/about/vision', base: '/about', backupPath: '/about/vision', defaultLabel: '교회비전과 목표' },
  { path: 'src/components/Worship.jsx', defaultPath: '/worship/word', base: '/worship', backupPath: '/worship/word', defaultLabel: '예배와말씀' },
  { path: 'src/components/Education.jsx', defaultPath: '/education/kids', base: '/education', backupPath: '/education/kids', defaultLabel: '유초등부' },
  { path: 'src/components/Fellowship.jsx', defaultPath: '/fellowship/grace', base: '/fellowship', backupPath: '/fellowship/grace', defaultLabel: '은혜의글' }
];

files.forEach(f => {
  let content = fs.readFileSync(f.path, 'utf8');

  // Add import if not exists
  if (!content.includes('useSubMenus')) {
    content = content.replace("import { Link, useLocation } from 'react-router-dom';", "import { Link, useLocation } from 'react-router-dom';\nimport useSubMenus from '../hooks/useSubMenus';");
  }

  // Find const MENU_ITEMS = [ ... ];
  const menuStart = content.indexOf('const MENU_ITEMS = [');
  if (menuStart !== -1) {
    const menuEnd = content.indexOf('];', menuStart) + 2;
    content = content.substring(0, menuStart) + content.substring(menuEnd);
  }

  // Find export default function Component() {
  const componentStart = content.indexOf('export default function ');
  const componentNameEnd = content.indexOf('(', componentStart);
  const componentBodyStart = content.indexOf('{', componentNameEnd) + 1;

  // Insert hook usage
  const hookStr = `\n  const MENU_ITEMS = useSubMenus('${f.base}');\n  const currentMenuItems = MENU_ITEMS.length > 0 ? MENU_ITEMS : [{ path: '${f.backupPath}', label: '${f.defaultLabel}' }];\n`;
  content = content.substring(0, componentBodyStart) + hookStr + content.substring(componentBodyStart);

  // Fix currentMenu assignment
  content = content.replace(
    /const currentMenu = MENU_ITEMS\.find\([^)]+\) \|\| MENU_ITEMS\[0\];/,
    `const currentMenu = currentMenuItems.find(item => item.path === currentPath) || currentMenuItems[0];`
  );

  // Also replace MENU_ITEMS.map with currentMenuItems.map
  content = content.replace(/MENU_ITEMS\.map/g, 'currentMenuItems.map');

  fs.writeFileSync(f.path, content);
});

console.log('Successfully updated layout files to use dynamic submenus');
