export async function onRequestGet(context) {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare('SELECT id, value FROM cms_settings').all();
    const data = {};
    for (const row of results) {
      try {
        data[row.id] = JSON.parse(row.value);
      } catch (e) {
        data[row.id] = row.value; // fallback
      }
    }
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    // body is expected to be { id: "cms_...", value: <any> } or an array of such objects
    
    let items = Array.isArray(body) ? body : [body];
    
    // Filter out invalid items (e.g., missing id or undefined value)
    items = items.filter(item => item.id && typeof item.id === 'string' && item.id.startsWith('cms_') && item.value !== undefined);
    
    if (items.length === 0) {
      return new Response(JSON.stringify({ success: true, message: 'No valid items to save' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const statements = items.map(item => {
      const val = typeof item.value === 'object' ? JSON.stringify(item.value) : String(item.value);
      return env.DB.prepare(
        'INSERT INTO cms_settings (id, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP'
      ).bind(item.id, val);
    });
    
    await env.DB.batch(statements);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
