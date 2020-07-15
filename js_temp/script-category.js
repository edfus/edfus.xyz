(()=>{
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
    
  //category界面的hover
  {
    let mouseOnWhole = false;
    let mouseOnA = false;
    const wholeControl = document.getElementById('dropdown-whole-control');
    const toBeActiveArray = Array.from(document.querySelectorAll('.to-be-active'));
    const dropdownToggleEle = document.getElementById('drop');

    wholeControl.addEventListener("mouseenter", ()=>{
        mouseOnWhole = true;
    }, false);

    wholeControl.addEventListener("mouseleave",()=>{
        mouseOnWhole = false;
        setTimeout(()=>{
            if(!mouseOnA){
                document.getElementById('drop').classList.remove('active');
                leave();
            }
        },100)
    });

    toBeActiveArray.forEach(e=>{
        e.addEventListener("mouseover",()=>{
            e.classList.add('active');
        },false);
    })

    toBeActiveArray.forEach(e=>{
        e.addEventListener("mouseout",()=>{
            e.classList.remove('active');
        },false);
    })

    dropdownToggleEle.addEventListener("mouseover", ()=>{
        mouseOnA = true;
        const currentCategory =  wholeControl.querySelector('.current.dropdown-item');
        wholeControl.style.display = 'block';
        currentCategory.classList.add('show');
        Array.from(wholeControl.querySelectorAll('.dropdown-item:not(.current)')).forEach((e,i)=>{
            setTimeout(()=>{
                e.classList.add('show');
            },80 * i)
        })
        wholeControl.style.top = `${dropdownToggleEle.offsetTop + 15 - currentCategory.offsetTop}px`;
        wholeControl.style.left = `${dropdownToggleEle.innerWidth - 2}px`;
    },false);

    dropdownToggleEle.addEventListener("mouseout",()=>{
        mouseOnA = false;
        dropdownToggleEle.classList.add('active');
        setTimeout(()=>{
        if(!mouseOnWhole){
            ele.classList.remove('active');
            leave();
        }},100)
    });

    function leave(){
        wholeControl.style.display = "none";
        Array.from(wholeControl.querySelectorAll('.dropdown-item')).forEach(e=>{
            e.classList.remove('show');
        })
    }
 }
})()