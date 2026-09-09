import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 비밀번호 찾기 모달 - document.body에 직접 포탈로 렌더링
function FindPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {}
    finally {
      setSent(true);
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 99998,
        }}
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 99999, width: '100%', maxWidth: '440px',
          padding: '0 16px',
        }}
      >
        <div style={{
          background: '#fff', borderRadius: '20px',
          padding: '36px 32px', boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
        }}>
          {/* 헤더 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111' }}>비밀번호 찾기</h3>
            <button
              onClick={onClose}
              style={{ padding: '4px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              <X size={20} color="#6b7280" />
            </button>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <CheckCircle2 size={52} color="#0284c7" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontWeight: 700, fontSize: '16px', color: '#111', marginBottom: '8px' }}>이메일을 발송했습니다</p>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>
                {email}으로<br />비밀번호 재설정 링크를 보내드렸습니다.<br />메일함을 확인해 주세요.
              </p>
              <button
                onClick={onClose}
                style={{
                  marginTop: '24px', width: '100%', padding: '14px',
                  background: '#0284c7', color: '#fff', fontWeight: 700,
                  fontSize: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                }}
              >
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px', lineHeight: 1.7 }}>
                가입하신 이메일 주소를 입력하시면<br />비밀번호 재설정 링크를 보내드립니다.
              </p>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <Mail size={17} color="#9ca3af" style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  style={{
                    width: '100%', paddingLeft: '42px', paddingRight: '16px',
                    paddingTop: '14px', paddingBottom: '14px',
                    background: '#f9fafb', border: '1.5px solid #e5e7eb',
                    borderRadius: '12px', fontSize: '15px', outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  background: loading ? '#9ca3af' : '#0284c7',
                  color: '#fff', fontWeight: 700, fontSize: '15px',
                  borderRadius: '12px', border: 'none', cursor: 'pointer',
                }}
              >
                {loading ? '전송 중...' : '재설정 링크 보내기'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showFindPw, setShowFindPw] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) { alert('이메일과 비밀번호를 입력해주세요.'); return; }
    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        localStorage.setItem('userProfile', JSON.stringify(result.user));
        if (setIsLoggedIn) setIsLoggedIn(true);
        window.scrollTo(0, 0);
        navigate('/');
      } else {
        alert(result.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch {
      alert('서버와 통신할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafc] flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#5227FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF9FFC]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 비밀번호 찾기 모달 포탈 */}
      {showFindPw && <FindPasswordModal onClose={() => setShowFindPw(false)} />}

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center text-[#555] hover:text-black transition-colors z-20"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span className="font-medium">돌아가기</span>
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer mb-10 z-20" onClick={() => navigate('/')}>
        <img src="/logo-mark.png" alt="나음재활의학과" className="h-12 w-auto object-contain" />
        <span className="font-extrabold text-[22px] tracking-tight text-[#0369A1]">나음재활의학과의원</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white w-full max-w-[480px] rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-black/[0.03] relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-black tracking-tight mb-2">로그인</h2>
        </div>

        {/* SNS Login */}
        <div className="space-y-3 mb-8">
          <button
            type="button"
            onClick={() => {
              const REST_API_KEY = 'b0b92ea63baf92a771b860929aea52b1';
              const REDIRECT_URI = window.location.origin + '/auth/kakao/callback';
              window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
            }}
            className="w-full flex items-center justify-center gap-2.5 bg-[#FEE500] hover:bg-[#F4DC00] text-[#3A1D1D] font-bold rounded-xl py-3.5 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 3.185-9 7.114 0 2.54 1.708 4.77 4.258 5.962L6.23 20.31c-.134.48.363.81.77.562l4.63-3.136c.123.01.246.015.37.015 4.97 0 9-3.185 9-7.114C21 6.185 16.97 3 12 3z" /></svg>
            카카오로 시작하기
          </button>
          <button
            type="button"
            onClick={() => {
              const CLIENT_ID = 'UPoKeP1gguFzcstAcAiC';
              const REDIRECT_URI = window.location.origin + '/auth/naver/callback';
              const STATE = Math.random().toString(36).substring(2, 15);
              sessionStorage.setItem('naver_state', STATE);
              window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
            }}
            className="w-full flex items-center justify-center gap-2.5 bg-[#03C75A] hover:bg-[#02b350] text-white font-bold rounded-xl py-3.5 transition-colors shadow-sm"
          >
            <span className="font-extrabold text-[17px] leading-none">N</span>
            네이버로 시작하기
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-100" />
          <span className="px-4 text-[13px] text-gray-400 font-medium bg-white">또는 이메일로 로그인</span>
          <div className="flex-1 border-t border-gray-100" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">이메일 주소</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email" name="email" value={formData.email} onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]"
                placeholder="example@email.com" required
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password" name="password" value={formData.password} onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]"
                placeholder="비밀번호를 입력해주세요" required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <span className="ml-2 text-[13px] text-gray-600 group-hover:text-black transition-colors">로그인 유지</span>
            </label>
            <button
              type="button"
              onClick={() => setShowFindPw(true)}
              className="text-[13px] text-[#0284c7] hover:text-[#0369a1] underline underline-offset-4 decoration-[#0284c7]/30 transition-colors font-medium"
            >
              비밀번호 찾기
            </button>
          </div>

          <button
            type="submit" disabled={isLoading}
            className={`w-full text-white font-bold rounded-xl py-4 mt-6 transition-transform duration-200 active:scale-95 ${isLoading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
          >
            {isLoading ? '로그인 중...' : '이메일로 로그인'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-[13px] text-gray-500">
            아직 계정이 없으신가요?{' '}
            <button onClick={() => navigate('/signup')} className="text-black font-semibold underline underline-offset-2 hover:text-[#0284c7] transition-colors ml-1">
              회원가입하기
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
