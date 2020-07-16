const version = "0.0.8--beta";
const cacheName = "cache-" + version;
const cacheResources = [
  '/',
  "/index.html",
  "/css/style.css",
  "https://cdn.jsdelivr.net/gh/edfus/storage/images/root/ddby_logo.png.webp",
  "https://cdn.jsdelivr.net/gh/edfus/storage/images/root/footer-reimu.png.webp",
  "https://cdn.jsdelivr.net/gh/edfus/storage/images/root/font-display.png.webp",
  "https://cdn.jsdelivr.net/gh/edfus/storage/images/mobile-SA/74309455_p4_crop.jpg.webp",
  "https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js",
  "/js_temp/script.js"
] 
//NOTE: it seems that cacheResources is used only after first install.
//NOTE: Access to fetch at 'https://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js' has been blocked by CORS policy
//NOTE: TypeError: Request failed service worker happens ↓
//when your resourcesToCache includes something that returns a 404 response.
self.addEventListener('install', (event) =>{
    event.waitUntil(
      caches.open(cacheName).then((cache) =>{
        return cache.addAll(cacheResources)
            .then(() => self.skipWaiting());
      })
    );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName || location.host.includes("localhost")) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(async function(response) {
      if (response != null) {
        return response
      }
      else{
        //return fetch(e.request.url)
        let request = e.request.clone();
        return await fetch(request).then(async response=>{
          if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
          }
          if( request.method === "GET" && !location.host.includes("localhost")){
            const cache = await caches.open(cacheName)
            await cache.put(request.url, response.clone());
          } 
          //NOTE: https://www.rrfed.com/sw4.min.js
          //NOTE: https://stackoverflow.com/questions/54619653/can-a-service-worker-fetch-and-cache-cross-origin-assets
          return response;
      })
      }
    })
  )
})
/*NOTE: TypeError in plugin "gulp-babel"
Message:
Z:\git_depository\hexo_blog_2019\public\serviceWorker.js: Cannot read property 'bindings' of null
*/
//npm install -D babel-loader @babel/core @babel/preset-env