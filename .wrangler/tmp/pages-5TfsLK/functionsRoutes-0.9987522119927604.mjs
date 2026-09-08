import { onRequestPost as __api_auth_google_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\auth\\google.js"
import { onRequestPost as __api_auth_kakao_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\auth\\kakao.js"
import { onRequestPost as __api_auth_logout_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\auth\\logout.js"
import { onRequestGet as __api_auth_me_js_onRequestGet } from "H:\\Hospital Master Project\\functions\\api\\auth\\me.js"
import { onRequestPost as __api_auth_naver_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\auth\\naver.js"
import { onRequestGet as __api_cms_data_js_onRequestGet } from "H:\\Hospital Master Project\\functions\\api\\cms\\data.js"
import { onRequestPost as __api_cms_data_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\cms\\data.js"
import { onRequestPost as __api_cms_upload_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\cms\\upload.js"
import { onRequestGet as __api_media__key__js_onRequestGet } from "H:\\Hospital Master Project\\functions\\api\\media\\[key].js"
import { onRequestDelete as __api_pages___slug___js_onRequestDelete } from "H:\\Hospital Master Project\\functions\\api\\pages\\[[slug]].js"
import { onRequestGet as __api_pages___slug___js_onRequestGet } from "H:\\Hospital Master Project\\functions\\api\\pages\\[[slug]].js"
import { onRequestPost as __api_pages___slug___js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\pages\\[[slug]].js"
import { onRequestPut as __api_pages___slug___js_onRequestPut } from "H:\\Hospital Master Project\\functions\\api\\pages\\[[slug]].js"
import { onRequestPost as __api_estimate_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\estimate.js"
import { onRequestPost as __api_login_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\login.js"
import { onRequestDelete as __api_menus_js_onRequestDelete } from "H:\\Hospital Master Project\\functions\\api\\menus.js"
import { onRequestGet as __api_menus_js_onRequestGet } from "H:\\Hospital Master Project\\functions\\api\\menus.js"
import { onRequestPost as __api_menus_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\menus.js"
import { onRequestPut as __api_menus_js_onRequestPut } from "H:\\Hospital Master Project\\functions\\api\\menus.js"
import { onRequestDelete as __api_posts_js_onRequestDelete } from "H:\\Hospital Master Project\\functions\\api\\posts.js"
import { onRequestGet as __api_posts_js_onRequestGet } from "H:\\Hospital Master Project\\functions\\api\\posts.js"
import { onRequestPost as __api_posts_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\posts.js"
import { onRequestPut as __api_posts_js_onRequestPut } from "H:\\Hospital Master Project\\functions\\api\\posts.js"
import { onRequestPost as __api_signup_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\signup.js"
import { onRequestPost as __api_upload_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\upload.js"
import { onRequestPost as __api_withdraw_js_onRequestPost } from "H:\\Hospital Master Project\\functions\\api\\withdraw.js"

export const routes = [
    {
      routePath: "/api/auth/google",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_google_js_onRequestPost],
    },
  {
      routePath: "/api/auth/kakao",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_kakao_js_onRequestPost],
    },
  {
      routePath: "/api/auth/logout",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_logout_js_onRequestPost],
    },
  {
      routePath: "/api/auth/me",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_me_js_onRequestGet],
    },
  {
      routePath: "/api/auth/naver",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_naver_js_onRequestPost],
    },
  {
      routePath: "/api/cms/data",
      mountPath: "/api/cms",
      method: "GET",
      middlewares: [],
      modules: [__api_cms_data_js_onRequestGet],
    },
  {
      routePath: "/api/cms/data",
      mountPath: "/api/cms",
      method: "POST",
      middlewares: [],
      modules: [__api_cms_data_js_onRequestPost],
    },
  {
      routePath: "/api/cms/upload",
      mountPath: "/api/cms",
      method: "POST",
      middlewares: [],
      modules: [__api_cms_upload_js_onRequestPost],
    },
  {
      routePath: "/api/media/:key",
      mountPath: "/api/media",
      method: "GET",
      middlewares: [],
      modules: [__api_media__key__js_onRequestGet],
    },
  {
      routePath: "/api/pages/:slug*",
      mountPath: "/api/pages",
      method: "DELETE",
      middlewares: [],
      modules: [__api_pages___slug___js_onRequestDelete],
    },
  {
      routePath: "/api/pages/:slug*",
      mountPath: "/api/pages",
      method: "GET",
      middlewares: [],
      modules: [__api_pages___slug___js_onRequestGet],
    },
  {
      routePath: "/api/pages/:slug*",
      mountPath: "/api/pages",
      method: "POST",
      middlewares: [],
      modules: [__api_pages___slug___js_onRequestPost],
    },
  {
      routePath: "/api/pages/:slug*",
      mountPath: "/api/pages",
      method: "PUT",
      middlewares: [],
      modules: [__api_pages___slug___js_onRequestPut],
    },
  {
      routePath: "/api/estimate",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_estimate_js_onRequestPost],
    },
  {
      routePath: "/api/login",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_login_js_onRequestPost],
    },
  {
      routePath: "/api/menus",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_menus_js_onRequestDelete],
    },
  {
      routePath: "/api/menus",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_menus_js_onRequestGet],
    },
  {
      routePath: "/api/menus",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_menus_js_onRequestPost],
    },
  {
      routePath: "/api/menus",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_menus_js_onRequestPut],
    },
  {
      routePath: "/api/posts",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_posts_js_onRequestDelete],
    },
  {
      routePath: "/api/posts",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_posts_js_onRequestGet],
    },
  {
      routePath: "/api/posts",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_posts_js_onRequestPost],
    },
  {
      routePath: "/api/posts",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_posts_js_onRequestPut],
    },
  {
      routePath: "/api/signup",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_signup_js_onRequestPost],
    },
  {
      routePath: "/api/upload",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_upload_js_onRequestPost],
    },
  {
      routePath: "/api/withdraw",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_withdraw_js_onRequestPost],
    },
  ]