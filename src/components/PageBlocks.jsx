import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Flame, Users, Heart, Globe, Image as ImageIcon, Plus, Trash2, Search, Shield, Activity, ChevronLeft, ChevronRight, MapPin, Phone, Clock, Bus, Train, Car, Star, Crosshair, List } from 'lucide-react';

// -------------------------------------------------------------
// ICON MAP
// -------------------------------------------------------------
export const IconMap = {
  BookOpen: <BookOpen className="w-8 h-8" />,
  Flame: <Flame className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  ImageIcon: <ImageIcon className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Activity: <Activity className="w-8 h-8" />,
  'map-pin': MapPin,
  'phone': Phone,
  'clock': Clock,
  'bus': Bus,
  'train': Train,
  'car': Car
};

// -------------------------------------------------------------
// INLINE EDITING COMPONENTS
// -------------------------------------------------------------
export const EditableText = ({ tag: Tag = 'div', value, onChange, className, isEditMode, placeholder, multiline, ...props }) => {
  if (!isEditMode) {
    // Render as HTML to support rich text (bold, color, etc.)
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: value }} {...props} />;
  }

  const handleBlur = (e) => {
    if (onChange && e.target.innerHTML !== value) {
      onChange(e.target.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} outline-none ring-2 ring-transparent focus:ring-[#8DC63F]/50 hover:bg-black/5 rounded transition-colors empty:before:content-[attr(placeholder)] empty:before:text-gray-400 cursor-text min-h-[1em]`}
      placeholder={placeholder}
      dangerouslySetInnerHTML={{ __html: value }}
      {...props}
    />
  );
};

export const EditableImage = ({ src, onChange, className, isEditMode, placeholder, imageClassName }) => {
  if (!isEditMode) {
    return src ? <img src={src} className={imageClassName} alt="" /> : (placeholder || null);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      const extension = file.name.split('.').pop() || 'webp';
      try {
        const res = await fetch('/api/cms/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data, extension })
        });
        const data = await res.json();
        if (data.success) {
          onChange(data.url);
        } else {
          alert('업로드 실패: ' + data.error);
        }
      } catch (err) {
        alert('업로드 오류 발생');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`relative group ${className}`}>
      {src ? (
        <img src={src} className={imageClassName} alt="" />
      ) : (
        placeholder || <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm">이미지 추가</div>
      )}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-[inherit]">
        <label className="text-white text-[12px] font-bold bg-black/50 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-black/70 flex items-center">
          <ImageIcon size={14} className="mr-1" /> 사진 변경
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 1. HeadingText Block
// -------------------------------------------------------------
export function HeadingTextBlock({ data, isEditMode, onChange }) {
  return (
    <section className="text-center py-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {(data.badge || isEditMode) && (
          <EditableText
            tag="span"
            value={data.badge || ''}
            onChange={(val) => onChange({ badge: val })}
            isEditMode={isEditMode}
            placeholder="배지 입력 (예: OUR VISION)"
            className="text-[#8DC63F] font-bold tracking-widest text-[12px] md:text-sm mb-3 md:mb-4 block"
          />
        )}
        <EditableText
          tag="h2"
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="큰 제목을 입력하세요"
          className="text-[28px] md:text-4xl font-extrabold text-black mb-8 tracking-tight"
        />
        {(data.description || isEditMode) && (
          <EditableText
            tag="p"
            multiline={true}
            value={data.description || ''}
            onChange={(val) => onChange({ description: val })}
            isEditMode={isEditMode}
            placeholder="상세 설명을 입력하세요"
            className="text-[16px] text-gray-600 max-w-2xl mx-auto whitespace-pre-wrap leading-relaxed"
          />
        )}
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// 2. VisionHighlight Block
// -------------------------------------------------------------
export function VisionHighlightBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#f8f9fa] border-l-[4px] md:border-l-[6px] border-[#cc0000] p-6 md:p-14 rounded-r-2xl md:rounded-r-3xl shadow-sm text-left md:text-center relative"
      >
        <EditableText
          tag="h3"
          multiline={true}
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="핵심 비전 문장을 입력하세요"
          className="text-[20px] md:text-[32px] font-bold text-gray-900 mb-6 md:mb-8 leading-[1.5] tracking-tight whitespace-pre-wrap"
        />
        <div className="text-[15px] md:text-lg text-gray-700 leading-relaxed md:leading-loose break-keep max-w-4xl mx-auto space-y-4 md:space-y-5">
          {isEditMode ? (
            <EditableText
              tag="div"
              multiline={true}
              value={(data.paragraphs || []).join('\n')}
              onChange={(val) => onChange({ paragraphs: val.split('\n') })}
              isEditMode={true}
              placeholder="설명 단락을 입력하세요"
            />
          ) : (
            data.paragraphs?.map((p, idx) => <p key={idx}>{p}</p>)
          )}
          {(data.highlightText || isEditMode) && (
            <p className="font-semibold text-black mt-6 md:mt-8 text-[16px] md:text-[19px]">
              <strong className="text-[#cc0000] font-extrabold">
                <EditableText
                  tag="span"
                  value={data.highlightText || ''}
                  onChange={(val) => onChange({ highlightText: val })}
                  isEditMode={isEditMode}
                  placeholder="강조할 텍스트 입력"
                />
              </strong>
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// 3. CoreValues Block
// -------------------------------------------------------------
export function CoreValuesBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-8">
      {(data.title || isEditMode) && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="핵심 가치 제목"
            className="text-[26px] md:text-4xl font-extrabold text-black tracking-tight"
          />
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.values?.map((value, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_10px_30px_rgba(204,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <div className="text-[#cc0000] bg-[#cc0000]/10 p-3 md:p-4 rounded-xl group-hover:scale-110 group-hover:bg-[#cc0000] group-hover:text-white transition-all duration-300">
                {IconMap[value.icon] || IconMap.BookOpen}
              </div>
              <EditableText
                tag="span"
                value={value.num || ''}
                onChange={(val) => {
                  const newVals = [...data.values];
                  newVals[idx] = { ...value, num: val };
                  onChange({ values: newVals });
                }}
                isEditMode={isEditMode}
                placeholder="01"
                className="text-3xl md:text-4xl font-black text-gray-100 group-hover:text-[#cc0000]/20 transition-colors duration-300"
              />
            </div>
            <EditableText
              tag="h3"
              value={value.title || ''}
              onChange={(val) => {
                const newVals = [...data.values];
                newVals[idx] = { ...value, title: val };
                onChange({ values: newVals });
              }}
              isEditMode={isEditMode}
              placeholder="가치 제목"
              className="text-[18px] md:text-xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight"
            />
            <EditableText
              tag="p"
              multiline={true}
              value={value.desc || ''}
              onChange={(val) => {
                const newVals = [...data.values];
                newVals[idx] = { ...value, desc: val };
                onChange({ values: newVals });
              }}
              isEditMode={isEditMode}
              placeholder="가치 설명을 입력하세요"
              className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed break-keep"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// 4. StaffGrid Block
// -------------------------------------------------------------
export function StaffGridBlock({ data, isEditMode, onChange }) {
  const align = data.align || 'center';
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  const lineClass = align === 'left' ? 'ml-0' : align === 'right' ? 'ml-auto mr-0' : 'mx-auto';

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-12 ${alignClass} relative group`}>
          {(data.title || isEditMode) && (
            <>
              <EditableText
                tag="h3"
                value={data.title || ''}
                onChange={(val) => onChange({ title: val })}
                isEditMode={isEditMode}
                placeholder="직분 타이틀 (예: 목회자, 장로)"
                className="text-3xl font-bold text-gray-900 inline-block relative pb-4"
              />
              <div className={`w-12 h-1 bg-[#cc0000] mt-4 rounded-full ${lineClass}`}></div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {data.staff?.map((person, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative hover:-translate-y-1">
              <div className="w-full aspect-[3/4] bg-gray-50 relative overflow-hidden border-b border-gray-100">
                <EditableImage
                  src={person.image}
                  onChange={(url) => {
                    const newStaff = [...data.staff];
                    newStaff[idx] = { ...person, image: url };
                    onChange({ staff: newStaff });
                  }}
                  isEditMode={isEditMode}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder={
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                      <ImageIcon size={40} className="opacity-30" />
                    </div>
                  }
                />
              </div>
              
              <div className="px-4 py-4 w-full">
                <EditableText
                  tag="div"
                  value={person.role || ''}
                  onChange={(val) => {
                    const newStaff = [...data.staff];
                    newStaff[idx] = { ...person, role: val };
                    onChange({ staff: newStaff });
                  }}
                  isEditMode={isEditMode}
                  placeholder="직책 (예: 부목사)"
                  className="text-[13px] text-[#cc0000] font-bold tracking-wider uppercase mb-1"
                />
                <EditableText
                  tag="div"
                  value={person.name || ''}
                  onChange={(val) => {
                    const newStaff = [...data.staff];
                    newStaff[idx] = { ...person, name: val };
                    onChange({ staff: newStaff });
                  }}
                  isEditMode={isEditMode}
                  placeholder="이름"
                  className="text-[19px] font-bold text-gray-900 mb-0.5"
                />
                {(person.department || isEditMode) && (
                  <EditableText
                    tag="div"
                    value={person.department || ''}
                    onChange={(val) => {
                      const newStaff = [...data.staff];
                      newStaff[idx] = { ...person, department: val };
                      onChange({ staff: newStaff });
                    }}
                    isEditMode={isEditMode}
                    placeholder="사역 부서 (선택)"
                    className="text-[13px] text-gray-500 font-medium mt-0.5"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// 5. WorshipSchedule Block
// -------------------------------------------------------------
export function WorshipScheduleBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-8">
      {(data.title || isEditMode) && (
        <EditableText
          tag="h3"
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="예배 시간표 제목"
          className="text-[22px] font-bold text-[#cc0000] mb-4 block"
        />
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-t-2 border-[#cc0000] border-b border-gray-300 border-collapse text-center text-[14px] min-w-[600px]">
          <thead>
            <tr>
              <th className="w-[15%] py-3.5 bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">예배</th>
              <th className="w-[15%] py-3.5 bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">시간</th>
              <th className="w-[25%] py-3.5 bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">장소</th>
              <th className="w-[45%] py-3.5 bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">안내</th>
              {isEditMode && <th className="w-[10%] py-3.5 bg-gray-50 border-b border-gray-200 text-gray-400 font-bold">관리</th>}
            </tr>
          </thead>
          <tbody>
            {data.schedules?.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 border-b border-gray-200 text-[#111] font-medium">
                  <EditableText
                    value={item.name || ''}
                    onChange={(val) => {
                      const newSchedules = [...data.schedules];
                      newSchedules[idx] = { ...item, name: val };
                      onChange({ schedules: newSchedules });
                    }}
                    isEditMode={isEditMode}
                    placeholder="예배명"
                  />
                </td>
                <td className="py-3 border-b border-gray-200 text-gray-800">
                  <EditableText
                    value={item.time || ''}
                    onChange={(val) => {
                      const newSchedules = [...data.schedules];
                      newSchedules[idx] = { ...item, time: val };
                      onChange({ schedules: newSchedules });
                    }}
                    isEditMode={isEditMode}
                    placeholder="시간"
                  />
                </td>
                <td className="py-3 border-b border-gray-200 text-gray-500 whitespace-pre-wrap">
                  <EditableText
                    value={item.location || ''}
                    onChange={(val) => {
                      const newSchedules = [...data.schedules];
                      newSchedules[idx] = { ...item, location: val };
                      onChange({ schedules: newSchedules });
                    }}
                    isEditMode={isEditMode}
                    placeholder="장소"
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-left leading-relaxed">
                  <EditableText
                    multiline={true}
                    value={item.description || ''}
                    onChange={(val) => {
                      const newSchedules = [...data.schedules];
                      newSchedules[idx] = { ...item, description: val };
                      onChange({ schedules: newSchedules });
                    }}
                    isEditMode={isEditMode}
                    placeholder="안내 내용"
                  />
                </td>
                {isEditMode && (
                  <td className="py-3 border-b border-gray-200 text-center align-middle">
                    <button 
                      onClick={() => {
                        const newSchedules = data.schedules.filter((_, i) => i !== idx);
                        onChange({ schedules: newSchedules });
                      }}
                      className="text-red-400 hover:text-red-600 p-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                      title="행 삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isEditMode && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => {
              const newSchedules = [...(data.schedules || []), { name: '', time: '', location: '', description: '' }];
              onChange({ schedules: newSchedules });
            }}
            className="flex items-center text-[13px] text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-lg font-bold transition-colors"
          >
            <Plus size={16} className="mr-1" />
            예배 일정 추가
          </button>
        </div>
      )}
    </section>
  );
}

// -------------------------------------------------------------
// 6. ImageWithTextBlock
// -------------------------------------------------------------
export function ImageWithTextBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="w-full md:w-2/5 min-h-[250px] md:min-h-auto relative bg-gray-100">
          <EditableImage
            src={data.image}
            onChange={(url) => onChange({ image: url })}
            isEditMode={isEditMode}
            className="absolute inset-0 w-full h-full"
            imageClassName="w-full h-full object-cover absolute inset-0"
            placeholder={<div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">사진 추가</div>}
          />
        </div>
        <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
          <EditableText
            tag="h4"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="제목을 입력하세요"
            className="text-[#cc0000] font-bold text-[20px] mb-4"
          />
          <EditableText
            tag="p"
            multiline={true}
            value={data.description || ''}
            onChange={(val) => onChange({ description: val })}
            isEditMode={isEditMode}
            placeholder="상세 설명을 입력하세요"
            className="leading-[1.8] text-gray-600 whitespace-pre-wrap"
          />
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// 7. RichTextBlock (Fallback for generic HTML or simple text)
// -------------------------------------------------------------
export function RichTextBlock({ data, isEditMode }) {
  return (
    <section className="py-8 relative group">
      {isEditMode && (
        <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          자유양식은 우측 편집창에서 HTML로 수정하세요.
        </div>
      )}
      <div 
        className={`prose max-w-none prose-lg prose-headings:font-bold prose-a:text-[#8DC63F] ${isEditMode ? 'pointer-events-none' : ''}`}
        dangerouslySetInnerHTML={{ __html: data.html }} 
      />
    </section>
  );
}

// -------------------------------------------------------------
// 8. PastorGreeting Block
// -------------------------------------------------------------
export function PastorGreetingBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-gray-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Profile Section */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-[#cc0000] rounded-tl-[40px] rounded-br-[40px] translate-x-3 translate-y-3 opacity-10"></div>
              <div className="rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-2xl relative bg-white border border-gray-100">
                <EditableImage
                  src={data.image}
                  onChange={(url) => onChange({ image: url })}
                  isEditMode={isEditMode}
                  className="w-full aspect-[3/4]"
                  imageClassName="w-full h-full object-cover"
                  placeholder={
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                      <ImageIcon size={48} className="mb-2 opacity-50" />
                      <span className="text-sm font-medium">사진을 등록하세요</span>
                    </div>
                  }
                />
              </div>
            </div>
            
            <div className="px-2">
              <div className="flex items-baseline gap-2 mb-4 border-b border-gray-100 pb-4">
                <EditableText tag="h3" value={data.name || ''} onChange={(val) => onChange({ name: val })} isEditMode={isEditMode} placeholder="이름" className="text-3xl font-bold text-gray-900" />
                <EditableText tag="span" value={data.title || ''} onChange={(val) => onChange({ title: val })} isEditMode={isEditMode} placeholder="직책" className="text-lg font-medium text-[#cc0000]" />
              </div>
              <div className="space-y-3">
                <EditableText
                  tag="div"
                  multiline={true}
                  value={Array.isArray(data.history) ? data.history.join('<br>') : (data.history || '')}
                  onChange={(val) => onChange({ history: [val] })}
                  isEditMode={isEditMode}
                  placeholder="약력을 입력하세요 (엔터로 줄바꿈)"
                  className="text-[15px] text-gray-600 leading-[1.9]"
                />
              </div>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="flex-1 lg:pt-8 w-full">
            {(data.greetingPart1 || isEditMode) && (
              <EditableText
                tag="div"
                multiline={true}
                value={data.greetingPart1 || ''}
                onChange={(val) => onChange({ greetingPart1: val })}
                isEditMode={isEditMode}
                placeholder="인사말 1부를 입력하세요"
                className="text-[17px] md:text-[18px] leading-[2.2] text-gray-700 break-keep font-light"
              />
            )}
            
            {(data.quoteText || isEditMode) && (
              <div className="relative my-12 py-8 px-8 md:px-10 bg-[#f8f9fa] rounded-2xl border border-gray-100">
                <div className="absolute top-1/2 left-0 w-[4px] h-12 bg-[#cc0000] -translate-y-1/2 rounded-r-full"></div>
                <EditableText
                  tag="div"
                  multiline={true}
                  value={data.quoteText || ''}
                  onChange={(val) => onChange({ quoteText: val })}
                  isEditMode={isEditMode}
                  placeholder="인용구를 입력하세요"
                  className="font-bold text-[19px] md:text-[22px] text-gray-900 leading-[1.7] break-keep text-center"
                />
              </div>
            )}

            {(data.greetingPart2 || isEditMode) && (
              <EditableText
                tag="div"
                multiline={true}
                value={data.greetingPart2 || ''}
                onChange={(val) => onChange({ greetingPart2: val })}
                isEditMode={isEditMode}
                placeholder="인사말 2부를 입력하세요"
                className="text-[17px] md:text-[18px] leading-[2.2] text-gray-700 break-keep font-light mt-4"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// 9. VisionHero Block
// -------------------------------------------------------------
export function VisionHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-20 md:py-32 bg-white text-center relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#8DC63F]/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        <EditableText
          tag="h2"
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="큰 비전 제목"
          className="text-[#8DC63F] font-bold tracking-widest text-sm md:text-base mb-6 md:mb-8 uppercase"
        />
        <EditableText
          tag="h3"
          multiline={true}
          value={data.slogan || ''}
          onChange={(val) => onChange({ slogan: val })}
          isEditMode={isEditMode}
          placeholder="비전 슬로건을 입력하세요"
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-16 leading-[1.3] tracking-tight break-keep"
        />
        
        {/* Modern Box Design (Matching user image) */}
        <div className="bg-[#f8f9fa] border-l-[4px] border-[#cc0000] rounded-r-2xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
          <div className="text-[16px] md:text-[18px] text-gray-700 leading-[2.2] space-y-6 md:space-y-8 break-keep text-center font-medium">
            <EditableText
              tag="div"
              multiline={true}
              value={
                Array.isArray(data.paragraphs) 
                  ? data.paragraphs.join('<br><br>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#cc0000] font-bold">$1</strong>')
                  : (data.paragraphs || '')
              }
              onChange={(val) => onChange({ paragraphs: [val] })}
              isEditMode={isEditMode}
              placeholder="단락을 두 번 엔터로 구분하여 입력하세요"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// 10. VisionGoals Block
// -------------------------------------------------------------
export function VisionGoalsBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-20 md:py-32 bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="w-16 h-1 bg-[#8DC63F] mx-auto mb-8 rounded-full"></div>
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="목표 섹션 제목"
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          />
        </motion.div>
        
        {/* Sleek, Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {data.goals?.map((goal, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative bg-white p-10 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_-15px_rgba(141,198,63,0.15)] transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Large, subtle background number */}
              <div className="absolute top-4 right-6 text-[80px] font-black text-gray-50 group-hover:text-[#8DC63F]/10 transition-colors duration-500 select-none pointer-events-none">
                0{idx + 1}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Accent dot */}
                <div className="w-3 h-3 rounded-full bg-[#8DC63F] mb-8 group-hover:scale-150 transition-transform duration-500"></div>
                
                <EditableText
                  tag="h3"
                  value={goal.title || ''}
                  onChange={(val) => {
                    const newGoals = [...data.goals];
                    newGoals[idx] = { ...goal, title: val };
                    onChange({ goals: newGoals });
                  }}
                  isEditMode={isEditMode}
                  placeholder="목표 제목"
                  className="text-[22px] md:text-[24px] font-bold text-gray-900 mb-4 tracking-tight"
                />
                <EditableText
                  tag="p"
                  multiline={true}
                  value={goal.desc || ''}
                  onChange={(val) => {
                    const newGoals = [...data.goals];
                    newGoals[idx] = { ...goal, desc: val };
                    onChange({ goals: newGoals });
                  }}
                  isEditMode={isEditMode}
                  placeholder="목표 상세 설명"
                  className="text-gray-500 leading-[1.8] text-[16px] break-keep"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// 11. VisionOutro Block
// -------------------------------------------------------------
export function VisionOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-20 md:py-32 bg-gray-900 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto px-6 relative z-10"
      >
        <EditableText
          tag="h2"
          value={data.slogan || ''}
          onChange={(val) => onChange({ slogan: val })}
          isEditMode={isEditMode}
          placeholder="영문 슬로건 (예: ONE WAY JESUS)"
          className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200 tracking-widest mb-6"
        />
        <EditableText
          tag="h3"
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="한글 슬로건"
          className="text-xl md:text-3xl font-bold text-[#8DC63F] mb-10 tracking-tight"
        />
        <div className="text-[16px] md:text-[19px] text-gray-300 leading-[1.8] space-y-6 break-keep font-light">
          {isEditMode ? (
            <EditableText
              tag="div"
              multiline={true}
              value={(data.paragraphs || []).join('\n\n')}
              onChange={(val) => onChange({ paragraphs: val.split('\n\n') })}
              isEditMode={true}
              placeholder="단락을 두 번 엔터로 구분하여 입력하세요"
            />
          ) : (
            data.paragraphs?.map((p, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
            ))
          )}
        </div>
        
        <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-gray-800">
          <EditableText
            tag="div"
            value={data.logoText || ''}
            onChange={(val) => onChange({ logoText: val })}
            isEditMode={isEditMode}
            placeholder="교회 로고 텍스트"
            className="text-lg md:text-xl font-bold tracking-widest text-gray-400"
          />
        </div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------

// -------------------------------------------------------------
// JointHero Block (Glassmorphism & Cinematic)
// -------------------------------------------------------------
export function JointHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-[#0a0f16] overflow-hidden selection:bg-white/20">
      <div className="absolute inset-0 z-0">
        <img 
          src={data.bgImage || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600"} 
          alt="배경" 
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-[#0a0f16]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16] via-transparent to-[#0a0f16]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          
          <EditableText
            tag="h1"
            value={data.mainCopy || ''}
            onChange={(val) => onChange({ mainCopy: val })}
            isEditMode={isEditMode}
            placeholder="움직임의 자유를 되찾다."
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.2]"
          />
          <div className="w-20 h-[2px] bg-[#8DC63F] mx-auto opacity-70"></div>
          <EditableText
            tag="p"
            multiline={true}
            value={data.subCopy || ''}
            onChange={(val) => onChange({ subCopy: val })}
            isEditMode={isEditMode}
            placeholder="서브 카피"
            className="text-lg md:text-xl text-gray-300 font-light leading-[1.7] break-keep max-w-2xl mx-auto"
          />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse"></div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// JointSymptoms Block (Horizontal Scroll)
// -------------------------------------------------------------
export function JointSymptomsBlock({ data, isEditMode, onChange }) {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#f2f4f7]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-32 pb-10">
        
        <div className="max-w-[1200px] w-full mx-auto px-6 mb-6 md:mb-8 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <EditableText
              tag="h2"
              value={data.title || ''}
              onChange={(val) => onChange({ title: val })}
              isEditMode={isEditMode}
              placeholder="관절이 보내는 경고"
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            />
            <div className="text-gray-500 mt-4 text-lg">가로로 스와이프하여 증상을 확인하세요.</div>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-6 md:px-[max(24px,calc((100vw-1200px)/2))] w-max items-center h-full max-h-[350px]">
          {data.symptoms?.map((item, idx) => (
            <div 
              key={idx} 
              className="w-[280px] md:w-[350px] h-full bg-white rounded-[2rem] p-8 shadow-[0_20px_40px_rgb(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="text-6xl font-light text-[#0369A1]/20 mb-6">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <EditableText
                  tag="h3"
                  value={item.title || ''}
                  onChange={(val) => {
                    const newVals = [...data.symptoms];
                    newVals[idx] = { ...item, title: val };
                    onChange({ symptoms: newVals });
                  }}
                  isEditMode={isEditMode}
                  placeholder="증상 제목"
                  className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.3] break-keep"
                />
              </div>
              <div className="w-12 h-1 bg-[#8DC63F] rounded-full"></div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// JointSolutions Block (Interactive Tabs/Fade)
// -------------------------------------------------------------
export function JointSolutionsBlock({ data, isEditMode, onChange }) {
  const [activeTab, setActiveTab] = React.useState(0);
  
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 relative items-start">
          {/* Left: Sticky Tab List & Title */}
          <div className="w-full md:w-1/3 md:sticky md:top-[120px] flex flex-col gap-8 md:gap-12 h-max z-10 bg-white md:bg-transparent pt-4 md:pt-0">
            <div>
              <EditableText
                tag="h2"
                value={data.title || ''}
                onChange={(val) => onChange({ title: val })}
                isEditMode={isEditMode}
                placeholder="맞춤형 회복 솔루션"
                className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.3] break-keep"
              />
            </div>
            
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
              {data.solutions?.map((sol, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(idx);
                  // Optional: smooth scroll to that element could be added here if we gave them IDs
                }}
                className={`flex-shrink-0 text-left px-6 py-5 rounded-2xl transition-all duration-300 font-bold text-xl md:text-2xl border-l-4 ${
                  activeTab === idx 
                    ? 'bg-gray-50 text-[#0369A1] border-[#0369A1] shadow-sm' 
                    : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {sol.tabName}
              </button>
            ))}
            </div>
          </div>

          {/* Right: Scrolling Content */}
          <div className="w-full md:w-2/3 space-y-16 md:space-y-32 pb-20">
            {data.solutions?.map((sol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                onViewportEnter={() => setActiveTab(idx)}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gray-50 rounded-[2rem] p-6 md:p-10 border border-gray-100 scroll-mt-32"
                id={`solution-${idx}`}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="text-[#8DC63F]">
                    <Shield className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{sol.title}</h3>
                </div>
                <p className="text-base md:text-lg text-gray-600 leading-[1.7] break-keep mb-6 md:mb-8">{sol.desc}</p>
                
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                  {sol.image ? (
                    <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">Image Area</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// JointOutro Block (Fullscreen Zoom)
// -------------------------------------------------------------
export function JointOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      <motion.div 
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={data.bgImage || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600"} 
          alt="어깨" 
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2 }}
        >
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="다시 가벼워진 어깨로."
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.3] break-keep"
          />
        </motion.div>
      </div>
    </section>
  );
}


// -------------------------------------------------------------
// UltraHero Block (Scanner effect)
// -------------------------------------------------------------
export function UltraHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative h-[90vh] md:h-screen flex items-center justify-center bg-[#050B14] overflow-hidden">
      {/* Background & Scanner */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data.bgImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"} 
          alt="초음파" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/80 to-transparent"></div>
        
        {/* Scanner Line */}
        <motion.div
          animate={{ y: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#0369A1]/30 to-transparent border-b border-[#0369A1]/50 shadow-[0_0_30px_#0369A1]"
        ></motion.div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-[#0369A1]/20 border border-[#0369A1]/30 text-[#0369A1] font-bold text-sm mb-6 tracking-widest backdrop-blur-sm">
            ULTRASOUND-GUIDED INJECTION
          </div>
        </motion.div>
        
        <EditableText
          tag="h1"
          value={data.mainCopy || ''}
          onChange={(val) => onChange({ mainCopy: val })}
          isEditMode={isEditMode}
          placeholder="보이지 않던 통증의 뿌리를 찾다."
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.2] mb-8 break-keep"
        />
        <EditableText
          tag="p"
          multiline={true}
          value={data.subCopy || ''}
          onChange={(val) => onChange({ subCopy: val })}
          isEditMode={isEditMode}
          placeholder="감각에 의존하지 않고, 직접 보면서 치료합니다."
          className="text-lg md:text-xl text-gray-400 font-light leading-[1.7] break-keep max-w-2xl mx-auto"
        />
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// UltraFeatures Block (3D Hover Cards)
// -------------------------------------------------------------
export function UltraFeaturesBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-[#0a111a]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <EditableText
              tag="h2"
              value={data.title || ''}
              onChange={(val) => onChange({ title: val })}
              isEditMode={isEditMode}
              placeholder="왜 초음파 유도하 주사인가?"
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" style={{ perspective: '1000px' }}>
          {data.features?.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, rotateY: 30, y: 50 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, zIndex: 10 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-10 flex flex-col h-full shadow-2xl transition-all duration-300 group hover:bg-white/10"
            >
              <div 
                className="text-[#8DC63F] mb-8 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#8DC63F] group-hover:text-white transition-colors duration-300"
                style={{ transform: 'translateZ(20px)' }}
              >
                <Search className="w-8 h-8" />
              </div>
              <h3 
                className="text-2xl font-bold text-white mb-4"
                style={{ transform: 'translateZ(20px)' }}
              >
                {feat.title}
              </h3>
              <p 
                className="text-gray-400 leading-relaxed break-keep"
                style={{ transform: 'translateZ(10px)' }}
              >
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// UltraTarget Block (Cross Enter Layout)
// -------------------------------------------------------------
export function UltraTargetBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-16 md:mb-24">
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="머리부터 발끝까지"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          />
        </div>

        <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
          {data.targets?.map((target, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 md:p-10 rounded-[2rem] bg-gray-50 border border-gray-100 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-lg text-[#0369A1] font-black text-2xl md:text-3xl border-4 border-gray-50">
                {target.part}
              </div>
              <div className={`flex-1 text-center ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{target.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed break-keep">{target.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// UltraOutro Block
// -------------------------------------------------------------
export function UltraOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a111a] to-[#050B14]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-2xl"
        >
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="정확한 진단이\n정확한 치료를 만듭니다."
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.4] break-keep whitespace-pre-line"
          />
        </motion.div>
      </div>
    </section>
  );
}


// -------------------------------------------------------------
// ManualHero Block (Warm & Clean)
// -------------------------------------------------------------
export function ManualHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative h-[80vh] md:h-screen flex items-center justify-center bg-[#FDFBF7] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={data.bgImage || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600"} 
          alt="도수치료" 
          className="w-full h-full object-cover opacity-15 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]/50"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-block px-5 py-2.5 rounded-full bg-white/80 border border-[#D5C5B3]/30 text-[#8C7662] font-semibold text-sm mb-6 tracking-widest backdrop-blur-md shadow-sm">
            MANUAL THERAPY
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <EditableText
            tag="h1"
            value={data.mainCopy || ''}
            onChange={(val) => onChange({ mainCopy: val })}
            isEditMode={isEditMode}
            placeholder="손끝에서 시작되는 척추의 바른 균형"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#2C2926] tracking-tight leading-[1.3] mb-8 break-keep"
          />
          <EditableText
            tag="p"
            multiline={true}
            value={data.subCopy || ''}
            onChange={(val) => onChange({ subCopy: val })}
            isEditMode={isEditMode}
            placeholder="숙련된 치료사의 손길로 굳어진 근육을 풀고, 원인 모를 통증을 바로잡아 통증의 근본 원인을 해결하는 1:1 맞춤 치료입니다."
            className="text-lg md:text-xl text-[#6D6863] font-medium leading-[1.8] break-keep max-w-2xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// ManualTarget Block (Bento Grid)
// -------------------------------------------------------------
export function ManualTargetBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="이런 분들께 필요합니다"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
          />
          <div className="w-16 h-1 bg-[#D5C5B3] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {data.targets?.map((target, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`p-10 rounded-[2.5rem] border border-gray-100 transition-shadow duration-300 hover:shadow-xl flex flex-col justify-between ${idx === 0 || idx === 3 ? 'bg-[#FDFBF7]' : 'bg-white'}`}
            >
              <div className="mb-8">
                <div className="text-4xl font-light text-[#D5C5B3] mb-4">0{idx + 1}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{target.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed break-keep">{target.desc}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-50 self-end">
                <Plus className="w-5 h-5 text-[#8C7662]" />
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// ManualProcess Block (Timeline Scroll)
// -------------------------------------------------------------
export function ManualProcessBlock({ data, isEditMode, onChange }) {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="py-32 bg-[#F9F9F9] relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        
        <div className="mb-24 text-center">
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="나음만의 4단계 도수치료 시스템"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          />
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full"></div>
          
          {/* Vertical Line Progress */}
          <motion.div 
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-[#0369A1] transform md:-translate-x-1/2 rounded-full z-10"
          ></motion.div>

          <div className="space-y-20 md:space-y-32 relative z-20">
            {data.steps?.map((step, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                    transition={{ duration: 0.7 }}
                    className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100"
                  >
                    <div className="text-[#0369A1] font-bold text-sm mb-3 tracking-widest uppercase">STEP {idx + 1}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg break-keep">{step.desc}</p>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="absolute left-8 md:static md:w-auto transform -translate-x-1/2 md:translate-x-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, backgroundColor: '#E5E7EB' }}
                    whileInView={{ scale: 1, backgroundColor: '#0369A1' }}
                    viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="w-6 h-6 rounded-full border-4 border-white shadow-md z-20 relative"
                  >
                    <div className="absolute inset-[-8px] border border-[#0369A1]/30 rounded-full animate-ping"></div>
                  </motion.div>
                </div>

                {/* Empty Side for layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// ManualOutro Block
// -------------------------------------------------------------
export function ManualOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-40 bg-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#FDFBF7] transform -skew-y-3 origin-top-left scale-110"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-10 text-[#8C7662]">
            <Heart className="w-8 h-8" />
          </div>
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="통증 없는 몸이\n바른 일상을 만듭니다."
            className="text-4xl md:text-6xl font-extrabold text-[#2C2926] tracking-tighter leading-[1.4] break-keep whitespace-pre-line"
          />
        </motion.div>
      </div>
    </section>
  );
}


// -------------------------------------------------------------
// PostOpHero Block (Hopeful & Bright)
// -------------------------------------------------------------
export function PostOpHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={data.bgImage || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600"} 
          alt="수술 후 재활" 
          className="w-full h-full object-cover opacity-60 mix-blend-multiply filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-6 max-w-[1200px] w-full mx-auto flex flex-col items-start mt-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 md:mb-8"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-[#0369A1]/10 text-[#0369A1] font-bold text-sm tracking-widest uppercase">
            Post-Op Rehabilitation
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <EditableText
            tag="h1"
            value={data.mainCopy || ''}
            onChange={(val) => onChange({ mainCopy: val })}
            isEditMode={isEditMode}
            placeholder="수술의 완성은 온전한 재활입니다."
            className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.2] mb-6 md:mb-8 break-keep"
          />
          <EditableText
            tag="p"
            multiline={true}
            value={data.subCopy || ''}
            onChange={(val) => onChange({ subCopy: val })}
            isEditMode={isEditMode}
            placeholder="성공적인 수술 이후, 약해진 근력과 굳어진 관절을 체계적으로 회복시켜 예전의 빛나는 일상으로 돌려드립니다."
            className="text-lg md:text-2xl text-gray-600 font-medium leading-[1.6] break-keep"
          />
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PostOpNeeds Block (3 Cards)
// -------------------------------------------------------------
export function PostOpNeedsBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="mb-16 text-center">
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="왜 수술 후 재활이 필수일까요?"
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {data.needs?.map((need, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col items-center text-center hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0369A1] mb-8">
                {idx === 0 ? <Activity className="w-10 h-10" /> : idx === 1 ? <Shield className="w-10 h-10" /> : <Heart className="w-10 h-10" />}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{need.title}</h3>
              <p className="text-gray-600 leading-relaxed break-keep">{need.desc}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PostOpTypes Block (Interactive Sticky Scroll)
// -------------------------------------------------------------
export function PostOpTypesBlock({ data, isEditMode, onChange }) {
  const [activeSection, setActiveSection] = React.useState(0);

  return (
    <section className="py-24 md:py-32 bg-[#050B14] text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          {/* Sticky Sidebar Menu */}
          <div className="w-full lg:w-1/3 relative">
            <div className="lg:sticky lg:top-[140px] flex flex-col gap-10">
              
              <div>
                <EditableText
                  tag="h2"
                  value={data.title || ''}
                  onChange={(val) => onChange({ title: val })}
                  isEditMode={isEditMode}
                  placeholder="모든 수술에 대한 해답"
                  className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 break-keep leading-tight"
                />
                <p className="text-gray-400 text-lg md:text-xl break-keep">
                  어떤 부위의 수술이든, 나음의 숙련된 치료팀이 맞춤형 솔루션을 제공합니다.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {data.types?.map((type, idx) => (
                  <a
                    key={idx}
                    href={`#postop-type-${idx}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`postop-type-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setActiveSection(idx);
                    }}
                    className={`text-left px-8 py-6 rounded-2xl transition-all duration-300 font-bold text-xl md:text-2xl border-l-4 ${
                      activeSection === idx 
                        ? 'bg-white/10 text-white border-[#0369A1]' 
                        : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {type.category}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stacking Content */}
          <div className="w-full lg:w-2/3 space-y-12 md:space-y-16">
            {data.types?.map((type, idx) => (
              <motion.div
                key={idx}
                id={`postop-type-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                onViewportEnter={() => setActiveSection(idx)}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 scroll-mt-[160px]"
              >
                <div className="flex items-center gap-4 mb-8 text-[#0369A1]">
                  <Crosshair className="w-8 h-8" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {type.category} 재활
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {type.items?.map((item, i) => (
                    <div key={i} className="bg-black/20 p-6 rounded-xl border border-white/5">
                      <h4 className="text-xl font-bold text-gray-200 mb-3">{item.name}</h4>
                      <p className="text-gray-400 leading-relaxed break-keep">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PostOpStages Block (4-Phase Expandable layout)
// -------------------------------------------------------------
export function PostOpStagesBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="mb-16 md:mb-24 text-center">
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="단계별 안심 회복 시스템"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px]">
          {data.stages?.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex-1 rounded-3xl overflow-hidden relative group bg-white border border-gray-200 shadow-sm transition-all duration-500 hover:flex-[1.5]"
            >
              <div className="absolute top-6 left-6 text-6xl font-black text-gray-100 group-hover:text-gray-50 transition-colors duration-500 -z-0">
                0{idx + 1}
              </div>
              
              {stage.bgImage && (
                <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                  <img src={stage.bgImage} alt={stage.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
              )}
              
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                <div className={`font-bold text-sm tracking-widest uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity ${stage.bgImage ? 'text-[#0369A1] group-hover:text-blue-300' : 'text-[#0369A1]'}`}>
                  Phase {idx + 1}
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-6 transition-colors ${stage.bgImage ? 'text-gray-900 group-hover:text-white' : 'text-gray-900'}`}>{stage.title}</h3>
                
                <p className={`leading-relaxed text-lg break-keep opacity-80 group-hover:opacity-100 transition-opacity mt-auto ${stage.bgImage ? 'text-gray-600 group-hover:text-gray-200' : 'text-gray-600'}`}>
                  {stage.desc}
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200 group-hover:bg-[#0369A1] transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PostOpOutro Block
// -------------------------------------------------------------
export function PostOpOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-48 bg-white flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-12 text-[#0369A1]">
          <Activity className="w-10 h-10" />
        </div>
        <EditableText
          tag="h2"
          multiline={true}
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="혼자서는 힘든 재활,\n나음이 끝까지 함께합니다."
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.3] break-keep whitespace-pre-line"
        />
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// Apple-Style Blocks (Sports Clinic)
// -------------------------------------------------------------
export function AppleHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${data.bgImage || '/sports-bg.webp'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
      
      <div className="relative z-10 max-w-7xl w-full px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <EditableText
            tag="h1"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="스포츠 손상 클리닉"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none mb-8 drop-shadow-2xl"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <EditableText
            tag="p"
            multiline={true}
            value={data.desc || ''}
            onChange={(val) => onChange({ desc: val })}
            isEditMode={isEditMode}
            placeholder="다시 뛰는 당신을 위해,\n나음이 완벽한 복귀를 돕습니다."
            className="text-xl md:text-3xl text-gray-300 font-medium tracking-tight leading-snug whitespace-pre-line"
          />
        </motion.div>
      </div>
    </section>
  );
}

export function AppleBentoBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-24 text-center"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="이런 증상이 있다면 치료가 필요합니다"
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.targets?.map((target, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="bg-[#111] rounded-3xl p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-500 group flex flex-col justify-between aspect-square md:aspect-auto lg:aspect-square"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{target.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed break-keep">{target.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AppleProcessBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-40">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <EditableText
                  tag="h2"
                  value={data.title || ''}
                  onChange={(val) => onChange({ title: val })}
                  isEditMode={isEditMode}
                  placeholder="스포츠 특화 치료 프로세스"
                  className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight break-keep"
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col gap-12 md:gap-24">
            {data.steps?.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              >
                <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/10 shrink-0">
                  0{idx + 1}
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-xl md:text-2xl text-gray-400 leading-relaxed break-keep">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export function AppleOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-64 bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0284C7]/20 via-black to-black opacity-50" />
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="단순한 통증 완화를 넘어\n안전한 스포츠 복귀(Return to Play)를 약속합니다."
            className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-tight whitespace-pre-line text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-600 drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Neuro-Style Blocks (Refractory Neuropathy Clinic)
// -------------------------------------------------------------
export function NeuroHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#050510] text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: `url(${data.bgImage || '/neuro-bg.webp'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/10 via-[#050510]/60 to-[#050510]" />
      
      <div className="relative z-10 max-w-5xl w-full px-6 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <EditableText
            tag="h1"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="끝나지 않는 통증의 사슬,\n나음이 끊어냅니다."
            multiline={true}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-purple-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] whitespace-pre-line"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <EditableText
            tag="p"
            multiline={true}
            value={data.desc || ''}
            onChange={(val) => onChange({ desc: val })}
            isEditMode={isEditMode}
            placeholder="어디를 가도 낫지 않던 지독한 신경통,\n이제 대학병원급 미세 신경 치료로 근본적인 평안을 되찾으세요."
            className="text-lg md:text-2xl text-purple-100/70 font-light tracking-tight leading-relaxed whitespace-pre-line max-w-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export function NeuroEmpathyBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#050510] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20 text-center"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="당신을 괴롭히는 지독한 통증들"
            className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.targets?.map((target, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="bg-gradient-to-br from-[#1a1525] to-[#0a0815] rounded-3xl p-8 md:p-12 border border-purple-500/10 hover:border-purple-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-600/20 rounded-full blur-[50px] group-hover:bg-purple-500/40 transition-colors" />
              <div className="relative z-10">
                <div className="text-purple-400 font-mono text-sm mb-4 tracking-widest uppercase">Target 0{idx + 1}</div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">{target.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed break-keep">{target.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NeuroPhilosophyBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-48 bg-[#020205] text-white flex items-center justify-center border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="text-purple-500 mb-8 opacity-50">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          </div>
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="진통제로 덮어두는 임시방편이 아닙니다.\n변성된 신경의 뿌리를 치료합니다."
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.3] whitespace-pre-line text-gray-200"
          />
        </motion.div>
      </div>
    </section>
  );
}

export function NeuroSolutionsBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#050510] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="최상위 비수술 시술 라인업"
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
          />
        </motion.div>

        <div className="flex flex-col gap-8">
          {data.solutions?.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center p-8 md:p-12 rounded-3xl bg-gradient-to-r ${idx % 2 === 0 ? 'from-[#0e1022] to-[#0a0815]' : 'from-[#0a0815] to-[#0e1022]'} border border-white/5`}
            >
              <div className="w-20 h-20 md:w-32 md:h-32 shrink-0 rounded-full bg-purple-900/30 border border-purple-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <span className="text-3xl md:text-5xl font-black text-purple-400 opacity-50">0{idx + 1}</span>
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">{sol.title}</h3>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed break-keep">{sol.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NeuroProcessBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#020205] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="3단계 신경 리셋 프로세스"
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          />
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 md:-translate-x-1/2" />
          <div className="space-y-16 md:space-y-32">
            {data.steps?.map((step, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2" />
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="w-full md:w-1/2 pl-16 md:pl-0"
                >
                  <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                    <div className="text-purple-500 font-bold tracking-widest uppercase mb-2">Step 0{idx + 1}</div>
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">{step.title}</h3>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed break-keep">{step.desc}</p>
                  </div>
                </motion.div>
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-black border-2 border-purple-500 rounded-full transform -translate-x-1/2 mt-1 md:mt-0 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NeuroOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-64 bg-[#050510] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/5 to-[#050510]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="포기하지 마세요.\n통증 없는 평범한 아침을 돌려드리겠습니다."
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight whitespace-pre-line text-white drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// IV-Style Blocks (Custom IV/Immune Clinic)
// -------------------------------------------------------------
export function IVHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#020813] text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
        style={{ backgroundImage: `url(${data.bgImage || '/iv-bg.webp'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020813]/10 via-[#020813]/50 to-[#020813]" />
      
      <div className="relative z-10 max-w-5xl w-full px-6 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <EditableText
            tag="h1"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="내 몸이 깨어나는 시간,\n1:1 맞춤 영양 설계"
            multiline={true}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.15] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-blue-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)] whitespace-pre-line"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <EditableText
            tag="p"
            multiline={true}
            value={data.desc || ''}
            onChange={(val) => onChange({ desc: val })}
            isEditMode={isEditMode}
            placeholder="단순한 피로 회복을 넘어, 근본적인 세포 재생과 면역력 강화를 위한\n나음만의 프리미엄 수액 치료입니다."
            className="text-lg md:text-2xl text-cyan-50/70 font-light tracking-tight leading-relaxed whitespace-pre-line max-w-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export function IVProblemBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#020813] text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="lg:w-1/2"
        >
          <div className="text-cyan-500 font-mono tracking-widest uppercase mb-4 text-sm md:text-base">The Hidden Cause</div>
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="잘 낫지 않는 만성 통증,\n진짜 원인은 세포의 영양 결핍일 수 있습니다."
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-8 text-white"
          />
          <EditableText
            tag="p"
            multiline={true}
            value={data.desc || ''}
            onChange={(val) => onChange({ desc: val })}
            isEditMode={isEditMode}
            placeholder="면역 저하, 만성 피로, 수술 후 체력 저하는 신체의 회복력을 무너뜨려 근골격계 통증의 악순환을 만듭니다. 겉으로 드러난 통증만을 쫓는 것이 아니라, 몸속 세포부터 다시 세우는 것이 진정한 재활의 완성입니다."
            className="text-lg md:text-xl text-gray-400 leading-relaxed font-light break-keep"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          className="lg:w-1/2 relative"
        >
          <div className="aspect-square rounded-full bg-gradient-to-tr from-blue-900/40 to-cyan-500/20 blur-[80px] absolute inset-0 transform scale-110" />
          <div className="relative glassmorphism rounded-3xl p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-2xl">
            <div className="flex flex-col gap-8">
              {['면역력 저하', '만성 피로 누적', '조직 재생 지연', '통증 악순환'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30 text-cyan-400 font-bold">
                    0{idx + 1}
                  </div>
                  <span className="text-xl md:text-2xl font-semibold text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function IVSynergyBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#020813] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="재활 치료와 수액의 강력한 시너지"
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.benefits?.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true, margin: '-50px' }}
              className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#0a1224] to-[#040a15] border border-cyan-900/30 hover:border-cyan-500/50 transition-colors group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-400/20 transition-colors" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center">
                  <Activity size={32} className="text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed break-keep">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IVLineupBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#000000] text-white border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-24"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="프리미엄 수액 라인업"
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {data.lineup?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-cyan-400 font-semibold tracking-wide mb-2 text-sm">{item.tag}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed break-keep mb-8">{item.desc}</p>
              </div>
              <div className="pt-6 border-t border-white/10 flex gap-2 flex-wrap">
                {item.ingredients?.map((ing, i) => (
                  <span key={i} className="px-3 py-1 bg-black/50 rounded-full text-xs text-gray-300 font-mono">{ing}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IVProcessBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#020813] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="개인 맞춤 처방 시스템"
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {data.steps?.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex-1 flex flex-col relative"
            >
              {idx < data.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
              )}
              <div className="w-16 h-16 rounded-full bg-cyan-900 border border-cyan-400 flex items-center justify-center text-2xl font-bold text-white z-10 mb-6 mx-auto md:mx-0 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                {idx + 1}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed break-keep">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IVFacilityBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-48 bg-[#000000] text-white border-y border-white/5 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1224] to-black opacity-80" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="치료의 질은 쉬는 공간에서 완성됩니다.\n최고급 VIP 1인실에서 누리는 온전한 휴식"
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.3] whitespace-pre-line text-white mb-10"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {['프라이빗 1인 수액실', '최고급 전동 리클라이너', '호텔급 침구 및 어메니티', '조도 컨트롤 시스템'].map((item, idx) => (
              <span key={idx} className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-cyan-300 font-medium tracking-tight">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function IVOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-64 bg-[#020813] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#020813] to-[#020813]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="지친 당신의 세포에\n프리미엄 휴식을 선사합니다."
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight whitespace-pre-line text-white drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Sports V2-Style Blocks (Sports Clinic V2)
// -------------------------------------------------------------
export function SportsV2HeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#050505] text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-screen"
        style={{ backgroundImage: `url(${data.bgImage || '/sports-v2-bg.webp'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
      
      <div className="relative z-10 max-w-5xl w-full px-6 flex flex-col md:flex-row items-center justify-between text-left mt-10">
        <div className="w-full md:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="text-orange-500 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Return To Play</div>
            <EditableText
              tag="h1"
              value={data.title || ''}
              onChange={(val) => onChange({ title: val })}
              isEditMode={isEditMode}
              placeholder="다시 뛰는 당신을 위해,\n한계 없는 복귀를 선사합니다."
              multiline={true}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8 text-white drop-shadow-[0_0_20px_rgba(249,115,22,0.3)] whitespace-pre-line"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            <EditableText
              tag="p"
              multiline={true}
              value={data.desc || ''}
              onChange={(val) => onChange({ desc: val })}
              isEditMode={isEditMode}
              placeholder="단순한 통증 치료가 아닙니다. 부상 이전의 완벽한 퍼포먼스를 되찾아주는\n나음만의 프리미엄 스포츠 재활입니다."
              className="text-lg md:text-2xl text-gray-300 font-light tracking-tight leading-relaxed whitespace-pre-line max-w-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SportsV2ProblemBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-900/10 to-transparent blur-[100px]" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, rotateY: -30 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="md:w-5/12 glassmorphism rounded-3xl p-10 border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          <div className="text-orange-500 mb-6">
            <Crosshair size={48} strokeWidth={1.5} />
          </div>
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="일반 통증과 스포츠 손상의\n치료 목표는 다릅니다."
            multiline={true}
            className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-6 text-white whitespace-pre-line"
          />
          <EditableText
            tag="p"
            value={data.desc || ''}
            onChange={(val) => onChange({ desc: val })}
            isEditMode={isEditMode}
            placeholder="단순히 일상생활이 가능할 정도로 아프지 않은 상태가 아니라, 스윙, 점프, 러닝 등 폭발적인 동작을 견뎌낼 수 있는 '퍼포먼스의 완벽한 회복'이 우리의 목표입니다."
            multiline={true}
            className="text-lg text-gray-400 leading-relaxed font-light break-keep"
          />
        </motion.div>
        
        <div className="md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.points?.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true, margin: '-50px' }}
              className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-orange-500/30 transition-colors group"
            >
              <div className="text-orange-500/50 text-4xl font-black mb-4 group-hover:text-orange-500 transition-colors">0{idx + 1}</div>
              <h3 className="text-xl font-bold text-white mb-2">{pt.title}</h3>
              <p className="text-gray-500 leading-relaxed">{pt.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SportsV2PhilosophyBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-48 bg-[#000000] text-white border-y border-white/5 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent transform -rotate-12 blur-[2px]" />
        <div className="absolute w-[120%] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -rotate-6 blur-[2px]" />
      </div>
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="text-orange-500 font-bold tracking-widest uppercase mb-8">Our Philosophy</div>
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="일반적인 일상 복귀를 넘어,\n완벽한 스포츠 복귀(Return to Play)를 약속합니다."
            className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.2] whitespace-pre-line text-white"
          />
        </motion.div>
      </div>
    </section>
  );
}

export function SportsV2TargetsBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <EditableText
              tag="h2"
              value={data.title || ''}
              onChange={(val) => onChange({ title: val })}
              isEditMode={isEditMode}
              placeholder="핵심 집중 치료 질환"
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            />
          </div>
          <div className="text-orange-500 font-medium">Sports Injuries</div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {data.targets?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="relative group bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/5 overflow-hidden transition-colors hover:border-orange-500/50"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-500/20 transition-colors" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed break-keep mb-8">{item.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.sports?.map((sport, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white/10 rounded-full text-sm text-gray-200 font-medium tracking-tight backdrop-blur-md">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SportsV2SolutionsBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#000000] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-24"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="특화 치료 솔루션"
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          />
        </motion.div>

        <div className="space-y-12 md:space-y-24">
          {data.solutions?.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-50px' }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            >
              <div className="w-full md:w-1/2 aspect-video bg-[#0a0a0a] rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Activity size={64} className="text-white/20 group-hover:text-orange-500/50 transition-colors duration-500" strokeWidth={1} />
              </div>
              <div className="w-full md:w-1/2 text-left">
                <div className="text-orange-500 font-mono text-xl mb-4">0{idx + 1}</div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{sol.title}</h3>
                <p className="text-xl text-gray-400 leading-relaxed break-keep">{sol.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SportsV2ProcessBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="4단계 RTP 회복 시스템"
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {data.steps?.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5 relative overflow-hidden"
            >
              <div className="text-6xl font-black text-white/5 absolute -top-4 -right-4 select-none">
                {idx + 1}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-orange-500 font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed break-keep text-sm md:text-base">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SportsV2OutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-64 bg-[#000000] text-white overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-900/30 via-[#000000] to-[#000000]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <EditableText
            tag="h2"
            multiline={true}
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="당신의 가장 빛나는 필드를 위해,\n나음이 든든한 페이스메이커가 되겠습니다."
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight whitespace-pre-line text-white drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

// Block Renderer Registry
// -------------------------------------------------------------
const BLOCK_REGISTRY = {
  HeadingText: HeadingTextBlock,
  VisionHighlight: VisionHighlightBlock,
  CoreValues: CoreValuesBlock,
  StaffGrid: StaffGridBlock,
  WorshipSchedule: WorshipScheduleBlock,
  ImageWithText: ImageWithTextBlock,
  RichText: RichTextBlock,
  BulletinBoard: BulletinBoardBlock,
  PastorGreeting: PastorGreetingBlock,
  VisionHero: VisionHeroBlock,
  VisionGoals: VisionGoalsBlock,
  VisionOutro: VisionOutroBlock,
  FacilityGallery: FacilityGalleryBlock,
  LocationBlock: LocationBlock,
  PhilosophyHero: PhilosophyHeroBlock,
  PhilosophyGreeting: PhilosophyGreetingBlock,
  PhilosophyPrinciples: PhilosophyPrinciplesBlock,
  PhilosophyPromise: PhilosophyPromiseBlock,
  PhilosophyCTA: PhilosophyCTABlock,
  SpineHero: SpineHeroBlock,
  SpineSymptoms: SpineSymptomsBlock,
  SpineBento: SpineBentoBlock,
  SpineOutro: SpineOutroBlock,
  JointHero: JointHeroBlock,
  JointSymptoms: JointSymptomsBlock,
  JointSolutions: JointSolutionsBlock,
  JointOutro: JointOutroBlock,
  UltraHero: UltraHeroBlock,
  UltraFeatures: UltraFeaturesBlock,
  UltraTarget: UltraTargetBlock,
  UltraOutro: UltraOutroBlock,
  ManualHero: ManualHeroBlock,
  ManualTarget: ManualTargetBlock,
  ManualProcess: ManualProcessBlock,
  ManualOutro: ManualOutroBlock,
  PostOpHero: PostOpHeroBlock,
  PostOpNeeds: PostOpNeedsBlock,
  PostOpTypes: PostOpTypesBlock,
  PostOpStages: PostOpStagesBlock,
  PostOpOutro: PostOpOutroBlock,
  AppleHero: AppleHeroBlock,
  AppleBento: AppleBentoBlock,
  AppleProcess: AppleProcessBlock,
  AppleOutro: AppleOutroBlock,
  NeuroHero: NeuroHeroBlock,
  NeuroEmpathy: NeuroEmpathyBlock,
  NeuroPhilosophy: NeuroPhilosophyBlock,
  NeuroSolutions: NeuroSolutionsBlock,
  NeuroProcess: NeuroProcessBlock,
  NeuroOutro: NeuroOutroBlock,
  IVHero: IVHeroBlock,
  IVProblem: IVProblemBlock,
  IVSynergy: IVSynergyBlock,
  IVLineup: IVLineupBlock,
  IVProcess: IVProcessBlock,
  IVFacility: IVFacilityBlock,
  IVOutro: IVOutroBlock,
  SportsV2Hero: SportsV2HeroBlock,
  SportsV2Problem: SportsV2ProblemBlock,
  SportsV2Philosophy: SportsV2PhilosophyBlock,
  SportsV2Targets: SportsV2TargetsBlock,
  SportsV2Solutions: SportsV2SolutionsBlock,
  SportsV2Process: SportsV2ProcessBlock,
  SportsV2Outro: SportsV2OutroBlock,
  Empty: EmptyBlock
};

export function BlockRenderer({ blocks, isEditMode = false, onChange }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        const Component = BLOCK_REGISTRY[block.type];
        if (!Component) return <div key={block.id} className="text-red-500 p-4">Unknown block type: {block.type}</div>;
        return (
          <Component 
            key={block.id} 
            data={block.data} 
            isEditMode={isEditMode}
            onChange={onChange ? (newData) => onChange(block.id, newData) : undefined}
          />
        );
      })}
    </div>
  );
}

// -------------------------------------------------------------
// Block Definitions (For Admin UI generation)
// -------------------------------------------------------------
export const BLOCK_DEFINITIONS = [
  {
    type: 'VisionHero',
    label: '비전 히어로 (메인 비전)',
    icon: <Flame size={16} />,
    defaultData: {
      title: '평화교회 비전과 목표',
      slogan: '예수 그리스도의 사랑으로\n사람을 세우고, 세상을 섬기는 교회',
      paragraphs: [
        '평화교회는 예수 그리스도를 삶의 유일한 길로 고백하며,\n말씀과 기도 위에 굳게 서서 하나님의 사랑을 세상 가운데 나누는 교회를 꿈꿉니다.',
        '교회 안에서만 머무르는 신앙이 아니라\n가정과 일터, 이웃과 지역사회 속에서 그리스도의 사랑을 실천하며,\n상처받은 이들을 품고 소외된 이들과 함께하는 것이 우리의 사명입니다.',
        '한 사람의 변화가 한 가정을 변화시키고,\n한 가정의 변화가 지역사회를 변화시키며,\n그 변화가 세상을 향한 하나님의 사랑으로 이어지기를 소망합니다.',
        '평화교회는 모든 세대가 믿음 안에서 함께 성장하고\n세상 속에서 복음의 빛을 밝히는 **건강하고 따뜻한 신앙공동체**를 세워가겠습니다.'
      ]
    }
  },
  {
    type: 'VisionGoals',
    label: '비전 목표 (그리드)',
    icon: <Heart size={16} />,
    defaultData: {
      title: '우리의 목표',
      goals: [
        { title: '예배가 살아있는 교회', desc: '하나님을 기쁘시게 하는 진실한 예배를 드립니다.' },
        { title: '말씀으로 성장하는 교회', desc: '말씀을 배우고 삶으로 살아내는 성숙한 그리스도인을 세웁니다.' },
        { title: '기도로 하나 되는 교회', desc: '서로를 위해 기도하며 사랑과 믿음으로 하나 되는 공동체를 만듭니다.' },
        { title: '다음 세대와 함께하는 교회', desc: '다음 세대가 교회의 미래가 아니라 오늘의 교회로 함께 서도록 돕습니다.' },
        { title: '지역과 세상을 섬기는 교회', desc: '교회의 문을 세상을 향해 열고 도움이 필요한 곳으로 먼저 찾아갑니다.' }
      ]
    }
  },
  {
    type: 'VisionOutro',
    label: '비전 아웃트로 (하단 슬로건)',
    icon: <Globe size={16} />,
    defaultData: {
      slogan: 'ONE WAY JESUS',
      title: '오직 예수, 사랑으로 세상을 향하여',
      paragraphs: [
        '평화교회는 예수 그리스도를 따라\n**예배하고, 배우고, 사랑하며, 섬기고, 전하는 교회**가 되겠습니다.',
        '그리고 우리를 통해\n한 사람이 살아나고, 한 가정이 회복되며,\n지역사회와 세상에 하나님의 평화가 흘러가기를 소망합니다.'
      ],
      logoText: '평화교회 · Peace Methodist Church'
    }
  },
  {
    type: 'HeadingText',
    label: '제목 텍스트',
    icon: <BookOpen size={16} />,
    defaultData: { badge: 'BADGE', title: '큰 제목을 입력하세요', description: '간단한 설명을 입력하세요' }
  },
  {
    type: 'PastorGreeting',
    label: '담임목사 인사말',
    icon: <Users size={16} />,
    defaultData: {
      image: '',
      name: '장성진',
      title: '담임목사',
      history: [
        '감리교신학교 신학과 졸업',
        '감리교신학교 대학원 졸업',
        '평화감리교회 담임 (2016-현재)'
      ],
      greetingPart1: '평화교회 홈페이지를 찾아주신 여러분을 주님의 이름으로 환영합니다.\n평화교회를 섬기고 있는 담임목사 장성진입니다.\n\n교회는 단순히 사람들이 모여 예배드리는 장소가 아니라, 하나님의 사랑을 배우고 그 사랑을 삶으로 살아내는 공동체라고 믿습니다.',
      quoteText: '복음은 말에만 머무는 것이 아니라 한 사람의 삶 곁으로 다가가 함께 울고, 함께 기뻐하며, 함께 걸어가는 사랑이어야 한다는 것입니다.',
      greetingPart2: '우리 교회가 예배의 기쁨이 살아 있는 교회, 말씀을 통해 삶의 방향을 발견하는 교회, 다음 세대가 믿음 안에서 꿈을 키우는 교회가 되기를 소망합니다.\n\n누구든 편안한 마음으로 찾아오십시오. 함께 예배하고, 함께 말씀을 배우며, 서로의 삶을 나누면서 믿음의 길을 함께 걸어가고 싶습니다.'
    }
  },
  {
    type: 'VisionHighlight',
    label: '핵심 비전 (강조 박스)',
    icon: <Flame size={16} />,
    defaultData: { 
      title: '강조할 핵심 문장', 
      paragraphs: ['설명 단락 1', '설명 단락 2'], 
      highlightText: '가장 하단에 들어갈 강조 문구'
    }
  },
  {
    type: 'CoreValues',
    label: '핵심 가치 4단 그리드',
    icon: <Heart size={16} />,
    defaultData: { 
      title: '우리가 세워가는 교회',
      values: [
        { num: '01', title: '가치 1', desc: '설명', icon: 'BookOpen' },
        { num: '02', title: '가치 2', desc: '설명', icon: 'Flame' },
        { num: '03', title: '가치 3', desc: '설명', icon: 'Users' },
        { num: '04', title: '가치 4', desc: '설명', icon: 'Heart' }
      ]
    }
  },
  {
    type: 'StaffGrid',
    label: '섬기는 사람들 (프로필 카드)',
    icon: <Users size={16} />,
    defaultData: {
      title: '목회자',
      staff: [
        { name: '이름', role: '직책', department: '부서', image: '' }
      ]
    }
  },
  {
    type: 'WorshipSchedule',
    label: '예배 시간표',
    icon: <Globe size={16} />,
    defaultData: {
      title: '주일예배',
      schedules: [
        { name: '1부예배', time: '오전 7시', location: '본당', description: '안내' }
      ]
    }
  },
  {
    type: 'ImageWithText',
    label: '좌측 사진 / 우측 글 (부서 소개)',
    icon: <ImageIcon size={16} />,
    defaultData: {
      title: '사역 소개',
      description: '부서나 사역에 대한 설명을 입력하세요.',
      image: ''
    }
  },
  {
    type: 'RichText',
    label: '일반 자유 양식 (HTML)',
    icon: <BookOpen size={16} />,
    defaultData: { html: '<p>자유롭게 내용을 작성하세요.</p>' }
  },
  {
    type: 'BulletinBoard',
    label: '교회주보 (업로드 보드)',
    icon: <BookOpen size={16} />,
    defaultData: {
      title: '교회 주보',
      bulletins: []
    }
  },
  {
    type: 'FacilityGallery',
    label: '갤러리 (병원 둘러보기)',
    icon: <ImageIcon size={16} />,
    defaultData: {
      title: '나음재활의학과의원 둘러보기',
      desc: '쾌적하고 편안한 진료 환경을 소개합니다.',
      images: [
        { src: '', title: '로비 및 대기실' }
      ]
    }
  },
  {
    type: 'LocationBlock',
    label: '오시는 길',
    icon: <MapPin size={16} />,
    defaultData: {
      title: '오시는 길',
      desc: '나음재활의학과의원에 오시는 길을 상세히 안내해 드립니다.',
      address: { main: '서울 중랑구 봉화산로 120', sub: '(지번: 서울 중랑구 신내동 613)' },
      phone: '02-000-0000',
      mapPlaceholder: '지도 영역 (추후 연동)',
      transport: [
        { icon: 'train', title: '지하철', details: ['1호선 3번 출구'] }
      ]
    }
  }
,
  {
    type: 'SpineHero',
    label: '애플스타일 척추 히어로',
    icon: <Globe size={16} />,
    defaultData: { mainCopy: '수술 없이. 다시 곧게.', subCopy: '근본을 바로잡는 나음만의 프리미엄 척추 솔루션.' }
  },
  {
    type: 'SpineSymptoms',
    label: '애플스타일 척추 증상 (Sticky)',
    icon: <BookOpen size={16} />,
    defaultData: { title: '척추가 보내는 조용한 경고.', desc: '이런 증상이 있다면 치료가 필요합니다.', symptoms: [{title: '증상 1'}, {title: '증상 2'}] }
  },
  {
    type: 'SpineBento',
    label: '애플스타일 척추 솔루션 (Bento)',
    icon: <Heart size={16} />,
    defaultData: { title: '완벽한 3단계 치료', cards: [{title: 'Step 1'}, {title: 'Step 2'}, {title: 'Step 3'}, {title: 'Step 4'}] }
  },
  {
    type: 'SpineOutro',
    label: '애플스타일 척추 아웃트로',
    icon: <Users size={16} />,
    defaultData: { title: '건강했던 일상으로의 복귀.' }
  },
  {
    type: 'JointHero',
    label: '어깨 클리닉 헤로',
    icon: <ImageIcon size={16} />,
    defaultData: { mainCopy: '움직임의 자유를 되찾다.', subCopy: '어깨 관절을 위한 맞춤형 회복 플랜' }
  },
  {
    type: 'JointSymptoms',
    label: '어깨 증상 (가로 스크롤)',
    icon: <Activity size={16} />,
    defaultData: { title: '관절이 보내는 경고', symptoms: [{title: '증상 1'}, {title: '증상 2'}] }
  },
  {
    type: 'JointSolutions',
    label: '어깨 치료 (탭)',
    icon: <Heart size={16} />,
    defaultData: { title: '맞춤형 회복 솔루션', solutions: [{tabName: '진단', title: '초음파', desc: '설명'}] }
  },
  {
    type: 'JointOutro',
    label: '어깨 아웃트로',
    icon: <Star size={16} />,
    defaultData: { title: '다시 가벼워진 어깨로.' }
  },
  {
    type: 'UltraHero',
    label: '초음파 헤로',
    icon: <ImageIcon size={16} />,
    defaultData: { mainCopy: '보이지 않던 통증의 뿌리를 찾다.', subCopy: '감각에 의존하지 않고, 직접 보면서 치료합니다.' }
  },
  {
    type: 'UltraFeatures',
    label: '초음파 장점 (3D 카드)',
    icon: <Activity size={16} />,
    defaultData: { title: '왜 초음파 유도하 주사인가?', features: [{title: '장점 1', desc: '설명 1'}, {title: '장점 2', desc: '설명 2'}] }
  },
  {
    type: 'UltraTarget',
    label: '초음파 적용 부위 (교차)',
    icon: <Crosshair size={16} />,
    defaultData: { title: '머리부터 발끝까지', targets: [{part: '어깨', title: '질환', desc: '설명'}] }
  },
  {
    type: 'UltraOutro',
    label: '초음파 아웃트로',
    icon: <Star size={16} />,
    defaultData: { title: '정확한 진단이\n정확한 치료를 만듭니다.' }
  },
  {
    type: 'ManualHero',
    label: '도수치료 헤로',
    icon: <ImageIcon size={16} />,
    defaultData: { mainCopy: '손끝에서 시작되는 척추의 바른 균형', subCopy: '숙련된 치료사의 손길로 굳어진 근육을 풀고, 원인 모를 통증을 바로잡아 통증의 근본 원인을 해결하는 1:1 맞춤 치료입니다.' }
  },
  {
    type: 'ManualTarget',
    label: '도수치료 대상 (Bento)',
    icon: <Users size={16} />,
    defaultData: { title: '이런 분들께 필요합니다', targets: [{title: '거북목 / 일자목', desc: '스마트폰과 PC 사용으로 목과 어깨가 항상 뭉쳐있는 분'}, {title: '만성 통증', desc: '목, 허리 디스크나 협착증으로 고생하시는 분'}, {title: '신체 불균형 및 통증', desc: '골반이 틀어지거나 양쪽 어깨 높이가 달라 통증 관리가 필요한 분'}, {title: '수술 후 재활', desc: '척추/관절 수술 후 굳어진 관절의 가동 범위를 회복해야 하는 분'}] }
  },
  {
    type: 'ManualProcess',
    label: '도수치료 프로세스 (타임라인)',
    icon: <Activity size={16} />,
    defaultData: { title: '나음만의 4단계 도수치료 시스템', steps: [{title: '정밀 진단', desc: '전문의의 X-ray 및 통증 분석을 통한 1:1 처방'}, {title: '근막 이완', desc: '긴장되고 굳어진 근육과 근막을 부드럽게 이완'}, {title: '통증 교정', desc: '척추와 관절의 미세한 틀어짐을 본래 자리로 회복'}, {title: '기능 강화', desc: '약해진 심부 근육을 강화하여 통증 재발을 방지'}] }
  },
  {
    type: 'ManualOutro',
    label: '도수치료 아웃트로',
    icon: <Heart size={16} />,
    defaultData: { title: '통증 없는 몸이\n바른 일상을 만듭니다.' }
  },
  {
    type: 'PostOpHero',
    label: '수술후재활 헤로',
    icon: <ImageIcon size={16} />,
    defaultData: { mainCopy: '수술의 완성은 온전한 재활입니다.', subCopy: '성공적인 수술 이후, 약해진 근력과 굳어진 관절을 체계적으로 회복시켜 예전의 빛나는 일상으로 돌려드립니다.' }
  },
  {
    type: 'PostOpNeeds',
    label: '수술후재활 필요성 (3카드)',
    icon: <Activity size={16} />,
    defaultData: { title: '왜 수술 후 재활이 필수일까요?', needs: [{title: '가동 범위 회복', desc: '굳어버린 관절 움직임 회복'}, {title: '근력 강화', desc: '주변 근육 강화로 관절 보호'}, {title: '유착 방지', desc: '조직 유착 방지 및 통증 예방'}] }
  },
  {
    type: 'PostOpTypes',
    label: '수술후재활 종류 (탭)',
    icon: <Users size={16} />,
    defaultData: { title: '모든 수술에 대한 해답', types: [{category: '척추', items: [{name: '디스크 수술', desc: '신경 안정화'}]}] }
  },
  {
    type: 'PostOpStages',
    label: '수술후재활 4단계 (확장형)',
    icon: <Star size={16} />,
    defaultData: { title: '단계별 안심 회복 시스템', stages: [{title: '통증 조절기', desc: '염증 및 붓기 완화'}] }
  },
  {
    type: 'PostOpOutro',
    label: '수술후재활 아웃트로',
    icon: <Heart size={16} />,
    defaultData: { title: '혼자서는 힘든 재활,\n나음이 끝까지 함께합니다.' }
  },
  {
    type: 'AppleHero',
    label: '애플 히어로 (스포츠 클리닉)',
    icon: <Flame size={16} />,
    defaultData: { title: '스포츠 손상 클리닉', desc: '다시 뛰는 당신을 위해,\n나음이 완벽한 복귀를 돕습니다.', bgImage: '/sports-bg.webp' }
  },
  {
    type: 'AppleBento',
    label: '애플 벤토 (증상 타겟)',
    icon: <Heart size={16} />,
    defaultData: { 
      title: '이런 증상이 있다면 치료가 필요합니다',
      targets: [
        { title: '골프/테니스 엘보', desc: '팔꿈치 통증' },
        { title: '회전근개 및 어깨 손상', desc: '어깨 통증' },
        { title: '무릎/발목 염좌', desc: '관절 부종 및 통증' },
        { title: '족저근막염', desc: '발바닥 통증' }
      ]
    }
  },
  {
    type: 'AppleProcess',
    label: '애플 프로세스 (치료 단계)',
    icon: <List size={16} />,
    defaultData: {
      title: '스포츠 특화 치료 프로세스',
      steps: [
        { title: '정확한 원인 진단', desc: '정밀 검사' },
        { title: '급성기 통증/염증 제어', desc: '특수 치료' }
      ]
    }
  },
  {
    type: 'AppleOutro',
    label: '애플 아웃트로',
    icon: <Globe size={16} />,
    defaultData: { title: '단순한 통증 완화를 넘어\n안전한 스포츠 복귀(Return to Play)를 약속합니다.' }
  },
  {
    type: 'NeuroHero',
    label: '신경 히어로 (신경통 클리닉)',
    icon: <Flame size={16} />,
    defaultData: { title: '끝나지 않는 통증의 사슬,\n나음이 끊어냅니다.', desc: '어디를 가도 낫지 않던 지독한 신경통,\n이제 대학병원급 미세 신경 치료로 근본적인 평안을 되찾으세요.', bgImage: '/neuro-bg.webp' }
  },
  {
    type: 'NeuroEmpathy',
    label: '신경 공감 (대상 질환)',
    icon: <Heart size={16} />,
    defaultData: { 
      title: '당신을 괴롭히는 지독한 통증들',
      targets: [
        { title: '대상포진 후 신경통', desc: '피부가 스치기만 해도 칼로 베는 듯한 극심한 고통' },
        { title: '삼차신경통', desc: '얼굴 한쪽이 번쩍거리며 전기에 감전된 듯 찌릿한 통증' },
        { title: '척추수술 후 통증증후군', desc: '수술 후에도 다리가 저리고 허리가 끊어질 듯한 만성 통증' },
        { title: '복합부위통증증후군', desc: '외상 후 불균형적인 통증과 부종, 피부색 변화' }
      ]
    }
  },
  {
    type: 'NeuroPhilosophy',
    label: '신경 철학 (원장 메시지)',
    icon: <Globe size={16} />,
    defaultData: { title: '진통제로 덮어두는 임시방편이 아닙니다.\n변성된 신경의 뿌리를 치료합니다.' }
  },
  {
    type: 'NeuroSolutions',
    label: '신경 솔루션 (치료법)',
    icon: <Shield size={16} />,
    defaultData: {
      title: '최상위 비수술 시술 라인업',
      solutions: [
        { title: '초정밀 신경차단술', desc: '1mm의 오차도 허용하지 않는 표적 신경 치료' },
        { title: '고주파 신경 열응고술', desc: '통증을 전달하는 신경만을 선택적으로 차단해 장기적인 효과 도모' },
        { title: '신경 영양 주사 및 프롤로테라피', desc: '손상된 신경 주변의 조직을 재생시키고 영양을 공급하여 회복력 극대화' }
      ]
    }
  },
  {
    type: 'NeuroProcess',
    label: '신경 프로세스 (3단계 회복)',
    icon: <List size={16} />,
    defaultData: {
      title: '3단계 신경 리셋 프로세스',
      steps: [
        { title: '정확한 원인 진단', desc: '미세한 신경 손상 부위까지 찾아내는 초음파 정밀 진단' },
        { title: '통증 및 염증 제어', desc: '통증 신호를 차단하고 과흥분된 신경의 스위치를 끄는 처치' },
        { title: '신경 세포 재생', desc: '신경막 회복을 돕는 수액 요법 및 심부조직 재생 치료' }
      ]
    }
  },
  {
    type: 'NeuroOutro',
    label: '신경 아웃트로',
    icon: <Heart size={16} />,
    defaultData: { title: '포기하지 마세요.\n통증 없는 평범한 아침을 돌려드리겠습니다.' }
  },
  {
    type: 'IVHero',
    label: '수액 히어로 (맞춤수액 클리닉)',
    icon: <Activity size={16} />,
    defaultData: { title: '내 몸이 깨어나는 시간,\n1:1 맞춤 영양 설계', desc: '단순한 피로 회복을 넘어, 근본적인 세포 재생과 면역력 강화를 위한\n나음만의 프리미엄 수액 치료입니다.', bgImage: '/iv-bg.webp' }
  },
  {
    type: 'IVProblem',
    label: '수액 문제인식 (영양 결핍)',
    icon: <Search size={16} />,
    defaultData: { 
      title: '잘 낫지 않는 만성 통증,\n진짜 원인은 세포의 영양 결핍일 수 있습니다.',
      desc: '면역 저하, 만성 피로, 수술 후 체력 저하는 신체의 회복력을 무너뜨려 근골격계 통증의 악순환을 만듭니다. 겉으로 드러난 통증만을 쫓는 것이 아니라, 몸속 세포부터 다시 세우는 것이 진정한 재활의 완성입니다.'
    }
  },
  {
    type: 'IVSynergy',
    label: '수액 시너지 효과',
    icon: <Shield size={16} />,
    defaultData: {
      title: '재활 치료와 수액의 강력한 시너지',
      benefits: [
        { title: '염증의 빠른 배출', desc: '혈관을 통해 직접 투여된 고농도 영양분이 체내 염증 물질을 빠르게 해독하고 배출합니다.' },
        { title: '즉각적인 재생 물질 공급', desc: '손상된 인대, 건, 신경에 필수적인 비타민과 미네랄을 공급하여 자연 치유력을 극대화합니다.' },
        { title: '회복(리커버리) 속도 가속화', desc: '도수치료 및 수술 후 저하된 체력을 끌어올려 재활 치료의 효과를 배가시킵니다.' }
      ]
    }
  },
  {
    type: 'IVLineup',
    label: '수액 라인업',
    icon: <Heart size={16} />,
    defaultData: {
      title: '프리미엄 수액 라인업',
      lineup: [
        { tag: '활력/피로', title: '마이어스 칵테일', desc: '만성 피로 증후군 및 면역력 급감 개선', ingredients: ['비타민C', '마그네슘', '비타민B군'] },
        { tag: '신경/관절', title: '신경 재생 수액', desc: '대상포진, 척추/관절 통증 환자의 신경 염증 치료', ingredients: ['알파리포산', '비타민D', '은행잎추출물'] },
        { tag: '수술 회복', title: '포스트옵(Post-Op) 수액', desc: '근골격계 수술 후 조직 재생 및 체력 보충', ingredients: ['고농도 아미노산', '단백질', '미네랄'] },
        { tag: '항산화/안티에이징', title: '프리미엄 항산화', desc: '항노화, 갱년기 극복 및 강력한 체질 개선', ingredients: ['태반', '글루타치온', '셀레늄'] }
      ]
    }
  },
  {
    type: 'IVProcess',
    label: '수액 맞춤 처방 프로세스',
    icon: <List size={16} />,
    defaultData: {
      title: '개인 맞춤 처방 시스템',
      steps: [
        { title: '정밀 진단', desc: '체성분 및 증상 정밀 진단' },
        { title: '1:1 맞춤 처방', desc: '전문의의 1:1 맞춤 영양 배합' },
        { title: '안전한 투여', desc: '숙련된 간호팀의 프라이빗 수액 투여' },
        { title: '지속 관리', desc: '치료 경과 추적 및 성분 재조정' }
      ]
    }
  },
  {
    type: 'IVFacility',
    label: '수액 VIP 시설',
    icon: <Star size={16} />,
    defaultData: { title: '치료의 질은 쉬는 공간에서 완성됩니다.\n최고급 VIP 1인실에서 누리는 온전한 휴식' }
  },
  {
    type: 'IVOutro',
    label: '수액 아웃트로',
    icon: <Activity size={16} />,
    defaultData: { title: '지친 당신의 세포에\n프리미엄 휴식을 선사합니다.' }
  },
  {
    type: 'SportsV2Hero',
    label: '스포츠 V2 히어로',
    icon: <Activity size={16} />,
    defaultData: { title: '다시 뛰는 당신을 위해,\n한계 없는 복귀를 선사합니다.', desc: '단순한 통증 치료가 아닙니다. 부상 이전의 완벽한 퍼포먼스를 되찾아주는\n나음만의 프리미엄 스포츠 재활입니다.', bgImage: '/sports-v2-bg.webp' }
  },
  {
    type: 'SportsV2Problem',
    label: '스포츠 V2 문제인식',
    icon: <Search size={16} />,
    defaultData: { 
      title: '일반 통증과 스포츠 손상의\n치료 목표는 다릅니다.',
      desc: '단순히 일상생활이 가능할 정도로 아프지 않은 상태가 아니라, 스윙, 점프, 러닝 등 폭발적인 동작을 견뎌낼 수 있는 \'퍼포먼스의 완벽한 회복\'이 우리의 목표입니다.',
      points: [
        { title: '원인 파악', desc: '과사용으로 인한 미세 손상 및 구조적 불균형 진단' },
        { title: '목표 설정', desc: '통증 완화를 넘어 폭발적 퍼포먼스 수행 능력 회복' },
        { title: '재발 방지', desc: '생체역학적 교정을 통한 부상 근본 원인 차단' },
        { title: 'RTP 최적화', desc: '종목별 특수성을 고려한 복귀 시점 및 강도 설정' }
      ]
    }
  },
  {
    type: 'SportsV2Philosophy',
    label: '스포츠 V2 철학',
    icon: <Star size={16} />,
    defaultData: { title: '일반적인 일상 복귀를 넘어,\n완벽한 스포츠 복귀(Return to Play)를 약속합니다.' }
  },
  {
    type: 'SportsV2Targets',
    label: '스포츠 V2 타겟 질환',
    icon: <Crosshair size={16} />,
    defaultData: {
      title: '핵심 집중 치료 질환',
      targets: [
        { title: '골프/테니스 엘보', desc: '팔꿈치 힘줄의 미세 파열 및 과사용 증후군', sports: ['골프', '테니스', '배드민턴'] },
        { title: '어깨 손상', desc: '회전근개 파열 및 충돌증후군, 슬랩 병변', sports: ['야구', '수영', '웨이트트레이닝'] },
        { title: '무릎/발목 관절', desc: '십자인대, 반월상연골 파열, 만성 발목 염좌', sports: ['축구', '농구', '러닝'] },
        { title: '족부 질환', desc: '족저근막염, 아킬레스건염 등 발의 과부하로 인한 염증', sports: ['마라톤', '등산', '축구'] }
      ]
    }
  },
  {
    type: 'SportsV2Solutions',
    label: '스포츠 V2 솔루션',
    icon: <Shield size={16} />,
    defaultData: {
      title: '특화 치료 솔루션',
      solutions: [
        { title: '스포츠 전문 도수·운동치료', desc: '단순히 굳은 근육을 푸는 것을 넘어, 생체역학(Biomechanics) 기반으로 손상된 관절의 가동 범위를 회복하고 코어 근력을 강화합니다.' },
        { title: '초정밀 재생 주사 (프롤로)', desc: '고해상도 초음파를 이용하여 파열되고 늘어난 인대와 힘줄을 정확히 타겟팅, 조직 증식제를 주입하여 근본적인 재생을 유도합니다.' },
        { title: '고강도 체외충격파(ESWT)', desc: '충격파 에너지를 병변 깊숙이 전달하여 만성 염증을 깨뜨리고 미세 혈류를 재건하여 회복 속도를 극대화합니다.' }
      ]
    }
  },
  {
    type: 'SportsV2Process',
    label: '스포츠 V2 프로세스',
    icon: <List size={16} />,
    defaultData: {
      title: '4단계 RTP 회복 시스템',
      steps: [
        { title: '통증 및 부종 제어', desc: '급성기 통증과 염증을 빠르게 억제합니다.' },
        { title: '가동 범위(ROM) 회복', desc: '관절의 굳어짐을 막고 유연성을 확보합니다.' },
        { title: '근력 및 밸런스 강화', desc: '손상된 부위 주변 근력을 키워 안정성을 높입니다.' },
        { title: '스포츠 복귀 훈련', desc: '종목별 특화 퍼포먼스 훈련으로 완벽한 복귀를 돕습니다.' }
      ]
    }
  },
  {
    type: 'SportsV2Outro',
    label: '스포츠 V2 아웃트로',
    icon: <Activity size={16} />,
    defaultData: { title: '당신의 가장 빛나는 필드를 위해,\n나음이 든든한 페이스메이커가 되겠습니다.' }
  }];

// -------------------------------------------------------------
// 10. BulletinBoard Block
// -------------------------------------------------------------
export function BulletinBoardBlock({ data, isEditMode, onChange }) {
  const userProfileStr = typeof window !== 'undefined' ? localStorage.getItem('userProfile') : null;
  const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
  const canEdit = isEditMode || (userProfile && userProfile.role === 'admin');

  const [isWritePageOpen, setIsWritePageOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newDate, setNewDate] = React.useState('');
  const [newImage, setNewImage] = React.useState('');
  const [newAttachments, setNewAttachments] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const bulletins = data.bulletins || [];

  const handleUploadFile = async (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    
    const uploadPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64Data = event.target.result;
          const extension = file.name.split('.').pop() || (type === 'image' ? 'webp' : 'pdf');
          try {
            const res = await fetch('/api/cms/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ base64Data, extension })
            });
            const uploadData = await res.json();
            resolve(uploadData.success ? uploadData.url : null);
          } catch (err) {
            resolve(null);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    const urls = await Promise.all(uploadPromises);
    const validUrls = urls.filter(Boolean);

    if (validUrls.length > 0) {
      if (type === 'image') {
        setNewImage(validUrls[0]);
      } else {
        setNewAttachments(prev => [...prev, ...validUrls]);
      }
    } else {
      alert('업로드 중 오류가 발생했습니다.');
    }
    setUploading(false);
  };

  const removeAttachment = (urlToRemove) => {
    setNewAttachments(prev => prev.filter(url => url !== urlToRemove));
  };

  const addBulletin = () => {
    if (!newTitle || !newDate) {
      alert("제목과 날짜는 필수입니다.");
      return;
    }
    
    let finalImage = newImage;
    if (!finalImage && newAttachments.length > 0) {
      const firstImage = newAttachments.find(url => url.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i));
      if (firstImage) finalImage = firstImage;
    }

    const newBulletin = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      date: newDate,
      image: finalImage,
      pdf: newAttachments
    };
    onChange({ bulletins: [newBulletin, ...bulletins] });
    setIsWritePageOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewImage('');
    setNewAttachments([]);
  };

  const removeBulletin = (id) => {
    if (window.confirm("정말 이 주보를 삭제하시겠습니까?")) {
      onChange({ bulletins: bulletins.filter(b => b.id !== id) });
    }
  };

  if (isWritePageOpen) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative">
          {uploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl">
              <div className="w-8 h-8 border-4 border-[#cc0000] border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="font-bold text-gray-700">파일 업로드 중...</div>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">새 주보 등록</h3>
            <button onClick={() => setIsWritePageOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors px-4 py-2 bg-gray-50 rounded-xl font-bold">취소</button>
          </div>
          
          <div className="space-y-8">
             <div>
               <label className="block text-[14px] font-bold text-gray-700 mb-2">주보 제목 <span className="text-red-500">*</span></label>
               <input type="text" value={newTitle} onChange={e=>setNewTitle(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:bg-white focus:border-[#cc0000] focus:ring-2 focus:ring-red-100 outline-none transition-all text-[15px]" placeholder="예: 2026년 8월 4주차 주보" />
             </div>
             <div>
               <label className="block text-[14px] font-bold text-gray-700 mb-2">주보 날짜 <span className="text-red-500">*</span></label>
               <input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:bg-white focus:border-[#cc0000] focus:ring-2 focus:ring-red-100 outline-none transition-all text-gray-700 text-[15px]" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                 <label className="block text-[14px] font-bold text-gray-700 mb-2">표지 이미지 (선택)</label>
                 <p className="text-[12px] text-gray-500 mb-3">등록하지 않으면 첨부파일이 이미지일 경우 표지로 자동 사용됩니다.</p>
                 <div className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl p-6 text-center hover:border-gray-400 transition-colors group relative min-h-[180px] flex flex-col justify-center overflow-hidden">
                   {newImage ? (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-xl overflow-hidden group/cover">
                       <img src={newImage} alt="표지 미리보기" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity">
                         <button onClick={()=>setNewImage('')} className="bg-red-500 text-white text-[13px] font-bold px-4 py-2 hover:bg-red-600 transition-colors rounded-lg shadow-lg">삭제하기</button>
                       </div>
                     </div>
                   ) : (
                     <label className="cursor-pointer text-gray-600 font-bold text-[14px] flex flex-col items-center justify-center gap-3 w-full h-full">
                       <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform"><ImageIcon size={20} /></div>
                       표지 이미지 선택
                       <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadFile(e, 'image')} />
                     </label>
                   )}
                 </div>
               </div>
               <div>
                 <label className="block text-[14px] font-bold text-gray-700 mb-2">주보 첨부파일 (PDF, JPG, PNG 등 다중선택)</label>
                 <p className="text-[12px] text-gray-500 mb-3">여러 장의 주보 이미지나 PDF를 올릴 수 있습니다.</p>
                 <div className={`border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl p-3 text-center hover:border-gray-400 transition-colors group relative min-h-[180px] flex flex-col justify-center`}>
                   {newAttachments.length > 0 ? (
                     <div className="w-full grid grid-cols-3 gap-2 h-full content-start">
                       {newAttachments.map((url, idx) => (
                         <div key={idx} className="relative group/attach rounded-lg overflow-hidden border border-gray-200 aspect-[1/1.4] bg-white flex items-center justify-center shadow-sm">
                           {url.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i) ? (
                              <img src={url} alt={`첨부 ${idx+1}`} className="w-full h-full object-cover" />
                           ) : (
                              <div className="flex flex-col items-center justify-center text-red-500"><BookOpen size={20} /><span className="text-[9px] mt-1 font-bold">PDF</span></div>
                           )}
                           
                           {/* 대표이미지 뱃지 */}
                           {!newImage && idx === 0 && url.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i) && (
                             <div className="absolute top-1 left-1 bg-[#8DC63F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">대표이미지</div>
                           )}

                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/attach:opacity-100 transition-opacity">
                             <button onClick={()=>removeAttachment(url)} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"><Trash2 size={12}/></button>
                           </div>
                         </div>
                       ))}
                       {/* 추가 썸네일 박스 */}
                       <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-white rounded-lg aspect-[1/1.4] hover:bg-gray-100 transition-colors shadow-sm">
                          <Plus size={16} className="text-gray-400 mb-1" />
                          <span className="text-[10px] font-bold text-gray-400">추가</span>
                          <input type="file" multiple accept=".pdf,image/*" className="hidden" onChange={(e) => handleUploadFile(e, 'pdf')} />
                       </label>
                     </div>
                   ) : (
                     <label className="cursor-pointer text-gray-600 font-bold text-[14px] flex flex-col items-center justify-center gap-3 w-full h-full">
                       <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform"><BookOpen size={20} /></div>
                       첨부파일 다중 선택
                       <input type="file" multiple accept=".pdf,image/*" className="hidden" onChange={(e) => handleUploadFile(e, 'pdf')} />
                     </label>
                   )}
                 </div>
               </div>
             </div>
             
             <div className="pt-8 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setIsWritePageOpen(false)} className="px-6 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">취소</button>
                <button onClick={addBulletin} className="px-8 py-3.5 rounded-xl font-bold text-white bg-[#2a4358] hover:bg-[#1d2f3d] transition-colors shadow-lg">주보등록</button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
          <div className="flex-1">
             {(data.title || isEditMode) && (
               <EditableText
                 tag="h3"
                 value={data.title || ''}
                 onChange={(val) => onChange({ title: val })}
                 isEditMode={isEditMode}
                 placeholder="섹션 제목 (예: 교회 주보)"
                 className="text-3xl font-bold text-gray-900 inline-block relative"
               />
             )}
          </div>
          {canEdit && (
             <button 
               onClick={() => setIsWritePageOpen(true)}
               style={!isEditMode ? { padding: '10px 20px', backgroundColor: '#2a4358', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: 'background-color 0.2s' } : {}}
               className={isEditMode ? "bg-[#cc0000] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5" : ""}
               onMouseEnter={(e) => { if (!isEditMode) e.currentTarget.style.backgroundColor = '#1d2f3d'; }}
               onMouseLeave={(e) => { if (!isEditMode) e.currentTarget.style.backgroundColor = '#2a4358'; }}
             >
               {isEditMode ? <><Plus size={18} /> 새 주보 등록</> : '주보등록'}
             </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {bulletins.map((b) => (
            <div key={b.id} className="group relative border border-gray-100 bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                 {canEdit && (
                   <button onClick={() => removeBulletin(b.id)} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-red-500 shadow-md z-10 hover:bg-red-50 hover:scale-110 transition-all"><Trash2 size={16}/></button>
                 )}
                 <div className="w-full aspect-[1/1.414] bg-gray-200 overflow-hidden relative">
                   {b.image ? (
                     <img src={b.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="주보 표지" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">이미지 없음</div>
                   )}
                 </div>
                 <div className="p-6 bg-white border-t border-gray-100 relative z-10 -mt-2 rounded-t-2xl">
                   <div className="text-[13px] text-[#cc0000] font-bold mb-2 tracking-wide">{b.date}</div>
                   <h4 className="font-bold text-[18px] text-gray-900 mb-5 leading-snug">{b.title}</h4>
                   <div className="flex flex-col gap-2">
                     {b.pdf && (Array.isArray(b.pdf) ? b.pdf : [b.pdf]).map((pdfUrl, idx) => {
                       if (!pdfUrl) return null;
                       const isImg = pdfUrl.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
                       return (
                         <a key={idx} href={pdfUrl} target="_blank" rel="noreferrer" className="flex-1 text-center py-2.5 bg-[#cc0000] text-white rounded-xl text-[14px] font-bold hover:bg-red-700 transition-colors shadow-sm">
                           {isImg ? (Array.isArray(b.pdf) && b.pdf.length > 1 ? `주보 이미지 열기 (${idx+1})` : '주보 이미지 열기') : 'PDF 다운로드'}
                         </a>
                       )
                     })}
                   </div>
                 </div>
              </div>
           ))}
        </div>
        
        {bulletins.length === 0 && !isEditMode && (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-gray-500">등록된 주보가 없습니다.</div>
        )}
      </div>

    </section>
  );
}

// -------------------------------------------------------------
// 11. FacilityGallery Block
// -------------------------------------------------------------
export function FacilityGalleryBlock({ data, isEditMode, onChange }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = data.images || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex] || {};

  return (
    <section className="py-20 md:py-32 bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="갤러리 제목 (예: 나음재활의학과의원 둘러보기)"
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
          />
          <EditableText
            tag="p"
            value={data.desc || ''}
            onChange={(val) => onChange({ desc: val })}
            isEditMode={isEditMode}
            placeholder="갤러리 설명 (예: 쾌적하고 편안한 진료 환경을 소개합니다.)"
            className="text-lg text-gray-500 font-light"
          />
        </motion.div>

        {images.length > 0 ? (
          <div className="flex flex-col gap-6">
            {/* Main Large Image */}
            <div className="relative w-full aspect-video md:aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <EditableImage
                    src={currentImage.src || ''}
                    onChange={(val) => {
                      const newImages = [...images];
                      newImages[currentIndex] = { ...currentImage, src: val };
                      onChange({ images: newImages });
                    }}
                    isEditMode={isEditMode}
                    placeholder={<div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50"><ImageIcon className="mb-4 w-12 h-12" />큰 이미지 등록</div>}
                    imageClassName="w-full h-full object-cover"
                    className="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Image Title / Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                <EditableText
                  tag="h3"
                  value={currentImage.title || ''}
                  onChange={(val) => {
                    const newImages = [...images];
                    newImages[currentIndex] = { ...currentImage, title: val };
                    onChange({ images: newImages });
                  }}
                  isEditMode={isEditMode}
                  placeholder="이미지 설명 (예: 쾌적한 로비 전경)"
                  className="text-xl md:text-2xl font-bold text-white drop-shadow-md"
                />
              </div>
            </div>

            {/* Thumbnails (1 row of 4, grid) */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${currentIndex === idx ? 'border-[#8DC63F] shadow-lg opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <EditableImage
                    src={img.src || ''}
                    onChange={(val) => {
                      const newImages = [...images];
                      newImages[idx] = { ...img, src: val };
                      onChange({ images: newImages });
                    }}
                    isEditMode={isEditMode}
                    placeholder={<div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100 text-xs text-center p-2"><ImageIcon className="mb-1 w-5 h-5" />썸네일</div>}
                    imageClassName="w-full h-full object-cover"
                    className="w-full h-full"
                  />
                  {currentIndex === idx && (
                    <div className="absolute inset-0 bg-[#8DC63F]/10 pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Add/Remove functionality for Edit Mode */}
            {isEditMode && (
              <div className="mt-8 flex justify-center gap-4">
                <button onClick={() => onChange({ images: [...images, { src: '', title: '새 이미지' }] })} className="px-6 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors">
                  <Plus className="w-4 h-4" /> 이미지 추가
                </button>
                {images.length > 0 && (
                  <button onClick={() => {
                    const newImages = [...images];
                    newImages.splice(currentIndex, 1);
                    onChange({ images: newImages });
                    setCurrentIndex(0);
                  }} className="px-6 py-2 bg-red-500 text-white rounded-full flex items-center gap-2 hover:bg-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" /> 현재 이미지 삭제
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-100 rounded-2xl text-gray-500">
            등록된 이미지가 없습니다.
            {isEditMode && (
              <button onClick={() => onChange({ images: [{ src: '', title: '첫 번째 이미지' }] })} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full inline-flex items-center gap-2 hover:bg-blue-600 transition-colors mx-auto">
                <Plus className="w-4 h-4" /> 갤러리 시작하기
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// 12. Location Block
// -------------------------------------------------------------
export function LocationBlock({ data, onChange }) {
  const { title, desc, address, phone, mapPlaceholder, transport } = data;

  return (
    <div className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Title Section */}
        <div className="text-center mb-16">
          <span className="text-[#0369A1] text-[13px] md:text-[14px] font-bold tracking-[0.2em] uppercase mb-3 block">LOCATION</span>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#404b5c] tracking-tight mb-4">{title}</h2>
          <p className="text-[15px] md:text-[16px] text-gray-500 font-medium break-keep">{desc}</p>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-[350px] md:h-[450px] bg-[#f8f9fa] rounded-2xl border border-gray-200 flex flex-col items-center justify-center mb-12 shadow-inner relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <MapPin size={48} className="text-[#0369A1] mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-[18px] md:text-[22px] font-bold text-gray-700 z-10">{mapPlaceholder || '지도 영역 (추후 연동)'}</h3>
          <p className="text-[14px] text-gray-400 mt-2 z-10">이곳에 카카오맵 또는 네이버지도가 연동될 예정입니다.</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Left: Contact & Address */}
          <div className="md:col-span-2 flex flex-col justify-center bg-[#0369A1] rounded-2xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="mb-10 relative z-10">
              <div className="flex items-center mb-4 text-white/80">
                <MapPin size={20} className="mr-2" />
                <span className="font-semibold tracking-wide text-[14px]">병원 주소</span>
              </div>
              <p className="text-[20px] md:text-[24px] font-bold leading-snug break-keep mb-2">
                {address?.main}
              </p>
              <p className="text-[14px] md:text-[15px] text-white/70">
                {address?.sub}
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex items-center mb-4 text-white/80">
                <Phone size={20} className="mr-2" />
                <span className="font-semibold tracking-wide text-[14px]">상담 및 예약문의</span>
              </div>
              <p className="text-[32px] md:text-[40px] font-extrabold tracking-tight">
                {phone}
              </p>
            </div>
          </div>

          {/* Right: Transport Methods */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {transport?.map((item, idx) => {
              const IconComp = IconMap[item.icon] || MapPin;
              return (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0369A1] mb-5">
                    <IconComp size={24} />
                  </div>
                  <h4 className="text-[17px] font-bold text-[#404b5c] mb-3">{item.title}</h4>
                  <ul className="text-[14px] text-gray-600 leading-relaxed space-y-1.5 break-keep">
                    {item.details?.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start">
                        <span className="text-[#0369A1] mr-2 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}



// -------------------------------------------------------------
// EmptyBlock
// -------------------------------------------------------------
export function EmptyBlock() {
  return (
    <div className="w-full py-20 bg-gray-50 flex items-center justify-center border border-dashed border-gray-200 text-gray-500 rounded-2xl">
      블록이 없습니다. 새로운 블록을 추가해주세요.
    </div>
  );
}

// -------------------------------------------------------------
// PhilosophyHero Block
// -------------------------------------------------------------
export function PhilosophyHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-50">
      {/* Soft blurred gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#f0f5ed] blur-[100px] opacity-80"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#e8ecef] blur-[100px] opacity-80"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 md:space-y-10"
        >
          <EditableText
            tag="h1"
            value={data.mainCopy || ''}
            onChange={(val) => onChange({ mainCopy: val })}
            isEditMode={isEditMode}
            placeholder="메인 카피 (예: 통증을 지우고, 일상을 그리다.)"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.2]"
          />
          <div className="w-12 h-[2px] bg-gray-300 mx-auto"></div>
          <EditableText
            tag="p"
            multiline={true}
            value={data.subCopy || ''}
            onChange={(val) => onChange({ subCopy: val })}
            isEditMode={isEditMode}
            placeholder="서브 카피"
            className="text-lg md:text-2xl text-gray-600 font-light leading-[1.6] md:leading-[1.8] break-keep max-w-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PhilosophyGreeting Block
// -------------------------------------------------------------
export function PhilosophyGreetingBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[45%] flex-shrink-0"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 aspect-[3/4] md:aspect-[4/5]">
              <EditableImage
                src={data.image || ''}
                onChange={(val) => onChange({ image: val })}
                isEditMode={isEditMode}
                placeholder={<div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">대표원장 사진</div>}
                imageClassName="w-full h-full object-cover"
                className="w-full h-full"
              />
            </div>
          </motion.div>
          
          {/* Right: Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-[55%] flex flex-col justify-center"
          >
            <div className="mb-10 md:mb-12">
              <span className="text-[#8DC63F] font-semibold tracking-widest text-sm mb-4 block uppercase">CEO's Greeting</span>
              <EditableText
                tag="h2"
                multiline={true}
                value={data.quote || ''}
                onChange={(val) => onChange({ quote: val })}
                isEditMode={isEditMode}
                placeholder="인용구 (예: 환자의 아픔은 몸에만 머물지 않습니다...)"
                className="text-2xl md:text-4xl font-bold text-gray-900 leading-[1.4] tracking-tight break-keep"
              />
            </div>
            
            <div className="space-y-6 text-[16px] md:text-lg text-gray-600 leading-[1.8] font-light break-keep">
              {isEditMode ? (
                <EditableText
                  tag="div"
                  multiline={true}
                  value={(data.paragraphs || []).join('\n\n')}
                  onChange={(val) => onChange({ paragraphs: val.split('\n\n') })}
                  isEditMode={true}
                  placeholder="단락을 두 번 엔터로 구분하여 입력하세요"
                />
              ) : (
                data.paragraphs?.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>') }} />
                ))
              )}
            </div>
            
            <div className="mt-12 flex items-center gap-4">
              <EditableText
                tag="div"
                value={data.signature || ''}
                onChange={(val) => onChange({ signature: val })}
                isEditMode={isEditMode}
                placeholder="대표원장 홍길동"
                className="text-xl font-bold text-gray-900"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PhilosophyPrinciples Block
// -------------------------------------------------------------
export function PhilosophyPrinciplesBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <EditableText
            tag="span"
            value={data.badge || ''}
            onChange={(val) => onChange({ badge: val })}
            isEditMode={isEditMode}
            placeholder="배지 (예: CORE PHILOSOPHY)"
            className="text-[#8DC63F] font-bold tracking-widest text-sm mb-4 block uppercase"
          />
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="나음의 3대 진료 철학"
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.principles?.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-white/70 backdrop-blur-md border border-white/40 p-10 md:p-12 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-[#8DC63F] group-hover:text-white transition-colors duration-500 text-gray-400 shadow-sm border border-gray-100">
                {/* Icon mapping would go here, omitting for simplicity */}
                <div className="w-8 h-8 rounded-full bg-current"></div>
              </div>
              
              <div className="text-[#8DC63F] font-semibold text-sm mb-2">{`PRINCIPLE 0${idx + 1}`}</div>
              <EditableText
                tag="h3"
                value={item.title || ''}
                onChange={(val) => {
                  const newVals = [...data.principles];
                  newVals[idx] = { ...item, title: val };
                  onChange({ principles: newVals });
                }}
                isEditMode={isEditMode}
                placeholder="철학 제목"
                className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight break-keep"
              />
              <EditableText
                tag="p"
                multiline={true}
                value={item.desc || ''}
                onChange={(val) => {
                  const newVals = [...data.principles];
                  newVals[idx] = { ...item, desc: val };
                  onChange({ principles: newVals });
                }}
                isEditMode={isEditMode}
                placeholder="철학 설명"
                className="text-gray-500 leading-[1.8] font-light break-keep text-[16px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PhilosophyPromise Block
// -------------------------------------------------------------
export function PhilosophyPromiseBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-40 bg-[#111111] text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        <EditableText
          tag="h2"
          multiline={true}
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="가장 건강했던 순간으로..."
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 leading-[1.4] tracking-tight mb-8 break-keep"
        />
        <EditableText
          tag="p"
          multiline={true}
          value={data.desc || ''}
          onChange={(val) => onChange({ desc: val })}
          isEditMode={isEditMode}
          placeholder="서브 약속"
          className="text-lg md:text-xl text-gray-400 font-light break-keep"
        />
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// PhilosophyCTA Block
// -------------------------------------------------------------
export function PhilosophyCTABlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-20 md:py-32 bg-white text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6"
      >
        <EditableText
          tag="h2"
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="이제, 통증과 이별할 시간입니다."
          className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight mb-10"
        />
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={data.btn1Link || "#"} onClick={e => isEditMode && e.preventDefault()} className="inline-block px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-black transition-colors hover:shadow-lg">
            <EditableText
              tag="span"
              value={data.btn1Text || ''}
              onChange={(val) => onChange({ btn1Text: val })}
              isEditMode={isEditMode}
              placeholder="버튼 1 텍스트"
            />
          </a>
          <a href={data.btn2Link || "#"} onClick={e => isEditMode && e.preventDefault()} className="inline-block px-8 py-4 bg-white text-gray-900 border border-gray-200 font-medium rounded-full hover:bg-gray-50 transition-colors hover:shadow-sm">
            <EditableText
              tag="span"
              value={data.btn2Text || ''}
              onChange={(val) => onChange({ btn2Text: val })}
              isEditMode={isEditMode}
              placeholder="버튼 2 텍스트"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// SpineHero Block (Apple-style)
// -------------------------------------------------------------
export function SpineHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-[#fafafa] overflow-hidden selection:bg-black/10">
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 150, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[80px]"
        />
        <motion.div 
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 150, -100, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-[35rem] h-[35rem] bg-green-300/40 rounded-full mix-blend-multiply filter blur-[80px]"
        />
        <motion.div 
          animate={{
            x: [0, 100, -150, 0],
            y: [0, 100, -50, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 left-1/4 w-[45rem] h-[45rem] bg-sky-300/40 rounded-full mix-blend-multiply filter blur-[80px]"
        />
        {/* Reduce overlay opacity so colors pop through more */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[60px]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <EditableText
            tag="h1"
            value={data.mainCopy || ''}
            onChange={(val) => onChange({ mainCopy: val })}
            isEditMode={isEditMode}
            placeholder="수술 없이. 다시 곧게."
            className="text-5xl md:text-7xl lg:text-[100px] font-extrabold text-[#0369A1] tracking-tighter leading-[1.1]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <EditableText
              tag="p"
              multiline={true}
              value={data.subCopy || ''}
              onChange={(val) => onChange({ subCopy: val })}
              isEditMode={isEditMode}
              placeholder="서브 카피"
              className="text-lg md:text-2xl text-gray-600 font-light leading-[1.6] md:leading-[1.8] break-keep max-w-3xl mx-auto tracking-tight"
            />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] mb-2 font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// SpineSymptoms Block (Apple-style Sticky)
// -------------------------------------------------------------
export function SpineSymptomsBlock({ data, isEditMode, onChange }) {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">
          
          {/* Left: Sticky Title */}
          <div className="w-full md:w-[45%] md:relative h-auto">
            <div className="md:sticky md:top-[120px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <EditableText
                  tag="h2"
                  multiline={true}
                  value={data.title || ''}
                  onChange={(val) => onChange({ title: val })}
                  isEditMode={isEditMode}
                  placeholder="척추가 보내는 조용한 경고."
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.25] break-keep"
                />
                <div className="w-16 h-1 bg-[#8DC63F] mt-8 mb-6 rounded-full"></div>
                <EditableText
                  tag="p"
                  multiline={true}
                  value={data.desc || ''}
                  onChange={(val) => onChange({ desc: val })}
                  isEditMode={isEditMode}
                  placeholder="증상 설명"
                  className="text-lg md:text-xl text-gray-500 font-light leading-[1.7] break-keep"
                />
                
                <div className="mt-12 rounded-[2rem] overflow-hidden shadow-2xl relative aspect-[4/3] group hidden md:block border border-gray-100/50">
                  <img 
                    src={data.image || "/spine-symptoms.webp"} 
                    alt="척추 통증" 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Right: Scrolling Cards */}
          <div className="w-full md:w-[55%] space-y-6 md:space-y-8 pt-10 md:pt-40 pb-10">
            {data.symptoms?.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-[#f8f9fa] rounded-[2rem] p-8 md:p-10 hover:shadow-xl transition-shadow duration-500 border border-gray-100/50"
              >
                <div className="text-gray-300 font-bold text-5xl md:text-6xl mb-6 opacity-30">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <EditableText
                  tag="h3"
                  value={item.title || ''}
                  onChange={(val) => {
                    const newVals = [...data.symptoms];
                    newVals[idx] = { ...item, title: val };
                    onChange({ symptoms: newVals });
                  }}
                  isEditMode={isEditMode}
                  placeholder="증상"
                  className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-[1.4] break-keep"
                />
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// SpineBento Block (Apple-style Bento Grid)
// -------------------------------------------------------------
export function SpineBentoBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-24 md:py-32 bg-[#1a1a1a] text-white selection:bg-[#8DC63F]/30">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="완벽한 3단계 치료"
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400"
          />
        </motion.div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min md:auto-rows-[240px]">
          
          {/* Card 1: Large (Span 2 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 bg-gradient-to-br from-[#2a2a2a] to-[#222] rounded-[2rem] p-10 flex flex-col justify-end relative overflow-hidden border border-white/5 group hover:border-white/10 transition-colors"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
              <Search className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-10 w-full md:w-3/4">
              <span className="text-[#8DC63F] font-semibold text-sm mb-3 block tracking-wider uppercase">Step 01</span>
              <EditableText
                tag="h3"
                value={data.cards?.[0]?.title || ''}
                onChange={(val) => {
                  const newCards = [...(data.cards || [])];
                  newCards[0] = { ...newCards[0], title: val };
                  onChange({ cards: newCards });
                }}
                isEditMode={isEditMode}
                placeholder="초정밀 진단"
                className="text-2xl md:text-4xl font-bold mb-4 tracking-tight leading-[1.3] break-keep"
              />
              <EditableText
                tag="p"
                multiline={true}
                value={data.cards?.[0]?.desc || ''}
                onChange={(val) => {
                  const newCards = [...(data.cards || [])];
                  newCards[0] = { ...newCards[0], desc: val };
                  onChange({ cards: newCards });
                }}
                isEditMode={isEditMode}
                placeholder="설명"
                className="text-gray-400 text-[15px] md:text-[17px] font-light leading-[1.6]"
              />
            </div>
          </motion.div>
          
          {/* Card 2: Medium (Span 1 col, 2 rows if we were doing css grid tricks, but let's just make it normal 1 col) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-[#2a2a2a] to-[#222] rounded-[2rem] p-10 flex flex-col justify-end relative overflow-hidden border border-white/5 group hover:border-white/10 transition-colors min-h-[300px] md:min-h-0"
          >
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
              <Activity className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10 w-full">
              <span className="text-[#8DC63F] font-semibold text-sm mb-3 block tracking-wider uppercase">Step 02</span>
              <EditableText
                tag="h3"
                value={data.cards?.[1]?.title || ''}
                onChange={(val) => {
                  const newCards = [...(data.cards || [])];
                  newCards[1] = { ...newCards[1], title: val };
                  onChange({ cards: newCards });
                }}
                isEditMode={isEditMode}
                placeholder="주사 치료"
                className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-[1.3] break-keep"
              />
              <EditableText
                tag="p"
                multiline={true}
                value={data.cards?.[1]?.desc || ''}
                onChange={(val) => {
                  const newCards = [...(data.cards || [])];
                  newCards[1] = { ...newCards[1], desc: val };
                  onChange({ cards: newCards });
                }}
                isEditMode={isEditMode}
                placeholder="설명"
                className="text-gray-400 text-[15px] font-light leading-[1.6]"
              />
            </div>
          </motion.div>

          {/* Card 3: Small */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-1 bg-[#222] rounded-[2rem] p-8 flex flex-col relative overflow-hidden border border-white/5 group hover:bg-[#252525] transition-colors"
          >
            <span className="text-[#8DC63F] font-semibold text-xs mb-2 block tracking-wider uppercase">Step 03</span>
            <EditableText
              tag="h3"
              value={data.cards?.[2]?.title || ''}
              onChange={(val) => {
                const newCards = [...(data.cards || [])];
                newCards[2] = { ...newCards[2], title: val };
                onChange({ cards: newCards });
              }}
              isEditMode={isEditMode}
              placeholder="감압치료"
              className="text-xl font-bold mb-3 tracking-tight break-keep"
            />
            <EditableText
              tag="p"
              multiline={true}
              value={data.cards?.[2]?.desc || ''}
              onChange={(val) => {
                const newCards = [...(data.cards || [])];
                newCards[2] = { ...newCards[2], desc: val };
                onChange({ cards: newCards });
              }}
              isEditMode={isEditMode}
              placeholder="설명"
              className="text-gray-400 text-[14px] font-light leading-[1.6] mt-auto"
            />
          </motion.div>

          {/* Card 4: Small */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-1 bg-[#222] rounded-[2rem] p-8 flex flex-col relative overflow-hidden border border-white/5 group hover:bg-[#252525] transition-colors"
          >
            <span className="text-[#8DC63F] font-semibold text-xs mb-2 block tracking-wider uppercase">Step 04</span>
            <EditableText
              tag="h3"
              value={data.cards?.[3]?.title || ''}
              onChange={(val) => {
                const newCards = [...(data.cards || [])];
                newCards[3] = { ...newCards[3], title: val };
                onChange({ cards: newCards });
              }}
              isEditMode={isEditMode}
              placeholder="도수치료"
              className="text-xl font-bold mb-3 tracking-tight break-keep"
            />
            <EditableText
              tag="p"
              multiline={true}
              value={data.cards?.[3]?.desc || ''}
              onChange={(val) => {
                const newCards = [...(data.cards || [])];
                newCards[3] = { ...newCards[3], desc: val };
                onChange({ cards: newCards });
              }}
              isEditMode={isEditMode}
              placeholder="설명"
              className="text-gray-400 text-[14px] font-light leading-[1.6] mt-auto"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// SpineOutro Block (Apple-style Minimal Outro)
// -------------------------------------------------------------
export function SpineOutroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="py-32 md:py-52 bg-white text-center flex items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        <EditableText
          tag="h2"
          multiline={true}
          value={data.title || ''}
          onChange={(val) => onChange({ title: val })}
          isEditMode={isEditMode}
          placeholder="건강했던 일상으로의 복귀.\n지금 나음재활의학과에서 시작하세요."
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.25] break-keep"
        />
      </motion.div>
    </section>
  );
}

