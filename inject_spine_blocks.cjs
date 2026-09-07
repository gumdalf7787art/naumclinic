const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'PageBlocks.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Update imports
if (!content.includes('useScroll')) {
  content = content.replace(
    "import { motion, AnimatePresence } from 'framer-motion';",
    "import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';"
  );
}
if (!content.includes('useRef')) {
  content = content.replace(
    "import React from 'react';",
    "import React, { useRef } from 'react';"
  );
}

// 2. Add Spine Blocks
const spineBlocksStr = `
// -------------------------------------------------------------
// SpineHero Block (Apple-style)
// -------------------------------------------------------------
export function SpineHeroBlock({ data, isEditMode, onChange }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-black overflow-hidden selection:bg-white/20">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <EditableText
            tag="h1"
            value={data.mainCopy || ''}
            onChange={(val) => onChange({ mainCopy: val })}
            isEditMode={isEditMode}
            placeholder="수술 없이. 다시 곧게."
            className="text-5xl md:text-7xl lg:text-[100px] font-extrabold text-white tracking-tighter leading-[1.1]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <EditableText
              tag="p"
              multiline={true}
              value={data.subCopy || ''}
              onChange={(val) => onChange({ subCopy: val })}
              isEditMode={isEditMode}
              placeholder="서브 카피"
              className="text-lg md:text-2xl text-gray-400 font-light leading-[1.6] md:leading-[1.8] break-keep max-w-3xl mx-auto tracking-tight"
            />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] mb-2 font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
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
                viewport={{ once: true, margin: "-100px" }}
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
                viewport={{ once: true, margin: "-100px" }}
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
          placeholder="건강했던 일상으로의 복귀.\\n지금 나음재활의학과에서 시작하세요."
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.25] break-keep"
        />
      </motion.div>
    </section>
  );
}
`;

content += '\n' + spineBlocksStr + '\n';

// 3. Update BLOCK_REGISTRY
const registryMatch = content.match(/const BLOCK_REGISTRY = {([\\s\\S]*?)};/);
if (registryMatch) {
  let registryInner = registryMatch[1];
  if (!registryInner.includes('SpineHero:')) {
    registryInner = registryInner.replace(
      'Empty: EmptyBlock',
      'SpineHero: SpineHeroBlock,\n  SpineSymptoms: SpineSymptomsBlock,\n  SpineBento: SpineBentoBlock,\n  SpineOutro: SpineOutroBlock,\n  Empty: EmptyBlock'
    );
    content = content.replace(registryMatch[0], 'const BLOCK_REGISTRY = {' + registryInner + '};');
  }
}

// 4. Update BLOCK_DEFINITIONS
const definitionsMatch = content.match(/export const BLOCK_DEFINITIONS = \[([\s\S]*?)\];/);
if (definitionsMatch) {
  let defsInner = definitionsMatch[1];
  if (!defsInner.includes("type: 'SpineHero'")) {
    const newDefs = `,
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
  }`;
    // Insert before the end of the array
    // Wait, defsInner might not end cleanly. We can just append to the array.
    content = content.replace(definitionsMatch[0], 'export const BLOCK_DEFINITIONS = [' + defsInner + newDefs + '];');
  }
}

fs.writeFileSync(targetFile, content);
console.log('Spine Apple-style blocks injected.');
