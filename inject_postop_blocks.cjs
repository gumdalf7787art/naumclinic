const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PageBlocks.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const postOpBlocksCode = `
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
// PostOpTypes Block (Interactive Tabs)
// -------------------------------------------------------------
export function PostOpTypesBlock({ data, isEditMode, onChange }) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section className="py-24 md:py-32 bg-[#050B14] text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="모든 수술에 대한 해답"
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          />
          <p className="text-gray-400 text-lg md:text-xl max-w-md break-keep">
            어떤 부위의 수술이든, 나음의 숙련된 치료팀이 맞춤형 솔루션을 제공합니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Tabs Menu */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {data.types?.map((type, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={\`text-left px-8 py-6 rounded-2xl transition-all duration-300 font-bold text-xl md:text-2xl border-l-4 \${
                  activeTab === idx 
                    ? 'bg-white/10 text-white border-[#0369A1]' 
                    : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
                }\`}
              >
                {type.category}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 h-full"
              >
                <div className="flex items-center gap-4 mb-8 text-[#0369A1]">
                  <Crosshair className="w-8 h-8" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {data.types?.[activeTab]?.category} 재활
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data.types?.[activeTab]?.items?.map((item, i) => (
                    <div key={i} className="bg-black/20 p-6 rounded-xl border border-white/5">
                      <h4 className="text-xl font-bold text-gray-200 mb-3">{item.name}</h4>
                      <p className="text-gray-400 leading-relaxed break-keep">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
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
              
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                <div className="text-[#0369A1] font-bold text-sm tracking-widest uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  Phase {idx + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{stage.title}</h3>
                
                <p className="text-gray-600 leading-relaxed text-lg break-keep opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
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
          placeholder="혼자서는 힘든 재활,\\n나음이 끝까지 함께합니다."
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.3] break-keep whitespace-pre-line"
        />
      </motion.div>
    </section>
  );
}
`;

if (!content.includes('PostOpHeroBlock')) {
  // Insert blocks before BLOCK_REGISTRY
  const insertIndex = content.indexOf('// Block Renderer Registry');
  if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + postOpBlocksCode + '\n' + content.slice(insertIndex);
  }

  // Update BLOCK_REGISTRY
  const registryMatch = content.match(/const BLOCK_REGISTRY = {([\s\S]*?)};/);
  if (registryMatch) {
    let registryInner = registryMatch[1];
    if (!registryInner.includes('PostOpHero:')) {
      registryInner = registryInner.replace(
        'Empty: EmptyBlock',
        'PostOpHero: PostOpHeroBlock,\n  PostOpNeeds: PostOpNeedsBlock,\n  PostOpTypes: PostOpTypesBlock,\n  PostOpStages: PostOpStagesBlock,\n  PostOpOutro: PostOpOutroBlock,\n  Empty: EmptyBlock'
      );
      content = content.replace(registryMatch[0], 'const BLOCK_REGISTRY = {' + registryInner + '};');
    }
  }

  // Update BLOCK_DEFINITIONS
  const definitionsMatch = content.match(/export const BLOCK_DEFINITIONS = \[([\s\S]*?)\];/);
  if (definitionsMatch) {
    let defsInner = definitionsMatch[1];
    if (!defsInner.includes("type: 'PostOpHero'")) {
      const newDefs = `,
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
    defaultData: { title: '혼자서는 힘든 재활,\\n나음이 끝까지 함께합니다.' }
  }`;
      content = content.replace(definitionsMatch[0], 'export const BLOCK_DEFINITIONS = [' + defsInner + newDefs + '];');
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('PostOp blocks injected successfully.');
} else {
  console.log('PostOp blocks already exist.');
}
