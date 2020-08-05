!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).GLightbox=e()}(this,(function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function s(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function l(t,e){var i=function(t,e){var i=s(t)*s(e);if(0===i)return 0;var n=function(t,e){return t.x*e.x+t.y*e.y}(t,e)/i;return n>1&&(n=1),Math.acos(n)}(t,e);return function(t,e){return t.x*e.y-e.x*t.y}(t,e)>0&&(i*=-1),180*i/Math.PI}var o=function(){function t(i){e(this,t),this.handlers=[],this.el=i}return n(t,[{key:"add",value:function(t){this.handlers.push(t)}},{key:"del",value:function(t){t||(this.handlers=[]);for(var e=this.handlers.length;e>=0;e--)this.handlers[e]===t&&this.handlers.splice(e,1)}},{key:"dispatch",value:function(){for(var t=0,e=this.handlers.length;t<e;t++){var i=this.handlers[t];"function"==typeof i&&i.apply(this.el,arguments)}}}]),t}();function r(t,e){var i=new o(t);return i.add(e),i}var a=function(){function t(i,n){e(this,t),this.element="string"==typeof i?document.querySelector(i):i,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var s=function(){};this.rotate=r(this.element,n.rotate||s),this.touchStart=r(this.element,n.touchStart||s),this.multipointStart=r(this.element,n.multipointStart||s),this.multipointEnd=r(this.element,n.multipointEnd||s),this.pinch=r(this.element,n.pinch||s),this.swipe=r(this.element,n.swipe||s),this.tap=r(this.element,n.tap||s),this.doubleTap=r(this.element,n.doubleTap||s),this.longTap=r(this.element,n.longTap||s),this.singleTap=r(this.element,n.singleTap||s),this.pressMove=r(this.element,n.pressMove||s),this.twoFingerPressMove=r(this.element,n.twoFingerPressMove||s),this.touchMove=r(this.element,n.touchMove||s),this.touchEnd=r(this.element,n.touchEnd||s),this.touchCancel=r(this.element,n.touchCancel||s),this._cancelAllHandler=this.cancelAll.bind(this),window.addEventListener("scroll",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}}return n(t,[{key:"start",value:function(t){if(t.touches){this.now=Date.now(),this.x1=t.touches[0].pageX,this.y1=t.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(t,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30,this.isDoubleTap&&clearTimeout(this.singleTapTimeout)),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var e=this.preV;if(t.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var i={x:t.touches[1].pageX-this.x1,y:t.touches[1].pageY-this.y1};e.x=i.x,e.y=i.y,this.pinchStartLen=s(e),this.multipointStart.dispatch(t,this.element)}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(t,this.element),this._preventTap=!0}.bind(this),750)}}},{key:"move",value:function(t){if(t.touches){var e=this.preV,i=t.touches.length,n=t.touches[0].pageX,o=t.touches[0].pageY;if(this.isDoubleTap=!1,i>1){var r=t.touches[1].pageX,a=t.touches[1].pageY,h={x:t.touches[1].pageX-n,y:t.touches[1].pageY-o};null!==e.x&&(this.pinchStartLen>0&&(t.zoom=s(h)/this.pinchStartLen,this.pinch.dispatch(t,this.element)),t.angle=l(h,e),this.rotate.dispatch(t,this.element)),e.x=h.x,e.y=h.y,null!==this.x2&&null!==this.sx2?(t.deltaX=(n-this.x2+r-this.sx2)/2,t.deltaY=(o-this.y2+a-this.sy2)/2):(t.deltaX=0,t.deltaY=0),this.twoFingerPressMove.dispatch(t,this.element),this.sx2=r,this.sy2=a}else{if(null!==this.x2){t.deltaX=n-this.x2,t.deltaY=o-this.y2;var c=Math.abs(this.x1-this.x2),u=Math.abs(this.y1-this.y2);(c>10||u>10)&&(this._preventTap=!0)}else t.deltaX=0,t.deltaY=0;this.pressMove.dispatch(t,this.element)}this.touchMove.dispatch(t,this.element),this._cancelLongTap(),this.x2=n,this.y2=o,i>1&&t.preventDefault()}}},{key:"end",value:function(t){if(t.changedTouches){this._cancelLongTap();var e=this;t.touches.length<2&&(this.multipointEnd.dispatch(t,this.element),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(t.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout((function(){e.swipe.dispatch(t,e.element)}),0)):(this.tapTimeout=setTimeout((function(){e._preventTap||e.tap.dispatch(t,e.element),e.isDoubleTap&&(e.doubleTap.dispatch(t,e.element),e.isDoubleTap=!1)}),0),e.isDoubleTap||(e.singleTapTimeout=setTimeout((function(){e.singleTap.dispatch(t,e.element)}),250))),this.touchEnd.dispatch(t,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}}},{key:"cancelAll",value:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)}},{key:"cancel",value:function(t){this.cancelAll(),this.touchCancel.dispatch(t,this.element)}},{key:"_cancelLongTap",value:function(){clearTimeout(this.longTapTimeout)}},{key:"_cancelSingleTap",value:function(){clearTimeout(this.singleTapTimeout)}},{key:"_swipeDirection",value:function(t,e,i,n){return Math.abs(t-e)>=Math.abs(i-n)?t-e>0?"Left":"Right":i-n>0?"Up":"Down"}},{key:"on",value:function(t,e){this[t]&&this[t].add(e)}},{key:"off",value:function(t,e){this[t]&&this[t].del(e)}},{key:"destroy",value:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,window.removeEventListener("scroll",this._cancelAllHandler),null}}]),t}(),h=function(){function t(i,n){var s=this,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(e(this,t),this.img=i,this.slide=n,this.onclose=l,this.img.setZoomEvents)return!1;this.active=!1,this.zoomedIn=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.img.addEventListener("mousedown",(function(t){return s.dragStart(t)}),!1),this.img.addEventListener("mouseup",(function(t){return s.dragEnd(t)}),!1),this.img.addEventListener("mousemove",(function(t){return s.drag(t)}),!1),this.img.addEventListener("click",(function(t){if(!s.zoomedIn)return s.zoomIn();s.zoomedIn&&!s.dragging&&s.zoomOut()}),!1),this.img.setZoomEvents=!0}return n(t,[{key:"zoomIn",value:function(){var t=this.widowWidth();if(!(this.zoomedIn||t<=768)){var e=this.img;if(e.setAttribute("data-style",e.getAttribute("style")),e.style.maxWidth=e.naturalWidth+"px",e.style.maxHeight=e.naturalHeight+"px",e.naturalWidth>t){var i=t/2-e.naturalWidth/2;this.setTranslate(this.img.parentNode,i,0)}this.slide.classList.add("zoomed"),this.zoomedIn=!0}}},{key:"zoomOut",value:function(){this.img.parentNode.setAttribute("style",""),this.img.setAttribute("style",this.img.getAttribute("data-style")),this.slide.classList.remove("zoomed"),this.zoomedIn=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.onclose&&"function"==typeof this.onclose&&this.onclose()}},{key:"dragStart",value:function(t){t.preventDefault(),this.zoomedIn?("touchstart"===t.type?(this.initialX=t.touches[0].clientX-this.xOffset,this.initialY=t.touches[0].clientY-this.yOffset):(this.initialX=t.clientX-this.xOffset,this.initialY=t.clientY-this.yOffset),t.target===this.img&&(this.active=!0,this.img.classList.add("dragging"))):this.active=!1}},{key:"dragEnd",value:function(t){var e=this;t.preventDefault(),this.initialX=this.currentX,this.initialY=this.currentY,this.active=!1,setTimeout((function(){e.dragging=!1,e.img.isDragging=!1,e.img.classList.remove("dragging")}),100)}},{key:"drag",value:function(t){this.active&&(t.preventDefault(),"touchmove"===t.type?(this.currentX=t.touches[0].clientX-this.initialX,this.currentY=t.touches[0].clientY-this.initialY):(this.currentX=t.clientX-this.initialX,this.currentY=t.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.img.isDragging=!0,this.dragging=!0,this.setTranslate(this.img,this.currentX,this.currentY))}},{key:"onMove",value:function(t){if(this.zoomedIn){var e=t.clientX-this.img.naturalWidth/2,i=t.clientY-this.img.naturalHeight/2;this.setTranslate(this.img,e,i)}}},{key:"setTranslate",value:function(t,e,i){t.style.transform="translate3d("+e+"px, "+i+"px, 0)"}},{key:"widowWidth",value:function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}}]),t}(),c="navigator"in window&&window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),u=null!==c||void 0!==document.createTouch||"ontouchstart"in window||"onmsgesturechange"in window||navigator.msMaxTouchPoints,d=document.getElementsByTagName("html")[0],g=function(){var t,e=document.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in i)if(void 0!==e.style[t])return i[t]}(),p=function(){var t,e=document.createElement("fakeelement"),i={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(t in i)if(void 0!==e.style[t])return i[t]}(),v=Date.now(),f={selector:".glightbox",elements:null,skin:"clean",closeButton:!0,startAt:null,descPosition:"bottom",width:"900px",height:"506px",beforeSlideChange:null,afterSlideChange:null,beforeSlideLoad:null,afterSlideLoad:null,slideInserted:null,slideRemoved:null,onOpen:()=>{document.querySelector(".gotop").classList.contains("show")&&document.querySelector(".gotop").classList.toggle("show")},onClose:()=>{document.querySelector(".gotop").setAttribute("style",""),window.scrollY>300&&document.querySelector(".gotop").classList.toggle("show")},loop:!1,touchNavigation:!0,touchFollowAxis:!0,keyboardNavigation:!0,closeOnOutsideClick:!0,openEffect:"zoomIn",closeEffect:"zoomOut",slideEffect:"slide",moreText:"See more",moreLength:60,lightboxHtml:"",cssEfects:{fade:{in:"fadeIn",out:"fadeOut"},zoom:{in:"zoomIn",out:"zoomOut"},slide:{in:"slideInRight",out:"slideOutLeft"},slide_back:{in:"slideInLeft",out:"slideOutRight"}},svg:{close:'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',next:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',prev:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'}};f.slideHtml='<section class="gslide">\n    <div class="gslide-inner-content">\n        <figure class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <figcaption class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </figcaption>\n        </figure>\n    </div>\n</section>';f.lightboxHtml='<aside id="glightbox-body" class="glightbox-container">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gnext gbtn" tabindex="-1" aria-label="Next">{nextSVG}</button>\n    <button class="gprev gbtn" tabindex="-1" aria-label="Previous">{prevSVG}</button>\n    <button class="gclose gbtn" tabindex="-1" aria-label="Close">{closeSVG}</button>\n</div>\n</aside>';var m={href:"",title:"",type:"",description:"",descPosition:"",effect:"",width:"",height:"",node:!1,content:!1};function y(){var t={},e=!0,i=0,n=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],i++);for(var s=function(i){for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e&&"[object Object]"===Object.prototype.toString.call(i[n])?t[n]=y(!0,t[n],i[n]):t[n]=i[n])};i<n;i++){var l=arguments[i];s(l)}return t}var b={isFunction:function(t){return"function"==typeof t},isString:function(t){return"string"==typeof t},isNode:function(t){return!(!t||!t.nodeType||1!=t.nodeType)},isArray:function(t){return Array.isArray(t)},isArrayLike:function(t){return t&&t.length&&isFinite(t.length)},isObject:function(e){return"object"===t(e)&&null!=e&&!b.isFunction(e)&&!b.isArray(e)},isNil:function(t){return null==t},has:function(t,e){return null!==t&&hasOwnProperty.call(t,e)},size:function(t){if(b.isObject(t)){if(t.keys)return t.keys().length;var e=0;for(var i in t)b.has(t,i)&&e++;return e}return t.length},isNumber:function(t){return!isNaN(parseFloat(t))&&isFinite(t)}};function x(t,e){if((b.isNode(t)||t===window||t===document)&&(t=[t]),b.isArrayLike(t)||b.isObject(t)||(t=[t]),0!=b.size(t))if(b.isArrayLike(t)&&!b.isObject(t))for(var i=t.length,n=0;n<i&&!1!==e.call(t[n],t[n],n,t);n++);else if(b.isObject(t))for(var s in t)if(b.has(t,s)&&!1===e.call(t[s],t[s],s,t))break}function w(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=t[v]=t[v]||[],s={all:n,evt:null,found:null};return e&&i&&b.size(n)>0&&x(n,(function(t,n){if(t.eventName==e&&t.fn.toString()==i.toString())return s.found=!0,s.evt=n,!1})),s}function S(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=e.onElement,n=e.withCallback,s=e.avoidDuplicate,l=void 0===s||s,o=e.once,r=void 0!==o&&o,a=e.useCapture,h=void 0!==a&&a,c=arguments.length>2?arguments[2]:void 0,u=i||[];function d(t){b.isFunction(n)&&n.call(c,t,this),r&&d.destroy()}return b.isString(u)&&(u=document.querySelectorAll(u)),d.destroy=function(){x(u,(function(e){var i=w(e,t,d);i.found&&i.all.splice(i.evt,1),e.removeEventListener&&e.removeEventListener(t,d,h)}))},x(u,(function(e){var i=w(e,t,d);(e.addEventListener&&l&&!i.found||!l)&&(e.addEventListener(t,d,h),i.all.push({eventName:t,fn:d}))})),d}function T(t,e){x(e.split(" "),(function(e){return t.classList.add(e)}))}function A(t,e){x(e.split(" "),(function(e){return t.classList.remove(e)}))}function E(t,e){return t.classList.contains(e)}function k(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!t||""===e)return!1;if("none"==e)return b.isFunction(i)&&i(),!1;var n=e.split(" ");x(n,(function(e){T(t,"g"+e)})),S(p,{onElement:t,avoidDuplicate:!1,once:!0,withCallback:function(t,e){x(n,(function(t){A(e,"g"+t)})),b.isFunction(i)&&i()}})}function C(t){var e=document.createDocumentFragment(),i=document.createElement("div");for(i.innerHTML=t;i.firstChild;)e.appendChild(i.firstChild);return e}function L(t,e){for(;t!==document.body;){if("function"==typeof(t=t.parentElement).matches?t.matches(e):t.msMatchesSelector(e))return t}}function M(t){t.style.display="block"}function O(t){t.style.display="none"}function N(){return{width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}function z(t){return b.isNumber(t)?"".concat(t,"px"):t}function B(t,e){var i=z(e.width),n=z(e.height);return t.width=b.has(t,"width")&&""!==t.width?z(t.width):i,t.height=b.has(t,"height")&&""!==t.height?z(t.height):n,t}var I=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1?arguments[1]:void 0,i=y({descPosition:e.descPosition},m);if(b.isObject(t)&&!b.isNode(t)){b.has(t,"type")||b.has(t,"href")&&(t.type=Y(t.href));var n=y(i,t);return B(n,e),n}var s="",l=t.getAttribute("data-glightbox"),o=t.nodeName.toLowerCase();if("a"===o&&(s=t.href),i.href=s,x(i,(function(n,s){b.has(e,s)&&"width"!==s&&(i[s]=e[s]);var l=t.dataset[s];b.isNil(l)||(i[s]=l)})),!i.type&&s&&(i.type=Y(s)),b.isNil(l)){if("a"==o){var r=t.title;b.isNil(r)||""===r||(i.title=r)}var a=t.getAttribute("data-description");b.isNil(a)||""===a||(i.description=a)}else{var h=[];x(i,(function(t,e){h.push(";\\s?"+e)})),h=h.join("\\s?:|"),""!==l.trim()&&x(i,(function(t,e){var n=l,s=new RegExp("s?"+e+"s?:s?(.*?)("+h+"s?:|$)"),o=n.match(s);if(o&&o.length&&o[1]){var r=o[1].trim().replace(/;\s*$/,"");i[e]=r}}))}return B(i,e),i},D=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(E(e,"loaded"))return!1;b.isFunction(this.settings.beforeSlideLoad)&&this.settings.beforeSlideLoad({index:i.index,slide:e,player:!1});var s=i.type,l=i.descPosition,o=e.querySelector(".gslide-media"),r=e.querySelector(".gslide-title"),a=e.querySelector(".gslide-desc"),u=e.querySelector(".gdesc-inner"),d=n,g="gSlideTitle_"+i.index,p="gSlideDesc_"+i.index;if(b.isFunction(this.settings.afterSlideLoad)&&(d=function(){b.isFunction(n)&&n(),t.settings.afterSlideLoad({index:i.index,slide:e})}),""==i.title&&""==i.description?u&&u.parentNode.parentNode.removeChild(u.parentNode):(r&&""!==i.title?(r.id=g,r.innerHTML=i.title):r.parentNode.removeChild(r),a&&""!==i.description?(a.id=p,c&&this.settings.moreLength>0?(i.smallDescription=H(i.description,this.settings.moreLength,this.settings.moreText),a.innerHTML=i.smallDescription,_.apply(this,[a,i])):a.innerHTML=i.description):(a.parentNode.removeChild(a),r&&(r.classList.add("without-desc"),r.parentNode.classList.add("without-desc"),r.parentNode.parentNode.classList.add("without-desc"))),T(o.parentNode,"desc-".concat(l)),T(u.parentNode,"description-".concat(l))),T(o,"gslide-".concat(s)),T(e,"loaded"),"image"===s){var v=new Image;return v.addEventListener("load",(function(){v.naturalWidth>v.offsetWidth&&(T(v,"zoomable"),new h(v,e,(function(){t.resize(e)}))),b.isFunction(d)&&d()}),!1),v.src=i.href,v.alt="",v.addEventListener("error",(function(){".webp"===v.src.substring(v.src.length-5,v.src.length)&&v.src.substring(v.src.length-10,v.src.length-5).includes(".")?v.src=v.src.substring(0,v.src.length-5):(v.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAENJREFUeF7tzbEJACEQRNGBLeAasBCza2lLEGx0CxFGG9hBMDDxRy/72O9FMnIFapGylsu1fgoBdkXfUHLrQgdfrlJN1BdYBjQQm3UAAAAASUVORK5CYII=",v.alt="404!")}),!1),""!==i.title&&v.setAttribute("aria-labelledby",g),""!==i.description&&v.setAttribute("aria-describedby",p),void o.insertBefore(v,o.firstChild)}b.isFunction(d)&&d()},Y=function(t){return null!==(t=t.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/)||console.log("url.match(/.(imglist)$/) is null"),"image"};function q(){var t=this;if(this.events.hasOwnProperty("keyboard"))return!1;this.events.keyboard=S("keydown",{onElement:window,withCallback:function(e,i){var n=(e=e||window.event).keyCode;9==n&&e.preventDefault(),13==n&&e.preventDefault(),39==n&&t.nextSlide(),37==n&&t.prevSlide(),27==n&&t.close()}})}function X(){var t=this;if(this.events.hasOwnProperty("touch"))return!1;var e,i,n=N(),s=n.width,l=n.height,o=!1,r=null,h=null,c=null,u=!1,d=1,g=1,p=!1,v=!1,f=null,m=null,y=null,b=null,x=0,w=0,S=!1,k=!1,C={},M={},O=0,z=0,B=this,I=document.getElementById("glightbox-slider"),D=document.querySelector(".goverlay"),Y=new a(I,{touchStart:function(t){if(E(t.targetTouches[0].target,"ginner-container")||L(t.targetTouches[0].target,".gslide-desc"))return o=!1,!1;o=!0,M=t.targetTouches[0],C.pageX=t.targetTouches[0].pageX,C.pageY=t.targetTouches[0].pageY,O=t.targetTouches[0].clientX,z=t.targetTouches[0].clientY,r=B.activeSlide,h=r.querySelector(".gslide-media"),c=null,E(h,"gslide-image")&&(c=h.querySelector("img")),A(D,"greset")},touchMove:function(n){if(o&&(M=n.targetTouches[0],!p&&!v)){u=!0;var r,a=n.targetTouches[0].clientX,d=n.targetTouches[0].clientY,g=O-a,f=z-d;if(Math.abs(g)>Math.abs(f)?(S=!1,k=!0):(k=!1,S=!0),e=M.pageX-C.pageX,x=100*e/s,i=M.pageY-C.pageY,w=100*i/l,S&&c&&(r=1-Math.abs(i)/l,D.style.opacity=r,t.settings.touchFollowAxis&&(x=0)),k&&(r=1-Math.abs(e)/s,h.style.opacity=r,t.settings.touchFollowAxis&&(w=0)),!c)return F(h,"translate3d(".concat(x,"%, 0, 0)"));F(h,"translate3d(".concat(x,"%, ").concat(w,"%, 0)"))}},touchEnd:function(){if(o){if(u=!1,v||p)return y=f,void(b=m);var e=Math.abs(parseInt(w)),i=Math.abs(parseInt(x));if(!(e>29&&c))return e<29&&i<25?(T(D,"greset"),D.style.opacity=1,P(h)):void 0;t.close()}},multipointEnd:function(){setTimeout((function(){p=!1}),50)},multipointStart:function(){p=!0,d=g||1},pinch:function(t){if(!c||u)return!1;p=!0,c.scaleX=c.scaleY=d*t.zoom;var e=d*t.zoom;if(v=!0,e<=1)return v=!1,e=1,b=null,y=null,f=null,m=null,void c.setAttribute("style","");e>4.5&&(e=4.5),c.style.transform="scale3d(".concat(e,", ").concat(e,", 1)"),g=e},pressMove:function(t){if(v&&!p){var e=M.pageX-C.pageX,i=M.pageY-C.pageY;y&&(e+=y),b&&(i+=b),f=e,m=i;var n="translate3d(".concat(e,"px, ").concat(i,"px, 0)");g&&(n+=" scale3d(".concat(g,", ").concat(g,", 1)")),F(c,n)}},swipe:function(e){if(!v)if(p)p=!1;else{if("Left"==e.direction){if(t.index==t.elements.length-1)return P(h);t.nextSlide()}if("Right"==e.direction){if(0==t.index)return P(h);t.prevSlide()}}}});this.events.touch=Y}function F(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(""==e)return t.style.webkitTransform="",t.style.MozTransform="",t.style.msTransform="",t.style.OTransform="",t.style.transform="",!1;t.style.webkitTransform=e,t.style.MozTransform=e,t.style.msTransform=e,t.style.OTransform=e,t.style.transform=e}function P(t){var e=E(t,"gslide-media")?t:t.querySelector(".gslide-media"),i=t.querySelector(".gslide-description");T(e,"greset"),F(e,"translate3d(0, 0, 0)");S(g,{onElement:e,once:!0,withCallback:function(t,i){A(e,"greset")}});e.style.opacity="",i&&(i.style.opacity="")}function H(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=i;if((t=t.trim()).length<=e)return t;var s=t.substr(0,e-1);return n?s+'... <a href="#" class="desc-more">'+i+"</a>":s}function _(t,e){var i=t.querySelector(".desc-more");if(!i)return!1;S("click",{onElement:i,withCallback:function(t,i){t.preventDefault();var n=document.body,s=L(i,".gslide-desc");if(!s)return!1;s.innerHTML=e.description,T(n,"gdesc-open");var l=S("click",{onElement:[n,L(s,".gslide-description")],withCallback:function(t,i){"a"!==t.target.nodeName.toLowerCase()&&(A(n,"gdesc-open"),T(n,"gdesc-closed"),s.innerHTML=e.smallDescription,_(s,e),setTimeout((function(){A(n,"gdesc-closed")}),400),l.destroy())}})}})}var j=function(){function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this,t),this.settings=y(f,i),this.effectsClasses=this.getAnimationClasses(),this.slidesData={}}return n(t,[{key:"init",value:function(){var t=this,e=this.getSelector();e&&(this.baseEvents=S("click",{onElement:e,withCallback:function(e,i){e.preventDefault(),t.open(i)}})),this.elements=this.getElements()}},{key:"open",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(0==this.elements.length)return!1;this.activeSlide=null,this.prevActiveSlideIndex=null,this.prevActiveSlide=null;var i=b.isNumber(e)?e:this.settings.startAt;b.isNode(t)&&b.isNil(i)&&(i=this.getElementIndex(t))<0&&(i=0),b.isNumber(i)||(i=0),this.build(),k(this.overlay,"none"==this.settings.openEffect?"none":this.settings.cssEfects.fade.in);var n=document.body,s=window.innerWidth-document.documentElement.clientWidth;if(s>0){var l=document.createElement("style");l.type="text/css",l.className="gcss-styles",l.innerText=".gscrollbar-fixer {margin-right: ".concat(s,"px;}"),document.head.appendChild(l),T(d,"gscrollbar-fixer"),document.querySelector(".gotop").style.right="calc(5% + "+s+"px)"}if(T(n,"glightbox-open"),T(d,"glightbox-open"),c&&(T(document.body,"glightbox-mobile"),this.settings.slideEffect="slide"),this.showSlide(i,!0),1==this.elements.length?(O(this.prevButton),O(this.nextButton)):(M(this.prevButton),M(this.nextButton)),this.lightboxOpen=!0,b.isFunction(this.settings.onOpen)&&this.settings.onOpen(),u&&this.settings.touchNavigation)return X.apply(this),!1;this.settings.keyboardNavigation&&q.apply(this)}},{key:"openAt",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.open(null,t)}},{key:"showSlide",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];M(this.loader),this.index=parseInt(e);var n=this.slidesContainer.querySelector(".current");n&&A(n,"current"),this.slideAnimateOut();var s=this.slidesContainer.querySelectorAll(".gslide")[e];if(E(s,"loaded"))this.slideAnimateIn(s,i),O(this.loader);else{M(this.loader);var l=this.elements[e];l.index=e,this.slidesData[e]=l,D.apply(this,[s,l,function(){O(t.loader),t.resize(),t.slideAnimateIn(s,i)}])}this.slideDescription=s.querySelector(".gslide-description"),this.slideDescriptionContained=this.slideDescription&&E(this.slideDescription.parentNode,"gslide-media"),this.preloadSlide(e+1),this.preloadSlide(e-1),this.updateNavigationClasses(),this.activeSlide=s}},{key:"preloadSlide",value:function(t){if(t<0||t>this.elements.length-1)return!1;if(b.isNil(this.elements[t]))return!1;var e=this.slidesContainer.querySelectorAll(".gslide")[t];if(E(e,"loaded"))return!1;var i=this.elements[t];i.index=t,this.slidesData[t]=i;var n=i.sourcetype;"video"==n||"external"==n?console.log("type == video || type == external"):D.apply(this,[e,i])}},{key:"prevSlide",value:function(){this.goToSlide(this.index-1)}},{key:"nextSlide",value:function(){this.goToSlide(this.index+1)}},{key:"goToSlide",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.prevActiveSlide=this.activeSlide,this.prevActiveSlideIndex=this.index;var e=this.loop();if(!e&&(t<0||t>this.elements.length-1))return!1;t<0?t=this.elements.length-1:t>=this.elements.length&&(t=0),this.showSlide(t)}},{key:"insertSlide",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,i=y({descPosition:this.settings.descPosition},m),n=C(this.settings.slideHtml),s=this.elements.length-1;if(e<0&&(e=this.elements.length),(t=y(i,t)).index=e,t.node=!1,this.elements.splice(e,0,t),this.slidesContainer){if(e>s)this.slidesContainer.appendChild(n);else{var l=this.slidesContainer.querySelectorAll(".gslide")[e];this.slidesContainer.insertBefore(n,l)}(0==this.index&&0==e||this.index-1==e||this.index+1==e)&&this.preloadSlide(e),0==this.index&&0==e&&(this.index=1),this.updateNavigationClasses()}b.isFunction(this.settings.slideInserted)&&this.settings.slideInserted({index:e,slide:this.slidesContainer.querySelectorAll(".gslide")[e]})}},{key:"removeSlide",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;if(t<0||t>this.elements.length-1)return!1;var e=this.slidesContainer&&this.slidesContainer.querySelectorAll(".gslide")[t];e&&(this.getActiveSlideIndex()==t&&(t==this.elements.length-1?this.prevSlide():this.nextSlide()),e.parentNode.removeChild(e)),this.elements.splice(t,1),b.isFunction(this.settings.slideRemoved)&&this.settings.slideRemoved(t)}},{key:"slideAnimateIn",value:function(t,e){var i=this,n=t.querySelector(".gslide-media"),s=t.querySelector(".gslide-description"),l={index:this.prevActiveSlideIndex,slide:this.prevActiveSlide},o={index:this.index,slide:this.activeSlide};if(n.offsetWidth>0&&s&&(O(s),s.style.display=""),A(t,this.effectsClasses),e)k(t,this.settings.openEffect,(function(){b.isFunction(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o])}));else{var r=this.settings.slideEffect,a="none"!==r?this.settings.cssEfects[r].in:r;this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(a=this.settings.cssEfects.slide_back.in),k(t,a,(function(){b.isFunction(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o])}))}setTimeout((function(){i.resize(t)}),100),T(t,"current")}},{key:"slideAnimateOut",value:function(){if(!this.prevActiveSlide)return!1;var t=this.prevActiveSlide;A(t,this.effectsClasses),T(t,"prev");var e=this.settings.slideEffect,i="none"!==e?this.settings.cssEfects[e].out:e;b.isFunction(this.settings.beforeSlideChange)&&this.settings.beforeSlideChange.apply(this,[{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide},{index:this.index,slide:this.activeSlide}]),this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(i=this.settings.cssEfects.slide_back.out),k(t,i,(function(){var e=t.querySelector(".gslide-media"),i=t.querySelector(".gslide-description");e.style.transform="",A(e,"greset"),e.style.opacity="",i&&(i.style.opacity=""),A(t,"prev")}))}},{key:"setElements",value:function(t){var e=this;this.settings.elements=!1;var i=[];x(t,(function(t){var n=I(t,e.settings);i.push(n)})),this.elements=i,this.lightboxOpen&&(this.slidesContainer.innerHTML="",x(this.elements,(function(){var t=C(e.settings.slideHtml);e.slidesContainer.appendChild(t)})),this.showSlide(0,!0))}},{key:"getElementIndex",value:function(t){var e=!1;return x(this.elements,(function(i,n){if(b.has(i,"node")&&i.node==t)return e=n,!0})),e}},{key:"getElements",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=[];this.elements=this.elements?this.elements:[],!b.isNil(this.settings.elements)&&b.isArray(this.settings.elements)&&(i=this.settings.elements);var n=!1,s=this.getSelector();if(null!==e){var l=e.getAttribute("data-gallery");l&&""!==l&&(n=document.querySelectorAll('[data-gallery="'.concat(l,'"]')))}return 0==n&&s&&(n=document.querySelectorAll(this.getSelector())),n?(x(n,(function(e,n){var s=I(e,t.settings);s.node=e,s.index=n,i.push(s)})),i):i}},{key:"getSelector",value:function(){return this.settings.selector&&"data-"==this.settings.selector.substring(0,5)?"*[".concat(this.settings.selector,"]"):this.settings.selector}},{key:"getActiveSlide",value:function(){return this.slidesContainer.querySelectorAll(".gslide")[this.index]}},{key:"getActiveSlideIndex",value:function(){return this.index}},{key:"getAnimationClasses",value:function(){var t=[];for(var e in this.settings.cssEfects)if(this.settings.cssEfects.hasOwnProperty(e)){var i=this.settings.cssEfects[e];t.push("g".concat(i.in)),t.push("g".concat(i.out))}return t.join(" ")}},{key:"build",value:function(){var t=this;if(this.built)return!1;var e=b.has(this.settings.svg,"next")?this.settings.svg.next:"",i=b.has(this.settings.svg,"prev")?this.settings.svg.prev:"",n=b.has(this.settings.svg,"close")?this.settings.svg.close:"",s=this.settings.lightboxHtml;s=C(s=(s=(s=s.replace(/{nextSVG}/g,e)).replace(/{prevSVG}/g,i)).replace(/{closeSVG}/g,n)),document.body.appendChild(s);var l=document.getElementById("glightbox-body");this.modal=l;var o=l.querySelector(".gclose");this.prevButton=l.querySelector(".gprev"),this.nextButton=l.querySelector(".gnext"),this.overlay=l.querySelector(".goverlay"),this.loader=l.querySelector(".gloader"),this.slidesContainer=document.getElementById("glightbox-slider"),this.events={},T(this.modal,"glightbox-"+this.settings.skin),this.settings.closeButton&&o&&(this.events.close=S("click",{onElement:o,withCallback:function(e,i){e.preventDefault(),t.close()}})),o&&!this.settings.closeButton&&o.parentNode.removeChild(o),this.nextButton&&(this.events.next=S("click",{onElement:this.nextButton,withCallback:function(e,i){e.preventDefault(),t.nextSlide()}})),this.prevButton&&(this.events.prev=S("click",{onElement:this.prevButton,withCallback:function(e,i){e.preventDefault(),t.prevSlide()}})),this.settings.closeOnOutsideClick&&(this.events.outClose=S("click",{onElement:l,withCallback:function(e,i){E(document.body,"glightbox-mobile")||L(e.target,".ginner-container")||L(e.target,".gbtn")||E(e.target,"gnext")||E(e.target,"gprev")||t.close()}})),x(this.elements,(function(){var e=C(t.settings.slideHtml);t.slidesContainer.appendChild(e)})),u&&T(document.body,"glightbox-touch"),this.events.resize=S("resize",{onElement:window,withCallback:function(){t.resize()}}),this.built=!0}},{key:"resize",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if((t=t||this.activeSlide)&&!E(t,"zoomed")){var e=N(),i=t.querySelector(".gslide-image"),n=e.width;if(n<=768?T(document.body,"glightbox-mobile"):A(document.body,"glightbox-mobile"),i&&i&&n<=768){var s=i.querySelector("img");s.setAttribute("style","")}}}},{key:"reload",value:function(){this.init()}},{key:"updateNavigationClasses",value:function(){var t=this.loop();A(this.nextButton,"disabled"),A(this.prevButton,"disabled"),0==this.index&&this.elements.length-1==0?(T(this.prevButton,"disabled"),T(this.nextButton,"disabled")):0!==this.index||t?this.index!==this.elements.length-1||t||T(this.nextButton,"disabled"):T(this.prevButton,"disabled")}},{key:"loop",value:function(){var t=b.has(this.settings,"loopAtEnd")?this.settings.loopAtEnd:null;return t=b.has(this.settings,"loop")?this.settings.loop:t,t}},{key:"close",value:function(){var t=this;if(!this.lightboxOpen){if(this.events){for(var e in this.events)this.events.hasOwnProperty(e)&&this.events[e].destroy();this.events=null}return!1}if(this.closing)return!1;this.closing=!0,T(this.modal,"glightbox-closing"),k(this.overlay,"none"==this.settings.openEffect?"none":this.settings.cssEfects.fade.out),T(this.activeSlide,"gzoomOut"),setTimeout(()=>{if(A(this.activeSlide,"gzoomOut"),t.activeSlide=null,t.prevActiveSlideIndex=null,t.prevActiveSlide=null,t.built=!1,t.events){for(var e in t.events)t.events.hasOwnProperty(e)&&t.events[e].destroy();t.events=null}var i=document.body;A(d,"glightbox-open gscrollbar-fixer"),A(i,"glightbox-open touching gdesc-open glightbox-touch glightbox-mobile"),t.modal.parentNode.removeChild(t.modal),b.isFunction(t.settings.onClose)&&t.settings.onClose();var n=document.querySelector(".gcss-styles");n&&n.parentNode.removeChild(n),t.lightboxOpen=!1,t.closing=null},140)}},{key:"destroy",value:function(){this.close(),this.baseEvents.destroy()}}]),t}();return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=new j(t);return e.init(),e}})),Array.from(document.getElementsByClassName("article-entry")).forEach(t=>{Array.from(t.getElementsByTagName("img")).forEach(t=>{if(t.parentNode.classList.contains("glightbox"))return;let e="";if(t.getAttribute("gallery-item-caption")?e=`title: ${t.getAttribute("gallery-item-caption")}; `:t.alt&&(e=`title: ${t.alt}; `),t.src){let i=t.src;".webp"===i.substring(i.length-5,i.length)&&-1!==i.substring(i.length-10,i.length-5).indexOf(".")&&(i=i.substring(0,i.length-5)),t.outerHTML='<a href="'+i+'" title="'+t.alt+'" class="glightbox" data-glightbox="'+e+'" rel="View hi-res version">'+t.outerHTML+"</a>"}else console.log(t+":no Source Attribute")})}),GLightbox(null);