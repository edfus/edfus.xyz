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
//export {fontsCacheName, fonts, CDNname};
{
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
      navigator.serviceWorker.register('/serviceWorker-cache.js', { scope: '/' }).then(function(reg) {
      //Registration failed with NotSupportedError: type 'module' in RegistrationOptions is not implemented yet.See https://crbug.com/824647 for details.  
        if(reg.installing){
          console.log('[ServiceWorker] installing');
        }
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
}
/*
<!--script async type="module" id="font-script">
if("serviceWorker" in navigator && navigator.serviceWorker.controller && "connection" in navigator && !navigator.connection.saveData)
document.getElementById("font-script").outerHTML =  `<link rel="preload" id="font1" onload="document.getElementById('font-face').innerHTML += '@font-face {font-family: 筑紫A丸ゴシック;src: url(//cdn.jsdelivr.net/gh/edfus/storage/fonts/筑紫A丸ゴシック.woff2);font-weight: 400;style: normal;display: fallback}';document.getElementById('font1').remove();"
  href="//cdn.jsdelivr.net/gh/edfus/storage/fonts/筑紫A丸ゴシック.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  <link rel="preload" id="font2" onload="document.getElementById('font-face').innerHTML += '@font-face {font-family: Consolas;src: url(//cdn.jsdelivr.net/gh/edfus/storage/fonts/Consolas.woff2);font-weight: 400;style: normal;display: fallback}';document.getElementById('font2').remove();"
  href="//cdn.jsdelivr.net/gh/edfus/storage/fonts/Consolas.woff2" as="font" type="font/woff2" crossorigin="anonymous">`
else document.getElementById("font-script").remove();</script-->
<!--NOTE:当页面强制刷新 (Shift + refresh) 或不存在active worder时，该属性返回 null 。-->
<style id="font-face"></style>
<!--script async type="module" id="font-script">
  if("serviceWorker" in navigator && navigator.serviceWorker.controller && "connection" in navigator && !navigator.connection.saveData){
  document.getElementById("font-script").outerHTML =  `<link rel="preload" id="font1" onload="document.getElementById('font-face').innerHTML += '@font-face {font-family: 筑紫A丸ゴシック;src: local(筑紫A丸ゴシック),url(//cdn.jsdelivr.net/gh/edfus/storage/fonts/筑紫A丸ゴシック.woff2);font-weight: 400;style: normal;display: fallback}';document.getElementById('font1').remove();"
    href="//cdn.jsdelivr.net/gh/edfus/storage/fonts/筑紫A丸ゴシック.woff2" as="font" type="font/woff2" crossorigin="anonymous">`;
  }else document.getElementById("font-script").remove();</script--> 
*/