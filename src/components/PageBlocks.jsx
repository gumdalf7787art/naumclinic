import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Users, Heart, Globe, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

// -------------------------------------------------------------
// ICON MAP
// -------------------------------------------------------------
export const IconMap = {
  BookOpen: <BookOpen className="w-8 h-8" />,
  Flame: <Flame className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  ImageIcon: <ImageIcon className="w-8 h-8" />
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
  VisionOutro: VisionOutroBlock
};

export function BlockRenderer({ blocks, isEditMode = false, onChange }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-2">
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
  }
];

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
