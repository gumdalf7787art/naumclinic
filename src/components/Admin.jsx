import React, { useState, useEffect, useRef } from 'react';
import { Home, FileText, Image as ImageIcon, Settings, Bell, Search, Plus, Eye, Edit3, Trash2, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'edit'
  const [editingPage, setEditingPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState('');

  // Form states
  const [formData, setFormData] = useState({ slug: '', title: '', content: '' });

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (data.success) {
        setPages(data.pages);
      }
    } catch (e) {
      console.error("Failed to fetch pages:", e);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleEdit = (page) => {
    setEditingPage(page);
    setFormData({ slug: page.slug, title: page.title, content: page.content || '' });
    setCurrentView('edit');
  };

  const handleCreate = () => {
    setEditingPage(null);
    setFormData({ slug: '', title: '', content: '' });
    setCurrentView('edit');
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/pages/${slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchPages();
      } else {
        alert(data.message || '삭제 실패');
      }
    } catch (e) {
      console.error(e);
      alert('서버 오류');
    }
  };

  const handleSave = async () => {
    if (!formData.slug || !formData.title) {
      alert("슬러그(경로)와 제목은 필수입니다.");
      return;
    }
    
    setIsLoading(true);
    try {
      let url = '/api/pages';
      let method = 'POST';
      let body = { ...formData };

      if (editingPage) {
        url = `/api/pages/${editingPage.slug}`;
        method = 'PUT';
        // When updating, we only send title and content (slug is in URL)
        body = { title: formData.title, content: formData.content };
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      
      if (data.success) {
        setCurrentView('list');
        fetchPages();
      } else {
        alert(data.message || '저장 실패');
      }
    } catch (e) {
      console.error(e);
      alert('서버 오류');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      // Create a temporary loading message or state here if desired
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (data.success) {
        // Append image markdown or HTML to content
        const imageMarkdown = `\n<img src="${data.url}" alt="업로드 이미지" style="max-width: 100%; border-radius: 8px;" />\n`;
        setFormData(prev => ({ ...prev, content: prev.content + imageMarkdown }));
      } else {
        alert("업로드 실패: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // 제작자 전용 마스터 비밀번호 (필요시 변경 가능)
    if (adminPassword === 'peace1234!') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="w-full h-screen bg-[#fafafc] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-[380px] min-w-[300px] flex flex-col text-center">
          <div className="flex justify-center mb-6">
            <img src="/logo.jpg" alt="로고" className="w-16 h-16 object-contain rounded-xl shadow-sm border border-black/5" />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-2">관리자 로그인</h2>
          <p className="text-[14px] text-gray-500 mb-8">제작자 전용 마스터 비밀번호를 입력해주세요.</p>
          
          <form onSubmit={handleAdminLogin} className="flex flex-col space-y-4 w-full">
            <input 
              type="password" 
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="마스터 비밀번호"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-all text-[14px] text-center"
              autoFocus
            />
            <button 
              type="submit"
              className="w-full bg-black text-white font-bold rounded-lg py-3 hover:bg-gray-800 transition-colors text-[15px]"
            >
              접속하기
            </button>
          </form>
          <button onClick={() => navigate('/')} className="mt-6 text-[13px] text-gray-400 hover:text-black underline underline-offset-4">
            홈페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#f5f5f7] flex text-left overflow-hidden">
      {/* Sidebar */}
      <div className="w-[240px] bg-white border-r border-gray-200 flex flex-col py-6 px-4 hidden md:flex">
        <div className="flex items-center space-x-3 mb-8 px-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.jpg" alt="로고" className="w-10 h-10 object-contain rounded-xl shadow-sm border border-black/5" />
          <div>
            <div className="font-bold text-[16px] tracking-tight">평화교회</div>
            <div className="text-[12px] text-gray-500 font-medium">CMS 관리자</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-black text-white font-medium text-[14px]">
            <FileText size={18} />
            <span>페이지 관리</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-[14px]">
            <ImageIcon size={18} />
            <span>미디어 라이브러리</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-[14px]">
            <Settings size={18} />
            <span>설정</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-[#fafafc] overflow-hidden relative">
        {/* Header */}
        <header className="h-[72px] min-h-[72px] flex items-center justify-between px-8 border-b border-gray-200 bg-white/80 backdrop-blur-md z-10">
          <h2 className="text-[20px] font-bold text-gray-800 flex items-center">
            {currentView === 'list' ? '페이지 관리' : editingPage ? '페이지 수정' : '새 페이지 작성'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden cursor-pointer">
              {/* Admin Avatar Placeholder */}
              <div className="w-full h-full bg-gradient-to-tr from-gray-400 to-gray-600"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          
          {currentView === 'list' ? (
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Controls */}
              <div className="flex justify-between items-center">
                <div className="relative w-72">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="페이지 검색..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[14px] w-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-shadow shadow-sm" />
                </div>
                <button 
                  onClick={handleCreate}
                  className="flex items-center space-x-2 bg-black text-white px-5 py-2 rounded-lg text-[14px] font-bold shadow-md hover:bg-gray-800 transition-colors"
                >
                  <Plus size={16} />
                  <span>새 페이지 추가</span>
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">제목 (Title)</th>
                      <th className="px-6 py-4 font-semibold">경로 (Slug)</th>
                      <th className="px-6 py-4 font-semibold">최근 수정일</th>
                      <th className="px-6 py-4 font-semibold text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pages.map((page, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{page.title}</td>
                        <td className="px-6 py-4 text-gray-500 font-mono text-[13px] bg-gray-50/50 inline-block mt-3 mb-3 ml-6 rounded px-2">{page.slug}</td>
                        <td className="px-6 py-4 text-gray-500">{new Date(page.updated_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-3 text-gray-400">
                            <button onClick={() => navigate(`/${page.slug}`)} className="hover:text-blue-600 transition-colors" title="미리보기"><Eye size={18} /></button>
                            <button onClick={() => handleEdit(page)} className="hover:text-green-600 transition-colors" title="수정"><Edit3 size={18} /></button>
                            <button onClick={() => handleDelete(page.slug)} className="hover:text-red-500 transition-colors" title="삭제"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pages.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                          생성된 페이지가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Edit View */
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
              {/* Editor Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <button onClick={() => setCurrentView('list')} className="flex items-center text-gray-500 hover:text-black font-medium text-[14px]">
                  <ArrowLeft size={16} className="mr-2" /> 목록으로
                </button>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-[14px] font-medium shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                    <ImageIcon size={16} />
                    <span>이미지 삽입</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <button 
                    onClick={handleSave} 
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-black text-white px-5 py-2 rounded-lg text-[14px] font-bold shadow-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    <span>{isLoading ? '저장 중...' : '저장하기'}</span>
                  </button>
                </div>
              </div>

              {/* Editor Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">페이지 제목</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="예: 교회소개"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-all text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">경로 (Slug)</label>
                    <input 
                      type="text" 
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      placeholder="예: about (영문 소문자)"
                      disabled={!!editingPage} // Can't edit slug once created (for simplicity)
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-all text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    {editingPage && <p className="text-[12px] text-gray-400 mt-1">경로는 수정할 수 없습니다.</p>}
                  </div>
                </div>

                <div className="h-full flex flex-col pb-8">
                  <label className="block text-[13px] font-bold text-gray-700 mb-2">콘텐츠 (HTML 또는 텍스트)</label>
                  <textarea 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="여기에 내용을 입력하세요. HTML 태그를 사용할 수 있습니다."
                    className="w-full flex-1 min-h-[300px] p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-all text-[14px] font-mono leading-relaxed resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Admin;
