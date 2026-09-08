import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Pencil, Trash2, EyeOff, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { getNoticeById, removeNotice, toggleHidden } from '../utils/noticeStore';

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    setNotice(getNoticeById(id));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('이 공지사항을 삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.')) return;
    removeNotice(id);
    alert('삭제되었습니다.');
    navigate('/community/notice');
  };

  const handleToggleHidden = () => {
    const updated = toggleHidden(id);
    const newNotice = updated.find(n => n.id === id);
    setNotice(newNotice);
  };

  const handleEdit = () => {
    navigate(`/community/notice/write?edit=${id}`);
  };

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
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#0284c7]/10 text-[#0284c7] text-xs font-bold rounded-full">
                  {notice.category}
                </span>
                {notice.hidden && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full flex items-center gap-1">
                    <EyeOff size={11} /> 비공개
                  </span>
                )}
              </div>

              {/* 관리자 버튼 (임시 전체 공개) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleHidden}
                  title={notice.hidden ? '공개로 전환' : '비공개로 전환'}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    notice.hidden
                      ? 'bg-[#0284c7]/10 text-[#0284c7] border-[#0284c7]/20 hover:bg-[#0284c7]/20'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {notice.hidden ? <Eye size={13} /> : <EyeOff size={13} />}
                  {notice.hidden ? '공개 전환' : '비공개'}
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <Pencil size={13} />
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={13} />
                  삭제
                </button>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug">
              {notice.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <User size={15} />
                <span>{notice.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} />
                <span className="font-mono">{notice.date}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            {notice.content ? (
              <div
                className="notice-content text-gray-700 text-base"
                dangerouslySetInnerHTML={{ __html: notice.content }}
              />
            ) : notice.image ? (
              <div className="rounded-xl overflow-hidden">
                <img src={notice.image} alt={notice.title} className="w-full h-auto" />
              </div>
            ) : (
              <p className="text-gray-400 italic text-center py-10">상세 내용이 없습니다.</p>
            )}
          </div>

          {/* Footer */}
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

      <style>{`
        .notice-content { line-height: 1.85; }
        .notice-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; display: block; }
        .notice-content h1 { font-size: 2em; font-weight: 800; margin: 0.6em 0; color: #111827; }
        .notice-content h2 { font-size: 1.5em; font-weight: 700; margin: 0.6em 0; color: #111827; }
        .notice-content h3 { font-size: 1.25em; font-weight: 600; margin: 0.6em 0; color: #111827; }
        .notice-content p { margin: 0.4em 0; }
        .notice-content blockquote { border-left: 4px solid #0284c7; margin: 12px 0; padding: 10px 16px; background: #f0f9ff; color: #0369a1; border-radius: 0 8px 8px 0; }
        .notice-content table { border-collapse: collapse; width: 100%; margin: 12px 0; }
        .notice-content th, .notice-content td { border: 1px solid #cbd5e1; padding: 8px 12px; }
        .notice-content th { background: #f1f5f9; font-weight: 600; text-align: center; }
        .notice-content hr { border: none; border-top: 2px solid #e5e7eb; margin: 16px 0; }
        .notice-content a { color: #0284c7; text-decoration: underline; }
        .notice-content ul { list-style: disc; padding-left: 1.5em; margin: 0.5em 0; }
      `}</style>
    </div>
  );
}
