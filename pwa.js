// register service worker
//TODO：骨架屏
const CDNname = "https://cdn.jsdelivr.net/gh/edfus/storage";
const fontsCacheName = "fontsCache-1.0";
const fonts = [
  {
    name: "筑紫A丸ゴシック",
    url: `${CDNname}/fonts/筑紫A丸ゴシック.woff2`,
    unicodeRange: 'U+4E00-9FCB'/*汉字字符集 4E00-9FA5 9FA6-9FCB*/
  },
  {
    name: "Consolas",
    url: `${CDNname}/fonts/Consolas.woff2`,
    unicodeRange: 'U+0000-007F'
  }
];
export {fontsCacheName, fonts, CDNname};
      
if("caches" in window)
  if ('serviceWorker' in navigator) {
    caches.keys().then(e=>{
      if(e.length)
        fonts.forEach(font=>{
          caches.match(font.url).then(response => {
            if (response === null) {
              if (navigator.serviceWorker.controller)
                window.addEventListener("load", ()=>{
                  navigator.serviceWorker.controller.postMessage(font); 
                })
              else console.info('Service Worker is redundant. Grieve.');
            } else {
              fontDeployFunc(font.name, font.url);
            }
          })
        })
    })
    window.addEventListener("load", function() {
      navigator.serviceWorker.register('/serviceWorker.js', { scope: '/', type: 'module' }).then(function(reg) {
      //Registration failed with NotSupportedError: type 'module' in RegistrationOptions is not implemented yet.See https://crbug.com/824647 for details.  
        if(reg.installing)
          console.log('[ServiceWorker] installing');
      }).catch(function(error) {
        console.log('Registration failed with ' + error);
      });

      navigator.serviceWorker.addEventListener('message', function(fontLoadedEvent) {
        fontDeployFunc(fontLoadedEvent.data.name, fontLoadedEvent.data.url);
      });
      //The browser performs an update check after any navigation using the Service Worker, invalidating the HTTP cache every 24 hours.
    });
  }

const fontDeployFunc = (name, url) => {
  if(!Array.from(document.fonts).some(e=>{return e.family === name})){
    let newFont = new FontFace(name, `url("${url}")`, {
      style: 'normal', weight: '400'
    })
    newFont.load().then(function() {
      document.fonts.add(newFont);
    });
    console.log(name + " added");
  }
}