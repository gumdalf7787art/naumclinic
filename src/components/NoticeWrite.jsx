import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Quote, 
  Minus, 
  Table2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Check,
  Palette
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PAGE_TEMPLATES } from '../data/pageTemplates';

const FONT_FAMILIES = [
  { label: '나눔고딕', value: "'Nanum Gothic', sans-serif" },
  { label: '프리텐다드', value: "'Pretendard', sans-serif" },
  { label: '맑은 고딕', value: "'Malgun Gothic', sans-serif" },
  { label: '바탕', value: "'Batang', serif" },
  { label: 'Arial', value: "Arial, sans-serif" },
];

const FONT_SIZES = ['11', '13', '15', '17', '19', '24', '28', '36'];

const TEXT_COLORS = [
  '#000000', '#374151', '#6B7280', '#EF4444', '#F97316',
  '#EAB308', '#22C55E', '#0284C7', '#8B5CF6', '#EC4899',
  '#FFFFFF',
];
const BG_COLORS = [
  '#FEF9C3', '#FEE2E2', '#FFEDD5', '#DCFCE7', '#DBEAFE',
  '#EDE9FE', '#FCE7F3', '#E5E7EB', '#F3F4F6', '#FFFFFF',
];

export default function NoticeWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지');
  const [thumbnail, setThumbnail] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [showColorPicker, setShowColorPicker] = useState(null); // 'text' | 'bg' | null
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const categories = ['공지', '이벤트', '휴진', '안내'];

  const saveSelection = useRef(null);

  const captureSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      saveSelection.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (saveSelection.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(saveSelection.current);
    }
  };

  const exec = useCallback((command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  }, []);

  const handleBlockFormat = (tag) => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, tag);
  };

  const handleFontFamily = (value) => {
    editorRef.current?.focus();
    document.execCommand('fontName', false, value);
  };

  const handleFontSize = (size) => {
    // execCommand fontSize는 1-7 숫자만 받으므로 span으로 감싸는 방식 사용
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;
    const span = document.createElement('span');
    span.style.fontSize = size + 'px';
    range.surroundContents(span);
  };

  const handleTextColor = (color) => {
    setTextColor(color);
    setShowColorPicker(null);
    editorRef.current?.focus();
    if (saveSelection.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(saveSelection.current);
    }
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
  };

  const handleBgColor = (color) => {
    setBgColor(color);
    setShowColorPicker(null);
    editorRef.current?.focus();
    if (saveSelection.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(saveSelection.current);
    }
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('hiliteColor', false, color);
  };

  const handleLink = () => {
    const url = prompt('링크 URL을 입력하세요 (https:// 포함):');
    if (url) exec('createLink', url);
  };

  const handleInsertTable = () => {
    editorRef.current?.focus();
    let html = `<table style="border-collapse:collapse;width:100%;margin:12px 0;">`;
    for (let r = 0; r < tableRows; r++) {
      html += '<tr>';
      for (let c = 0; c < tableCols; c++) {
        const tag = r === 0 ? 'th' : 'td';
        const style = r === 0
          ? 'border:1px solid #cbd5e1;padding:8px 12px;background:#f1f5f9;font-weight:600;text-align:center;'
          : 'border:1px solid #cbd5e1;padding:8px 12px;text-align:center;';
        html += `<${tag} style="${style}">${r === 0 ? '제목' : '내용'}</${tag}>`;
      }
      html += '</tr>';
    }
    html += '</table><p><br></p>';
    document.execCommand('insertHTML', false, html);
    setShowTableModal(false);
  };

  const handleQuote = () => {
    editorRef.current?.focus();
    const html = `<blockquote style="border-left:4px solid #0284c7;margin:12px 0;padding:10px 16px;background:#f0f9ff;color:#0369a1;border-radius:0 8px 8px 0;"><p><br></p></blockquote><p><br></p>`;
    document.execCommand('insertHTML', false, html);
  };

  const handleHR = () => {
    editorRef.current?.focus();
    document.execCommand('insertHTML', false, '<hr style="border:none;border-top:2px solid #e5e7eb;margin:16px 0;"><p><br></p>');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const MAX_WIDTH = 1200;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        const optimized = canvas.toDataURL('image/webp', 0.8);
        if (!thumbnail) setThumbnail(optimized);
        editorRef.current?.focus();
        document.execCommand('insertHTML', false, `<img src="${optimized}" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;" /><p><br></p>`);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handlePublish = () => {
    if (!title.trim()) { alert('제목을 입력해주세요.'); return; }
    const content = editorRef.current?.innerHTML || '';
    const today = new Date();
    const date = `${today.getFullYear()}.${String(today.getMonth()+1).padStart(2,'0')}.${String(today.getDate()).padStart(2,'0')}`;
    const newNotice = {
      id: Date.now().toString(), category, title, date,
      author: '관리자', image: thumbnail,
      content: content === '<p><br></p>' ? '' : content
    };
    const block = PAGE_TEMPLATES['community/notice']?.find(b => b.type === 'CommunityNotice');
    if (block?.data?.notices) block.data.notices.unshift(newNotice);
    alert('게시글이 성공적으로 등록되었습니다.');
    navigate('/community/notice');
  };

  return (
    <div className="bg-gray-50 py-16" style={{ minHeight: '80vh' }}>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />

      {/* 클릭 바깥으로 나가면 컬러피커 닫기 */}
      {showColorPicker && (
        <div className="fixed inset-0 z-30" onClick={() => setShowColorPicker(null)} />
      )}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 shadow-xl w-80">
            <h3 className="text-lg font-bold mb-4 text-gray-800">표 삽입</h3>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm text-gray-500 mb-1 block">행 (세로)</label>
                <input type="number" min="1" max="20" value={tableRows} onChange={e => setTableRows(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30" />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-500 mb-1 block">열 (가로)</label>
                <input type="number" min="1" max="10" value={tableCols} onChange={e => setTableCols(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowTableModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50">취소</button>
              <button onClick={handleInsertTable} className="flex-1 py-2 bg-[#0284c7] text-white rounded-lg font-bold hover:bg-[#0369a1]">삽입</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">공지사항 글 작성</h2>
          <p className="text-gray-500">새로운 공지사항을 작성해 주세요.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
          style={{ height: 'calc(100vh - 280px)', minHeight: 700 }}
        >
          {/* ── TOOLBAR (fixed inside card) ── */}
          <div className="flex-shrink-0 bg-white border-b border-gray-100">
            {/* Row 1: Block elements */}
            <div className="flex items-center px-6 py-2 gap-1 border-b border-gray-50 overflow-x-auto">
              <ToolbarBtn icon={<ImageIcon size={20} strokeWidth={1.5} />} label="사진" onClick={() => fileInputRef.current.click()} />
              <ToolbarBtn icon={<Quote size={20} strokeWidth={1.5} />} label="인용구" onClick={handleQuote} />
              <ToolbarBtn icon={<Minus size={20} strokeWidth={1.5} />} label="구분선" onClick={handleHR} />
              <ToolbarBtn icon={<LinkIcon size={20} strokeWidth={1.5} />} label="링크" onClick={handleLink} />
              <ToolbarBtn icon={<Table2 size={20} strokeWidth={1.5} />} label="표" onClick={() => setShowTableModal(true)} />
            </div>

            {/* Row 2: Text formatting */}
            <div className="flex items-center px-4 py-1.5 gap-2 overflow-x-auto bg-gray-50/40 flex-wrap">
              {/* 단락 스타일 */}
              <select
                className="text-sm border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-[#0284c7]/20"
                defaultValue="p"
                onChange={e => handleBlockFormat(e.target.value)}
              >
                <option value="p">본문</option>
                <option value="h1">제목 1</option>
                <option value="h2">제목 2</option>
                <option value="h3">제목 3</option>
              </select>

              {/* 폰트 */}
              <select
                className="text-sm border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-[#0284c7]/20"
                defaultValue={FONT_FAMILIES[0].value}
                onChange={e => handleFontFamily(e.target.value)}
              >
                {FONT_FAMILIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>

              {/* 폰트 크기 */}
              <select
                className="text-sm border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-[#0284c7]/20"
                defaultValue="15"
                onChange={e => handleFontSize(e.target.value)}
              >
                {FONT_SIZES.map(s => <option key={s} value={s}>{s}px</option>)}
              </select>

              <div className="w-px h-5 bg-gray-200" />

              {/* Bold/Italic/Underline/Strike */}
              <FmtBtn label={<Bold size={15} />} onClick={() => exec('bold')} title="굵게 (Ctrl+B)" />
              <FmtBtn label={<Italic size={15} />} onClick={() => exec('italic')} title="기울임 (Ctrl+I)" />
              <FmtBtn label={<Underline size={15} />} onClick={() => exec('underline')} title="밑줄 (Ctrl+U)" />
              <FmtBtn label={<Strikethrough size={15} />} onClick={() => exec('strikeThrough')} title="취소선" />

              <div className="w-px h-5 bg-gray-200" />

              {/* Align */}
              <FmtBtn label={<AlignLeft size={15} />} onClick={() => exec('justifyLeft')} title="왼쪽 정렬" />
              <FmtBtn label={<AlignCenter size={15} />} onClick={() => exec('justifyCenter')} title="가운데 정렬" />
              <FmtBtn label={<AlignRight size={15} />} onClick={() => exec('justifyRight')} title="오른쪽 정렬" />
              <FmtBtn label={<List size={15} />} onClick={() => exec('insertUnorderedList')} title="목록" />

              <div className="w-px h-5 bg-gray-200" />

              {/* 글자 색 */}
              <div className="relative">
                <button
                  title="글자 색"
                  onMouseDown={e => { e.preventDefault(); captureSelection(); }}
                  onClick={() => setShowColorPicker(v => v === 'text' ? null : 'text')}
                  className="flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-extrabold" style={{ color: textColor === '#FFFFFF' ? '#374151' : textColor }}>A</span>
                  <div className="w-5 h-1.5 rounded-sm border border-gray-200" style={{ backgroundColor: textColor }} />
                </button>
                {showColorPicker === 'text' && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50 w-52">
                    <p className="text-xs font-bold text-gray-500 mb-2">글자 색</p>
                    <div className="grid grid-cols-6 gap-1.5 mb-2">
                      {TEXT_COLORS.map(c => (
                        <button key={c} onMouseDown={e => { e.preventDefault(); handleTextColor(c); }}
                          className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                          style={{ backgroundColor: c, borderColor: c === textColor ? '#0284c7' : '#e5e7eb' }}
                        />
                      ))}
                    </div>
                    <input type="color" value={textColor}
                      onChange={e => setTextColor(e.target.value)}
                      onBlur={e => handleTextColor(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer border border-gray-200" />
                  </div>
                )}
              </div>

              {/* 배경 색 */}
              <div className="relative">
                <button
                  title="배경 색"
                  onMouseDown={e => { e.preventDefault(); captureSelection(); }}
                  onClick={() => setShowColorPicker(v => v === 'bg' ? null : 'bg')}
                  className="flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <Palette size={15} className="text-gray-700" />
                  <div className="w-5 h-1.5 rounded-sm border border-gray-200" style={{ backgroundColor: bgColor }} />
                </button>
                {showColorPicker === 'bg' && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50 w-52">
                    <p className="text-xs font-bold text-gray-500 mb-2">배경 색</p>
                    <div className="grid grid-cols-5 gap-1.5 mb-2">
                      {BG_COLORS.map(c => (
                        <button key={c} onMouseDown={e => { e.preventDefault(); handleBgColor(c); }}
                          className="w-7 h-7 rounded border-2 transition-transform hover:scale-110"
                          style={{ backgroundColor: c, borderColor: c === bgColor ? '#0284c7' : '#e5e7eb' }}
                        />
                      ))}
                    </div>
                    <input type="color" value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      onBlur={e => handleBgColor(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer border border-gray-200" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── TITLE ── */}
          <div className="flex-shrink-0 px-10 pt-8 pb-5 border-b border-gray-100 flex gap-4 items-center bg-white">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7] outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="flex-1 text-3xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 outline-none"
            />
          </div>

          {/* ── EDITOR BODY (scrolls here only) ── */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            data-placeholder="본문을 입력하세요..."
            className="flex-1 overflow-y-auto px-10 py-8 text-gray-800 focus:outline-none outline-none"
            style={{ lineHeight: 1.8 }}
          >
            <p><br /></p>
          </div>

          {/* ── FOOTER ── */}
          <div className="flex-shrink-0 px-8 py-5 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button onClick={() => navigate('/community/notice')}
              className="px-6 py-2.5 rounded-lg font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
              취소
            </button>
            <button onClick={handlePublish}
              className="flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-sm">
              <Check size={18} strokeWidth={2.5} />
              발행
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #cbd5e1;
          pointer-events: none;
        }
        [contenteditable] img { max-width: 100%; border-radius: 8px; }
        [contenteditable] table { border-collapse: collapse; width: 100%; }
        [contenteditable] th, [contenteditable] td { border: 1px solid #cbd5e1; padding: 8px 12px; }
        [contenteditable] blockquote { border-left: 4px solid #0284c7; margin: 12px 0; padding: 10px 16px; background: #f0f9ff; color: #0369a1; border-radius: 0 8px 8px 0; }
        [contenteditable] h1 { font-size: 2em; font-weight: 800; margin: 0.5em 0; }
        [contenteditable] h2 { font-size: 1.5em; font-weight: 700; margin: 0.5em 0; }
        [contenteditable] h3 { font-size: 1.25em; font-weight: 600; margin: 0.5em 0; }
        [contenteditable] hr { border: none; border-top: 2px solid #e5e7eb; margin: 16px 0; }
        [contenteditable] a { color: #0284c7; text-decoration: underline; }
      `}</style>
    </div>
  );
}

function ToolbarBtn({ icon, label, onClick }) {
  return (
    <button onClick={onClick}
      className="flex flex-col items-center justify-center w-14 h-14 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors flex-shrink-0">
      <div className="mb-1 text-gray-700">{icon}</div>
      <span className="text-[10px] font-medium text-gray-500">{label}</span>
    </button>
  );
}

function FmtBtn({ label, onClick, title }) {
  return (
    <button onClick={onClick} title={title}
      className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors flex-shrink-0">
      {label}
    </button>
  );
}
