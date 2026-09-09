import React from 'react';
import { Phone, MessageCircle, Calendar, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingMenu() {
  const buttons = [
    {
      id: 'phone',
      icon: <Phone size={24} />,
      label: '전화 상담',
      bg: 'bg-[#0369A1]',
      text: 'text-white',
      link: 'tel:031-445-7502'
    },
    {
      id: 'kakao',
      icon: <MessageCircle size={24} />,
      label: '카카오톡 상담',
      bg: 'bg-[#FEE500]',
      text: 'text-[#3A1D1D]',
      link: '#' 
    },
    {
      id: 'naver-reserve',
      icon: <Calendar size={24} />,
      label: '네이버 예약',
      bg: 'bg-[#03C75A]',
      text: 'text-white',
      link: '#' 
    },
    {
      id: 'naver-blog',
      icon: <BookOpen size={24} />,
      label: '네이버 블로그',
      bg: 'bg-[#03C75A]',
      text: 'text-white',
      link: '#' 
    }
  ];

  return (
    <div className="fixed right-4 md:right-6 bottom-8 md:bottom-12 z-[90] flex flex-col gap-3 md:gap-4">
      {buttons.map((btn, idx) => (
        <motion.a
          key={btn.id}
          href={btn.link}
          target={btn.id !== 'phone' ? "_blank" : undefined}
          rel={btn.id !== 'phone' ? "noopener noreferrer" : undefined}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`group flex items-center justify-center w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-shadow relative ${btn.bg} ${btn.text}`}
        >
          {btn.icon}
          
          {/* 툴팁 (PC에서 마우스 올렸을 때 왼쪽으로 나타남) */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800 text-white text-[13px] md:text-[14px] font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md hidden lg:block">
            {btn.label}
            {/* 삼각형 꼬리 */}
            <div className="absolute top-1/2 -translate-y-1/2 right-[-5px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-800"></div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
