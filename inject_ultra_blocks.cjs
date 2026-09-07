const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PageBlocks.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const ultraBlocksCode = `
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
              className={\`flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 md:p-10 rounded-[2rem] bg-gray-50 border border-gray-100 \${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}\`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-lg text-[#0369A1] font-black text-2xl md:text-3xl border-4 border-gray-50">
                {target.part}
              </div>
              <div className={\`flex-1 text-center \${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}\`}>
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
            placeholder="정확한 진단이\\n정확한 치료를 만듭니다."
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.4] break-keep whitespace-pre-line"
          />
        </motion.div>
      </div>
    </section>
  );
}
`;

if (!content.includes('UltraHeroBlock')) {
  // Insert blocks before BLOCK_REGISTRY
  const insertIndex = content.indexOf('// Block Renderer Registry');
  if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + ultraBlocksCode + '\n' + content.slice(insertIndex);
  }

  // Update BLOCK_REGISTRY
  const registryMatch = content.match(/const BLOCK_REGISTRY = {([\s\S]*?)};/);
  if (registryMatch) {
    let registryInner = registryMatch[1];
    if (!registryInner.includes('UltraHero:')) {
      registryInner = registryInner.replace(
        'Empty: EmptyBlock',
        'UltraHero: UltraHeroBlock,\n  UltraFeatures: UltraFeaturesBlock,\n  UltraTarget: UltraTargetBlock,\n  UltraOutro: UltraOutroBlock,\n  Empty: EmptyBlock'
      );
      content = content.replace(registryMatch[0], 'const BLOCK_REGISTRY = {' + registryInner + '};');
    }
  }

  // Update BLOCK_DEFINITIONS
  const definitionsMatch = content.match(/export const BLOCK_DEFINITIONS = \[([\s\S]*?)\];/);
  if (definitionsMatch) {
    let defsInner = definitionsMatch[1];
    if (!defsInner.includes("type: 'UltraHero'")) {
      const newDefs = `,
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
    defaultData: { title: '정확한 진단이\\n정확한 치료를 만듭니다.' }
  }`;
      content = content.replace(definitionsMatch[0], 'export const BLOCK_DEFINITIONS = [' + defsInner + newDefs + '];');
    }
  }
  
  if (!content.includes('Crosshair')) {
      content = content.replace("Star } from 'lucide-react';", "Star, Crosshair } from 'lucide-react';");
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Ultra blocks injected successfully.');
} else {
  console.log('Ultra blocks already exist.');
}
