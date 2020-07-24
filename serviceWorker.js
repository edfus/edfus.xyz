//import {fontsCacheName, fonts, CDNname} from './pwa'
{
const version = "3.2.2--beta";
const cacheName = "cache-" + version;
const scriptVersion = "@1.1";
const CDNname = "https://cdn.jsdelivr.net/gh/edfus/storage";
const cacheResources = [
  `/css/style.css`,
  `/css/style-more.css`,
  `${CDNname}/js/script@1.2.js`,
  `${CDNname}/js/script-category${scriptVersion}.js`,
  `${CDNname}/js/script-more${scriptVersion}.js`,
  `${CDNname}/glightbox/glightbox${scriptVersion}.min.js`
];
/*Check resources in case Exception TypeError	throws*/

const indexedDBsuffix = "#indexedDB";
const indexedDBResources = [
  `https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js${indexedDBsuffix}`,
  `${CDNname}/gitalk/gitalk.css${indexedDBsuffix}`,
  `${CDNname}/fonts/筑紫A丸ゴシック.woff2${indexedDBsuffix}`,
  `${CDNname}/fonts/Consolas.woff2${indexedDBsuffix}`
]
const fonts = [
  {
    name: "筑紫A丸ゴシック",
    url: `${CDNname}/fonts/筑紫A丸ゴシック.woff2${indexedDBsuffix}`,
    unicodeRange: 'U+4E00-9FCB'/*汉字字符集 4E00-9FA5 9FA6-9FCB*/
  },
  {
    name: "Consolas",
    url: `${CDNname}/fonts/Consolas.woff2${indexedDBsuffix}`,
    unicodeRange: 'U+0000-007F'
  }
];

const downloadFontFunc = (font) => {
  caches.open(fontsCacheName).then(cache =>{
    if('connection' in navigator && !navigator.connection.saveData){
      cache.add(font.url).then(()=>{
        self.clients.matchAll().then(all => all.forEach(client => {
          client.postMessage(font);
        }));
      })
    } else {
      console.info("metered network?");
    }
  })
}


fetch(
  new Request('flowers.jpg', 
    { method: 'GET',
      headers: new Headers(),
      mode: 'cors',
      referrer: 'no-referrer',
      redirect: 'follow' 
    })
  ).then(response => {
        if(response.ok)
          return response.blob();
        else console.dir(response)
      })
      //使用blob()从response中读取一个Blob对象
      .then(myBlob => {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
      })
      .catch(error => console.error(error));

let request = indexedDB.open('Database', 1);
let db = null;
request.onerror = () => {
  console.log('woah');
}
request.onsuccess = e => {
  db = e.target.result;
  //如果 onupgradeneeded 事件成功执行完成，打开数据库请求的 onsuccess 处理函数会被触发。
}

request.onupgradeneeded = e => {
  var db = e.target.result;
  let fontsStore = db.createObjectStore('fonts', {keyPath: 'url', autoIncrement: false});
  //keyPath true autoIncrement false
  fontsStore.createIndex('fontURLindex','url',{unique: true});
  fontsStore.transaction.oncomplete = e=>{

  }
}

function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      resolve(reader.result);
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
}
function arrayBufferToBlob(buffer, type) {
  return new Blob([buffer], {type: type});
}
//https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices
// Storing ArrayBuffers in IndexedDB is very well supported.
// a Blob has a MIME type while an ArrayBuffer does not. 


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
              cache.addAll(DLC).catch(e=>console.log(e));
            }
          });
    }).then(()=>{
      fonts.forEach(font=>{
        downloadFontFunc(font);
      })
    })
  )
})

self.addEventListener("message", function(event) {
  if(event.data === "load font pls"){
    seekIndexedDB().catch(()=>{
      downloadFontFunc(event.data)
    })
  }
  else console.error(event.data);
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate.');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== fontsCacheName) {
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
  if(e.request.url.includes(indexedDBsuffix))
      e.respondWith("ppp"); 
  else e.respondWith(
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
}