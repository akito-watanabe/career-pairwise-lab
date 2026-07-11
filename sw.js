// キャリア比較ラボ Service Worker（v1.6.0）
// アプリシェルをprecacheし、オフラインでも動作させる。
// 運用ルール：リリース時は必ず CACHE_VERSION を新しいバージョンに更新すること。
// （これによりinstallが走り、クライアント側で「新しいバージョンがあります」トーストが出る）
const CACHE_VERSION = "career-pairwise-lab-v2.2.0";
const APP_SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  // skipWaitingはユーザーが更新トーストをタップしたときだけ行う（作業中の突然のリロードを防ぐ）
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(event.request).catch(() =>
          // オフラインで未キャッシュのナビゲーションはアプリ本体へフォールバック
          event.request.mode === "navigate" ? caches.match("./index.html") : Response.error()
        )
    )
  );
});
