if("indexedDB"in window&&"Worker"in window){new Worker("/webWorker.js").onmessage=e=>{((o=e.data.name,n=e.data.url)=>{if(!Array.from(document.fonts).some(e=>e.family===o)){let e=new FontFace(o,`url("${n}")`,{style:"normal",weight:"400"});e.load().then((function(){document.fonts.add(e)})),console.log(o+" added")}})()}}"caches"in window&&"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/serviceWorker.js",{scope:"/"}).then(e=>{e.installing&&console.log("[ServiceWorker] installing")}).catch(e=>{console.log("Registration failed with "+e)})},{passive:!0,once:!0});