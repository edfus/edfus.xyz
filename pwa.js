"use strict";"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/serviceWorker.js",{scope:"/"}).then(function(e){e.installing&&console.log("[ServiceWorker] installing")}).catch(function(e){console.log("Registration failed with "+e)})});