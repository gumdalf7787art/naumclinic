const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PageBlocks.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const jointBlocksCode = `
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
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-20">
        
        <div className="max-w-[1200px] w-full mx-auto px-6 mb-12 flex-shrink-0">
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

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-[max(24px,calc((100vw-1200px)/2))] w-max">
          {data.symptoms?.map((item, idx) => (
            <div 
              key={idx} 
              className="w-[300px] md:w-[450px] h-[400px] md:h-[450px] bg-white rounded-[2rem] p-10 shadow-[0_20px_40px_rgb(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between"
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
    <section className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-16 md:mb-24">
          <EditableText
            tag="h2"
            value={data.title || ''}
            onChange={(val) => onChange({ title: val })}
            isEditMode={isEditMode}
            placeholder="맞춤형 회복 솔루션"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left: Tab List */}
          <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {data.solutions?.map((sol, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={\`flex-shrink-0 text-left px-6 py-5 rounded-2xl transition-all duration-300 font-bold text-xl md:text-2xl border-l-4 \${
                  activeTab === idx 
                    ? 'bg-gray-50 text-[#0369A1] border-[#0369A1] shadow-sm' 
                    : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'
                }\`}
              >
                {sol.tabName}
              </button>
            ))}
          </div>

          {/* Right: Active Content */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              {data.solutions?.map((sol, idx) => (
                activeTab === idx && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-gray-50 rounded-[2rem] p-8 md:p-12 h-full border border-gray-100"
                  >
                    <div className="text-[#8DC63F] mb-4">
                      <Shield className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">{sol.title}</h3>
                    <p className="text-lg text-gray-600 leading-[1.7] break-keep">{sol.desc}</p>
                    
                    <div className="mt-12 aspect-video rounded-xl overflow-hidden bg-gray-200">
                      {sol.image ? (
                        <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">Image Area</div>
                      )}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
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
`;

if (!content.includes('JointHeroBlock')) {
  // Insert blocks before BLOCK_REGISTRY
  const insertIndex = content.indexOf('// Block Renderer Registry');
  if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + jointBlocksCode + '\n' + content.slice(insertIndex);
  }

  // Update BLOCK_REGISTRY
  const registryMatch = content.match(/const BLOCK_REGISTRY = {([\s\S]*?)};/);
  if (registryMatch) {
    let registryInner = registryMatch[1];
    if (!registryInner.includes('JointHero:')) {
      registryInner = registryInner.replace(
        'Empty: EmptyBlock',
        'JointHero: JointHeroBlock,\n  JointSymptoms: JointSymptomsBlock,\n  JointSolutions: JointSolutionsBlock,\n  JointOutro: JointOutroBlock,\n  Empty: EmptyBlock'
      );
      content = content.replace(registryMatch[0], 'const BLOCK_REGISTRY = {' + registryInner + '};');
    }
  }

  // Update BLOCK_DEFINITIONS
  const definitionsMatch = content.match(/export const BLOCK_DEFINITIONS = \[([\s\S]*?)\];/);
  if (definitionsMatch) {
    let defsInner = definitionsMatch[1];
    if (!defsInner.includes("type: 'JointHero'")) {
      const newDefs = `,
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
  }`;
      content = content.replace(definitionsMatch[0], 'export const BLOCK_DEFINITIONS = [' + defsInner + newDefs + '];');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Joint blocks injected successfully.');
} else {
  console.log('Joint blocks already exist.');
}
