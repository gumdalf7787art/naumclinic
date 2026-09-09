import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCMSData } from '../hooks/useCMS';
import * as C from '../constants/hospitalData';
function Footer() {
  const navigate = useNavigate();
  const footer = useCMSData('cms_footerSection', C.FOOTER_SECTION);

  return (
    <footer className="bg-gray-900 text-[#888] pt-20 pb-12 px-6 border-t border-white/5 text-[14px] font-body">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="bg-white px-4 py-3 rounded-xl inline-block shadow-md">
                  <img src={footer.logo || "/logo-full.png"} alt="로고" className="h-20 sm:h-24 w-auto object-contain" />
                </div>
            </div>
            <p className="text-[16px] text-[#999] mb-8 max-w-[400px] leading-[1.6] break-keep">
              {footer.description?.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < footer.description.split('\n').length - 1 && <br/>}
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="md:w-1/2 flex flex-col md:items-end">
            <div className="space-y-2 text-left md:text-right text-[13px] leading-relaxed mt-4 md:mt-0 break-keep">
              <p><strong className="text-white font-medium text-[15px]">{footer.clinicName}</strong> {footer.repName && <span className="ml-2 opacity-80">(대표: {footer.repName})</span>}</p>
              <p className="text-[#888]">{footer.address}</p>
              <div className="pt-2 flex flex-col space-y-1.5 text-[#888]">
                {footer.phone && <p>Tel: <strong className="text-white font-medium tracking-wider ml-1">{footer.phone}</strong></p>}
                {footer.time && <p>Time: <strong className="text-white font-medium tracking-wider ml-1">{footer.time}</strong></p>}
                {footer.email && <p>Email: <strong className="text-white font-medium ml-1">{footer.email}</strong></p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[12px] text-[#666]">
          <p className="mt-4 md:mt-0">{footer.copyright}</p>
          <div className="flex space-x-6">
            {footer.links?.map((link, idx) => (
              <Link key={idx} to={link.path} className="hover:text-white transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
