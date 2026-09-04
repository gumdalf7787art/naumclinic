import { useState, useEffect } from 'react';

export default function useSubMenus(parentPath) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch('/api/menus')
      .then(res => res.json())
      .then(data => {
        const parent = data.find(m => m.path === parentPath);
        if (parent && parent.children) {
          // Filter active and sort
          const activeChildren = parent.children
            .filter(m => m.is_active !== 0)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(m => ({
              path: m.path,
              label: m.name
            }));
          setMenus(activeChildren);
        } else {
          setMenus([]);
        }
      })
      .catch(console.error);
  }, [parentPath]);

  return menus;
}
