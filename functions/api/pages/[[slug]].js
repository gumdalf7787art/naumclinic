export async function onRequestGet(context) {
  const { env, params } = context;
  const slug = params.slug ? (Array.isArray(params.slug) ? params.slug.join('/') : params.slug) : '';

  try {
    if (!slug) {
      // Root /api/pages requested
      const { results } = await env.DB.prepare("SELECT id, slug, menu_id, title, subtitle, banner_image, content, is_published, created_at, updated_at FROM subpages ORDER BY created_at DESC").all();
      return new Response(JSON.stringify({ success: true, pages: results }), { headers: { 'Content-Type': 'application/json' }});
    }

    const page = await env.DB.prepare("SELECT * FROM subpages WHERE slug = ?").bind(slug).first();
    if (!page) {
      return new Response(JSON.stringify({ success: false, message: 'Page not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, page }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { slug, menu_id, title, subtitle, banner_image, content, is_published } = data;

    if (!slug || !title) {
      return new Response(JSON.stringify({ success: false, message: 'Slug and title are required' }), { status: 400 });
    }

    const existing = await env.DB.prepare("SELECT slug FROM subpages WHERE slug = ?").bind(slug).first();
    if (existing) {
      return new Response(JSON.stringify({ success: false, message: 'Slug already exists' }), { status: 400 });
    }

    await env.DB.prepare(
      "INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      slug,
      menu_id || null,
      title,
      subtitle || '',
      banner_image || '',
      content || '',
      is_published === undefined ? 1 : is_published
    ).run();

    return new Response(JSON.stringify({ success: true, message: 'Page created successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function onRequestPut(context) {
  const { request, env, params } = context;
  const slug = params.slug ? (Array.isArray(params.slug) ? params.slug.join('/') : params.slug) : '';

  if (!slug) {
    return new Response(JSON.stringify({ success: false, message: 'Slug is required for PUT' }), { status: 400 });
  }

  try {
    const data = await request.json();
    const { menu_id, title, subtitle, banner_image, content, is_published } = data;

    if (!title) {
      return new Response(JSON.stringify({ success: false, message: 'Title is required' }), { status: 400 });
    }

    const result = await env.DB.prepare(
      "UPDATE subpages SET menu_id = ?, title = ?, subtitle = ?, banner_image = ?, content = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?"
    ).bind(
      menu_id || null, 
      title, 
      subtitle || '', 
      banner_image || '', 
      content || '', 
      is_published === undefined ? 1 : is_published,
      slug
    ).run();

    if (result.meta.changes === 0) {
      return new Response(JSON.stringify({ success: false, message: 'Page not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Page updated successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const slug = params.slug ? (Array.isArray(params.slug) ? params.slug.join('/') : params.slug) : '';

  if (!slug) {
    return new Response(JSON.stringify({ success: false, message: 'Slug is required for DELETE' }), { status: 400 });
  }

  try {
    const result = await env.DB.prepare("DELETE FROM subpages WHERE slug = ?").bind(slug).run();
    if (result.meta.changes === 0) {
      return new Response(JSON.stringify({ success: false, message: 'Page not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, message: 'Page deleted successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
