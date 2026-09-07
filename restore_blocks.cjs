const fs = require('fs');
const path = require('path');

const targetFile = 'h:\\Hospital Master Project\\src\\components\\PageBlocks.jsx';
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add EmptyBlock
const emptyBlockStr = `
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
`;

// 2. Add Philosophy Blocks
const philosophyBlocksStr = `
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
                  value={(data.paragraphs || []).join('\\n\\n')}
                  onChange={(val) => onChange({ paragraphs: val.split('\\n\\n') })}
                  isEditMode={true}
                  placeholder="단락을 두 번 엔터로 구분하여 입력하세요"
                />
              ) : (
                data.paragraphs?.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p.replace(/\\*\\*(.*?)\\*\\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>') }} />
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
              
              <div className="text-[#8DC63F] font-semibold text-sm mb-2">{\`PRINCIPLE 0\${idx + 1}\`}</div>
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
`;

// Append missing blocks to the file
content += emptyBlockStr + '\\n' + philosophyBlocksStr + '\\n';

// Replace BLOCK_REGISTRY to include them
const registryStart = content.indexOf('const BLOCK_REGISTRY = {');
const registryEnd = content.indexOf('};', registryStart) + 2;
const oldRegistry = content.substring(registryStart, registryEnd);

const newRegistry = `const BLOCK_REGISTRY = {
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
  PhilosophyHeroBlock: PhilosophyHeroBlock,
  PhilosophyGreetingBlock: PhilosophyGreetingBlock,
  PhilosophyPrinciplesBlock: PhilosophyPrinciplesBlock,
  PhilosophyPromiseBlock: PhilosophyPromiseBlock,
  PhilosophyCTABlock: PhilosophyCTABlock,
  Empty: EmptyBlock
};`;

content = content.replace(oldRegistry, newRegistry);

fs.writeFileSync(targetFile, content);
console.log('Restored deleted blocks and EmptyBlock');
