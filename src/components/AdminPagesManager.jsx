import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Save, Image as ImageIcon, 
  Settings2, EyeOff, LayoutTemplate, UploadCloud, LayoutGrid, Plus,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import BlockEditor from './BlockEditor';
import { BlockRenderer } from './PageBlocks';
import BlockLibrary from './BlockLibrary';
import FloatingToolbar from './FloatingToolbar';
import { PAGE_TEMPLATES } from '../data/pageTemplates';

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function AdminPagesManager({ setHasUnsavedChanges }) {
  const [pages, setPages] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlockMode, setIsBlockMode] = useState(true);
  
  // Library State
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [insertIndex, setInsertIndex] = useState(0);
  const [isLeftPaneCollapsed, setIsLeftPaneCollapsed] = useState(false);
  
  // Editor state
  const [formData, setFormData] = useState({
    slug: '',
    menu_id: '',
    title: '',
    subtitle: '',
    banner_image: '',
    content: '',
    is_published: 1
  });
  const [initialFormData, setInitialFormData] = useState(null);

  const fileInputRef = useRef(null);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pagesRes, menusRes] = await Promise.all([
        fetch('/api/pages'),
        fetch('/api/menus')
      ]);
      const pagesData = await pagesRes.json();
      const menusData = await menusRes.json();
      
      if (pagesData.success) setPages(pagesData.pages);
      if (Array.isArray(menusData)) setMenus(menusData);
      
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    if (setHasUnsavedChanges && initialFormData) {
      const isDirty = JSON.stringify(formData) !== JSON.stringify(initialFormData);
      setHasUnsavedChanges(isDirty);
    }
    const handleBeforeUnload = (e) => {
      if (initialFormData && JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, initialFormData, setHasUnsavedChanges]);

  const confirmLeave = () => {
    if (initialFormData && JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
      return window.confirm('저장하지 않은 내용이 있습니다. 정말 다른 페이지로 이동하시겠습니까? (저장하지 않은 변경사항은 삭제됩니다)');
    }
    return true;
  };

  const handleMenuSelect = (menu) => {
    if (!confirmLeave()) return;

    setSelectedMenu(menu);
    setIsAddingBlock(false);
    
    // Derive the expected slug from the menu path (e.g., '/about/vision' → 'about/vision')
    const expectedSlug = menu.path ? menu.path.replace(/^\//, '') : `page-${menu.id}`;
    
    // Find existing page: prefer slug match first, then menu_id
    const page = pages.find(p => p.slug === expectedSlug) || pages.find(p => p.menu_id === menu.id);
    const defaultSlug = expectedSlug;
    
    if (page) {
      let content = page.content || '[]';
      let isBlock = false;
      
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          isBlock = true;
        } else if (Array.isArray(parsed) && parsed.length === 0 && PAGE_TEMPLATES[defaultSlug]) {
          // If empty array, auto-load template
          content = JSON.stringify(PAGE_TEMPLATES[defaultSlug]);
          isBlock = true;
        } else if (Array.isArray(parsed)) {
          isBlock = true;
        }
      } catch {
        // If it's invalid JSON (e.g. old HTML dummy data), auto-load template if available
        if (PAGE_TEMPLATES[defaultSlug]) {
          content = JSON.stringify(PAGE_TEMPLATES[defaultSlug]);
          isBlock = true;
        } else {
          isBlock = false;
        }
      }

      const pageData = {
        slug: page.slug,
        menu_id: menu.id,
        title: page.title || menu.name, // Fallback to menu name if title is empty
        subtitle: page.subtitle || '',
        banner_image: page.banner_image || '',
        content: content,
        is_published: page.is_published
      };
      setFormData(pageData);
      setInitialFormData(pageData);
      setIsBlockMode(isBlock);
    } else {
      // Initialize new blank page state for this menu
      const defaultContent = PAGE_TEMPLATES[defaultSlug] ? JSON.stringify(PAGE_TEMPLATES[defaultSlug]) : '[]';
      const defaultData = {
        slug: defaultSlug,
        menu_id: menu.id,
        title: menu.name,
        subtitle: '',
        banner_image: '',
        content: defaultContent,
        is_published: 1
      };
      setFormData(defaultData);
      setInitialFormData(defaultData);
      setIsBlockMode(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, banner_image: data.url }));
      }
    } catch (err) {
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleSave = async () => {
    if (!formData.slug || !formData.title) {
      alert('제목과 데이터 연결에 문제가 있습니다.');
      return;
    }

    setIsLoading(true);
    try {
      // Check if page actually exists in DB by slug
      const isUpdate = pages.some(p => p.slug === formData.slug);
      const url = isUpdate ? `/api/pages/${formData.slug}` : '/api/pages';
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert(isUpdate ? '저장되었습니다.' : '새 페이지가 생성 및 저장되었습니다.');
        setInitialFormData(formData); // Update initial state to current saved state
        if (setHasUnsavedChanges) setHasUnsavedChanges(false);
        await fetchData();
      } else {
        alert(data.message || '오류가 발생했습니다.');
      }
    } catch (err) {
      alert('네트워크 오류가 발생했습니다.');
    }
    setIsLoading(false);
  };

  // Add Block Logic
  const handleOpenLibrary = (index) => {
    setInsertIndex(index);
    setIsAddingBlock(true);
  };

  const handleInsertBlock = (blockDef) => {
    let currentBlocks = [];
    try { currentBlocks = JSON.parse(formData.content || '[]'); } catch (e) { currentBlocks = []; }
    
    const newBlock = {
      id: generateId(),
      type: blockDef.type,
      data: JSON.parse(JSON.stringify(blockDef.defaultData))
    };
    
    const newBlocks = [...currentBlocks];
    newBlocks.splice(insertIndex, 0, newBlock);
    
    setFormData(prev => ({ ...prev, content: JSON.stringify(newBlocks) }));
    setIsAddingBlock(false);
  };

  const handleUpdateBlock = (id, newData) => {
    let currentBlocks = [];
    try { currentBlocks = JSON.parse(formData.content || '[]'); } catch (e) { currentBlocks = []; }
    
    const newBlocks = currentBlocks.map(block => 
      block.id === id ? { ...block, data: { ...block.data, ...newData } } : block
    );
    
    setFormData(prev => ({ ...prev, content: JSON.stringify(newBlocks) }));
  };

  // Build menu tree
  const parentMenus = menus;

  // Parse blocks for Live Preview
  let parsedBlocks = [];
  if (isBlockMode) {
    try {
      parsedBlocks = JSON.parse(formData.content || '[]');
    } catch (e) {
      parsedBlocks = [];
    }
  }

  const AddBlockLine = ({ index }) => (
    <div 
      className="h-10 -my-5 relative z-20 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
      onClick={() => handleOpenLibrary(index)}
    >
      <div className="absolute w-full h-[1px] border-t border-dashed border-green-500"></div>
      <div className="bg-white px-3 py-1 rounded-full text-green-600 text-[11px] font-bold relative z-10 flex items-center shadow-sm">
        <Plus size={12} className="mr-1" /> 블록추가
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-120px)] bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
      
      {/* ---------------------------------------------------------
          LEFT PANE: Menu Tree
      --------------------------------------------------------- */}
      <div className={`${isLeftPaneCollapsed ? 'w-16' : 'w-56'} bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center h-[57px]">
          {!isLeftPaneCollapsed && (
            <h2 className="font-bold text-gray-800 text-[14px] flex items-center truncate">
              <LayoutTemplate size={16} className="mr-2 text-indigo-500 shrink-0" />
              메뉴 및 페이지
            </h2>
          )}
          <button 
            onClick={() => setIsLeftPaneCollapsed(!isLeftPaneCollapsed)}
            className={`text-gray-400 hover:text-gray-600 transition-colors ${isLeftPaneCollapsed ? 'mx-auto' : ''}`}
            title={isLeftPaneCollapsed ? "메뉴 펼치기" : "메뉴 접기"}
          >
            {isLeftPaneCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-3 scrollbar-hide">
          {parentMenus.length === 0 ? (
            <p className="text-center text-gray-400 text-[12px] py-4">
               {isLeftPaneCollapsed ? '-' : '메뉴가 없습니다.'}
            </p>
          ) : (
            parentMenus.map(parent => {
              const children = parent.children || [];
              return (
                <div key={parent.id} className="mb-2">
                  <div className={`py-1.5 text-[11px] font-bold text-gray-400 tracking-wider ${isLeftPaneCollapsed ? 'text-center px-0' : 'px-2'}`} title={parent.name}>
                    {isLeftPaneCollapsed ? parent.name.substring(0, 2) : parent.name}
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {children.map(child => {
                      const childSlug = child.path ? child.path.replace(/^\//, '') : '';
                      const hasPage = pages.some(p => p.slug === childSlug || p.menu_id === child.id);
                      return (
                        <button
                          key={child.id}
                          onClick={() => handleMenuSelect(child)}
                          title={child.name}
                          className={`w-full flex items-center ${isLeftPaneCollapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 rounded-lg transition-colors ${
                            selectedMenu?.id === child.id
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-gray-600 hover:bg-gray-100 font-medium'
                          }`}
                        >
                          <span className={`text-[13px] flex items-center ${isLeftPaneCollapsed ? 'text-center' : 'truncate'}`}>
                            {!isLeftPaneCollapsed && <span className="text-gray-300 mr-1.5 text-[10px]">└</span>}
                            {isLeftPaneCollapsed ? child.name.substring(0, 2) : child.name}
                          </span>
                          {!isLeftPaneCollapsed && hasPage && pages.find(p => p.menu_id === child.id)?.is_published === 0 && (
                            <EyeOff size={12} className="text-gray-400 shrink-0 ml-2" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------
          MIDDLE PANE: Live Preview (flex-1)
      --------------------------------------------------------- */}
      <div className="flex-1 bg-white overflow-y-auto relative flex flex-col border-r border-gray-200 shadow-inner">
        {!selectedMenu ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 h-full">
            <LayoutTemplate size={48} className="mb-4 opacity-20" />
            <p className="text-[14px] font-medium text-gray-500">왼쪽 구조도에서 서브메뉴를 선택해주세요.</p>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto min-h-full my-0 transition-all duration-300 px-10 py-12">
            
            {/* New Clean Header Layout */}
            <div className="mb-10">
              <h1 className="text-[16px] font-bold text-gray-800">
                {formData.title || selectedMenu.name} 서브페이지
              </h1>
              <div className="w-full h-px bg-gray-200 mt-3"></div>
            </div>

            {/* Page Blocks Rendered */}
            <div className="w-full relative min-h-[400px]">
              {isBlockMode ? (
                <>
                  <AddBlockLine index={0} />
                  {parsedBlocks.map((block, i) => (
                    <div key={block.id} className="relative group/preview-block my-2">
                      <div className="border border-transparent hover:border-gray-200 rounded-lg p-2 transition-colors relative">
                        <BlockRenderer 
                          blocks={[block]} 
                          isEditMode={true} 
                          onChange={(id, newData) => handleUpdateBlock(id, newData)} 
                        />
                      </div>
                      <AddBlockLine index={i + 1} />
                    </div>
                  ))}
                  {parsedBlocks.length === 0 && (
                     <div className="py-20 text-center text-gray-400 text-[13px]">
                       아직 내용이 없습니다. 점선을 클릭하여 블록을 추가하세요.
                     </div>
                  )}
                </>
              ) : (
                <div 
                  className="prose max-w-none prose-lg prose-headings:font-bold prose-a:text-[#8DC63F]"
                  dangerouslySetInnerHTML={{ __html: formData.content }} 
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------
          RIGHT PANE: Editor Form (w-[300px])
      --------------------------------------------------------- */}
      <div className="w-[300px] bg-white flex flex-col shrink-0">
        {!selectedMenu ? (
           <div className="flex-1 flex items-center justify-center text-gray-400 p-8 text-center text-[13px]">
             메뉴를 선택하면<br/>이곳에 편집기가 나타납니다.
           </div>
        ) : isAddingBlock ? (
           <BlockLibrary 
             onSelectBlock={handleInsertBlock} 
             onCancel={() => setIsAddingBlock(false)} 
           />
        ) : (
          <>
            {/* Editor Header */}
            <div className="h-14 px-4 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 shadow-sm z-10">
              <h3 className="font-bold text-[13px] text-gray-800 flex items-center">
                <Settings2 size={14} className="mr-1.5 text-indigo-500" />
                페이지 편집
              </h3>
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className="px-3 py-1.5 text-[11px] font-bold text-white bg-black hover:bg-gray-800 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <Save size={12} className="mr-1" /> 저장하기
              </button>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#f8fafc]">
              
              {/* 1. Basic Settings */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5 flex justify-between items-center">
                    공개 상태
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          name="is_published"
                          className="sr-only" 
                          checked={formData.is_published === 1}
                          onChange={handleInputChange}
                        />
                        <div className={`block w-8 h-5 rounded-full transition-colors ${formData.is_published ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${formData.is_published ? 'transform translate-x-3' : ''}`}></div>
                      </div>
                    </label>
                  </label>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">서브페이지 이름 *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[12px] font-bold focus:bg-white focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                
                {/* Note: Banner removed from layout but keeping state in case it's used elsewhere */}
              </div>

              {/* 2. Block Editor */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h4 className="text-[12px] font-bold text-gray-800 flex items-center">
                    <LayoutGrid size={12} className="mr-1.5 text-indigo-500" />
                    블록 내용 수정
                  </h4>
                  <div className="flex items-center gap-2">
                    {!isBlockMode && (
                      <button 
                        onClick={() => {
                          if (window.confirm('블록 에디터로 전환하면 기존 HTML 코드가 모두 삭제됩니다. 계속하시겠습니까?')) {
                            setFormData(prev => ({ ...prev, content: '[]' }));
                            setIsBlockMode(true);
                          }
                        }}
                        className="text-[10px] font-bold text-indigo-600 hover:underline"
                      >
                        블록 전환
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-3 bg-[#f8fafc]">
                  {isBlockMode ? (
                    <BlockEditor 
                      content={formData.content} 
                      onChange={(val) => setFormData(prev => ({ ...prev, content: val }))} 
                    />
                  ) : (
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="w-full h-[300px] p-3 text-[11px] font-mono leading-relaxed bg-white outline-none border border-gray-200 rounded-lg resize-y"
                    />
                  )}
                </div>
              </div>

            </div>
          </>
        )}
      </div>
      <FloatingToolbar />
    </div>
  );
}
