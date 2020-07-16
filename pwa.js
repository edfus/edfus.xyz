// register service worker

if ('serviceWorker' in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' }).then(function(reg) {
          if(reg.installing) {
            console.log('[ServiceWorker] installing');
          }
        }).catch(function(error) {
          // registration failed
          console.log('Registration failed with ' + error);
        });
    });
  }