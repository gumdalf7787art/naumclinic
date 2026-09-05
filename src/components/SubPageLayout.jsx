import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import { HOSPITAL_MENUS } from '../constants/hospitalData';
import DynamicSubPage from './DynamicSubPage';

const SubPageLayout = ({ title, engTitle, parentPath }) => {
  const { pathname } = useLocation();

  // Find current main category
  const currentMainMenu = HOSPITAL_MENUS.find(m => m.path.startsWith(parentPath)) || HOSPITAL_MENUS[0];
  // Find current sub category
  const currentSubMenu = currentMainMenu.children.find(m => pathname.startsWith(m.path)) || currentMainMenu.children[0];

  return (
    <div className="w-full bg-[#f8f9fa]">
      {/* Background Banner */}
      <div 
        className="w-full h-[330px] md:h-[430px] relative bg-slate-900 flex flex-col items-center justify-center overflow-hidden pt-[72px]"
        style={{ backgroundImage: "url('/hero-1-bg.webp')", backgroundSize: "cover", backgroundPosition: "center 30%" }}
      >
         <div className="absolute inset-0 bg-black/60 z-10"></div>
         <div className="relative z-20 text-center flex flex-col items-center">
            {engTitle && (
              <div className="text-[11px] md:text-[13px] font-semibold text-white/80 tracking-[0.3em] uppercase mb-3">
                {engTitle}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{title}</h1>
            <div className="w-12 h-1 bg-[#8DC63F] rounded-full mx-auto shadow-sm"></div>
         </div>
      </div>
      
      {/* LNB (Local Navigation Bar) */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto flex">
          {/* Home Icon */}
          <Link to="/" className="flex items-center justify-center px-4 sm:px-6 h-[50px] sm:h-[60px] border-x border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Home size={18} />
          </Link>

          {/* Main Menu Dropdown */}
          <div className="relative group border-r border-gray-200 hidden sm:block">
            <button className="flex items-center justify-between w-[180px] md:w-[220px] h-[50px] sm:h-[60px] px-5 bg-white group-hover:bg-gray-50 transition-colors text-[14px] md:text-[15px] font-medium text-[#404b5c]">
              <span>{currentMainMenu.name}</span>
              <ChevronDown size={16} className="text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-[-1px] w-[calc(100%+2px)] bg-white border border-gray-200 border-t-0 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
              <div className="flex flex-col py-2">
                {HOSPITAL_MENUS.map(menu => (
                  <Link 
                    key={menu.id} 
                    to={menu.path}
                    className={`px-5 py-3 text-[14px] transition-colors ${menu.id === currentMainMenu.id ? 'text-[#0284C7] font-bold bg-[#0284C7]/5' : 'text-gray-600 hover:text-[#0284C7] hover:bg-gray-50'}`}
                  >
                    {menu.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sub Menu Dropdown */}
          <div className="relative group border-r border-gray-200 flex-1 sm:flex-none">
            <button className="flex items-center justify-between w-full sm:w-[220px] md:w-[260px] h-[50px] sm:h-[60px] px-5 bg-white group-hover:bg-gray-50 transition-colors text-[14px] md:text-[15px] font-medium text-[#404b5c]">
              <span>{currentSubMenu.name}</span>
              <ChevronDown size={16} className="text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-[-1px] w-[calc(100%+2px)] bg-white border border-gray-200 border-t-0 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
              <div className="flex flex-col py-2">
                {currentMainMenu.children.map(child => (
                  <Link 
                    key={child.id} 
                    to={child.path}
                    className={`px-5 py-3 text-[14px] transition-colors ${child.id === currentSubMenu.id ? 'text-[#0284C7] font-bold bg-[#0284C7]/5' : 'text-gray-600 hover:text-[#0284C7] hover:bg-gray-50'}`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic SubPage Content */}
      <DynamicSubPage parentPath={parentPath} />
    </div>
  );
};
export default SubPageLayout;
