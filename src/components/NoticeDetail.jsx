import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { PAGE_TEMPLATES } from '../data/pageTemplates';

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    // Find the notice block in pageTemplates
    const noticeBlocks = PAGE_TEMPLATES['community/notice'];
    if (noticeBlocks) {
      const noticeBlock = noticeBlocks.find(block => block.type === 'CommunityNotice');
      if (noticeBlock && noticeBlock.data && noticeBlock.data.notices) {
        const foundNotice = noticeBlock.data.notices.find(n => n.id === id);
        setNotice(foundNotice);
      }
    }
  }, [id]);

  if (!notice) {
    return (
      <div className="py-32 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">공지사항을 찾을 수 없습니다.</h2>
        <button 
          onClick={() => navigate('/community/notice')}
          className="px-6 py-3 bg-[#0284c7] text-white rounded-lg font-medium hover:bg-[#0369a1] transition-colors"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-[#0284c7]/10 text-[#0284c7] text-xs font-bold rounded-full">
                {notice.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug">
              {notice.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{notice.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="font-mono">{notice.date}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            {notice.image && (
              <div className="mb-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img 
                  src={notice.image} 
                  alt={notice.title} 
                  className="w-full h-auto max-h-[800px] object-contain object-top"
                />
              </div>
            )}
            <div className="prose prose-blue max-w-none">
              {notice.content ? (
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                  {notice.content}
                </p>
              ) : (
                <p className="text-gray-400 italic text-center py-10">
                  상세 내용이 없습니다.
                </p>
              )}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-8 md:p-10 border-t border-gray-100 flex justify-center bg-gray-50/50">
            <Link 
              to="/community/notice"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 hover:text-[#0284c7] hover:border-[#0284c7]/30 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
              목록으로 돌아가기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
