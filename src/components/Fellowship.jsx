import useSubMenus from '../hooks/useSubMenus';
import DynamicSubPage from './DynamicSubPage';
import React from 'react';
import { Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette, Image as ImageIcon, Link2, List, ListOrdered, Settings2, Paperclip, UploadCloud, X, Smile, Quote, Minus, FileText, Table, Strikethrough, Highlighter, Share2 } from 'lucide-react';

/* ─────────────────────────── Sub-page Components ─────────────────────────── */

function GraceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);

  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
  const isAdmin = userProfile && userProfile.role === 'admin';

  React.useEffect(() => {
    if (id) {
      const today = new Date().toISOString().split('T')[0];
      const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '{}');
      const postKey = `grace_${id}`;

      if (viewedPosts[postKey] !== today) {
        viewedPosts[postKey] = today;
        localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
        
        fetch('/api/posts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, increment_view: true })
        });
      }
    }

    fetch(`/api/posts?type=grace${isAdmin ? '&admin=true' : ''}`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id.toString() === id);
        setPost(found);
      });
  }, [id, isAdmin]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
        alert('삭제되었습니다.');
        navigate('/fellowship/grace');
      } catch (err) {
        alert('삭제 실패');
      }
    }
  };

  const handleTogglePrivate = async () => {
    const newStatus = post.is_private ? 0 : 1;
    try {
      await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, is_private: newStatus })
      });
      setPost({ ...post, is_private: newStatus });
    } catch (err) {
      alert('상태 변경 실패');
    }
  };

  const handleNativeShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: post.title,
      text: '평화교회 게시물을 확인해보세요!',
      url: url
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert('현재 브라우저에서는 기본 공유 기능을 지원하지 않습니다.\n아래 링크 복사하기를 이용해주세요.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    } catch (err) {
      alert('링크 복사에 실패했습니다.');
    }
  };

  if (!post) return <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <div style={{ borderTop: '2px solid #333', borderBottom: '1px solid #eee', padding: '24px 16px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAdmin && post.is_private === 1 && <span style={{ color: '#cc0000', fontSize: '18px' }}>[비공개]</span>}
          {post.title}
        </h3>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666' }}>
          <span>작성자: {post.author}</span>
          <span style={{ color: '#ccc' }}>|</span>
          <span>등록일: {new Date(post.created_at).toLocaleDateString()}</span>
          {isAdmin && (
            <>
              <span style={{ color: '#ccc' }}>|</span>
              <span>조회수: {post.views}</span>
            </>
          )}
        </div>
      </div>
      
      <div style={{ padding: '40px 16px', minHeight: '300px', fontSize: '16px', color: '#1d1d1f', lineHeight: '1.8', borderBottom: '1px solid #e5e5ea', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        {post.image_urls && post.image_urls.map((url, i) => {
           if (url.match(/\.(jpeg|jpg|gif|png)$/i)) {
             // In the new WYSIWYG editor, images are embedded directly in the content. 
             // We still render legacy attached images here for backward compatibility.
             return <div key={i} style={{ marginBottom: '24px' }}><img src={url} alt={`첨부이미지 ${i+1}`} style={{ maxWidth: '100%', borderRadius: '14px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }} /></div>;
           } else {
             return <div key={i} style={{ marginBottom: '24px' }}><a href={url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 18px', backgroundColor: '#f5f5f7', border: '1px solid #d2d2d7', borderRadius: '12px', color: '#1d1d1f', textDecoration: 'none', fontWeight: '500', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8ed'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f7'}><Paperclip size={16} color="#007aff" /> 첨부파일 다운로드 ({i+1})</a></div>;
           }
        })}
        <div 
          className="wysiwyg-content" 
          style={{ marginTop: '20px', wordBreak: 'break-word' }} 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '60px' }}>
          <button onClick={handleNativeShare} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', maxWidth: '300px', padding: '14px 24px', backgroundColor: '#fef3c7', color: '#d97706', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fde68a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fef3c7'}>
            <Share2 size={20} />
            공유하기
          </button>
          <button onClick={handleCopyLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', maxWidth: '300px', padding: '14px 24px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
            <Link2 size={20} />
            링크 복사하기
          </button>
        </div>
      </div>
      
      <div style={{ paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {(isAdmin || (userProfile && userProfile.name === post.author)) && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => navigate(`/fellowship/grace/edit/${post.id}`)} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>수정</button>
              <button onClick={handleDelete} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#cc0000', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
              <button onClick={handleTogglePrivate} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                {post.is_private ? '공개로 전환' : '비공개로 전환'}
              </button>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/fellowship/grace" style={{ padding: '10px 24px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}

function GraceList() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
  const isAdmin = userProfile && userProfile.role === 'admin';

  React.useEffect(() => {
    fetch(`/api/posts?type=grace${isAdmin ? '&admin=true' : ''}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [isAdmin]);

  if (loading) return <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ color: '#666', margin: 0 }}>총 <span style={{ color: '#cc0000', fontWeight: 'bold' }}>{posts.length}</span>건의 게시물이 있습니다.</p>
        {userProfile && (
          <Link to="/fellowship/grace/write" style={{ padding: '10px 20px', backgroundColor: '#2a4358', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d2f3d'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a4358'}>글쓰기</Link>
        )}
      </div>
      
      <div className="w-full">
        <table className="w-full border-t-[2px] border-[#333] border-collapse text-center text-[15px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="hidden sm:table-cell py-4 px-2 w-[80px] font-semibold text-[#475569]">번호</th>
              <th className="py-4 px-2 font-semibold text-[#475569]">제목</th>
              <th className="hidden sm:table-cell py-4 px-2 w-[120px] font-semibold text-[#475569]">작성자</th>
              <th className="hidden sm:table-cell py-4 px-2 w-[120px] font-semibold text-[#475569]">등록일</th>
              {isAdmin && <th className="hidden sm:table-cell py-4 px-2 w-[80px] font-semibold text-[#475569]">조회</th>}
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-20 text-center text-gray-500 bg-gray-50 border-b border-[#e2e8f0]">
                  아직 등록된 게시물이 없습니다.
                </td>
              </tr>
            ) : (
              posts.map((post, idx) => (
                <tr key={post.id} className="border-b border-[#f1f5f9] group">
                  <td className="hidden sm:table-cell py-4 px-2 text-[#94a3b8]">{posts.length - idx}</td>
                  <td className="py-4 px-2 text-left">
                    <Link to={`/fellowship/grace/${post.id}`} className="block no-underline text-inherit group-hover:text-[#cc0000] transition-colors mb-1 sm:mb-0">
                      {isAdmin && post.is_private === 1 && <span className="text-[#cc0000] mr-1 font-bold">[비공개]</span>}
                      {post.title}
                    </Link>
                    {/* Mobile only info stack */}
                    <div className="flex sm:hidden items-center gap-2 text-[13px] text-[#94a3b8] mt-2">
                      <span>{post.author}</span>
                      <span className="text-[#e2e8f0]">|</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      {isAdmin && (
                        <>
                          <span className="text-[#e2e8f0]">|</span>
                          <span>조회 {post.views}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell py-4 px-2 text-[#64748b]">{post.author}</td>
                  <td className="hidden sm:table-cell py-4 px-2 text-[#94a3b8]">{new Date(post.created_at).toLocaleDateString()}</td>
                  {isAdmin && <td className="hidden sm:table-cell py-4 px-2 text-[#94a3b8]">{post.views}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {posts.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px' }}>
          <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>&lt;</button>
          <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cc0000', backgroundColor: '#cc0000', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>1</button>
          <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>&gt;</button>
        </div>
      )}
    </div>
  );
}

function TopToolbarButton({ children, title, onClick }) {
  return (
    <button 
      title={title}
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minWidth: '56px', height: '64px', background: 'transparent', gap: '6px',
        border: 'none', borderRadius: '4px', color: '#555', cursor: 'pointer',
        transition: 'background-color 0.15s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f4f4f4'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
      {children}
    </button>
  );
}

function BottomToolbarButton({ children, title, onClick }) {
  return (
    <button 
      title={title}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '32px', height: '32px', background: 'transparent',
        border: 'none', borderRadius: '4px', color: '#555', cursor: 'pointer',
        transition: 'background-color 0.15s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f4f4f4'; e.currentTarget.style.color = '#111'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#555'; }}
    >
      {children}
    </button>
  );
}

function GraceWrite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [existingUrls, setExistingUrls] = React.useState([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);
  const [showExitModal, setShowExitModal] = React.useState(false);
  const [pendingPath, setPendingPath] = React.useState(null);

  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;

  React.useEffect(() => {
    if (!userProfile) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, [userProfile, navigate]);
  
  React.useEffect(() => {
    if (id) {
      const isAdmin = userProfile && userProfile.role === 'admin';
      fetch(`/api/posts?type=grace${isAdmin ? '&admin=true' : ''}`)
        .then(res => res.json())
        .then(data => {
          const found = data.find(item => item.id.toString() === id);
          if (found) {
            setTitle(found.title);
            setContent(found.content);
            setExistingUrls(found.image_urls || []);
            if (editorRef.current) {
              editorRef.current.innerHTML = found.content;
            }
          }
        });
    }
  }, [id, userProfile]);
  
  // Editor active styles
  const [currentColor, setCurrentColor] = React.useState('#1d1d1f');
  const [currentBgColor, setCurrentBgColor] = React.useState('transparent');
  const [showColorPicker, setShowColorPicker] = React.useState(null);
  
  const fileInputRef = React.useRef(null);
  const photoInputRef = React.useRef(null);
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    setIsDirty(title !== '' || content !== '' || files.length > 0);
  }, [title, content, files]);

  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const handleAnchorClick = (e) => {
      if (!isDirty) return;
      const anchor = e.target.closest('a');
      if (anchor && anchor.href) {
        const isInternal = anchor.origin === window.location.origin;
        if (isInternal) {
          e.preventDefault(); e.stopPropagation();
          setPendingPath(anchor.href.replace(window.location.origin, ''));
          setShowExitModal(true);
        }
      }
    };
    
    const handleGlobalClick = (e) => {
      if (!e.target.closest('.color-picker-container')) {
        setShowColorPicker(null);
      }
    };

    document.addEventListener('click', handleAnchorClick, true);
    document.addEventListener('mousedown', handleGlobalClick);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, true);
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [isDirty]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
    e.target.value = null; // Reset input
  };

  const removeFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const updateCurrentStyles = () => {
    try {
      const fg = document.queryCommandValue('foreColor');
      const bg = document.queryCommandValue('hiliteColor') || document.queryCommandValue('backColor');
      if (fg) setCurrentColor(fg);
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') setCurrentBgColor(bg);
      else setCurrentBgColor('transparent');
    } catch (e) {
      // ignore
    }
  };
  
  const STANDARD_COLORS = ['#000000', '#555555', '#cc0000', '#ff8c00', '#facc15', '#22c55e', '#3b82f6', '#6366f1', '#a855f7', '#ffffff'];

  const renderColorDropdown = (type) => {
    if (showColorPicker !== type) return null;
    const isText = type === 'text';
    return (
      <div style={{ position: 'absolute', top: '100%', left: '0', marginTop: '4px', backgroundColor: '#fff', border: '1px solid #d2d2d7', borderRadius: '8px', padding: '8px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', width: '150px' }}>
        {STANDARD_COLORS.map(c => (
          <button 
            key={c} 
            title={c}
            onClick={() => { formatText(isText ? 'foreColor' : 'hiliteColor', c); setShowColorPicker(null); }} 
            style={{ width: '22px', height: '22px', backgroundColor: c, border: c === '#ffffff' ? '1px solid #d2d2d7' : 'none', borderRadius: '4px', cursor: 'pointer', transition: 'transform 0.1s' }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
        <div style={{ gridColumn: '1 / span 5', position: 'relative', marginTop: '4px', height: '28px', backgroundColor: '#f8fafc', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#475569', cursor: 'pointer', border: '1px solid #cbd5e1', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}>
          <span style={{ pointerEvents: 'none', fontWeight: '500' }}>직접 선택...</span>
          <input type="color" onChange={(e) => { formatText(isText ? 'foreColor' : 'hiliteColor', e.target.value); setShowColorPicker(null); }} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }} />
        </div>
      </div>
    );
  };

  // WYSIWYG Editor Commands
  const formatText = (command, value = null) => {
    if (command === 'createLink') {
      const url = prompt('링크 주소를 입력하세요 (예: https://...)');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else if (command === 'insertQuote') {
      const selection = window.getSelection();
      let text = selection.toString();
      
      const quoteId = 'quote-' + Date.now();
      
      if (!text || text.trim() === '') {
        const quoteHtml = `<blockquote id="${quoteId}" class="editor-quote" data-placeholder="인용구를 입력하세요..." style="border-left: 4px solid #cc0000; padding: 16px; margin: 16px 0; color: #444; background-color: #f8fafc; font-size: 16px; min-height: 24px;"><br></blockquote><p><br></p>`;
        document.execCommand('insertHTML', false, quoteHtml);
        
        setTimeout(() => {
          const el = document.getElementById(quoteId);
          if (el) {
            el.removeAttribute('id'); // Clean up
            const range = document.createRange();
            range.setStart(el, 0);
            range.collapse(true);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }, 0);
      } else {
        const quoteHtml = `<blockquote style="border-left: 4px solid #cc0000; padding: 16px; margin: 16px 0; color: #444; background-color: #f8fafc; font-size: 16px;">${text}</blockquote><p><br></p>`;
        document.execCommand('insertHTML', false, quoteHtml);
      }
    } else {
      document.execCommand(command, false, value);
    }
    if (editorRef.current) editorRef.current.focus();
    setContent(editorRef.current.innerHTML);
    updateCurrentStyles();
  };

  const handlePhotoUpload = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    setIsUploading(true);
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
          // Insert image instantly into the editor
          editorRef.current.focus();
          document.execCommand('insertImage', false, data.url);
          // Apply minimal Apple-like styling to the inserted image via standard CSS in the global stylesheet or inline
          const imgs = editorRef.current.getElementsByTagName('img');
          const lastImg = imgs[imgs.length - 1];
          if (lastImg) {
            lastImg.style.maxWidth = '100%';
            lastImg.style.borderRadius = '14px';
            lastImg.style.marginTop = '16px';
            lastImg.style.marginBottom = '16px';
            lastImg.style.boxShadow = '0 4px 14px rgba(0,0,0,0.06)';
          }
          setContent(editorRef.current.innerHTML);
        }
      } catch (err) {
        console.error("사진 업로드 실패:", err);
      }
    }
    setIsUploading(false);
    e.target.value = null; // Reset input
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    setIsUploading(true);
    try {
      const savedProfile = localStorage.getItem('userProfile');
      const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
      const author = userProfile?.name || '평화교인';

      const uploadedUrls = [];
      // Only upload generic files here. Photos are already uploaded and embedded in `content` HTML.
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
          uploadedUrls.push(data.url);
        }
      }

      const dbRes = await fetch('/api/posts', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id ? parseInt(id) : undefined,
          type: 'grace',
          title: title,
          content: content,
          author: author,
          image_urls: [...existingUrls, ...uploadedUrls]
        })
      });

      if (!dbRes.ok) throw new Error('업로드 실패');
      
      alert(id ? '성공적으로 수정되었습니다.' : '성공적으로 등록되었습니다.');
      setIsDirty(false);
      navigate('/fellowship/grace');
    } catch (e) {
      alert('오류가 발생했습니다.');
      setIsUploading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', padding: '56px', border: '1px solid #e5e5ea', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Title Input */}
      <div style={{ marginBottom: '32px' }}>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요" 
          style={{ 
            width: '100%', 
            padding: '12px 0', 
            border: 'none', 
            borderBottom: '2px solid #e5e5ea', 
            fontSize: '24px', 
            fontWeight: '600', 
            letterSpacing: '-0.5px',
            color: '#1d1d1f', 
            outline: 'none', 
            background: 'transparent',
            transition: 'border-color 0.3s ease'
          }} 
          onFocus={(e) => e.target.style.borderBottom = '2px solid #007aff'} 
          onBlur={(e) => e.target.style.borderBottom = '2px solid #e5e5ea'} 
        />
      </div>

      {/* Naver-style Editor Toolbar */}
      <div style={{ border: '1px solid #e5e5ea', borderRadius: '8px', overflow: 'visible', marginBottom: '24px', backgroundColor: '#fff' }}>
        
        {/* Top Row */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff', gap: '4px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
          
          <input type="file" ref={photoInputRef} multiple accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          <TopToolbarButton title="사진" onClick={() => photoInputRef.current.click()}>
            <ImageIcon size={22} color="#666" strokeWidth={1.5} />
            <span style={{ fontSize: '12px' }}>사진</span>
          </TopToolbarButton>

          <TopToolbarButton title="인용구" onClick={() => formatText('insertQuote')}>
            <Quote size={22} color="#666" strokeWidth={1.5} />
            <span style={{ fontSize: '12px' }}>인용구</span>
          </TopToolbarButton>

          <TopToolbarButton title="구분선" onClick={() => formatText('insertHorizontalRule')}>
            <Minus size={22} color="#666" strokeWidth={1.5} />
            <span style={{ fontSize: '12px' }}>구분선</span>
          </TopToolbarButton>

          <TopToolbarButton title="링크" onClick={() => formatText('createLink')}>
            <Link2 size={22} color="#666" strokeWidth={1.5} />
            <span style={{ fontSize: '12px' }}>링크</span>
          </TopToolbarButton>

          <input type="file" ref={fileInputRef} multiple onChange={handleFileChange} style={{ display: 'none' }} />
          <TopToolbarButton title="파일" onClick={() => fileInputRef.current.click()}>
            <FileText size={22} color="#666" strokeWidth={1.5} />
            <span style={{ fontSize: '12px' }}>파일</span>
          </TopToolbarButton>
        </div>

        {/* Bottom Row */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '6px 16px', backgroundColor: '#fafafa', gap: '4px', flexWrap: 'wrap', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
          
          <select onChange={(e) => formatText('fontName', e.target.value)} style={{ padding: '6px', border: '1px solid transparent', backgroundColor: 'transparent', fontSize: '13px', color: '#555', outline: 'none', cursor: 'pointer' }}>
            <option value="맑은 고딕">본문 (맑은 고딕)</option>
            <option value="돋움">돋움</option>
            <option value="바탕">바탕</option>
            <option value="나눔고딕">나눔고딕</option>
          </select>

          <select onChange={(e) => formatText('fontSize', e.target.value)} style={{ padding: '6px', border: '1px solid transparent', backgroundColor: 'transparent', fontSize: '13px', color: '#555', outline: 'none', cursor: 'pointer' }}>
            <option value="3">15</option>
            <option value="1">11</option>
            <option value="2">13</option>
            <option value="4">18</option>
            <option value="5">24</option>
          </select>

          <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd', margin: '0 8px' }} />

          <BottomToolbarButton title="굵게" onClick={() => formatText('bold')}><Bold size={16} /></BottomToolbarButton>
          <BottomToolbarButton title="이탤릭" onClick={() => formatText('italic')}><Italic size={16} /></BottomToolbarButton>
          <BottomToolbarButton title="밑줄" onClick={() => formatText('underline')}><Underline size={16} /></BottomToolbarButton>
          <BottomToolbarButton title="중간바" onClick={() => formatText('strikeThrough')}><Strikethrough size={16} /></BottomToolbarButton>

          <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd', margin: '0 8px' }} />

          <div className="color-picker-container" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <BottomToolbarButton title="글자색" onClick={() => setShowColorPicker(prev => prev === 'text' ? null : 'text')}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
                <Type size={14} color="#555" style={{ marginBottom: '2px' }} />
                <div style={{ width: '12px', height: '3px', backgroundColor: currentColor, borderRadius: '2px', border: currentColor === '#ffffff' ? '1px solid #ddd' : 'none' }} />
              </div>
            </BottomToolbarButton>
            {renderColorDropdown('text')}
          </div>
          <div className="color-picker-container" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <BottomToolbarButton title="배경색" onClick={() => setShowColorPicker(prev => prev === 'bg' ? null : 'bg')}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
                <Highlighter size={14} color="#555" style={{ marginBottom: '2px' }} />
                <div style={{ width: '12px', height: '3px', backgroundColor: currentBgColor === 'transparent' ? '#fff' : currentBgColor, borderRadius: '2px', border: '1px solid #ddd' }} />
              </div>
            </BottomToolbarButton>
            {renderColorDropdown('bg')}
          </div>

          <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd', margin: '0 8px' }} />

          <BottomToolbarButton title="왼쪽정렬" onClick={() => formatText('justifyLeft')}><AlignLeft size={16} /></BottomToolbarButton>
          <BottomToolbarButton title="중간정렬" onClick={() => formatText('justifyCenter')}><AlignCenter size={16} /></BottomToolbarButton>
          <BottomToolbarButton title="오른쪽정렬" onClick={() => formatText('justifyRight')}><AlignRight size={16} /></BottomToolbarButton>

          <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd', margin: '0 8px' }} />

          <BottomToolbarButton title="블릿달기" onClick={() => formatText('insertUnorderedList')}><List size={16} /></BottomToolbarButton>

        </div>
      </div>

      {files.length > 0 && (
        <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {files.map((f, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#f5f5f7', borderRadius: '12px', border: '1px solid #d2d2d7' }}>
              <Paperclip size={14} color="#86868b" />
              <span style={{ fontSize: '14px', color: '#1d1d1f', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
              <button onClick={() => removeFile(idx)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff3b30', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={14} /></button>
            </div>
          ))}
        </div>
      )}

      {/* WYSIWYG Content Area */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={(e) => {
          setContent(e.currentTarget.innerHTML);
          updateCurrentStyles();
        }}
        onKeyUp={updateCurrentStyles}
        onMouseUp={updateCurrentStyles}
        style={{ 
          width: '100%', 
          minHeight: '400px', 
          padding: '24px', 
          border: '1px solid #e5e5ea', 
          borderRadius: '18px', 
          fontSize: '17px', 
          lineHeight: '1.6', 
          color: '#1d1d1f',
          outline: 'none', 
          backgroundColor: '#ffffff',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }} 
        onFocus={(e) => { e.target.style.borderColor = '#007aff'; e.target.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)'; }} 
        onBlur={(e) => { e.target.style.borderColor = '#e5e5ea'; e.target.style.boxShadow = 'none'; }}
      />
      {!content && (
        <div style={{ position: 'absolute', pointerEvents: 'none', color: '#86868b', marginTop: '-390px', marginLeft: '24px', fontSize: '17px' }}>
          자유롭게 글을 작성하고 사진을 삽입해 보세요...
        </div>
      )}
      
      {/* Footer Buttons */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '16px', borderTop: '1px solid #e5e5ea', paddingTop: '32px' }}>
        <Link to="/fellowship/grace" style={{ padding: '16px 48px', backgroundColor: '#f5f5f7', border: '1px solid #d2d2d7', color: '#1d1d1f', borderRadius: '14px', fontSize: '17px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8ed'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f7'}>
          작성 취소
        </Link>
        <button 
          onClick={handleSubmit} 
          disabled={isUploading} 
          style={{ padding: '16px 64px', backgroundColor: isUploading ? '#86868b' : '#007aff', color: '#ffffff', border: 'none', borderRadius: '14px', cursor: isUploading ? 'not-allowed' : 'pointer', fontSize: '17px', fontWeight: '600', textDecoration: 'none', transition: 'background-color 0.2s, transform 0.2s', boxShadow: '0 4px 14px rgba(0, 122, 255, 0.3)' }} 
          onMouseEnter={(e) => { if (!isUploading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#0061cc'; } }} 
          onMouseLeave={(e) => { if (!isUploading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = '#007aff'; } }}
        >
          {isUploading ? '업로드 중...' : id ? '글 수정하기' : '글 등록하기'}
        </button>
      </div>

      {showExitModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '24px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '22px', fontWeight: '700', color: '#1d1d1f' }}>정말 나가시겠습니까?</h3>
            <p style={{ margin: '0 0 32px 0', fontSize: '16px', color: '#86868b', lineHeight: '1.5' }}>
              현재 작성 중인 게시물이 있습니다.<br/>페이지를 나가시면 작성 중인 내용은<br/>모두 사라지며 복구할 수 없습니다.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => { setShowExitModal(false); setPendingPath(null); }}
                style={{ flex: 1, padding: '14px', backgroundColor: '#f5f5f7', color: '#1d1d1f', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8e8ed'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f7'}
              >
                계속 작성하기
              </button>
              <button 
                onClick={() => { 
                  setIsDirty(false); 
                  setTimeout(() => navigate(pendingPath), 0); 
                }}
                style={{ flex: 1, padding: '14px', backgroundColor: '#ff3b30', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d70015'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff3b30'}
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Grace() {
  return (
    <Routes>
      <Route path="/" element={<GraceList />} />
      <Route path="write" element={<GraceWrite />} />
      <Route path="edit/:id" element={<GraceWrite />} />
      <Route path=":id" element={<GraceDetail />} />
    </Routes>
  );
}

function GalleryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = React.useState(null);
  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
  const isAdmin = userProfile && userProfile.role === 'admin';
  
  React.useEffect(() => {
    if (id) {
      const today = new Date().toISOString().split('T')[0];
      const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '{}');
      const postKey = `gallery_${id}`;

      if (viewedPosts[postKey] !== today) {
        viewedPosts[postKey] = today;
        localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
        
        fetch('/api/posts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, increment_view: true })
        });
      }
    }

    fetch(`/api/posts?type=gallery${isAdmin ? '&admin=true' : ''}`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id.toString() === id);
        setAlbum(found);
      });
  }, [id, isAdmin]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
        alert('삭제되었습니다.');
        navigate('/fellowship/gallery');
      } catch (err) {
        alert('삭제 실패');
      }
    }
  };

  const handleTogglePrivate = async () => {
    const newStatus = album.is_private ? 0 : 1;
    try {
      await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: album.id, is_private: newStatus })
      });
      setAlbum({ ...album, is_private: newStatus });
    } catch (err) {
      alert('상태 변경 실패');
    }
  };

  const handleNativeShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: album.title,
      text: '평화교회 게시물을 확인해보세요!',
      url: url
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert('현재 브라우저에서는 기본 공유 기능을 지원하지 않습니다.\n아래 링크 복사하기를 이용해주세요.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    } catch (err) {
      alert('링크 복사에 실패했습니다.');
    }
  };

  if (!album) return <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <div style={{ borderTop: '2px solid #333', borderBottom: '1px solid #eee', padding: '24px 16px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAdmin && album.is_private === 1 && <span style={{ color: '#cc0000', fontSize: '18px' }}>[비공개]</span>}
          {album.title}
        </h3>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666' }}>
          <span>작성자: {album.author}</span>
          <span style={{ color: '#ccc' }}>|</span>
          <span>등록일: {new Date(album.created_at).toLocaleDateString()}</span>
          {isAdmin && (
            <>
              <span style={{ color: '#ccc' }}>|</span>
              <span>조회수: {album.views}</span>
            </>
          )}
        </div>
      </div>
      
      <div style={{ padding: '40px 0', minHeight: '300px', fontSize: '16px', color: '#333', lineHeight: '1.8', borderBottom: '1px solid #eee', textAlign: 'center' }}>
        {album.image_urls && album.image_urls.map((img, idx) => (
          <div key={idx} style={{ marginBottom: '32px' }}>
            <img src={img} alt={`사진 ${idx+1}`} style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          </div>
        ))}
        <p style={{ textAlign: 'left', padding: '0 16px', whiteSpace: 'pre-wrap' }}>{album.content}</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '60px' }}>
          <button onClick={handleNativeShare} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', maxWidth: '300px', padding: '14px 24px', backgroundColor: '#fef3c7', color: '#d97706', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fde68a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fef3c7'}>
            <Share2 size={20} />
            공유하기
          </button>
          <button onClick={handleCopyLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', maxWidth: '300px', padding: '14px 24px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
            <Link2 size={20} />
            링크 복사하기
          </button>
        </div>
      </div>
      
      <div style={{ paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {(isAdmin || (userProfile && album && userProfile.name === album.author)) && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to={`/fellowship/gallery/edit/${album.id}`} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>수정</Link>
              <button onClick={handleDelete} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#cc0000', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
              <button onClick={handleTogglePrivate} style={{ padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                {album.is_private ? '공개로 전환' : '비공개로 전환'}
              </button>
            </div>
          )}
        </div>
        <Link to="/fellowship/gallery" style={{ padding: '10px 24px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
          목록으로
        </Link>
      </div>
    </div>
  );
}

function GalleryWrite() {
  const { id } = useParams();
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [existingUrls, setExistingUrls] = React.useState([]);
  const [primaryIndex, setPrimaryIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);
  const [showExitModal, setShowExitModal] = React.useState(false);
  const [pendingPath, setPendingPath] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      fetch(`/api/posts?type=gallery&admin=true`)
        .then(res => res.json())
        .then(data => {
          const found = data.find(item => item.id.toString() === id);
          if (found) {
            setTitle(found.title);
            setDesc(found.content);
            setExistingUrls(found.image_urls || []);
          }
        });
    }
  }, [id]);

  React.useEffect(() => {
    setIsDirty(title !== '' || desc !== '' || files.length > 0);
  }, [title, desc, files]);

  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const handleAnchorClick = (e) => {
      if (!isDirty) return;
      const anchor = e.target.closest('a');
      if (anchor && anchor.href) {
        const isInternal = anchor.origin === window.location.origin;
        if (isInternal) {
          e.preventDefault();
          e.stopPropagation();
          const path = anchor.href.replace(window.location.origin, '');
          setPendingPath(path);
          setShowExitModal(true);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, [isDirty]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      setFiles(prev => [...prev, ...newFiles].slice(0, 20)); // Max 20
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
      setFiles(prev => [...prev, ...newFiles].slice(0, 20));
    }
  };

  const removeFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    if (idx === primaryIndex) {
      setPrimaryIndex(0);
    } else if (idx < primaryIndex) {
      setPrimaryIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0 && existingUrls.length === 0) {
      alert("사진을 최소 1장 이상 등록해주세요.");
      return;
    }
    setIsUploading(true);
    try {
      const filesToUpload = [...files];
      if (primaryIndex > 0 && primaryIndex < filesToUpload.length) {
        const primaryFile = filesToUpload.splice(primaryIndex, 1)[0];
        filesToUpload.unshift(primaryFile);
      }

      const uploadedUrls = [];
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          uploadedUrls.push(data.url);
        }
      }
      
      const finalUrls = uploadedUrls.length > 0 ? uploadedUrls : existingUrls;

      const dbRes = await fetch('/api/posts', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id ? parseInt(id) : undefined,
          type: 'gallery',
          title: title || '새 갤러리 앨범',
          content: desc,
          author: '관리자',
          image_urls: finalUrls
        })
      });
      if (!dbRes.ok) {
        throw new Error('데이터베이스 저장 실패');
      }
      alert(`성공적으로 사진이 ${id ? '수정' : '업로드'}되었습니다!`);
      setIsDirty(false);
      navigate('/fellowship/gallery');
    } catch (error) {
      console.error(error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.08)', padding: '48px', border: '1px solid #f8fafc' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <input 
          type="text" 
          placeholder="앨범 제목을 입력하세요..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px 0', 
            border: 'none', 
            borderBottom: '2px solid #e2e8f0', 
            fontSize: '24px', 
            fontWeight: '600', 
            letterSpacing: '-0.5px',
            color: '#0f172a', 
            outline: 'none', 
            background: 'transparent',
            transition: 'border-color 0.3s ease'
          }} 
          onFocus={(e) => e.target.style.borderBottom = '2px solid #cc0000'} 
          onBlur={(e) => e.target.style.borderBottom = '2px solid #e2e8f0'} 
        />
      </div>

      <input 
        type="file" 
        multiple 
        accept="image/png, image/jpeg, image/webp"
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />

      <div 
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ 
          width: '100%', 
          minHeight: '250px', 
          border: isDragging ? '2px dashed #cc0000' : '2px dashed #cbd5e1', 
          borderRadius: '16px', 
          backgroundColor: isDragging ? '#fff0f0' : '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginBottom: '32px',
          padding: '24px'
        }}
        onMouseEnter={(e) => { if(!isDragging) { e.currentTarget.style.borderColor = '#cc0000'; e.currentTarget.style.backgroundColor = '#fff0f0'; } }}
        onMouseLeave={(e) => { if(!isDragging) { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.backgroundColor = '#f8fafc'; } }}
      >
        <UploadCloud size={48} color={isDragging ? '#cc0000' : '#94a3b8'} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#334155' }}>사진을 이곳에 드래그하거나 클릭하여 추가하세요</p>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>최대 20장, 장당 10MB 이하의 JPG, PNG 파일</p>
        </div>
        
        {files.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: '100%', fontSize: '13px', color: '#64748b', marginBottom: '-4px' }}>
              * 사진을 클릭하여 <strong>대표 사진</strong>을 변경할 수 있습니다.
            </div>
            {files.map((f, idx) => (
              <div 
                key={idx} 
                onClick={(e) => { e.stopPropagation(); setPrimaryIndex(idx); }}
                style={{ 
                  position: 'relative', 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  border: idx === primaryIndex ? '3px solid #cc0000' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'border 0.2s'
                }}
              >
                <img src={URL.createObjectURL(f)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {idx === primaryIndex && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(204,0,0,0.85)', color: '#fff', fontSize: '12px', textAlign: 'center', padding: '4px 0', fontWeight: 'bold' }}>
                    대표 사진
                  </div>
                )}

                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px' }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <textarea 
        placeholder="사진에 대한 설명이나 행사 내용을 간단히 적어주세요 (선택사항)" 
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ 
          width: '100%', 
          minHeight: '200px', 
          padding: '24px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '16px', 
          fontSize: '16px', 
          lineHeight: '1.8', 
          color: '#334155',
          outline: 'none', 
          backgroundColor: '#fff',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          boxSizing: 'border-box',
          resize: 'vertical'
        }} 
        onFocus={(e) => { e.target.style.borderColor = '#cc0000'; e.target.style.boxShadow = '0 0 0 4px rgba(204,0,0,0.05)'; }} 
        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
      />
      
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
        <Link to="/fellowship/gallery" style={{ padding: '16px 48px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '12px', fontSize: '16px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}>
          취소
        </Link>
        <button 
          onClick={handleSubmit}
          disabled={isUploading}
          style={{ padding: '16px 64px', background: isUploading ? '#cbd5e1' : 'linear-gradient(135deg, #cc0000 0%, #a30000 100%)', color: '#fff', border: 'none', borderRadius: '12px', cursor: isUploading ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: isUploading ? 'none' : '0 10px 20px -5px rgba(204,0,0,0.4)' }} 
          onMouseEnter={(e) => { if(!isUploading){ e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(204,0,0,0.5)'; } }} 
          onMouseLeave={(e) => { if(!isUploading){ e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(204,0,0,0.4)'; } }}
        >
          {isUploading ? '업로드 중...' : '사진 올리기'}
        </button>
      </div>

      {showExitModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '16px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fee2e2', color: '#cc0000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>!</span>
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>정말 나가시겠습니까?</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: '#64748b', lineHeight: '1.5' }}>
              현재 작성 중인 게시물이 있습니다.<br/>페이지를 나가시면 작성 중인 내용은<br/>모두 사라지며 업로드되지 않습니다.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => { setShowExitModal(false); setPendingPath(null); }}
                style={{ flex: 1, padding: '12px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                계속 작성하기
              </button>
              <button 
                onClick={() => { 
                  setIsDirty(false); 
                  setTimeout(() => navigate(pendingPath), 0); 
                }}
                style={{ flex: 1, padding: '12px', backgroundColor: '#cc0000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b30000'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#cc0000'}
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryList() {
  const [albums, setAlbums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
  const isAdmin = userProfile && userProfile.role === 'admin';

  React.useEffect(() => {
    fetch(`/api/posts?type=gallery${isAdmin ? '&admin=true' : ''}`)
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [isAdmin]);

  if (loading) return <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ color: '#666', margin: 0 }}>총 <span style={{ color: '#cc0000', fontWeight: 'bold' }}>{albums.length}</span>개의 앨범이 있습니다.</p>
        <Link to="/fellowship/gallery/write" style={{ padding: '10px 20px', backgroundColor: '#2a4358', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d2f3d'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a4358'}>사진 올리기</Link>
      </div>
      
      {albums.length === 0 ? (
        <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          아직 등록된 갤러리 앨범이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {albums.map((album) => (
            <Link to={`/fellowship/gallery/${album.id}`} key={album.id} style={{ textDecoration: 'none', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'block' }} className="group">
              <div style={{ position: 'relative', width: '100%', paddingBottom: '70%', overflow: 'hidden' }}>
                <img src={album.image_urls?.[0] || 'https://via.placeholder.com/500x350?text=No+Image'} alt="갤러리 사진" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="group-hover:scale-110" />
                {isAdmin && album.is_private === 1 && (
                  <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>비공개</div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', color: '#1f2937', transition: 'color 0.2s' }} className="group-hover:text-[#cc0000]">
                  {album.title}
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{new Date(album.created_at).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {albums.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '48px' }}>
          <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>&lt;</button>
          <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cc0000', backgroundColor: '#cc0000', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>1</button>
          <button style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#666', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>&gt;</button>
        </div>
      )}
    </div>
  );
}

function Gallery() {
  return (
    <Routes>
      <Route path="/" element={<GalleryList />} />
      <Route path="write" element={<GalleryWrite />} />
      <Route path="edit/:id" element={<GalleryWrite />} />
      <Route path=":id" element={<GalleryDetail />} />
    </Routes>
  );
}

function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [biz, setBiz] = React.useState(null);
  const [post, setPost] = React.useState(null);

  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
  const isAdmin = userProfile && userProfile.role === 'admin';

  React.useEffect(() => {
    fetch(`/api/posts?type=business${isAdmin ? '&admin=true' : ''}`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id.toString() === id);
        if (found) {
          setPost(found);
          let extra = {};
          try { extra = JSON.parse(found.content); } catch (e) {}
          setBiz({
            id: found.id,
            name: found.title,
            owner: found.author,
            desc: extra.desc || '',
            phone: extra.phone || '',
            addr: extra.addr || '',
            tag: extra.tag || '',
            creator_email: extra.creator_email || '',
            gallery: found.image_urls?.length ? found.image_urls : ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80'],
          });
        }
      });
  }, [id, isAdmin]);

  const isAuthor = userProfile && biz && (biz.creator_email === userProfile.email || biz.owner === userProfile.name);
  const canEdit = isAdmin || isAuthor;

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
        alert('삭제되었습니다.');
        navigate('/fellowship/business');
      } catch (err) {
        alert('삭제 실패');
      }
    }
  };

  const handleTogglePrivate = async () => {
    if (!post) return;
    const newStatus = post.is_private ? 0 : 1;
    try {
      await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, is_private: newStatus })
      });
      setPost({ ...post, is_private: newStatus });
      alert(newStatus ? '비공개로 전환되었습니다.' : '공개로 전환되었습니다.');
    } catch (err) {
      alert('변경 실패');
    }
  };

  const images = biz ? biz.gallery : [];
  const [activeImage, setActiveImage] = React.useState('');
  
  React.useEffect(() => {
    if (images.length > 0 && !activeImage) {
      setActiveImage(images[0]);
    }
  }, [images, activeImage]);
  const scrollRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
  };

  if (!biz) return <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid #f8fafc' }}>
      <div className="w-full h-[250px] md:h-[360px] bg-cover bg-center relative transition-all duration-300" style={{ backgroundImage: `url(${activeImage})` }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 text-white">
          <span style={{ display: 'inline-block', fontSize: '14px', backgroundColor: '#cc0000', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontWeight: 'bold', marginBottom: '16px', boxShadow: '0 4px 10px rgba(204,0,0,0.3)' }}>{biz.tag}</span>
          <h2 className="text-[28px] md:text-[42px] font-[900] m-0 mb-2 md:mb-3 tracking-[-1px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{biz.name}</h2>
          <p style={{ fontSize: '18px', margin: 0, opacity: 0.9, fontWeight: '500' }}>대표: {biz.owner}</p>
        </div>
      </div>
      
      <div className="p-6 md:p-12 flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-8 md:gap-12">
        <div style={{ minWidth: 0 }}>
          
          {images.length > 1 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>매장 사진</h4>
                {images.length > 4 && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={scrollLeft} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#64748b'; }}>
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={scrollRight} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#64748b'; }}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
              <div 
                ref={scrollRef}
                style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  overflowX: 'auto', 
                  scrollBehavior: 'smooth', 
                  paddingBottom: '8px',
                  msOverflowStyle: 'none', 
                  scrollbarWidth: 'none',
                }}
              >
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    style={{ 
                      flexShrink: 0, 
                      width: 'calc(22.22% - 10px)', 
                      aspectRatio: '1', 
                      borderRadius: '16px', 
                      backgroundImage: `url(${img})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center', 
                      cursor: 'pointer',
                      border: activeImage === img ? '3px solid #cc0000' : '3px solid transparent',
                      boxSizing: 'border-box',
                      opacity: activeImage === img ? 1 : 0.6,
                      transition: 'all 0.2s',
                    }} 
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { if (activeImage !== img) e.currentTarget.style.opacity = '0.6'; }}
                  />
                ))}
              </div>
            </div>
          )}

          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px' }}>사업장 소개</h3>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', marginBottom: '32px', whiteSpace: 'pre-wrap' }}>
            {biz.desc}
          </p>
        </div>
        
        <div>
          <div style={{ backgroundColor: '#f8fafc', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '24px', borderBottom: '1px solid #cbd5e1', paddingBottom: '12px' }}>주소 및 문의</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '22px' }}>📞</span>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>전화번호</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: '#334155', fontWeight: '500' }}>{biz.phone}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '22px' }}>📍</span>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>주소</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: '#334155', fontWeight: '500' }}>{biz.addr}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '24px 48px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {canEdit && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to={`/fellowship/business/edit/${biz.id}`} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none' }}>수정</Link>
              <button onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
              <button onClick={handleTogglePrivate} style={{ padding: '10px 20px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>{post?.is_private ? '공개로 전환' : '비공개로 전환'}</button>
            </div>
          )}
        </div>
        <Link to="/fellowship/business" style={{ padding: '14px 32px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

function BusinessList() {
  const [businesses, setBusinesses] = React.useState([]);
  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
  const navigate = useNavigate();

  const handleWriteClick = (e) => {
    if (!userProfile) {
      e.preventDefault();
      alert('로그인한 성도만 등록할 수 있습니다.');
      navigate('/login');
    }
  };

  React.useEffect(() => {
    fetch('/api/posts?type=business')
      .then(res => res.json())
      .then(data => {
        const parsed = data.map(post => {
          let extra = {};
          try { extra = JSON.parse(post.content); } catch (e) {}
          return {
            id: post.id,
            name: post.title,
            owner: post.author,
            desc: extra.desc || '',
            phone: extra.phone || '',
            addr: extra.addr || '',
            tag: extra.tag || '',
            img: post.image_urls?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
          };
        });
        setBusinesses(parsed);
      });
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: '#f8fafc', padding: '24px 32px', borderRadius: '12px', marginBottom: '40px', borderLeft: '4px solid #cc0000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', margin: 0 }}>교우 사업장 안내</h3>
            <p style={{ margin: 0, marginTop: '8px', fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
              우리 교회 성도님들이 운영하시는 사업장을 소개합니다.<br/>
              많은 이용과 기도를 부탁드리며, 사업장 등록을 원하시는 성도님은 우측 버튼을 통해 등록해 주시기 바랍니다.
            </p>
          </div>
          <Link to="/fellowship/business/write" onClick={handleWriteClick} style={{ padding: '12px 24px', backgroundColor: '#2a4358', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', transition: 'background-color 0.2s', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d2f3d'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a4358'}>
            사업장 등록하기
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {businesses.map((biz) => (
          <Link to={`/fellowship/business/${biz.id}`} key={biz.id} className="flex flex-col border border-[#e2e8f0] rounded-[16px] overflow-hidden bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 no-underline hover:-translate-y-1 hover:shadow-lg group">
            <div className="w-full h-[200px] shrink-0 bg-cover bg-center border-b border-[#e2e8f0]" style={{ backgroundImage: `url(${biz.img})` }}>
            </div>
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#0f172a', transition: 'color 0.2s', paddingRight: '8px' }} className="group-hover:text-[#cc0000]">{biz.name}</h4>
                <span style={{ fontSize: '12px', backgroundColor: '#cc0000', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontWeight: '500', whiteSpace: 'nowrap' }}>{biz.tag}</span>
              </div>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>대표: {biz.owner}</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#475569', lineHeight: '1.5', wordBreak: 'keep-all', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{biz.desc}</p>
              <div style={{ marginTop: 'auto', fontSize: '13px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ display: 'inline-block', width: '16px', textAlign: 'center' }}>📞</span> {biz.phone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ display: 'inline-block', width: '16px', textAlign: 'center' }}>📍</span> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{biz.addr}</span></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BusinessWrite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const savedProfile = localStorage.getItem('userProfile');
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;

  React.useEffect(() => {
    if (!userProfile) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, [userProfile, navigate]);

  const fileInputRef = React.useRef(null);
  
  const [name, setName] = React.useState('');
  const [owner, setOwner] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [customCategory, setCustomCategory] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [addr, setAddr] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [existingUrls, setExistingUrls] = React.useState([]);
  const [previews, setPreviews] = React.useState([]);
  const [isUploading, setIsUploading] = React.useState(false);
  
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (id) {
      fetch(`/api/posts?type=business&admin=true`)
        .then(res => res.json())
        .then(data => {
          const found = data.find(item => item.id.toString() === id);
          if (found) {
            setName(found.title);
            setOwner(found.author);
            let extra = {};
            try { extra = JSON.parse(found.content); } catch (e) {}
            if (["음식점", "카페/베이커리", "꽃/식물", "인테리어/건축", "의료/건강", "교육/학원", "안경/렌즈", "서비스/기타"].includes(extra.tag)) {
              setCategory(extra.tag);
            } else {
              setCategory('직접 입력');
              setCustomCategory(extra.tag || '');
            }
            setPhone(extra.phone || '');
            setAddr(extra.addr || '');
            setDesc(extra.desc || '');
            setExistingUrls(found.image_urls || []);
          }
        });
    }
  }, [id]);
  
  const nameRef = React.useRef(null);
  const ownerRef = React.useRef(null);
  const categoryRef = React.useRef(null);
  const customCategoryRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const addrRef = React.useRef(null);
  const descRef = React.useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...files, ...newFiles].slice(0, 10);
      setFiles(totalFiles);
      setPreviews(totalFiles.map(f => URL.createObjectURL(f)));
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newFiles.map(f => URL.createObjectURL(f)));
  };
  
  const removeExisting = (index) => {
    setExistingUrls(existingUrls.filter((_, i) => i !== index));
  };
  
  const moveFile = (index, direction) => {
    if (index + direction < 0 || index + direction >= files.length) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + direction];
    newFiles[index + direction] = temp;
    
    setFiles(newFiles);
    setPreviews(newFiles.map(f => URL.createObjectURL(f)));
  };

  const moveExisting = (index, direction) => {
    if (index + direction < 0 || index + direction >= existingUrls.length) return;
    const newUrls = [...existingUrls];
    const temp = newUrls[index];
    newUrls[index] = newUrls[index + direction];
    newUrls[index + direction] = temp;
    setExistingUrls(newUrls);
  };

  const handleSubmit = async () => {
    let newErrors = {};
    if (!name) newErrors.name = true;
    if (!owner) newErrors.owner = true;
    if (!category) newErrors.category = true;
    if (category === '직접 입력' && !customCategory) newErrors.customCategory = true;
    if (!phone) newErrors.phone = true;
    if (!addr) newErrors.addr = true;
    if (!desc) newErrors.desc = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) { nameRef.current?.focus(); nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      if (newErrors.owner) { ownerRef.current?.focus(); ownerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      if (newErrors.category) { categoryRef.current?.focus(); categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      if (newErrors.customCategory) { customCategoryRef.current?.focus(); customCategoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      if (newErrors.phone) { phoneRef.current?.focus(); phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      if (newErrors.addr) { addrRef.current?.focus(); addrRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      if (newErrors.desc) { descRef.current?.focus(); descRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      return;
    }

    setIsUploading(true);
    let imageUrls = [...existingUrls];
    for (const f of files) {
      const formData = new FormData();
      formData.append('file', f);
      try {
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.url) imageUrls.push(uploadData.url);
      } catch (err) {
        console.error('이미지 업로드 실패:', err);
      }
    }
    
    const finalCategory = category === '직접 입력' ? customCategory : category;
    const extraData = { desc, phone, addr, tag: finalCategory, creator_email: userProfile?.email };
    
    try {
      await fetch('/api/posts', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(id ? { id } : { type: 'business' }),
          title: name,
          author: owner,
          content: JSON.stringify(extraData),
          image_urls: imageUrls
        })
      });
      alert(id ? '사업장 정보가 수정되었습니다.' : '사업장이 성공적으로 등록되었습니다.');
      navigate('/fellowship/business');
    } catch (err) {
      alert('등록에 실패했습니다.');
      setIsUploading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.08)', padding: '48px', border: '1px solid #f8fafc' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0f172a', marginBottom: '32px', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px' }}>{id ? '사업장 수정하기' : '사업장 등록하기'}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>사업장 이름</label>
          <input ref={nameRef} type="text" value={name} onChange={e => { setName(e.target.value); setErrors(prev => ({...prev, name: false})); }} placeholder="예: 평화 베이커리" style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', color: '#334155', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s', ...(errors.name ? { borderColor: '#cc0000', backgroundColor: '#fff0f0' } : {}) }} onFocus={(e) => { if(!errors.name) e.target.style.borderColor = '#cc0000'; }} onBlur={(e) => { if(!errors.name) e.target.style.borderColor = '#cbd5e1'; }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>대표 성도명 (직분)</label>
          <input ref={ownerRef} type="text" value={owner} onChange={e => { setOwner(e.target.value); setErrors(prev => ({...prev, owner: false})); }} placeholder="예: 김평화 집사" style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', color: '#334155', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s', ...(errors.owner ? { borderColor: '#cc0000', backgroundColor: '#fff0f0' } : {}) }} onFocus={(e) => { if(!errors.owner) e.target.style.borderColor = '#cc0000'; }} onBlur={(e) => { if(!errors.owner) e.target.style.borderColor = '#cbd5e1'; }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>업종 (카테고리)</label>
          <select ref={categoryRef} value={category} onChange={e => { setCategory(e.target.value); setErrors(prev => ({...prev, category: false})); }} style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', color: '#334155', boxSizing: 'border-box', outline: 'none', appearance: 'none', backgroundColor: '#fff', cursor: 'pointer', transition: 'border-color 0.2s', ...(errors.category ? { borderColor: '#cc0000', backgroundColor: '#fff0f0' } : {}) }} onFocus={(e) => { if(!errors.category) e.target.style.borderColor = '#cc0000'; }} onBlur={(e) => { if(!errors.category) e.target.style.borderColor = '#cbd5e1'; }}>
            <option value="">카테고리 선택</option>
            <option value="음식점">음식점</option>
            <option value="카페/베이커리">카페/베이커리</option>
            <option value="꽃/식물">꽃/식물</option>
            <option value="인테리어/건축">인테리어/건축</option>
            <option value="의료/건강">의료/건강</option>
            <option value="교육/학원">교육/학원</option>
            <option value="안경/렌즈">안경/렌즈</option>
            <option value="서비스/기타">서비스/기타</option>
            <option value="직접 입력">직접 입력</option>
          </select>
          {category === '직접 입력' && (
            <input ref={customCategoryRef} type="text" value={customCategory} onChange={e => { setCustomCategory(e.target.value); setErrors(prev => ({...prev, customCategory: false})); }} placeholder="업종을 직접 입력해주세요" style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', color: '#334155', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s', marginTop: '12px', ...(errors.customCategory ? { borderColor: '#cc0000', backgroundColor: '#fff0f0' } : {}) }} onFocus={(e) => { if(!errors.customCategory) e.target.style.borderColor = '#cc0000'; }} onBlur={(e) => { if(!errors.customCategory) e.target.style.borderColor = '#cbd5e1'; }} />
          )}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>전화번호</label>
          <input ref={phoneRef} type="text" value={phone} onChange={e => { setPhone(e.target.value); setErrors(prev => ({...prev, phone: false})); }} placeholder="예: 02-123-4567" style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', color: '#334155', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s', ...(errors.phone ? { borderColor: '#cc0000', backgroundColor: '#fff0f0' } : {}) }} onFocus={(e) => { if(!errors.phone) e.target.style.borderColor = '#cc0000'; }} onBlur={(e) => { if(!errors.phone) e.target.style.borderColor = '#cbd5e1'; }} />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>사업장 주소</label>
        <input ref={addrRef} type="text" value={addr} onChange={e => { setAddr(e.target.value); setErrors(prev => ({...prev, addr: false})); }} placeholder="예: 서울시 구로구 평화로 1길 10" style={{ width: '100%', padding: '14px 16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', color: '#334155', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s', ...(errors.addr ? { borderColor: '#cc0000', backgroundColor: '#fff0f0' } : {}) }} onFocus={(e) => { if(!errors.addr) e.target.style.borderColor = '#cc0000'; }} onBlur={(e) => { if(!errors.addr) e.target.style.borderColor = '#cbd5e1'; }} />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>간략 소개 및 영업 안내</label>
        <textarea ref={descRef} value={desc} onChange={e => { setDesc(e.target.value); setErrors(prev => ({...prev, desc: false})); }} placeholder="사업장에 대한 간단한 소개, 특장점, 영업시간 등을 자유롭게 적어주세요." style={{ width: '100%', minHeight: '120px', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', lineHeight: '1.6', color: '#334155', boxSizing: 'border-box', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s', ...(errors.desc ? { borderColor: '#cc0000', backgroundColor: '#fff0f0' } : {}) }} onFocus={(e) => { if(!errors.desc) e.target.style.borderColor = '#cc0000'; }} onBlur={(e) => { if(!errors.desc) e.target.style.borderColor = '#cbd5e1'; }} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>매장 사진 등록 (최대 10장)</label>
        
        <div onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ width: '100%', height: '120px', border: '2px dashed #cbd5e1', borderRadius: '16px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '16px' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#cc0000'; e.currentTarget.style.backgroundColor = '#fff0f0'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}>
          <UploadCloud size={32} color="#94a3b8" />
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>사진 추가하기 ({existingUrls.length + files.length}/10)</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>이곳을 클릭하세요</p>
        </div>
        <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />

        {(existingUrls.length > 0 || previews.length > 0) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
            {existingUrls.map((url, index) => (
              <div key={`exist-${index}`} style={{ position: 'relative', width: '100%', paddingTop: '100%', borderRadius: '12px', overflow: 'hidden', border: index === 0 ? '2px solid #cc0000' : '1px solid #e2e8f0', boxShadow: index === 0 ? '0 4px 12px rgba(204,0,0,0.15)' : 'none' }}>
                <img src={url} alt={`기존사진 ${index + 1}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                {index === 0 && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(204,0,0,0.8)', color: 'white', fontSize: '11px', fontWeight: 'bold', textAlign: 'center', padding: '4px 0' }}>대표 이미지</div>
                )}
                <button onClick={(e) => { e.stopPropagation(); removeExisting(index); }} style={{ position: 'absolute', top: index === 0 ? '28px' : '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
                <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                  <button onClick={(e) => { e.stopPropagation(); moveExisting(index, -1); }} disabled={index === 0} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}>
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); moveExisting(index, 1); }} disabled={index === existingUrls.length - 1} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: index === existingUrls.length - 1 ? 'default' : 'pointer', opacity: index === existingUrls.length - 1 ? 0.3 : 1 }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
            {previews.map((previewUrl, index) => {
              const globalIndex = existingUrls.length + index;
              return (
                <div key={`new-${index}`} style={{ position: 'relative', width: '100%', paddingTop: '100%', borderRadius: '12px', overflow: 'hidden', border: globalIndex === 0 ? '2px solid #cc0000' : '1px solid #e2e8f0', boxShadow: globalIndex === 0 ? '0 4px 12px rgba(204,0,0,0.15)' : 'none' }}>
                  <img src={previewUrl} alt={`미리보기 ${index + 1}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  {globalIndex === 0 && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(204,0,0,0.8)', color: 'white', fontSize: '11px', fontWeight: 'bold', textAlign: 'center', padding: '4px 0' }}>대표 이미지</div>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); removeFile(index); }} style={{ position: 'absolute', top: globalIndex === 0 ? '28px' : '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <X size={14} />
                  </button>
                  <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => { e.stopPropagation(); moveFile(index, -1); }} disabled={index === 0} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}>
                      <ChevronLeft size={14} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); moveFile(index, 1); }} disabled={index === files.length - 1} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: index === files.length - 1 ? 'default' : 'pointer', opacity: index === files.length - 1 ? 0.3 : 1 }}>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
        <Link to="/fellowship/business" style={{ padding: '16px 48px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '12px', fontSize: '16px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}>
          취소
        </Link>
        <button disabled={isUploading} onClick={handleSubmit} style={{ padding: '16px 64px', background: 'linear-gradient(135deg, #cc0000 0%, #a30000 100%)', color: '#fff', border: 'none', borderRadius: '12px', cursor: isUploading ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 10px 20px -5px rgba(204,0,0,0.4)', opacity: isUploading ? 0.7 : 1 }} onMouseEnter={(e) => { if(!isUploading) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(204,0,0,0.5)'; } }} onMouseLeave={(e) => { if(!isUploading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(204,0,0,0.4)'; } }}>
          {isUploading ? '등록 중...' : '등록 신청하기'}
        </button>
      </div>
    </div>
  );
}

function Business() {
  return (
    <Routes>
      <Route path="/" element={<BusinessList />} />
      <Route path="write" element={<BusinessWrite />} />
      <Route path="edit/:id" element={<BusinessWrite />} />
      <Route path=":id" element={<BusinessDetail />} />
    </Routes>
  );
}

/* ─────────────────────────── Main Fellowship Layout ─────────────────────────── */



export default function Fellowship() {
  const MENU_ITEMS = useSubMenus('/fellowship');
  const currentMenuItems = MENU_ITEMS.length > 0 ? MENU_ITEMS : [{ path: '/fellowship/grace', label: '은혜의글' }];

  const location = useLocation();
  const currentPath = location.pathname === '/fellowship' ? '/fellowship/grace' : location.pathname;
  const currentMenu = [...currentMenuItems].sort((a, b) => b.path.length - a.path.length).find(item => currentPath.startsWith(item.path)) || currentMenuItems[0];

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      
      {/* ── Full Width Top Banner ── */}
      <div style={{
        width: '100%',
        height: '200px',
        backgroundImage: 'url("/sub-header-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {/* Semi-transparent overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#fff', fontSize: '38px', fontWeight: 700, letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {/* 나눔과교제 */}
          </h1>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-8 md:py-[60px] flex flex-col md:flex-row gap-8 md:gap-[60px] items-start w-full">
        
        {/* ── Sidebar (LNB) ── */}
        <nav className="hidden md:block w-[240px] shrink-0">
          <div style={{ background: '#2a4358', color: '#fff', textAlign: 'center', padding: '18px 0', fontSize: '20px', fontWeight: 500 }}>
            나눔과교제
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #eee' }}>
            {currentMenuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path} style={{ borderBottom: '1px solid #eee' }}>
                  <Link 
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 20px',
                      fontSize: '15px',
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? '#e64835' : '#444',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#e64835'; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#444'; }}
                  >
                    <span>{item.label}</span>
                    {isActive && <ChevronRight size={16} color="#e64835" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Main Content ── */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#888', marginBottom: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#888', textDecoration: 'none' }} title="홈으로 이동" onMouseEnter={(e) => e.currentTarget.style.color = '#333'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
              <Home size={12} />
            </Link>
            <ChevronRight size={12} color="#ccc" />
            <Link to="/fellowship" style={{ color: '#888', textDecoration: 'none' }} title="나눔과교제로 이동" onMouseEnter={(e) => e.currentTarget.style.color = '#333'} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
              나눔과교제
            </Link>
            <ChevronRight size={12} color="#ccc" />
            <span style={{ color: '#333' }}>{currentMenu.label}</span>
          </div>

          {/* Page Title */}
          <h2 className="text-[26px] md:text-[32px] font-normal text-[#333] pb-4 md:pb-5 border-b border-[#999] mb-6 md:mb-10 m-0">
            {currentMenu.label}
          </h2>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<Grace />} />
                <Route path="grace/*" element={<Grace />} />
                <Route path="gallery/*" element={<Gallery />} />
                <Route path="business/*" element={<Business />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
