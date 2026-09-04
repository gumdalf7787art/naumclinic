export async function onRequestGet(context) {
  const { request, env, params } = context;
  const key = params.key;

  try {
    const object = await env.BUCKET.get(key);

    if (object === null) {
      return new Response('Object Not Found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    return new Response(object.body, {
      headers,
    });
  } catch (e) {
    return new Response('Error retrieving object', { status: 500 });
  }
}
