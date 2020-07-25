const version = "5.2.2--rel";
const cacheName = "cache-" + version;
const scriptVersion = "@1.1";
const CDNname = "https://cdn.jsdelivr.net/gh/edfus/storage";
const cacheResources = [
  `/loadFonts.js`,
  `/webWorker.js`,
  `/css/style.css`,
  `/css/style-more.css`,
  `${CDNname}/js/script@1.2.js`,
  `${CDNname}/js/script-category${scriptVersion}.js`,
  `${CDNname}/js/script-more${scriptVersion}.js`,
  `${CDNname}/glightbox/glightbox${scriptVersion}.min.js`
];
const DLC = [
  `https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js`,
  `${CDNname}/gitalk/gitalk.css`
];
/*Check resources in case Exception TypeError	throws*/

self.addEventListener('install', (event) =>{
  self.skipWaiting();
  //Take place of the active service worker.
  event.waitUntil(
    //waitUntil() tells the browser that work is ongoing until the promise settles, 
    //and it shouldn't terminate the service worker if it wants that work to complete.
    caches.open(cacheName).then(cache =>{
      return cache.addAll(cacheResources)
      //addAll() will overwrite any key/value pairs previously stored in the cache that match the request
          .then(() => {
            if('connection' in navigator && !navigator.connection.saveData){
              cache.addAll(DLC);
            }
          });
    })
  )
})

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate.');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  )
  return self.clients.claim(); //
});


self.addEventListener('fetch', function(e) {
  let hostname = e.request.url.split("//")[1].split('/')[0];
  e.respondWith(
    caches.match(e.request).then(async function(response) {
      if (response != null) {
        return response
      }
      else{
        if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
          console.dir(e.request);
          return;
        }
        let request = e.request.clone();
        //Failed to execute 'fetch' on 'WorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
        //https://bugs.chromium.org/p/chromium/issues/detail?id=823392
        //https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
        return await fetch(request).then(async response=>{
          if (!response || response.status !== 200 || response.type !== "basic" ? ( response.type !== "cors" ? true : hostname !== "cdn.jsdelivr.net" ) : false ) {
            //There is no HTTP status code 0. What you see is a 0 returned by the API/library that you are using.
            return response;
          }
          if( request.method === "GET" ){
            const cache = await caches.open(cacheName);
            await cache.put(request.url, response.clone());
          }
          //Cloning the response is necessary because request and response streams can only be read once.
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
//npm install -D babel-loader @babel/core @babel/preset-env -- no use.
/*
"@babel/core": "^7.0.0",
"@babel/preset-env": "^7.0.0",
"gulp": "^4.0.2",
"gulp-babel": "^8.0.0",
*/