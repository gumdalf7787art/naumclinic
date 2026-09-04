import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DynamicPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Page not found');
        }
        return res.json();
      })
      .then(data => {
        if (data.success && data.page && data.page.is_published === 1) {
          setPageData(data.page);
        } else {
          throw new Error('Page not found or private');
        }
      })
      .catch(err => {
        console.error(err);
        setPageData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#f4f5f7]">
        <div className="w-8 h-8 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#f4f5f7]">
        <h2 className="text-[24px] font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다.</h2>
        <p className="text-gray-500 mb-8">요청하신 페이지가 삭제되었거나 비공개 상태입니다.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-black text-white rounded-lg font-bold">
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Banner Section */}
      <section className="relative w-full h-[300px] md:h-[400px] bg-black overflow-hidden flex items-center justify-center">
        {pageData.banner_image && (
          <img 
            src={pageData.banner_image} 
            alt={pageData.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] md:text-[46px] font-bold text-white mb-4 tracking-tight"
          >
            {pageData.title}
          </motion.h1>
          {pageData.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[16px] md:text-[18px] text-white/90 font-medium"
            >
              {pageData.subtitle}
            </motion.p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16 md:py-24">
        {/* Render raw HTML content */}
        <div 
          className="prose max-w-none prose-lg prose-headings:font-bold prose-a:text-[#8DC63F]"
          dangerouslySetInnerHTML={{ __html: pageData.content || '' }}
        />
      </section>
    </div>
  );
}
