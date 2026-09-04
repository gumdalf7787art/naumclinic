import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Settings, Type, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, LayoutGrid, LayoutTemplate, Layers } from 'lucide-react';
import { BLOCK_DEFINITIONS } from './PageBlocks';

// Helpers to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function BlockEditor({ content, onChange }) {
  const [blocks, setBlocks] = useState(() => {
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [showBlockPicker, setShowBlockPicker] = useState(false);

  // Sync internal state if content prop changes from outside (e.g. Library insert or page switch)
  React.useEffect(() => {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && JSON.stringify(parsed) !== JSON.stringify(blocks)) {
        setBlocks(parsed);
      }
    } catch (e) {
      // ignore
    }
  }, [content]);

  const updateBlocks = (newBlocks) => {
    setBlocks(newBlocks);
    onChange(JSON.stringify(newBlocks));
  };

  const addBlock = (type) => {
    const def = BLOCK_DEFINITIONS.find(d => d.type === type);
    if (!def) return;
    
    const newBlock = {
      id: generateId(),
      type: def.type,
      data: JSON.parse(JSON.stringify(def.defaultData)) // Deep copy
    };
    
    updateBlocks([...blocks, newBlock]);
    setShowBlockPicker(false);
  };

  const updateBlockData = (id, newData) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, data: newData } : b);
    updateBlocks(newBlocks);
  };

  const removeBlock = (id) => {
    if (window.confirm('이 블록을 삭제하시겠습니까?')) {
      updateBlocks(blocks.filter(b => b.id !== id));
    }
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    updateBlocks(newBlocks);
  };

  return (
    <div className="space-y-4">
      {blocks.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400">
          <p className="text-[12px]">아직 추가된 블록이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <BlockEditorItem 
              key={block.id} 
              block={block} 
              index={index}
              total={blocks.length}
              onUpdate={updateBlockData}
              onRemove={() => removeBlock(block.id)}
              onMoveUp={() => moveBlock(index, 'up')}
              onMoveDown={() => moveBlock(index, 'down')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------
// Sub-component to render the specific editing form for a block type
// -----------------------------------------------------------------
function BlockEditorItem({ block, index, total, onUpdate, onRemove, onMoveUp, onMoveDown }) {
  const def = BLOCK_DEFINITIONS.find(d => d.type === block.type);
  const data = block.data;

  // Generic updater
  const handleChange = (field, value) => {
    onUpdate(block.id, { ...data, [field]: value });
  };

  const handleArrayChange = (field, arrIndex, arrField, value) => {
    const newArray = [...data[field]];
    newArray[arrIndex] = { ...newArray[arrIndex], [arrField]: value };
    handleChange(field, newArray);
  };

  const addArrayItem = (field, defaultItem) => {
    handleChange(field, [...(data[field] || []), defaultItem]);
  };

  const removeArrayItem = (field, arrIndex) => {
    const newArray = [...data[field]];
    newArray.splice(arrIndex, 1);
    handleChange(field, newArray);
  };

  // Rendering the specific form fields based on type
  const renderFormFields = () => {
    switch (block.type) {
      case 'HeadingText':
        return (
          <div className="space-y-4">
            <Input label="작은 라벨 (배지)" value={data.badge} onChange={(v) => handleChange('badge', v)} />
            <Input label="큰 제목" value={data.title} onChange={(v) => handleChange('title', v)} />
            <Textarea label="설명 텍스트" value={data.description} onChange={(v) => handleChange('description', v)} />
          </div>
        );
      case 'RichText':
        return (
          <div className="space-y-4">
             <Textarea label="HTML 코드 (자유양식)" value={data.html} onChange={(v) => handleChange('html', v)} rows={8} />
             <p className="text-[11px] text-gray-400">자유롭게 HTML 태그를 사용하여 작성하세요. (p, h1, strong 등)</p>
          </div>
        );
      case 'PastorGreeting':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="이름" value={data.name} onChange={(v) => handleChange('name', v)} />
              <Input label="직분 (예: 담임목사)" value={data.title} onChange={(v) => handleChange('title', v)} />
            </div>
            <Input label="사진 URL" value={data.image} onChange={(v) => handleChange('image', v)} />
            <div>
              <label className="block text-[12px] font-bold text-gray-500 mb-2">약력 (학력/경력)</label>
              {data.history.map((h, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" value={h} onChange={(e) => handleArrayChange('history', idx, null, e.target.value)} />
                  <button onClick={() => removeArrayItem('history', idx)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => handleChange('history', [...data.history, ''])} className="text-[12px] text-indigo-600 font-bold mt-1">+ 약력 추가</button>
            </div>
            <Textarea label="인사말 (상단)" value={data.greetingPart1} onChange={(v) => handleChange('greetingPart1', v)} rows={4} />
            <Textarea label="강조 인용구 (가운데)" value={data.quoteText} onChange={(v) => handleChange('quoteText', v)} rows={3} />
            <Textarea label="인사말 (하단)" value={data.greetingPart2} onChange={(v) => handleChange('greetingPart2', v)} rows={4} />
          </div>
        );
      case 'VisionHighlight':
        return (
          <div className="space-y-4">
            <Input label="강조할 큰 제목" value={data.title} onChange={(v) => handleChange('title', v)} />
            <div>
              <label className="block text-[12px] font-bold text-gray-500 mb-2">설명 단락들</label>
              {data.paragraphs.map((p, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" value={p} onChange={(e) => handleArrayChange('paragraphs', idx, null, e.target.value)} />
                  <button onClick={() => removeArrayItem('paragraphs', idx)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => handleChange('paragraphs', [...data.paragraphs, ''])} className="text-[12px] text-indigo-600 font-bold mt-1">+ 단락 추가</button>
            </div>
            <Input label="하단 형광펜 강조 문구" value={data.highlightText} onChange={(v) => handleChange('highlightText', v)} />
          </div>
        );
      case 'CoreValues':
        return (
          <div className="space-y-4">
            <Input label="섹션 제목 (생략가능)" value={data.title} onChange={(v) => handleChange('title', v)} />
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-bold text-[13px]">핵심 가치 아이템</div>
              <div className="p-4 space-y-4">
                {data.values.map((v, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm relative group">
                    <button onClick={() => removeArrayItem('values', idx)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Input label="숫자 (예: 01)" value={v.num} onChange={(val) => handleArrayChange('values', idx, 'num', val)} />
                      <Input label="아이콘 영문명 (BookOpen, Flame, Users, Heart, Globe)" value={v.icon} onChange={(val) => handleArrayChange('values', idx, 'icon', val)} />
                    </div>
                    <div className="space-y-3">
                      <Input label="가치 제목" value={v.title} onChange={(val) => handleArrayChange('values', idx, 'title', val)} />
                      <Textarea label="설명" value={v.desc} onChange={(val) => handleArrayChange('values', idx, 'desc', val)} rows={2} />
                    </div>
                  </div>
                ))}
                <button onClick={() => addArrayItem('values', { num:'00', title:'새 가치', desc:'설명', icon:'Heart' })} className="w-full py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-100">+ 아이템 추가</button>
              </div>
            </div>
          </div>
        );
      case 'StaffGrid':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Input label="섹션 제목 (예: 담임 목회자)" value={data.title} onChange={(v) => handleChange('title', v)} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">제목 정렬</label>
                <div className="flex gap-1 border border-gray-200 p-1 rounded-xl bg-white">
                  <button onClick={() => handleChange('align', 'left')} className={`p-1.5 rounded-lg ${data.align === 'left' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50'}`}><AlignLeft size={16} /></button>
                  <button onClick={() => handleChange('align', 'center')} className={`p-1.5 rounded-lg ${!data.align || data.align === 'center' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50'}`}><AlignCenter size={16} /></button>
                  <button onClick={() => handleChange('align', 'right')} className={`p-1.5 rounded-lg ${data.align === 'right' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50'}`}><AlignRight size={16} /></button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.staff.map((person, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl relative group">
                  <button onClick={() => removeArrayItem('staff', idx)} className="absolute top-2 right-2 p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-md shadow-sm"><Trash2 size={14}/></button>
                  <div className="space-y-3 pt-2">
                    <Input label="이름" value={person.name} onChange={(val) => handleArrayChange('staff', idx, 'name', val)} />
                    <Input label="직책" value={person.role} onChange={(val) => handleArrayChange('staff', idx, 'role', val)} />
                    <Input label="부서 (선택)" value={person.department} onChange={(val) => handleArrayChange('staff', idx, 'department', val)} />
                    <Input label="사진 URL (선택)" value={person.image} onChange={(val) => handleArrayChange('staff', idx, 'image', val)} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => addArrayItem('staff', { name:'이름', role:'직책', department:'', image:'' })} className="w-full py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-100">+ 사람 추가</button>
          </div>
        );
      case 'WorshipSchedule':
        return (
          <div className="space-y-4">
            <Input label="표 제목" value={data.title} onChange={(v) => handleChange('title', v)} />
            <div className="space-y-3">
              {data.schedules.map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-xl relative">
                   <button onClick={() => removeArrayItem('schedules', idx)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                   <div className="grid grid-cols-3 gap-3 mb-3 pr-8">
                     <Input label="예배명" value={item.name} onChange={(val) => handleArrayChange('schedules', idx, 'name', val)} />
                     <Input label="시간" value={item.time} onChange={(val) => handleArrayChange('schedules', idx, 'time', val)} />
                     <Input label="장소" value={item.location} onChange={(val) => handleArrayChange('schedules', idx, 'location', val)} />
                   </div>
                   <Input label="안내/비고" value={item.description} onChange={(val) => handleArrayChange('schedules', idx, 'description', val)} />
                </div>
              ))}
              <button onClick={() => addArrayItem('schedules', { name:'', time:'', location:'', description:'' })} className="w-full py-2 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-100">+ 일정 추가</button>
            </div>
          </div>
        );
      case 'BulletinBoard':
        return (
          <div className="space-y-4">
            <Input label="섹션 제목" value={data.title} onChange={(v) => handleChange('title', v)} />
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-500 text-center">
              주보 등록 및 삭제는 실제 페이지 화면에 있는 '새 주보 등록' 및 삭제 버튼을 이용해주세요.
            </div>
          </div>
        );
      case 'ImageWithText':
        return (
          <div className="space-y-4">
            <Input label="제목" value={data.title} onChange={(v) => handleChange('title', v)} />
            <Textarea label="설명" value={data.description} onChange={(v) => handleChange('description', v)} rows={4} />
            <Input label="사진 URL" value={data.image} onChange={(v) => handleChange('image', v)} />
          </div>
        );
      default:
        return <div className="p-4 text-red-500 text-sm">지원하지 않는 블록 타입입니다.</div>;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-4 transition-all hover:border-indigo-300">
      <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md mr-3">
            {def?.icon || <LayoutTemplate size={14} />}
          </span>
          <span className="font-bold text-[14px] text-gray-800">{def?.label || block.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onMoveUp} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-gray-800 disabled:opacity-30 rounded-md hover:bg-gray-200"><ArrowUp size={14} /></button>
          <button onClick={onMoveDown} disabled={index === total - 1} className="p-1.5 text-gray-400 hover:text-gray-800 disabled:opacity-30 rounded-md hover:bg-gray-200"><ArrowDown size={14} /></button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button onClick={onRemove} className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"><Trash2 size={14} /></button>
        </div>
      </div>
      <div className="p-5">
        {renderFormFields()}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Generic UI Components for the forms
// -----------------------------------------------------------------
function Input({ label, value, onChange }) {
  // Array handler hack (if p is just string in array)
  if (typeof value === 'object') return null; 
  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-500 mb-1.5">{label}</label>
      <input 
        type="text" 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[13px] focus:border-indigo-500 outline-none transition-colors"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-500 mb-1.5">{label}</label>
      <textarea 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)} 
        rows={rows}
        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[13px] focus:border-indigo-500 outline-none transition-colors resize-y leading-relaxed"
      />
    </div>
  );
}
