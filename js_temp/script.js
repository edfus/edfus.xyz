(()=>{
  //TODO: category supports tab focus
  //TODO: inspect cookie's affect
  //TODO: renew cache version
  //CHORE: inspect new js's affect(every page)
  //CHORE: tab every page
  //CHORE: add PWA in other sites and do LightHouse audit
  //CHORE: compress js
  
    // Search
  {
    let isSearchBoxExpanded = false;

    let stopSearchAnim = function(callback){
      
    };

    document.getElementById('nav-search-btn').addEventListener('click', function(){
      if (isSearchBoxExpanded) return;

      isSearchBoxExpanded = true;
      document.getElementById('search-form-wrap').classList.add('on');
      setTimeout(()=>{
        isSearchBoxExpanded = false;
        document.getElementById('search-input').focus();
      }, 200); 
    },false);
    document.getElementById('nav-search-btn').addEventListener('focusin',()=>{
      if (isSearchBoxExpanded) return;

      isSearchBoxExpanded = true;
      document.getElementById('search-form-wrap').classList.add('on');
      setTimeout(()=>{
        isSearchBoxExpanded = false;
        document.getElementById('search-input').focus();
      }, 200);
    },false)

    document.getElementById('search-input').addEventListener('focusout',()=>{
      document.getElementById('search-form-wrap').classList.remove('on');
      setTimeout(()=>{
        isSearchBoxExpanded = false;
      }, 200);
    },false);
  }
  // Mobile nav
  {
    let isMobileNavExpanded = false;

    document.getElementById('main-nav-toggle').addEventListener('click', function(){
      if (isMobileNavExpanded) return;
      isMobileNavExpanded = true;
      document.getElementById('container').classList.toggle('mobile-nav-on');
      setTimeout(()=>{
        isMobileNavExpanded = false;
      }, 200);
    },false);

    document.getElementById('wrap').addEventListener('click', function(){
      if (isMobileNavExpanded || !document.getElementById('container').classList.contains('mobile-nav-on')) return;
      document.getElementById('container').classList.remove('mobile-nav-on');
    });
  }

  // TODO: read the source code of Clipboard.js
  new ClipboardJS(".article-share-link").on("success",
    ()=>{
        let e = document.querySelector("aside.article-share-success");
        if(e.getAttribute('aria-hidden') != 'false'){
            e.style.opacity = 1;
            e.setAttribute('aria-hidden',"false");
            setTimeout(()=> {
              (function fade(){ ((e.style.opacity-=.1) < 0) ? e.setAttribute('aria-hidden',"true") : setTimeout(fade,40)})();
            },4e3)
        }
    }
  );

  window.goToTop = function() {
    const topElement = document.querySelector('a.gotop');
    const min = 300;
    var timer = null;   
    window.addEventListener("scroll",()=>{
          if (timer === null) {               
            timer = setTimeout(()=>{
              let scrollTop = window.scrollY;
              if (scrollTop > min) {
                topElement.classList.add('show');
              } else {
                topElement.classList.remove('show');
              }
              timer = null;
            }, 200);
          }
      },false);
  };
  if (document.readyState !== "loading") {
    setTimeout(()=>window.goToTop(), 1);
  } else {
    document.addEventListener("DOMContentLoaded", ()=>window.goToTop());
  }
  
//footer fixed to bottom
  const footer = document.querySelector("footer#footer");
  ((e = footer) => {
    
    const fixFooter = (e) => {
      if(document.documentElement.scrollHeight - 4 <= document.documentElement.clientHeight){
        e.style.cssText = "position:absolute;left:0;bottom:0";
      }else{
        e.style.cssText = "";
      }
    }
    fixFooter(e);
    //orientationchange is deprecated. But I have no idea what else should I use.
    const orientationEvent = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, () => fixFooter(e), false);
  })()

  const lineF = (e = document.querySelector(".article-inner")) => {
    if (e.classList.contains("index-page") !== true) {
      const heightOfArticle = e.offsetHeight - 50;
      const style = document.createElement('STYLE');
      if (e.classList.contains("toc-on")) {
        const percentOfToc = document.getElementById("toc").offsetHeight + 400 / height * 100;
        style.innerText = ".article-inner.toc-on:before{height:" + heightOfArticle + "px; background: linear-gradient(#2AB8FF 0%, #fff " + percentOfToc + "%, #EAEAEA 75%, #CFCFCFaf 88%, transparent 100%)}"
      } 
      else {
        style.innerText = ".article-inner:before{height:" + heightOfArticle + "px}"
      }
      return e.appendChild(style);
    }
    return false;
  }
  if(document.readyState === "complete")
      setTimeout(()=>lineF(), 1);
  else window.addEventListener("load",()=>lineF(),false);
})()