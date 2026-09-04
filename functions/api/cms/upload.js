export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { base64Data, extension = 'webp' } = body;
    
    if (!base64Data) {
      return new Response(JSON.stringify({ success: false, error: 'No image data provided' }), { status: 400 });
    }

    // data:image/webp;base64,UklGR... -> split by comma
    const parts = base64Data.split(',');
    const b64 = parts.length === 2 ? parts[1] : parts[0];
    
    // Convert base64 string to Uint8Array/ArrayBuffer
    const binaryString = atob(b64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Generate unique key
    const key = `cms_${Date.now()}_${Math.random().toString(36).substring(7)}.${extension}`;
    
    await env.BUCKET.put(key, bytes.buffer, {
      httpMetadata: {
        contentType: `image/${extension}`
      }
    });

    const url = `/api/media/${key}`;

    return new Response(JSON.stringify({ success: true, url }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
