import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Quote, 
  Minus, 
  Table, 
  MapPin, 
  Smile, 
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Type,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function NoticeWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지');
  const editorRef = useRef(null);

  const categories = ['공지', '이벤트', '휴진', '안내'];

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handlePublish = () => {
    alert('게시글이 성공적으로 등록되었습니다.');
    navigate('/community/notice');
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] py-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">공지사항 글 작성</h2>
          <p className="text-gray-500">새로운 공지사항을 작성해 주세요.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[700px] flex flex-col"
        >
          {/* Editor Header (Toolbar) */}
          <div className="bg-white border-b border-gray-100 relative z-30">
            {/* Top Toolbar - Block Elements */}
            <div className="flex items-center px-6 py-3 gap-1 overflow-x-auto border-b border-gray-50 scrollbar-hide">
              <ToolbarButton icon={<ImageIcon size={22} strokeWidth={1.5} />} label="사진" />
              <ToolbarButton icon={<Smile size={22} strokeWidth={1.5} />} label="스티커" />
              <ToolbarButton icon={<Quote size={22} strokeWidth={1.5} />} label="인용구" onClick={() => handleFormat('formatBlock', 'blockquote')} />
              <ToolbarButton icon={<Minus size={22} strokeWidth={1.5} />} label="구분선" onClick={() => handleFormat('insertHorizontalRule')} />
              <ToolbarButton icon={<LinkIcon size={22} strokeWidth={1.5} />} label="링크" onClick={() => {
                const url = prompt('링크 URL을 입력하세요:');
                if (url) handleFormat('createLink', url);
              }} />
              <ToolbarButton icon={<Table size={22} strokeWidth={1.5} />} label="표" />
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              <ToolbarButton icon={<MapPin size={22} strokeWidth={1.5} />} label="장소" />
            </div>
            
            {/* Bottom Toolbar - Inline Formats */}
            <div className="flex items-center px-6 py-2.5 gap-3 overflow-x-auto text-gray-600 bg-gray-50/50">
              <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
                <select className="text-sm border-none bg-transparent focus:ring-0 text-gray-700 cursor-pointer outline-none font-medium">
                  <option>본문</option>
                  <option>제목 1</option>
                  <option>제목 2</option>
                  <option>제목 3</option>
                </select>
                <select className="text-sm border-none bg-transparent focus:ring-0 text-gray-700 cursor-pointer outline-none font-medium">
                  <option>나눔고딕</option>
                  <option>프리텐다드</option>
                  <option>맑은 고딕</option>
                </select>
                <select className="text-sm border-none bg-transparent focus:ring-0 text-gray-700 cursor-pointer outline-none font-medium">
                  <option>15</option>
                  <option>16</option>
                  <option>19</option>
                  <option>24</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <FormatButton icon={<Bold size={16} />} onClick={() => handleFormat('bold')} />
                <FormatButton icon={<Italic size={16} />} onClick={() => handleFormat('italic')} />
                <FormatButton icon={<Underline size={16} />} onClick={() => handleFormat('underline')} />
                <FormatButton icon={<Strikethrough size={16} />} onClick={() => handleFormat('strikeThrough')} />
              </div>

              <div className="w-px h-4 bg-gray-200 mx-1"></div>

              <div className="flex items-center gap-1">
                <FormatButton icon={<AlignLeft size={16} />} onClick={() => handleFormat('justifyLeft')} />
                <FormatButton icon={<AlignCenter size={16} />} onClick={() => handleFormat('justifyCenter')} />
                <FormatButton icon={<AlignRight size={16} />} onClick={() => handleFormat('justifyRight')} />
                <FormatButton icon={<List size={16} />} onClick={() => handleFormat('insertUnorderedList')} />
              </div>
              
              <div className="w-px h-4 bg-gray-200 mx-1"></div>
              
              <div className="flex items-center gap-1">
                <FormatButton icon={<Type size={16} />} onClick={() => handleFormat('foreColor', '#0284c7')} />
              </div>
            </div>
          </div>

          {/* Title Area */}
          <div className="px-10 pt-10 pb-6 border-b border-gray-100 flex gap-4 flex-col sm:flex-row sm:items-center bg-white">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7] outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 text-3xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 outline-none w-full"
            />
          </div>

          {/* Content Area */}
          <div 
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="flex-1 px-10 py-10 prose prose-blue max-w-none focus:outline-none outline-none min-h-[400px] bg-white text-gray-800"
            placeholder="본문을 입력하세요..."
            onFocus={(e) => {
              if (e.target.innerHTML === '') e.target.innerHTML = '<p><br></p>';
            }}
          >
            <p><br/></p>
          </div>
          
          {/* Footer Area */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 z-10 relative">
            <button 
              onClick={() => navigate('/community/notice')}
              className="px-6 py-2.5 rounded-lg font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            >
              취소
            </button>
            <button 
              onClick={handlePublish}
              className="flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-sm"
            >
              <Check size={18} strokeWidth={2.5} />
              발행
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx="true">{`
        [contenteditable]:empty:before {
          content: attr(placeholder);
          color: #cbd5e1;
          pointer-events: none;
          display: block; /* For Firefox */
        }
      `}</style>
    </div>
  );
}

// Subcomponents for Toolbar
function ToolbarButton({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
    >
      <div className="mb-1.5 text-gray-700">{icon}</div>
      <span className="text-[11px] font-medium tracking-tight text-gray-500">{label}</span>
    </button>
  );
}

function FormatButton({ icon, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors"
    >
      {icon}
    </button>
  );
}
