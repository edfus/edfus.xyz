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
    let mouseOnWhole = false, mouseOnToggle = false;
    const wholeControl = document.getElementById('dropdown-whole-control');
    const toBeActiveArray = Array.from(document.querySelectorAll('.to-be-active'));
    const dropdownToggleEle = document.getElementById('drop');

    let setStyleOfDiv = false;
    const currentCategory =  wholeControl.querySelector('.current.dropdown-item');
    
    wholeControl.addEventListener("mouseenter", ()=>{
        mouseOnWhole = true;
    }, false);

    wholeControl.addEventListener("mouseleave",()=>{
        mouseOnWhole = false;
        setTimeout(()=>{
            if(!mouseOnToggle){
                dropdownToggleEle.classList.remove('active');
                leave();
            }
        },200)
    }, false);

    toBeActiveArray.forEach(e=>{
        e.addEventListener("mouseenter",()=>{
            e.classList.add('active');
        },false);
        
        e.addEventListener("mouseleave",()=>{
          e.classList.remove('active');
      },false);
    })
    //NOTE: why e.addEventListener("focus" 无效？（触发了事件但未添加/移除类
    //NOTE: console.log(e)打印了a元素的href信息
   
    const dropdownEleArray = Array.from(wholeControl.querySelectorAll('.dropdown-item:not(.current)'));

    wholeControl.addEventListener("focusin", ()=>{
      mouseOnWhole = true;
    }, false);

    dropdownEleArray.forEach(e=>{
      e.addEventListener("focus",()=>{
        mouseOnWhole = true;
        e.classList.add('active');
        //console.log(e+"focus");
      },false);

      e.addEventListener("blur",()=>{
        e.classList.remove('active');
        mouseOnWhole = false;
        setTimeout(()=>{
          if(!mouseOnToggle && !mouseOnWhole){
              dropdownToggleEle.classList.remove('active');
              leave();
          }
        },1)
      },false);
    })
    
    let displayStyle = window.matchMedia("(max-width: 1330px)").matches?"flex":"block";

    const toggleInFunction = ()=>{
      mouseOnToggle = true;
      wholeControl.style.display = displayStyle;
      currentCategory.classList.add('show');
      dropdownEleArray.forEach((e,i)=>{
          setTimeout(()=>{
              e.classList.add('show');
          },80 * i)
      })
      if(setStyleOfDiv===false){
        if(displayStyle!=="flex"){
          wholeControl.style.top = `${dropdownToggleEle.offsetTop + 12 - currentCategory.offsetTop}px`;
          wholeControl.style.left = `${dropdownToggleEle.clientWidth - 2}px`;
        } else {
          wholeControl.style.top = `${dropdownToggleEle.offsetTop - currentCategory.offsetTop - 5}px`;
          wholeControl.style.left = `${ wholeControl.clientWidth - currentCategory.offsetLeft}px`;
          dropdownToggleEle.style.paddingRight = `${ wholeControl.clientWidth - currentCategory.offsetLeft - 54}px`;
        }
        setStyleOfDiv = true;
      }
    }
    dropdownToggleEle.addEventListener("mouseenter", ()=>{
      toggleInFunction();
    }, false);

    dropdownToggleEle.addEventListener("focus", ()=>{
      toggleInFunction();
    }, false);

    const toggleOutFunction = (time)=>{
      mouseOnToggle = false;
      dropdownToggleEle.classList.add('active');
      setTimeout(()=>{
      if(!mouseOnWhole){
          dropdownToggleEle.classList.remove('active');
          leave();
      }},time)
    };
    dropdownToggleEle.addEventListener("mouseleave",()=>{
      toggleOutFunction(200);
    }, false);

    dropdownToggleEle.addEventListener("blur",()=>{
      toggleOutFunction(1);
    }, false);

    function leave(){
        wholeControl.style.display = "none";
        Array.from(wholeControl.querySelectorAll('.dropdown-item')).forEach(e=>{
            e.classList.remove('show');
        })
    }
 }
})()