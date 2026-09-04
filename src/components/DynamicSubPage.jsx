import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlockRenderer } from './PageBlocks';
import { PAGE_TEMPLATES } from '../data/pageTemplates';

export default function DynamicSubPage({ defaultSlug }) {
  const location = useLocation();
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  
  const pathSlug = location.pathname.replace(/^\/+|\/+$/g, '');
  const currentSlug = slug || defaultSlug || pathSlug;

  useEffect(() => {
    if (!currentSlug) return;
    
    setLoading(true);
    setContent(null);
    setBlocks(null);

    fetch(`/api/pages/${currentSlug}`)
      .then(res => {
        if (!res.ok) throw new Error('Page not found');
        return res.json();
      })
      .then(data => {
        if (data.success && data.page && data.page.is_published === 1) {
          setPageData(data.page);
          const rawContent = data.page.content;
          
          // Try parsing content as JSON block array
          try {
            const parsed = JSON.parse(rawContent);
            if (Array.isArray(parsed) && parsed.length > 0) {
              // Valid block data exists in DB → use it directly
              setBlocks(parsed);
              return;
            }
          } catch (e) {
            // Not JSON - could be old HTML
          }

          // DB has data but it's empty array, old HTML, or invalid
          // → Prefer template if available, otherwise show raw HTML
          if (PAGE_TEMPLATES[currentSlug]) {
            setBlocks(PAGE_TEMPLATES[currentSlug]);
          } else if (rawContent && rawContent.trim() && rawContent !== '[]') {
            setContent(rawContent); // Legacy HTML fallback
          } else {
            showEmptyState();
          }
        } else {
          // Page found but not published, or no success
          useTemplate();
        }
      })
      .catch(err => {
        console.error('DynamicSubPage fetch error:', err);
        // API returned 404 or network error
        // → Always try template before showing error
        useTemplate();
      })
      .finally(() => {
        setLoading(false);
      });

    function useTemplate() {
      if (PAGE_TEMPLATES[currentSlug]) {
        setBlocks(PAGE_TEMPLATES[currentSlug]);
      } else {
        showEmptyState();
      }
    }

    function showEmptyState() {
      setContent(`
        <div style="text-align: center; padding: 60px 20px; background: #fafafa; border-radius: 12px; border: 1px dashed #ddd;">
          <div style="font-size: 48px; margin-bottom: 20px;">🚧</div>
          <h3 style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 12px;">현재 페이지는 준비 중입니다.</h3>
          <p style="color: #666; font-size: 15px; line-height: 1.6;">
            이 페이지는 곧 업데이트될 예정입니다.<br/>
            조금만 기다려 주세요.
          </p>
        </div>
      `);
    }
  }, [currentSlug, location.pathname]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-20 min-h-[300px]">
        <div className="animate-pulse w-10 h-10 border-4 border-[#8DC63F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleBlockChange = async (newBlocks) => {
    setBlocks(newBlocks);
    if (pageData) {
      try {
        await fetch(`/api/pages/${currentSlug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...pageData, content: JSON.stringify(newBlocks) })
        });
      } catch (err) {
        console.error('Failed to save block data', err);
      }
    }
  };

  return (
    <div className="w-full">
      {blocks ? (
        <BlockRenderer blocks={blocks} onChange={handleBlockChange} />
      ) : (
        <div 
          className="prose max-w-none prose-lg prose-headings:font-bold prose-a:text-[#8DC63F]"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      )}
    </div>
  );
}
