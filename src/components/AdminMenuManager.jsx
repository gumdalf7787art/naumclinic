import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, GripVertical, Eye, EyeOff, Save, FolderTree, X, Edit3 } from 'lucide-react';

export default function AdminMenuManager() {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ parentId: null, name: '', slug: '', error: '' });
  
  // Edit Name State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ id: null, parentId: null, name: '', error: '' });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/menus');
      const data = await res.json();
      setMenus(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const saveMenusToDB = async (menusArray) => {
    setIsSaving(true);
    try {
      const flattened = [];
      menusArray.forEach(m => {
        flattened.push({ id: m.id, parent_id: null, sort_order: m.sort_order, is_active: m.is_active, name: m.name });
        m.children.forEach(c => {
          flattened.push({ id: c.id, parent_id: m.id, sort_order: c.sort_order, is_active: c.is_active, name: c.name });
        });
      });

      await fetch('/api/menus', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flattened)
      });
    } catch (e) {
      console.error('자동 저장 중 오류:', e);
    }
    setIsSaving(false);
  };

  const handleToggleVisibility = async (menuId, parentId = null) => {
    const newMenus = JSON.parse(JSON.stringify(menus));
    if (parentId === null) {
      const idx = newMenus.findIndex(m => m.id === menuId);
      newMenus[idx].is_active = newMenus[idx].is_active ? 0 : 1;
    } else {
      const parentIdx = newMenus.findIndex(m => m.id === parentId);
      const childIdx = newMenus[parentIdx].children.findIndex(m => m.id === menuId);
      newMenus[parentIdx].children[childIdx].is_active = newMenus[parentIdx].children[childIdx].is_active ? 0 : 1;
    }
    setMenus(newMenus);
    await saveMenusToDB(newMenus);
  };

  const handleMoveUp = async (menuId, parentId = null) => {
    const newMenus = JSON.parse(JSON.stringify(menus));
    if (parentId === null) {
      const idx = newMenus.findIndex(m => m.id === menuId);
      if (idx > 0) {
        const temp = newMenus[idx];
        newMenus[idx] = newMenus[idx - 1];
        newMenus[idx - 1] = temp;
        newMenus.forEach((m, i) => m.sort_order = i + 1);
      }
    } else {
      const parentIdx = newMenus.findIndex(m => m.id === parentId);
      const children = newMenus[parentIdx].children;
      const idx = children.findIndex(m => m.id === menuId);
      if (idx > 0) {
        const temp = children[idx];
        children[idx] = children[idx - 1];
        children[idx - 1] = temp;
        children.forEach((m, i) => m.sort_order = i + 1);
      }
    }
    setMenus(newMenus);
    await saveMenusToDB(newMenus);
  };

  const handleMoveDown = async (menuId, parentId = null) => {
    const newMenus = JSON.parse(JSON.stringify(menus));
    if (parentId === null) {
      const idx = newMenus.findIndex(m => m.id === menuId);
      if (idx < newMenus.length - 1) {
        const temp = newMenus[idx];
        newMenus[idx] = newMenus[idx + 1];
        newMenus[idx + 1] = temp;
        newMenus.forEach((m, i) => m.sort_order = i + 1);
      }
    } else {
      const parentIdx = newMenus.findIndex(m => m.id === parentId);
      const children = newMenus[parentIdx].children;
      const idx = children.findIndex(m => m.id === menuId);
      if (idx < children.length - 1) {
        const temp = children[idx];
        children[idx] = children[idx + 1];
        children[idx + 1] = temp;
        children.forEach((m, i) => m.sort_order = i + 1);
      }
    }
    setMenus(newMenus);
    await saveMenusToDB(newMenus);
  };



  const handleDelete = async (id) => {
    if(!window.confirm('정말 삭제하시겠습니까? (하위 메뉴도 모두 삭제됩니다)')) return;
    try {
      await fetch(`/api/menus?id=${id}`, { method: 'DELETE' });
      fetchMenus();
    } catch(e) {
      console.error(e);
    }
  };

  const handleAddMenuClick = (parentId = null) => {
    setModalData({ parentId, name: '', slug: '', error: '' });
    setIsModalOpen(true);
  };

  const handleSubmitMenu = async (e) => {
    e.preventDefault();
    const { parentId, name, slug } = modalData;
    
    if (!name) {
      setModalData(prev => ({ ...prev, error: '메뉴 이름을 입력해주세요.' }));
      return;
    }

    // Validation: English letters, numbers, and dashes only
    const slugRegex = /^[a-zA-Z0-9-]+$/;
    if (slug && !slugRegex.test(slug)) {
      setModalData(prev => ({ ...prev, error: 'URL 경로는 영문, 숫자, 하이픈(-)만 사용할 수 있습니다.' }));
      return;
    }

    // Auto-generate if empty
    let finalSlug = slug;
    if (!finalSlug) finalSlug = 'page-' + Math.random().toString(36).substr(2, 6);
    
    let sort_order = 1;
    let finalPath = '';

    if (parentId === null) {
      sort_order = menus.length + 1;
      finalPath = `/${finalSlug}`;
    } else {
      const parent = menus.find(m => m.id === parentId);
      if (parent) {
        sort_order = parent.children.length + 1;
        finalPath = `${parent.path}/${finalSlug}`;
      }
    }

    try {
      await fetch('/api/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, path: finalPath, parent_id: parentId, sort_order })
      });
      setIsModalOpen(false);
      fetchMenus();
    } catch(e) {
      console.error(e);
      setModalData(prev => ({ ...prev, error: '서버 오류가 발생했습니다.' }));
    }
  };

  const handleEditMenuClick = (menu, parentId = null) => {
    setEditData({ id: menu.id, parentId, name: menu.name, error: '' });
    setIsEditModalOpen(true);
  };

  const handleSubmitEditMenu = async (e) => {
    e.preventDefault();
    if (!editData.name) {
      setEditData(prev => ({ ...prev, error: '메뉴 이름을 입력해주세요.' }));
      return;
    }

    const newMenus = JSON.parse(JSON.stringify(menus));
    if (editData.parentId === null) {
      const idx = newMenus.findIndex(m => m.id === editData.id);
      if (idx !== -1) newMenus[idx].name = editData.name;
    } else {
      const parentIdx = newMenus.findIndex(m => m.id === editData.parentId);
      if (parentIdx !== -1) {
        const childIdx = newMenus[parentIdx].children.findIndex(m => m.id === editData.id);
        if (childIdx !== -1) newMenus[parentIdx].children[childIdx].name = editData.name;
      }
    }
    
    setMenus(newMenus);
    setIsEditModalOpen(false);
    await saveMenusToDB(newMenus);
  };

  if (isLoading) return <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-black flex items-center">
            <FolderTree className="mr-2" size={24} /> 
            사이트 메뉴 (GNB) 구조 관리
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-gray-500 text-[14px]">웹사이트 상단 네비게이션 메뉴의 순서를 바꾸거나 켜고 끌 수 있습니다.</p>
            {isSaving && <span className="text-[12px] bg-green-50 text-green-600 px-2 py-0.5 rounded font-medium animate-pulse">자동 저장 중...</span>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          {menus.map((menu, idx) => (
            <div key={menu.id} className="border border-gray-200 rounded-xl overflow-hidden">
              {/* 1Depth Menu */}
              <div className={`flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 ${menu.is_active ? '' : 'opacity-50'}`}>
                <div className="flex items-center">
                  <div className="flex flex-col mr-4">
                    <button onClick={() => handleMoveUp(menu.id)} disabled={idx === 0} className="text-gray-400 hover:text-black disabled:opacity-30">▲</button>
                    <button onClick={() => handleMoveDown(menu.id)} disabled={idx === menus.length - 1} className="text-gray-400 hover:text-black disabled:opacity-30">▼</button>
                  </div>
                  <GripVertical className="text-gray-400 mr-2 cursor-move hidden" />
                  <span className="font-bold text-[16px] text-black">{menu.name}</span>
                  <span className="text-[12px] text-gray-400 ml-3">{menu.path}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleToggleVisibility(menu.id)} className={`p-2 rounded-lg ${menu.is_active ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}>
                    {menu.is_active ? <Eye size={18}/> : <EyeOff size={18}/>}
                  </button>
                  <button onClick={() => handleEditMenuClick(menu)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"><Edit3 size={18}/></button>
                  <button onClick={() => handleAddMenuClick(menu.id)} className="p-2 text-[#5227FF] bg-[#5227FF]/10 rounded-lg hover:bg-[#5227FF]/20"><Plus size={18}/></button>
                  <button onClick={() => handleDelete(menu.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 size={18}/></button>
                </div>
              </div>

              {/* 2Depth Menus */}
              <div className="p-4 bg-white space-y-2">
                {menu.children && menu.children.length > 0 ? (
                  menu.children.map((child, cIdx) => (
                    <div key={child.id} className={`flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50 ml-12 ${child.is_active ? '' : 'opacity-50'}`}>
                      <div className="flex items-center">
                        <div className="flex mr-3 space-x-1">
                          <button onClick={() => handleMoveUp(child.id, menu.id)} disabled={cIdx === 0} className="text-gray-400 hover:text-black disabled:opacity-30 text-[12px]">▲</button>
                          <button onClick={() => handleMoveDown(child.id, menu.id)} disabled={cIdx === menu.children.length - 1} className="text-gray-400 hover:text-black disabled:opacity-30 text-[12px]">▼</button>
                        </div>
                        <span className="text-gray-400 mr-2">└</span>
                        <span className="font-medium text-[14px] text-gray-700">{child.name}</span>
                        <span className="text-[12px] text-gray-400 ml-3">{child.path}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleToggleVisibility(child.id, menu.id)} className={`p-1.5 rounded-md ${child.is_active ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}>
                          {child.is_active ? <Eye size={16}/> : <EyeOff size={16}/>}
                        </button>
                        <button onClick={() => handleEditMenuClick(child, menu.id)} className="p-1.5 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"><Edit3 size={16}/></button>
                        <button onClick={() => handleDelete(child.id)} className="p-1.5 text-red-500 bg-red-50 rounded-md hover:bg-red-100"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-gray-400 ml-12 py-2">하위 메뉴가 없습니다.</p>
                )}
              </div>
            </div>
          ))}

          <button onClick={() => handleAddMenuClick(null)} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-black hover:text-black transition-colors flex items-center justify-center">
            <Plus size={20} className="mr-2" /> 새 최상위 카테고리 추가
          </button>
        </div>
      </div>

      {/* Menu Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-2xl relative"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-[20px] font-bold text-gray-900 mb-6">
              {modalData.parentId ? '새 하위 메뉴 추가' : '새 최상위 카테고리 추가'}
            </h3>
            
            <form onSubmit={handleSubmitMenu} className="space-y-4">
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-2">메뉴 이름 (한글/영문 모두 가능)</label>
                <input 
                  type="text" 
                  value={modalData.name}
                  onChange={(e) => setModalData({...modalData, name: e.target.value, error: ''})}
                  placeholder="예: 샘플 메뉴"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black outline-none transition-all text-[15px]"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-2">URL 경로 (영문/숫자만 가능)</label>
                <input 
                  type="text" 
                  value={modalData.slug}
                  onChange={(e) => setModalData({...modalData, slug: e.target.value, error: ''})}
                  placeholder="예: sample (선택사항)"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:outline-none transition-all text-[15px] ${modalData.error.includes('영문') ? 'border-red-500 focus:border-red-500 text-red-600 bg-red-50' : 'border-gray-200 focus:border-black'}`}
                />
                <p className="text-[12px] text-gray-500 mt-2 ml-1">입력하지 않으면 임의의 주소가 자동 생성됩니다.</p>
              </div>

              {modalData.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-[13px] font-medium flex items-center">
                  <span className="mr-2">⚠️</span>
                  {modalData.error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-black text-white font-bold rounded-xl py-3.5 mt-2 hover:bg-gray-800 transition-colors text-[15px]"
              >
                메뉴 생성하기
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Name Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-2xl relative"
          >
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-[20px] font-bold text-gray-900 mb-6">메뉴 이름 변경</h3>
            
            <form onSubmit={handleSubmitEditMenu} className="space-y-4">
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-2">새로운 메뉴 이름</label>
                <input 
                  type="text" 
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value, error: ''})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black outline-none transition-all text-[15px]"
                  autoFocus
                />
              </div>

              {editData.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-[13px] font-medium flex items-center">
                  <span className="mr-2">⚠️</span>
                  {editData.error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-black text-white font-bold rounded-xl py-3.5 mt-2 hover:bg-gray-800 transition-colors text-[15px]"
              >
                변경 사항 저장
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
