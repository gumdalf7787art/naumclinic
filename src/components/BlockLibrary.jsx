import React from 'react';
import { BLOCK_DEFINITIONS, BlockRenderer } from './PageBlocks';

const BLOCK_CATEGORIES = [
  { id: 'title', label: '타이틀', blocks: ['HeadingText', 'VisionHero'] },
  { id: 'divider', label: '라인 구분', blocks: [] },
  { id: 'textbox', label: '글상자', blocks: ['RichText'] },
  { id: 'cardbox', label: '카드상자', blocks: ['CoreValues', 'VisionGoals'] },
  { id: 'quote', label: '인용구', blocks: ['VisionHighlight', 'VisionOutro'] },
  { id: 'pastor', label: '담임목사 소개', blocks: ['PastorGreeting'] },
  { id: 'people', label: '섬기는분', blocks: ['StaffGrid'] },
  { id: 'worship', label: '예배안내', blocks: ['WorshipSchedule'] },
  { id: 'bulletin', label: '교회주보', blocks: ['BulletinBoard'] },
  { id: 'offering', label: '온라인헌금', blocks: [] },
  { id: 'map', label: '찾아오시는길', blocks: [] },
  { id: 'facility', label: '시설안내', blocks: [] },
  { id: 'board_text', label: '글 게시판', blocks: [] },
  { id: 'board_photo', label: '사진 게시판', blocks: ['ImageWithText'] },
];

export default function BlockLibrary({ onSelectBlock, onCancel }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
        <h3 className="font-bold text-[13px] text-gray-800">블록 라이브러리</h3>
        <button onClick={onCancel} className="text-[11px] text-gray-500 hover:text-gray-800 font-bold px-2 py-1 bg-gray-200 rounded-md">취소</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {BLOCK_CATEGORIES.map(category => (
          <div key={category.id} className="space-y-3">
            <h4 className="text-[13px] font-bold text-gray-800 border-b border-gray-100 pb-1">{category.label}</h4>
            
            {category.blocks.length === 0 ? (
              <div className="text-[11px] text-gray-400 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-200 text-center">
                준비 중입니다.
              </div>
            ) : (
              <div className="space-y-3">
                {category.blocks.map(blockType => {
                  const def = BLOCK_DEFINITIONS.find(d => d.type === blockType);
                  if (!def) return null;
                  return (
                    <div 
                      key={def.type}
                      onClick={() => onSelectBlock(def)}
                      className="group cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:border-green-500 hover:shadow-md transition-all bg-white"
                    >
                      {/* Live Component Thumbnail Preview */}
                      <div className="h-32 bg-white border-b border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 pointer-events-none transform scale-[0.35] origin-top-left w-[285%] h-[285%]">
                          <div className="bg-white pointer-events-none">
                            <BlockRenderer blocks={[{ id: 'thumb', type: def.type, data: def.defaultData }]} />
                          </div>
                        </div>
                        {/* Overlay to prevent interaction and add subtle hover effect */}
                        <div className="absolute inset-0 bg-gray-50/10 group-hover:bg-green-50/10 transition-colors z-10"></div>
                      </div>
                      
                      {/* Title */}
                      <div className="p-2.5 bg-gray-50 text-center flex items-center justify-center">
                        <span className="text-gray-400 mr-1.5">{def.icon}</span>
                        <span className="text-[12px] font-bold text-gray-700 group-hover:text-green-700">{def.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
