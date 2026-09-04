import { useState, useEffect } from 'react';

// Cache is only used within a single page load to avoid duplicate simultaneous fetches.
// It is invalidated after every save so that subsequent reads always get fresh data.
let cmsDataCache = null;
let cmsDataPromise = null;

export const fetchCMSData = async () => {
  // Return in-flight promise if one exists (prevents parallel duplicate requests)
  if (cmsDataCache) return cmsDataCache;
  if (cmsDataPromise) return cmsDataPromise;

  cmsDataPromise = fetch('/api/cms/data', { cache: 'no-store' })
    .then(res => {
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.success) {
        cmsDataCache = data.data;
        return cmsDataCache;
      }
      console.error('[CMS] Server returned success=false', data);
      return {};
    })
    .catch(err => {
      console.error('[CMS] Failed to fetch CMS data:', err);
      cmsDataPromise = null; // Allow retry on next call
      return {};
    });

  return cmsDataPromise;
};

// Invalidate cache so that the next fetchCMSData call hits the server
export const invalidateCMSCache = () => {
  cmsDataCache = null;
  cmsDataPromise = null;
};

export const saveToServer = async (payload) => {
  try {
    const res = await fetch('/api/cms/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[CMS] Save failed (${res.status}):`, errorText);
      throw new Error(`Save failed: ${res.status}`);
    }

    const result = await res.json();
    if (!result.success) {
      console.error('[CMS] Server returned success=false on save:', result);
      throw new Error('Server save returned success=false');
    }

    // Update local cache with new values so that in-app reads stay fresh
    if (cmsDataCache) {
      const items = Array.isArray(payload) ? payload : [payload];
      items.forEach(item => {
        cmsDataCache[item.id] = item.value;
      });
    }

    console.log('[CMS] Saved successfully:', Array.isArray(payload) ? payload.map(p => p.id) : payload.id);
    return true;
  } catch (e) {
    console.error('[CMS] Failed to save to CMS API:', e);
    return false;
  }
};

export function useCMSData(key, defaultData) {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // First, load from server (authoritative source)
    fetchCMSData().then(serverData => {
      if (serverData && serverData[key] !== undefined) {
        setData(serverData[key]);
      }
    });

    // Listen for real-time local updates (from admin page editing in same tab)
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) setData(JSON.parse(saved));
      } catch(e) {}
    };
    
    let eventName = 'storage';
    if (key === 'cms_sections') eventName = 'cms_sections_updated';
    else if (key === 'cms_heroSlides') eventName = 'cms_hero_updated';
    else if (key === 'cms_quickSection' || key === 'cms_quickLinks') eventName = 'cms_quick_updated';
    else if (key === 'cms_pastorSection') eventName = 'cms_pastor_updated';
    else if (key === 'cms_footerSection') eventName = 'cms_footer_updated';

    window.addEventListener(eventName, handleUpdate);
    return () => window.removeEventListener(eventName, handleUpdate);
  }, [key]);

  return data;
}
