async function ensureTable(env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      author TEXT,
      image_urls TEXT,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_private INTEGER DEFAULT 0
    )
  `).run();

  try {
    await env.DB.prepare(`ALTER TABLE posts ADD COLUMN is_private INTEGER DEFAULT 0`).run();
  } catch (e) {
    // Ignore error if column already exists
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'gallery';
    const admin = url.searchParams.get('admin') === 'true';
    let query = `SELECT * FROM posts WHERE type = ?`;
    if (!admin) {
      query += ` AND (is_private IS NULL OR is_private = 0)`;
    }
    query += ` ORDER BY created_at DESC`;

    let results;
    try {
      const dbRes = await env.DB.prepare(query).bind(type).all();
      results = dbRes.results;
    } catch (e) {
      if (e.message.includes('no such table') || e.message.includes('no such column')) {
        await ensureTable(env);
        // Retry once after ensuring table/columns exist
        const retryRes = await env.DB.prepare(query).bind(type).all();
        results = retryRes.results;
      } else {
        throw e;
      }
    }
    
    // Parse image_urls JSON
    const posts = results.map(post => ({
      ...post,
      image_urls: post.image_urls ? JSON.parse(post.image_urls) : []
    }));
    
    return new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { type, title, content, author, image_urls } = data;
    
    try {
      await env.DB.prepare(
        `INSERT INTO posts (type, title, content, author, image_urls) VALUES (?, ?, ?, ?, ?)`
      ).bind(
        type || 'gallery', 
        title || '무제', 
        content || '', 
        author || '관리자', 
        JSON.stringify(image_urls || [])
      ).run();
    } catch (e) {
      if (e.message.includes('no such table')) {
        await ensureTable(env);
        await env.DB.prepare(
          `INSERT INTO posts (type, title, content, author, image_urls) VALUES (?, ?, ?, ?, ?)`
        ).bind(
          type || 'gallery', 
          title || '무제', 
          content || '', 
          author || '관리자', 
          JSON.stringify(image_urls || [])
        ).run();
      } else {
        throw e;
      }
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { id, title, content, image_urls, is_private, increment_view } = data;
    if (!id) return new Response("Missing id", { status: 400 });

    if (increment_view) {
      await env.DB.prepare(`UPDATE posts SET views = views + 1 WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
    }

    const updates = [];
    const values = [];
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (content !== undefined) { updates.push('content = ?'); values.push(content); }
    if (image_urls !== undefined) { updates.push('image_urls = ?'); values.push(JSON.stringify(image_urls)); }
    if (is_private !== undefined) { updates.push('is_private = ?'); values.push(is_private ? 1 : 0); }
    
    if (updates.length > 0) {
      values.push(id);
      await env.DB.prepare(`UPDATE posts SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    }
    
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response("Missing id", { status: 400 });

    await env.DB.prepare(`DELETE FROM posts WHERE id = ?`).bind(id).run();
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
