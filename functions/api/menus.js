export async function onRequestGet(context) {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare(
      `SELECT * FROM menus ORDER BY parent_id, sort_order ASC`
    ).all();

    // 부모/자식 구조로 변환
    const menus = [];
    const menuMap = {};

    results.forEach(menu => {
      menu.children = [];
      menuMap[menu.id] = menu;
      if (!menu.parent_id) {
        menus.push(menu);
      }
    });

    results.forEach(menu => {
      if (menu.parent_id && menuMap[menu.parent_id]) {
        menuMap[menu.parent_id].children.push(menu);
      }
    });

    return new Response(JSON.stringify(menus), {
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
    const { name, path, parent_id, sort_order } = data;
    
    await env.DB.prepare(
      `INSERT INTO menus (name, path, parent_id, sort_order) VALUES (?, ?, ?, ?)`
    ).bind(name, path || '', parent_id || null, sort_order || 0).run();
    
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
    
    if (Array.isArray(data)) {
      // 대량 업데이트 (순서 변경 등)
      // D1 에서는 여러 쿼리를 batch 로 실행해야 함
      const statements = data.map(item => {
        if (item.name !== undefined) {
          return env.DB.prepare(`UPDATE menus SET parent_id = ?, sort_order = ?, is_active = ?, name = ? WHERE id = ?`)
            .bind(item.parent_id || null, item.sort_order, item.is_active ? 1 : 0, item.name, item.id);
        } else {
          return env.DB.prepare(`UPDATE menus SET parent_id = ?, sort_order = ?, is_active = ? WHERE id = ?`)
            .bind(item.parent_id || null, item.sort_order, item.is_active ? 1 : 0, item.id);
        }
      });
      await env.DB.batch(statements);
    } else {
      // 단일 업데이트
      const { id, name, path, is_active } = data;
      await env.DB.prepare(
        `UPDATE menus SET name = ?, path = ?, is_active = ? WHERE id = ?`
      ).bind(name, path, is_active ? 1 : 0, id).run();
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id) {
      // 자식 메뉴도 함께 삭제
      await env.DB.prepare(`DELETE FROM menus WHERE id = ? OR parent_id = ?`).bind(id, id).run();
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
