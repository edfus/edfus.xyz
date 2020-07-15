(()=>{
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

})()