var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-kIopaw/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/pages-vPsoFg/functionsWorker-0.9101396525396596.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var urls2 = /* @__PURE__ */ new Set();
function checkURL2(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls2.has(url.toString())) {
      urls2.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL2, "checkURL");
__name2(checkURL2, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL2(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();
function base64UrlEncode(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let base64 = btoa(String.fromCharCode.apply(null, bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(base64UrlEncode, "base64UrlEncode");
__name2(base64UrlEncode, "base64UrlEncode");
function base64UrlDecode(base64Url) {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
  const binary = atob(pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
__name(base64UrlDecode, "base64UrlDecode");
__name2(base64UrlDecode, "base64UrlDecode");
async function signJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  if (!payload.exp) {
    payload.exp = Math.floor(Date.now() / 1e3) + 24 * 60 * 60;
  }
  const encodedHeader = base64UrlEncode(textEncoder.encode(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(textEncoder.encode(JSON.stringify(payload)));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(dataToSign));
  const encodedSignature = base64UrlEncode(signature);
  return `${dataToSign}.${encodedSignature}`;
}
__name(signJWT, "signJWT");
__name2(signJWT, "signJWT");
async function verifyJWT(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const key = await crypto.subtle.importKey(
      "raw",
      textEncoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const signatureBytes = base64UrlDecode(encodedSignature);
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, textEncoder.encode(dataToSign));
    if (!isValid) return null;
    const payloadBytes = base64UrlDecode(encodedPayload);
    const payloadText = textDecoder.decode(payloadBytes);
    const payload = JSON.parse(payloadText);
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1e3)) {
      return null;
    }
    return payload;
  } catch (e) {
    return null;
  }
}
__name(verifyJWT, "verifyJWT");
__name2(verifyJWT, "verifyJWT");
async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { code, redirectUri } = await request.json();
    const CLIENT_ID = "1009526923706-tjpv4vi3li8clbgsrlbtgsstkjeohjp6.apps.googleusercontent.com";
    const CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri
      })
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || tokenData.error) {
      console.error("Google Token Error:", tokenData);
      return new Response(JSON.stringify({
        success: false,
        message: "\uAD6C\uAE00 \uD1A0\uD070 \uBC1C\uAE09 \uC2E4\uD328",
        details: tokenData
      }), { status: 400 });
    }
    const accessToken = tokenData.access_token;
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    const userData = await userResponse.json();
    if (!userResponse.ok || userData.error) {
      console.error("Google User Info Error:", userData);
      return new Response(JSON.stringify({
        success: false,
        message: "\uAD6C\uAE00 \uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC870\uD68C \uC2E4\uD328",
        details: userData
      }), { status: 400 });
    }
    const email = userData.email;
    const name = userData.name || userData.given_name || "\uAD6C\uAE00 \uC720\uC800";
    let user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(email).first();
    if (!user) {
      await env.DB.prepare(
        "INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
      ).bind(name, email, "google_social_login", "user").run();
      user = { name, email, role: "user" };
    }
    const userProfile = {
      name: user.name,
      email: user.email,
      title: "",
      company: "\uC18C\uC18D \uC5C6\uC74C",
      phone: "\uC5F0\uB77D\uCC98 \uC5C6\uC74C",
      // 구글은 전화번호 제공을 기본적으로 지원하지 않음
      role: user.role
    };
    const secretKey = env.JWT_SECRET || "peacechurch-default-secret-key-2026";
    const token = await signJWT({ email: user.email, role: user.role }, secretKey);
    return new Response(JSON.stringify({
      success: true,
      user: userProfile
    }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`
      }
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
__name(onRequestPost, "onRequestPost");
__name2(onRequestPost, "onRequestPost");
async function onRequestPost2(context) {
  const { request, env } = context;
  try {
    const { code, redirectUri } = await request.json();
    const REST_API_KEY = "b0b92ea63baf92a771b860929aea52b1";
    const CLIENT_SECRET = env.KAKAO_CLIENT_SECRET;
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirectUri,
        code
      })
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error("Kakao Token Error:", tokenData);
      return new Response(JSON.stringify({
        success: false,
        message: "\uCE74\uCE74\uC624 \uD1A0\uD070 \uBC1C\uAE09 \uC2E4\uD328",
        details: tokenData
      }), { status: 400 });
    }
    const accessToken = tokenData.access_token;
    const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    });
    const userData = await userResponse.json();
    if (!userResponse.ok) {
      console.error("Kakao User Info Error:", userData);
      return new Response(JSON.stringify({ success: false, message: "\uCE74\uCE74\uC624 \uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC870\uD68C \uC2E4\uD328" }), { status: 400 });
    }
    const kakaoAccount = userData.kakao_account || {};
    const profile = kakaoAccount.profile || {};
    const email = kakaoAccount.email || `${userData.id}@kakao.com`;
    const name = profile.nickname || "\uCE74\uCE74\uC624 \uC720\uC800";
    let user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(email).first();
    if (!user) {
      await env.DB.prepare(
        "INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
      ).bind(name, email, "kakao_social_login", "user").run();
      user = { name, email, role: "user" };
    }
    const userProfile = {
      name: user.name,
      email: user.email,
      title: "",
      company: "\uC18C\uC18D \uC5C6\uC74C",
      phone: "\uC5F0\uB77D\uCC98 \uC5C6\uC74C",
      role: user.role
    };
    const secretKey = env.JWT_SECRET || "peacechurch-default-secret-key-2026";
    const token = await signJWT({ email: user.email, role: user.role }, secretKey);
    return new Response(JSON.stringify({
      success: true,
      user: userProfile
    }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`
      }
    });
  } catch (error) {
    console.error("Kakao Login Error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
__name(onRequestPost2, "onRequestPost2");
__name2(onRequestPost2, "onRequestPost");
async function onRequestPost3() {
  return new Response(JSON.stringify({ success: true, message: "\uB85C\uADF8\uC544\uC6C3 \uB418\uC5C8\uC2B5\uB2C8\uB2E4." }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "token=; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=0"
    }
  });
}
__name(onRequestPost3, "onRequestPost3");
__name2(onRequestPost3, "onRequestPost");
async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
      return new Response(JSON.stringify({ success: false, message: "\uB85C\uADF8\uC778\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." }), { status: 401 });
    }
    const cookies = Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")));
    const token = cookies.token;
    if (!token) {
      return new Response(JSON.stringify({ success: false, message: "\uC720\uD6A8\uD55C \uD1A0\uD070\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }), { status: 401 });
    }
    const secretKey = env.JWT_SECRET || "peacechurch-default-secret-key-2026";
    const payload = await verifyJWT(token, secretKey);
    if (!payload) {
      return new Response(JSON.stringify({ success: false, message: "\uD1A0\uD070\uC774 \uB9CC\uB8CC\uB418\uC5C8\uAC70\uB098 \uBCC0\uC870\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }), { status: 401 });
    }
    const user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(payload.email).first();
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "\uC0AC\uC6A9\uC790\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), { status: 404 });
    }
    const userProfile = {
      name: user.name,
      email: user.email,
      title: "\uB300\uD45C",
      company: "\uC18C\uC18D \uC5C6\uC74C",
      phone: "\uC5F0\uB77D\uCC98 \uC5C6\uC74C",
      role: user.role
    };
    return new Response(JSON.stringify({ success: true, user: userProfile }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "\uC11C\uBC84 \uC624\uB958", error: error.message }), { status: 500 });
  }
}
__name(onRequestGet, "onRequestGet");
__name2(onRequestGet, "onRequestGet");
async function onRequestPost4(context) {
  const { request, env } = context;
  try {
    const { code, state } = await request.json();
    const CLIENT_ID = "UPoKeP1gguFzcstAcAiC";
    const CLIENT_SECRET = env.NAVER_CLIENT_SECRET;
    const tokenResponse = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${state}`, {
      method: "GET"
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || tokenData.error) {
      console.error("Naver Token Error:", tokenData);
      return new Response(JSON.stringify({
        success: false,
        message: "\uB124\uC774\uBC84 \uD1A0\uD070 \uBC1C\uAE09 \uC2E4\uD328",
        details: tokenData
      }), { status: 400 });
    }
    const accessToken = tokenData.access_token;
    const userResponse = await fetch("https://openapi.naver.com/v1/nid/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    const userData = await userResponse.json();
    if (!userResponse.ok || userData.resultcode !== "00") {
      console.error("Naver User Info Error:", userData);
      return new Response(JSON.stringify({
        success: false,
        message: "\uB124\uC774\uBC84 \uC0AC\uC6A9\uC790 \uC815\uBCF4 \uC870\uD68C \uC2E4\uD328",
        details: userData
      }), { status: 400 });
    }
    const profile = userData.response || {};
    const email = profile.email || `${profile.id}@naver.com`;
    const name = profile.nickname || profile.name || "\uB124\uC774\uBC84 \uC720\uC800";
    const phone = profile.mobile || "\uC5F0\uB77D\uCC98 \uC5C6\uC74C";
    let user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(email).first();
    if (!user) {
      await env.DB.prepare(
        "INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
      ).bind(name, email, "naver_social_login", "user").run();
      user = { name, email, role: "user" };
    }
    const userProfile = {
      name: user.name,
      email: user.email,
      title: "",
      company: "\uC18C\uC18D \uC5C6\uC74C",
      phone,
      // 네이버에서 가져온 전화번호 저장
      role: user.role
    };
    const secretKey = env.JWT_SECRET || "peacechurch-default-secret-key-2026";
    const token = await signJWT({ email: user.email, role: user.role }, secretKey);
    return new Response(JSON.stringify({
      success: true,
      user: userProfile
    }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`
      }
    });
  } catch (error) {
    console.error("Naver Login Error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
__name(onRequestPost4, "onRequestPost4");
__name2(onRequestPost4, "onRequestPost");
async function onRequestGet2(context) {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare("SELECT id, value FROM cms_settings").all();
    const data = {};
    for (const row of results) {
      try {
        data[row.id] = JSON.parse(row.value);
      } catch (e) {
        data[row.id] = row.value;
      }
    }
    return new Response(JSON.stringify({ success: true, data }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  }
}
__name(onRequestGet2, "onRequestGet2");
__name2(onRequestGet2, "onRequestGet");
async function onRequestPost5(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    let items = Array.isArray(body) ? body : [body];
    items = items.filter((item) => item.id && typeof item.id === "string" && item.id.startsWith("cms_") && item.value !== void 0);
    if (items.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "No valid items to save" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    const statements = items.map((item) => {
      const val = typeof item.value === "object" ? JSON.stringify(item.value) : String(item.value);
      return env.DB.prepare(
        "INSERT INTO cms_settings (id, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP"
      ).bind(item.id, val);
    });
    await env.DB.batch(statements);
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost5, "onRequestPost5");
__name2(onRequestPost5, "onRequestPost");
async function onRequestPost6(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { base64Data, extension = "webp" } = body;
    if (!base64Data) {
      return new Response(JSON.stringify({ success: false, error: "No image data provided" }), { status: 400 });
    }
    const parts = base64Data.split(",");
    const b64 = parts.length === 2 ? parts[1] : parts[0];
    const binaryString = atob(b64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const key = `cms_${Date.now()}_${Math.random().toString(36).substring(7)}.${extension}`;
    await env.BUCKET.put(key, bytes.buffer, {
      httpMetadata: {
        contentType: `image/${extension}`
      }
    });
    const url = `/api/media/${key}`;
    return new Response(JSON.stringify({ success: true, url }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost6, "onRequestPost6");
__name2(onRequestPost6, "onRequestPost");
async function onRequestGet3(context) {
  const { request, env, params } = context;
  const key = params.key;
  try {
    const object = await env.BUCKET.get(key);
    if (object === null) {
      return new Response("Object Not Found", { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Cache-Control", "public, max-age=31536000");
    return new Response(object.body, {
      headers
    });
  } catch (e) {
    return new Response("Error retrieving object", { status: 500 });
  }
}
__name(onRequestGet3, "onRequestGet3");
__name2(onRequestGet3, "onRequestGet");
async function onRequestGet4(context) {
  const { env, params } = context;
  const slug = params.slug ? Array.isArray(params.slug) ? params.slug.join("/") : params.slug : "";
  try {
    if (!slug) {
      const { results } = await env.DB.prepare("SELECT id, slug, menu_id, title, subtitle, banner_image, content, is_published, created_at, updated_at FROM subpages ORDER BY created_at DESC").all();
      return new Response(JSON.stringify({ success: true, pages: results }), { headers: { "Content-Type": "application/json" } });
    }
    const page = await env.DB.prepare("SELECT * FROM subpages WHERE slug = ?").bind(slug).first();
    if (!page) {
      return new Response(JSON.stringify({ success: false, message: "Page not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, page }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
__name(onRequestGet4, "onRequestGet4");
__name2(onRequestGet4, "onRequestGet");
async function onRequestPost7(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { slug, menu_id, title, subtitle, banner_image, content, is_published } = data;
    if (!slug || !title) {
      return new Response(JSON.stringify({ success: false, message: "Slug and title are required" }), { status: 400 });
    }
    const existing = await env.DB.prepare("SELECT slug FROM subpages WHERE slug = ?").bind(slug).first();
    if (existing) {
      return new Response(JSON.stringify({ success: false, message: "Slug already exists" }), { status: 400 });
    }
    await env.DB.prepare(
      "INSERT INTO subpages (slug, menu_id, title, subtitle, banner_image, content, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      slug,
      menu_id || null,
      title,
      subtitle || "",
      banner_image || "",
      content || "",
      is_published === void 0 ? 1 : is_published
    ).run();
    return new Response(JSON.stringify({ success: true, message: "Page created successfully" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
__name(onRequestPost7, "onRequestPost7");
__name2(onRequestPost7, "onRequestPost");
async function onRequestPut(context) {
  const { request, env, params } = context;
  const slug = params.slug ? Array.isArray(params.slug) ? params.slug.join("/") : params.slug : "";
  if (!slug) {
    return new Response(JSON.stringify({ success: false, message: "Slug is required for PUT" }), { status: 400 });
  }
  try {
    const data = await request.json();
    const { menu_id, title, subtitle, banner_image, content, is_published } = data;
    if (!title) {
      return new Response(JSON.stringify({ success: false, message: "Title is required" }), { status: 400 });
    }
    const result = await env.DB.prepare(
      "UPDATE subpages SET menu_id = ?, title = ?, subtitle = ?, banner_image = ?, content = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?"
    ).bind(
      menu_id || null,
      title,
      subtitle || "",
      banner_image || "",
      content || "",
      is_published === void 0 ? 1 : is_published,
      slug
    ).run();
    if (result.meta.changes === 0) {
      return new Response(JSON.stringify({ success: false, message: "Page not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, message: "Page updated successfully" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
__name(onRequestPut, "onRequestPut");
__name2(onRequestPut, "onRequestPut");
async function onRequestDelete(context) {
  const { env, params } = context;
  const slug = params.slug ? Array.isArray(params.slug) ? params.slug.join("/") : params.slug : "";
  if (!slug) {
    return new Response(JSON.stringify({ success: false, message: "Slug is required for DELETE" }), { status: 400 });
  }
  try {
    const result = await env.DB.prepare("DELETE FROM subpages WHERE slug = ?").bind(slug).run();
    if (result.meta.changes === 0) {
      return new Response(JSON.stringify({ success: false, message: "Page not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, message: "Page deleted successfully" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
__name(onRequestDelete, "onRequestDelete");
__name2(onRequestDelete, "onRequestDelete");
async function onRequestPost8(context) {
  const { request, env } = context;
  try {
    const formData = await request.formData();
    const name = formData.get("name") || "";
    const title = formData.get("title") || "";
    const company = formData.get("company") || "";
    const region = formData.get("region") || "";
    const website = formData.get("website") || "";
    const phone = formData.get("phone") || "";
    const email = formData.get("email") || "";
    const userType = formData.get("userType") || "";
    const platformType = formData.get("platformType") || "";
    const features = formData.get("features") || "[]";
    const description = formData.get("description") || "";
    const files = formData.getAll("files");
    const uploadedUrls = [];
    for (const file of files) {
      if (file && file.name && file.size > 0) {
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const key = `estimates/${timestamp}_${safeName}`;
        await env.BUCKET.put(key, file.stream(), {
          httpMetadata: { contentType: file.type }
        });
        uploadedUrls.push(key);
      }
    }
    const attachmentUrls = JSON.stringify(uploadedUrls);
    const result = await env.DB.prepare(
      `INSERT INTO estimates 
        (name, title, company, region, website, phone, email, user_type, platform_type, features, description, attachment_urls) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      name,
      title,
      company,
      region,
      website,
      phone,
      email,
      userType,
      platformType,
      features,
      description,
      attachmentUrls
    ).run();
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "no-reply@platform-maker.com",
          to: env.RESEND_TO_EMAIL || "goodduck2@naver.com",
          // 환경 변수 없으면 기본값으로
          reply_to: email,
          // 고객 이메일을 회신 주소로 설정
          subject: `[Platform Maker] ${name}\uB2D8\uC73C\uB85C\uBD80\uD130 \uC0C8\uB85C\uC6B4 \uACAC\uC801 \uBB38\uC758`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">\uC0C8\uB85C\uC6B4 \uACAC\uC801 \uBB38\uC758\uAC00 \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4.</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p><strong>\uC2E0\uCCAD\uC790:</strong> ${name} ${title ? `(${title})` : ""}</p>
                <p><strong>\uD68C\uC0AC/\uD300\uBA85:</strong> ${company}</p>
                <p><strong>\uC5F0\uB77D\uCC98:</strong> ${phone}</p>
                <p><strong>\uC774\uBA54\uC77C:</strong> ${email}</p>
                <p><strong>\uC11C\uBE44\uC2A4 \uC720\uD615:</strong> ${platformType} / ${userType}</p>
                <p><strong>\uC694\uAD6C \uAE30\uB2A5:</strong> ${features}</p>
              </div>
              <div style="margin-top: 20px; padding: 20px; border-left: 4px solid #000; background: #fff;">
                <h4 style="margin-top:0;">\uC0C1\uC138 \uB0B4\uC6A9</h4>
                <p style="white-space: pre-wrap;">${description}</p>
              </div>
              <p style="color: #888; font-size: 12px; margin-top: 30px;">
                * \uD074\uB77C\uC6B0\uB4DC\uD50C\uB808\uC5B4 \uB300\uC2DC\uBCF4\uB4DC(D1)\uC5D0\uC11C \uC0C1\uC138 \uB0B4\uC6A9\uC744 \uD655\uC778\uD558\uC138\uC694.
              </p>
            </div>
          `
        })
      });
    } catch (emailError) {
      console.error("\uC774\uBA54\uC77C \uBC1C\uC1A1 \uC2E4\uD328:", emailError);
    }
    if (env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: `\u{1F680} \uC0C8\uB85C\uC6B4 \uD504\uB85C\uC81D\uD2B8 \uBB38\uC758\uAC00 \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4!`,
                  emoji: true
                }
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `<!channel> \uD655\uC778 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.`
                }
              },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*\uC774\uB984/\uC9C1\uAE09:*
${name} ${title ? `(${title})` : ""}` },
                  { type: "mrkdwn", text: `*\uD68C\uC0AC\uBA85:*
${company}` },
                  { type: "mrkdwn", text: `*\uC5F0\uB77D\uCC98:*
${phone}` },
                  { type: "mrkdwn", text: `*\uC774\uBA54\uC77C:*
${email}` }
                ]
              },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*\uD50C\uB7AB\uD3FC \uC720\uD615:*
${platformType}` },
                  { type: "mrkdwn", text: `*\uACE0\uAC1D \uC720\uD615:*
${userType}` }
                ]
              },
              {
                type: "section",
                text: { type: "mrkdwn", text: `*\uC0C1\uC138 \uB0B4\uC6A9:*
\`\`\`${description || "\uB0B4\uC6A9 \uC5C6\uC74C"}\`\`\`` }
              }
            ]
          })
        });
      } catch (slackError) {
        console.error("\uC2AC\uB799 \uC54C\uB9BC \uBC1C\uC1A1 \uC2E4\uD328:", slackError);
      }
    }
    return new Response(JSON.stringify({
      success: true,
      message: "\uC131\uACF5\uC801\uC73C\uB85C \uACAC\uC801\uC774 \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
__name(onRequestPost8, "onRequestPost8");
__name2(onRequestPost8, "onRequestPost");
async function onRequestPost9(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { email, password } = data;
    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: "\uC774\uBA54\uC77C\uACFC \uBE44\uBC00\uBC88\uD638\uB294 \uD544\uC218\uC785\uB2C8\uB2E4." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const result = await env.DB.prepare(
      `SELECT * FROM Users WHERE email = ? AND password_hash = ?`
    ).bind(email, passwordHash).first();
    if (!result) {
      return new Response(JSON.stringify({
        success: false,
        message: "\uC774\uBA54\uC77C \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const userProfile = {
      name: result.name,
      email: result.email,
      title: "\uB300\uD45C",
      // 일단 데모용으로 기본값 제공
      company: "(\uC18C\uC18D \uC815\uBCF4 \uC5C6\uC74C)",
      phone: "(\uC5F0\uB77D\uCC98 \uC815\uBCF4 \uC5C6\uC74C)",
      role: result.role || "user"
    };
    const secretKey = env.JWT_SECRET || "peacechurch-default-secret-key-2026";
    const token = await signJWT({ email: result.email, role: result.role || "user" }, secretKey);
    return new Response(JSON.stringify({
      success: true,
      message: "\uB85C\uADF8\uC778 \uC131\uACF5",
      user: userProfile
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost9, "onRequestPost9");
__name2(onRequestPost9, "onRequestPost");
async function onRequestGet5(context) {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare(
      `SELECT * FROM menus ORDER BY parent_id, sort_order ASC`
    ).all();
    const menus = [];
    const menuMap = {};
    results.forEach((menu) => {
      menu.children = [];
      menuMap[menu.id] = menu;
      if (!menu.parent_id) {
        menus.push(menu);
      }
    });
    results.forEach((menu) => {
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
__name(onRequestGet5, "onRequestGet5");
__name2(onRequestGet5, "onRequestGet");
async function onRequestPost10(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { name, path, parent_id, sort_order } = data;
    await env.DB.prepare(
      `INSERT INTO menus (name, path, parent_id, sort_order) VALUES (?, ?, ?, ?)`
    ).bind(name, path || "", parent_id || null, sort_order || 0).run();
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
__name(onRequestPost10, "onRequestPost10");
__name2(onRequestPost10, "onRequestPost");
async function onRequestPut2(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    if (Array.isArray(data)) {
      const statements = data.map((item) => {
        if (item.name !== void 0) {
          return env.DB.prepare(`UPDATE menus SET parent_id = ?, sort_order = ?, is_active = ?, name = ? WHERE id = ?`).bind(item.parent_id || null, item.sort_order, item.is_active ? 1 : 0, item.name, item.id);
        } else {
          return env.DB.prepare(`UPDATE menus SET parent_id = ?, sort_order = ?, is_active = ? WHERE id = ?`).bind(item.parent_id || null, item.sort_order, item.is_active ? 1 : 0, item.id);
        }
      });
      await env.DB.batch(statements);
    } else {
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
__name(onRequestPut2, "onRequestPut2");
__name2(onRequestPut2, "onRequestPut");
async function onRequestDelete2(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (id) {
      await env.DB.prepare(`DELETE FROM menus WHERE id = ? OR parent_id = ?`).bind(id, id).run();
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
__name(onRequestDelete2, "onRequestDelete2");
__name2(onRequestDelete2, "onRequestDelete");
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
  }
}
__name(ensureTable, "ensureTable");
__name2(ensureTable, "ensureTable");
async function onRequestGet6(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "gallery";
    const admin = url.searchParams.get("admin") === "true";
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
      if (e.message.includes("no such table") || e.message.includes("no such column")) {
        await ensureTable(env);
        const retryRes = await env.DB.prepare(query).bind(type).all();
        results = retryRes.results;
      } else {
        throw e;
      }
    }
    const posts = results.map((post) => ({
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
__name(onRequestGet6, "onRequestGet6");
__name2(onRequestGet6, "onRequestGet");
async function onRequestPost11(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { type, title, content, author, image_urls } = data;
    try {
      await env.DB.prepare(
        `INSERT INTO posts (type, title, content, author, image_urls) VALUES (?, ?, ?, ?, ?)`
      ).bind(
        type || "gallery",
        title || "\uBB34\uC81C",
        content || "",
        author || "\uAD00\uB9AC\uC790",
        JSON.stringify(image_urls || [])
      ).run();
    } catch (e) {
      if (e.message.includes("no such table")) {
        await ensureTable(env);
        await env.DB.prepare(
          `INSERT INTO posts (type, title, content, author, image_urls) VALUES (?, ?, ?, ?, ?)`
        ).bind(
          type || "gallery",
          title || "\uBB34\uC81C",
          content || "",
          author || "\uAD00\uB9AC\uC790",
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
__name(onRequestPost11, "onRequestPost11");
__name2(onRequestPost11, "onRequestPost");
async function onRequestPut3(context) {
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
    if (title !== void 0) {
      updates.push("title = ?");
      values.push(title);
    }
    if (content !== void 0) {
      updates.push("content = ?");
      values.push(content);
    }
    if (image_urls !== void 0) {
      updates.push("image_urls = ?");
      values.push(JSON.stringify(image_urls));
    }
    if (is_private !== void 0) {
      updates.push("is_private = ?");
      values.push(is_private ? 1 : 0);
    }
    if (updates.length > 0) {
      values.push(id);
      await env.DB.prepare(`UPDATE posts SET ${updates.join(", ")} WHERE id = ?`).bind(...values).run();
    }
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
__name(onRequestPut3, "onRequestPut3");
__name2(onRequestPut3, "onRequestPut");
async function onRequestDelete3(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400 });
    await env.DB.prepare(`DELETE FROM posts WHERE id = ?`).bind(id).run();
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
__name(onRequestDelete3, "onRequestDelete3");
__name2(onRequestDelete3, "onRequestDelete");
async function onRequestPost12(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const { email, password, name } = data;
    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: "\uC774\uBA54\uC77C\uACFC \uBE44\uBC00\uBC88\uD638\uB294 \uD544\uC218\uC785\uB2C8\uB2E4." }), { status: 400 });
    }
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const role = email === "goodduck2@naver.com" ? "admin" : "user";
    const result = await env.DB.prepare(
      `INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)`
    ).bind(email, passwordHash, name || "\uD68C\uC6D0", role).run();
    const secretKey = env.JWT_SECRET || "peacechurch-default-secret-key-2026";
    const token = await signJWT({ email, role }, secretKey);
    return new Response(JSON.stringify({
      success: true,
      message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
    }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`
      }
    });
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return new Response(JSON.stringify({
        success: false,
        message: "\uC774\uBBF8 \uAC00\uC785\uB41C \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4."
      }), { status: 400 });
    }
    return new Response(JSON.stringify({
      success: false,
      message: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
      error: error.message
    }), { status: 500 });
  }
}
__name(onRequestPost12, "onRequestPost12");
__name2(onRequestPost12, "onRequestPost");
async function onRequestPost13(context) {
  const { request, env } = context;
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return new Response(JSON.stringify({ success: false, message: "No file uploaded" }), { status: 400 });
    }
    const uniqueId = crypto.randomUUID();
    const extension = file.name.split(".").pop();
    const fileName = `${uniqueId}.${extension}`;
    await env.BUCKET.put(fileName, file.stream(), {
      httpMetadata: { contentType: file.type }
    });
    const publicUrl = `https://pub-ab83f4a3e2f442478dc2560ca3f87bbc.r2.dev/${fileName}`;
    try {
      await env.DB.prepare(
        "INSERT INTO media (file_name, url) VALUES (?, ?)"
      ).bind(fileName, publicUrl).run();
    } catch (dbError) {
      console.error("Failed to save media record to D1:", dbError);
    }
    return new Response(JSON.stringify({
      success: true,
      message: "File uploaded successfully",
      url: publicUrl,
      fileName
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
__name(onRequestPost13, "onRequestPost13");
__name2(onRequestPost13, "onRequestPost");
async function onRequestPost14(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return new Response(JSON.stringify({ success: false, message: "\uC774\uBA54\uC77C \uC815\uBCF4\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await env.DB.prepare(
      "DELETE FROM Users WHERE email = ?"
    ).bind(email).run();
    return new Response(JSON.stringify({ success: true, message: "\uD68C\uC6D0 \uD0C8\uD1F4\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "\uC11C\uBC84 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost14, "onRequestPost14");
__name2(onRequestPost14, "onRequestPost");
var routes = [
  {
    routePath: "/api/auth/google",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/auth/kakao",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/auth/logout",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/auth/me",
    mountPath: "/api/auth",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/auth/naver",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/cms/data",
    mountPath: "/api/cms",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/cms/data",
    mountPath: "/api/cms",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/cms/upload",
    mountPath: "/api/cms",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  },
  {
    routePath: "/api/media/:key",
    mountPath: "/api/media",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/pages/:slug*",
    mountPath: "/api/pages",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete]
  },
  {
    routePath: "/api/pages/:slug*",
    mountPath: "/api/pages",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet4]
  },
  {
    routePath: "/api/pages/:slug*",
    mountPath: "/api/pages",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost7]
  },
  {
    routePath: "/api/pages/:slug*",
    mountPath: "/api/pages",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut]
  },
  {
    routePath: "/api/estimate",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost8]
  },
  {
    routePath: "/api/login",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost9]
  },
  {
    routePath: "/api/menus",
    mountPath: "/api",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete2]
  },
  {
    routePath: "/api/menus",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet5]
  },
  {
    routePath: "/api/menus",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost10]
  },
  {
    routePath: "/api/menus",
    mountPath: "/api",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut2]
  },
  {
    routePath: "/api/posts",
    mountPath: "/api",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete3]
  },
  {
    routePath: "/api/posts",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet6]
  },
  {
    routePath: "/api/posts",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost11]
  },
  {
    routePath: "/api/posts",
    mountPath: "/api",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut3]
  },
  {
    routePath: "/api/signup",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost12]
  },
  {
    routePath: "/api/upload",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost13]
  },
  {
    routePath: "/api/withdraw",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost14]
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// C:/Users/검달프/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// C:/Users/검달프/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-kIopaw/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// C:/Users/검달프/AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-kIopaw/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.9101396525396596.js.map
