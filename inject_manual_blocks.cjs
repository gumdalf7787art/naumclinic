const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PageBlocks.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const manualBlocksCode = `
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
            placeholder="숙련된 치료사의 손길로 굳어진 근육을 풀고, 틀어진 체형을 바로잡아 통증의 근본 원인을 해결하는 1:1 맞춤 치료입니다."
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
              className={\`p-10 rounded-[2.5rem] border border-gray-100 transition-shadow duration-300 hover:shadow-xl flex flex-col justify-between \${idx === 0 || idx === 3 ? 'bg-[#FDFBF7]' : 'bg-white'}\`}
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
              <div key={idx} className={\`flex flex-col md:flex-row items-center gap-8 md:gap-16 \${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}\`}>
                
                {/* Content Side */}
                <div className={\`w-full md:w-1/2 pl-24 md:pl-0 \${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}\`}>
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
            placeholder="바른 체형이\\n바른 일상을 만듭니다."
            className="text-4xl md:text-6xl font-extrabold text-[#2C2926] tracking-tighter leading-[1.4] break-keep whitespace-pre-line"
          />
        </motion.div>
      </div>
    </section>
  );
}
`;

if (!content.includes('ManualHeroBlock')) {
  // Insert blocks before BLOCK_REGISTRY
  const insertIndex = content.indexOf('// Block Renderer Registry');
  if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + manualBlocksCode + '\n' + content.slice(insertIndex);
  }

  // Update BLOCK_REGISTRY
  const registryMatch = content.match(/const BLOCK_REGISTRY = {([\s\S]*?)};/);
  if (registryMatch) {
    let registryInner = registryMatch[1];
    if (!registryInner.includes('ManualHero:')) {
      registryInner = registryInner.replace(
        'Empty: EmptyBlock',
        'ManualHero: ManualHeroBlock,\n  ManualTarget: ManualTargetBlock,\n  ManualProcess: ManualProcessBlock,\n  ManualOutro: ManualOutroBlock,\n  Empty: EmptyBlock'
      );
      content = content.replace(registryMatch[0], 'const BLOCK_REGISTRY = {' + registryInner + '};');
    }
  }

  // Update BLOCK_DEFINITIONS
  const definitionsMatch = content.match(/export const BLOCK_DEFINITIONS = \[([\s\S]*?)\];/);
  if (definitionsMatch) {
    let defsInner = definitionsMatch[1];
    if (!defsInner.includes("type: 'ManualHero'")) {
      const newDefs = `,
  {
    type: 'ManualHero',
    label: '도수치료 헤로',
    icon: <ImageIcon size={16} />,
    defaultData: { mainCopy: '손끝에서 시작되는 척추의 바른 균형', subCopy: '숙련된 치료사의 손길로 굳어진 근육을 풀고, 틀어진 체형을 바로잡아 통증의 근본 원인을 해결하는 1:1 맞춤 치료입니다.' }
  },
  {
    type: 'ManualTarget',
    label: '도수치료 대상 (Bento)',
    icon: <Users size={16} />,
    defaultData: { title: '이런 분들께 필요합니다', targets: [{title: '거북목 / 일자목', desc: '스마트폰과 PC 사용으로 목과 어깨가 항상 뭉쳐있는 분'}, {title: '만성 통증', desc: '목, 허리 디스크나 협착증으로 고생하시는 분'}, {title: '체형 불균형', desc: '골반이 틀어지거나 양쪽 어깨 높이가 달라 교정이 필요한 분'}, {title: '수술 후 재활', desc: '척추/관절 수술 후 굳어진 관절의 가동 범위를 회복해야 하는 분'}] }
  },
  {
    type: 'ManualProcess',
    label: '도수치료 프로세스 (타임라인)',
    icon: <Activity size={16} />,
    defaultData: { title: '나음만의 4단계 도수치료 시스템', steps: [{title: '정밀 진단', desc: '전문의의 X-ray 및 체형 분석을 통한 1:1 처방'}, {title: '근막 이완', desc: '긴장되고 굳어진 근육과 근막을 부드럽게 이완'}, {title: '체형 교정', desc: '척추와 관절의 미세한 틀어짐을 본래 자리로 회복'}, {title: '기능 강화', desc: '약해진 심부 근육을 강화하여 통증 재발을 방지'}] }
  },
  {
    type: 'ManualOutro',
    label: '도수치료 아웃트로',
    icon: <Heart size={16} />,
    defaultData: { title: '바른 체형이\\n바른 일상을 만듭니다.' }
  }`;
      content = content.replace(definitionsMatch[0], 'export const BLOCK_DEFINITIONS = [' + defsInner + newDefs + '];');
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Manual blocks injected successfully.');
} else {
  console.log('Manual blocks already exist.');
}
