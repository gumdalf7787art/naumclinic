export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ success: false, message: 'No file uploaded' }), { status: 400 });
    }

    // Create a unique filename
    const uniqueId = crypto.randomUUID();
    const extension = file.name.split('.').pop();
    const fileName = `${uniqueId}.${extension}`;

    // Upload to R2
    await env.BUCKET.put(fileName, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    // Replace with your actual R2 Public URL provided by the user
    const publicUrl = `https://pub-ab83f4a3e2f442478dc2560ca3f87bbc.r2.dev/${fileName}`;

    // Optional: save to media table in D1
    try {
      await env.DB.prepare(
        "INSERT INTO media (file_name, url) VALUES (?, ?)"
      ).bind(fileName, publicUrl).run();
    } catch (dbError) {
      console.error("Failed to save media record to D1:", dbError);
      // Proceed even if DB fails
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'File uploaded successfully',
      url: publicUrl,
      fileName: fileName
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
