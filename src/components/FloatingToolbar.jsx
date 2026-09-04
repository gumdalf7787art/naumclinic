import React, { useEffect, useState, useRef } from 'react';
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, Type, Highlighter, X, ChevronDown } from 'lucide-react';

export default function FloatingToolbar() {
  const [position, setPosition] = useState({ top: 0, left: 0, visible: false });
  const [activeFormats, setActiveFormats] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showFontFamily, setShowFontFamily] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const toolbarRef = useRef(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        const activeElement = document.activeElement;
        const isFocusInsideToolbar = toolbarRef.current && toolbarRef.current.contains(activeElement);
        
        if (!isFocusInsideToolbar) {
          setPosition(prev => ({ ...prev, visible: false }));
          setShowColorPicker(false);
          setShowBgColorPicker(false);
          setShowFontFamily(false);
          setShowFontSize(false);
        }
        return;
      }

      // Check if the selection is inside our EditableText
      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;
      if (container.nodeType === 3) container = container.parentNode;

      const isEditable = container.closest('[contenteditable="true"]');
      if (!isEditable) {
        setPosition(prev => ({ ...prev, visible: false }));
        setShowColorPicker(false);
        setShowBgColorPicker(false);
        setShowFontFamily(false);
        setShowFontSize(false);
        return;
      }

      // Calculate position
      const rect = range.getBoundingClientRect();
      
      // Check active formats
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikeThrough'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
        foreColor: document.queryCommandValue('foreColor'),
        hiliteColor: document.queryCommandValue('hiliteColor'),
      });

      setPosition({
        top: rect.top - 50,
        left: rect.left + rect.width / 2,
        visible: true
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    
    // Hide when clicking outside
    const handleMouseDown = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        // Always close dropdowns when clicking outside the toolbar
        setShowColorPicker(false);
        setShowBgColorPicker(false);
        setShowFontFamily(false);
        setShowFontSize(false);
        
        // Hide entire toolbar if clicking outside an editable area
        if (!e.target.closest('[contenteditable="true"]')) {
          setPosition(prev => ({ ...prev, visible: false }));
        }
      }
    };
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [showColorPicker, showBgColorPicker, showFontFamily, showFontSize]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    // Force re-check formats
    setActiveFormats(prev => ({
      ...prev,
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      foreColor: document.queryCommandValue('foreColor'),
      hiliteColor: document.queryCommandValue('hiliteColor'),
    }));
  };

  const closeAllMenus = () => {
    setShowColorPicker(false);
    setShowBgColorPicker(false);
    setShowFontFamily(false);
    setShowFontSize(false);
  };

  const toggleMenu = (setter, currentValue) => {
    closeAllMenus();
    setter(!currentValue);
  };

  if (!position.visible) return null;

  const colors = ['#000000', '#555555', '#888888', '#cc0000', '#e64835', '#8DC63F', '#0066cc', '#ffffff'];
  
  const fonts = [
    { label: '기본 폰트', value: 'Inter, sans-serif' },
    { label: '나눔명조', value: 'Nanum Myeongjo, serif' },
    { label: '본고딕 바탕', value: 'Noto Serif KR, serif' },
    { label: '고운돋움', value: 'Gowun Dodum, sans-serif' },
    { label: '시스템 폰트', value: 'system-ui, sans-serif' },
  ];

  const sizes = [
    { label: '가장 작게', value: '1' },
    { label: '작게', value: '2' },
    { label: '보통', value: '3' },
    { label: '조금 크게', value: '4' },
    { label: '크게', value: '5' },
    { label: '매우 크게', value: '6' },
    { label: '가장 크게', value: '7' },
  ];

  // Utility to determine indicator color
  const getDisplayColor = (colorString, fallback) => {
    if (!colorString || colorString === 'transparent' || colorString === 'rgba(0, 0, 0, 0)') return fallback;
    return colorString;
  };

  return (
    <div 
      ref={toolbarRef}
      className="fixed z-50 flex items-center bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 p-1 gap-1 -translate-x-1/2 transition-opacity"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onMouseDown={(e) => e.preventDefault()} // Keep selection
    >
      <ToolbarButton 
        icon={<Bold size={16} />} 
        active={activeFormats.bold} 
        onClick={() => execCommand('bold')} 
        title="굵게"
      />
      <ToolbarButton 
        icon={<Italic size={16} />} 
        active={activeFormats.italic} 
        onClick={() => execCommand('italic')} 
        title="이탤릭"
      />
      <ToolbarButton 
        icon={<Underline size={16} />} 
        active={activeFormats.underline} 
        onClick={() => execCommand('underline')} 
        title="밑줄"
      />
      <ToolbarButton 
        icon={<Strikethrough size={16} />} 
        active={activeFormats.strikethrough} 
        onClick={() => execCommand('strikeThrough')} 
        title="취소선"
      />
      
      <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
      
      <div className="relative">
        <ToolbarButton 
          icon={
            <div className="flex flex-col items-center">
              <Type size={16} />
              <div className="w-3 h-[3px] mt-[1px] rounded-sm" style={{ backgroundColor: getDisplayColor(activeFormats.foreColor, '#000') }}></div>
            </div>
          }
          active={showColorPicker} 
          onClick={() => toggleMenu(setShowColorPicker, showColorPicker)} 
          title="글자색"
        />
        {showColorPicker && (
          <div className="absolute top-full left-0 mt-2 p-3 w-[140px] bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="text-[11px] text-gray-500 mb-1.5 font-bold">기본 색상</div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {colors.map(c => (
                <button 
                  key={c}
                  className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: c }}
                  onClick={() => { execCommand('foreColor', c); setShowColorPicker(false); }}
                />
              ))}
            </div>
            <div className="w-full h-[1px] bg-gray-100 my-2"></div>
            <div className="text-[11px] text-gray-500 mb-1.5 font-bold">직접 지정 (RGB)</div>
            <input 
              type="color" 
              className="w-full h-8 cursor-pointer rounded border border-gray-200"
              onChange={(e) => execCommand('foreColor', e.target.value)}
              onBlur={() => setShowColorPicker(false)}
            />
          </div>
        )}
      </div>

      <div className="relative">
        <ToolbarButton 
          icon={
            <div className="flex flex-col items-center">
              <Highlighter size={16} />
              <div className="w-3 h-[3px] mt-[1px] rounded-sm border" style={{ 
                backgroundColor: getDisplayColor(activeFormats.hiliteColor, 'transparent'),
                borderColor: (!activeFormats.hiliteColor || activeFormats.hiliteColor === 'rgba(0, 0, 0, 0)' || activeFormats.hiliteColor === 'transparent') ? '#ccc' : 'transparent'
              }}></div>
            </div>
          }
          active={showBgColorPicker} 
          onClick={() => toggleMenu(setShowBgColorPicker, showBgColorPicker)} 
          title="배경색"
        />
        {showBgColorPicker && (
          <div className="absolute top-full left-0 mt-2 p-3 w-[140px] bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="text-[11px] text-gray-500 mb-1.5 font-bold">기본 색상</div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {colors.map(c => (
                <button 
                  key={c}
                  className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: c }}
                  onClick={() => { execCommand('hiliteColor', c); setShowBgColorPicker(false); }}
                />
              ))}
            </div>
            <button 
              className="w-full py-1.5 mb-2 text-[11px] bg-gray-100 rounded text-gray-600 hover:bg-gray-200 font-medium"
              onClick={() => { execCommand('hiliteColor', 'transparent'); setShowBgColorPicker(false); }}
            >
              배경색 없음
            </button>
            <div className="w-full h-[1px] bg-gray-100 my-2"></div>
            <div className="text-[11px] text-gray-500 mb-1.5 font-bold">직접 지정 (RGB)</div>
            <input 
              type="color" 
              className="w-full h-8 cursor-pointer rounded border border-gray-200"
              onChange={(e) => execCommand('hiliteColor', e.target.value)}
              onBlur={() => setShowBgColorPicker(false)}
            />
          </div>
        )}
      </div>

      <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>

      <ToolbarButton 
        icon={<AlignLeft size={16} />} 
        active={activeFormats.justifyLeft} 
        onClick={() => execCommand('justifyLeft')} 
        title="왼쪽 정렬"
      />
      <ToolbarButton 
        icon={<AlignCenter size={16} />} 
        active={activeFormats.justifyCenter} 
        onClick={() => execCommand('justifyCenter')} 
        title="가운데 정렬"
      />
      <ToolbarButton 
        icon={<AlignRight size={16} />} 
        active={activeFormats.justifyRight} 
        onClick={() => execCommand('justifyRight')} 
        title="오른쪽 정렬"
      />

      <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>

      {/* Font Family Custom Dropdown */}
      <div className="relative flex items-center">
        <button 
          onClick={() => toggleMenu(setShowFontFamily, showFontFamily)}
          className={`flex items-center gap-1 text-[12px] px-2 py-1.5 rounded transition-colors ${showFontFamily ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
          title="글꼴"
        >
          글꼴 <ChevronDown size={14} className="text-gray-400" />
        </button>
        {showFontFamily && (
          <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 flex flex-col">
            {fonts.map(font => (
              <button 
                key={font.value}
                className="text-left px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100"
                style={{ fontFamily: font.value }}
                onClick={() => { execCommand('fontName', font.value); setShowFontFamily(false); }}
              >
                {font.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Font Size Custom Dropdown */}
      <div className="relative flex items-center">
        <button 
          onClick={() => toggleMenu(setShowFontSize, showFontSize)}
          className={`flex items-center gap-1 text-[12px] px-2 py-1.5 rounded transition-colors ${showFontSize ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
          title="크기"
        >
          크기 <ChevronDown size={14} className="text-gray-400" />
        </button>
        {showFontSize && (
          <div className="absolute top-full left-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 flex flex-col">
            {sizes.map(size => (
              <button 
                key={size.value}
                className="text-left px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100"
                onClick={() => { execCommand('fontSize', size.value); setShowFontSize(false); }}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>
      
      <ToolbarButton 
        icon={<List size={16} />} 
        onClick={() => execCommand('insertUnorderedList')} 
        title="글머리 기호"
      />
      <ToolbarButton 
        icon={<X size={16} className="text-red-500" />} 
        onClick={() => execCommand('removeFormat')} 
        title="서식 지우기"
      />
    </div>
  );
}

function ToolbarButton({ icon, onClick, active, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded flex items-center justify-center transition-colors ${active ? 'bg-[#8DC63F]/20 text-[#8DC63F]' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {icon}
    </button>
  );
}
