import React from 'react';
import { useLocation } from 'react-router-dom';
import DynamicSubPage from './DynamicSubPage';

const SubPageLayout = ({ title, parentPath }) => {
  return (
    <div className="w-full bg-white">
      {/* Background Banner */}
      <div className="w-full h-[250px] md:h-[350px] relative bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-black/40 z-10"></div>
         <div className="relative z-20 text-center flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{title}</h1>
            <div className="w-12 h-1 bg-[#F6BE00] rounded-full mx-auto shadow-sm"></div>
         </div>
      </div>
      
      {/* Dynamic SubPage Content */}
      <DynamicSubPage parentPath={parentPath} />
    </div>
  );
};
export default SubPageLayout;
