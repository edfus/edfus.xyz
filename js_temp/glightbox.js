"use strict";function _typeof2(t){function e(t){return i.apply(this,arguments)}var i,n;function s(t){return n.apply(this,arguments)}return(_typeof2="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?(n=function(t){return void 0===t?"undefined":_typeof2(t)},s.toString=function(){return n.toString()},s):(i=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":void 0===t?"undefined":_typeof2(t)},e.toString=function(){return i.toString()},e))(t)}!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof2(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).GLightbox=e()}(void 0,function(){function e(t){return(e="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(t){return void 0===t?"undefined":_typeof2(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":void 0===t?"undefined":_typeof2(t)})(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function t(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function c(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function u(t,e){var i,n,s=function(t,e){var i=c(t)*c(e);if(0==i)return 0;var n,s,o=(s=e,((n=t).x*s.x+n.y*s.y)/i);return 1<o&&(o=1),Math.acos(o)}(t,e);return n=e,0<(i=t).x*n.y-n.x*i.y&&(s*=-1),180*s/Math.PI}var o=(t(i,[{key:"add",value:function(t){this.handlers.push(t)}},{key:"del",value:function(t){t||(this.handlers=[]);for(var e=this.handlers.length;0<=e;e--)this.handlers[e]===t&&this.handlers.splice(e,1)}},{key:"dispatch",value:function(){for(var t=0,e=this.handlers.length;t<e;t++){var i=this.handlers[t];"function"==typeof i&&i.apply(this.el,arguments)}}}]),i);function i(t){s(this,i),this.handlers=[],this.el=t}function l(t,e){var i=new o(t);return i.add(e),i}var N=(t(r,[{key:"start",value:function(t){if(t.touches){this.now=Date.now(),this.x1=t.touches[0].pageX,this.y1=t.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(t,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=0<this.delta&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30,this.isDoubleTap&&clearTimeout(this.singleTapTimeout)),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var e=this.preV;if(1<t.touches.length){this._cancelLongTap(),this._cancelSingleTap();var i={x:t.touches[1].pageX-this.x1,y:t.touches[1].pageY-this.y1};e.x=i.x,e.y=i.y,this.pinchStartLen=c(e),this.multipointStart.dispatch(t,this.element)}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(t,this.element),this._preventTap=!0}.bind(this),750)}}},{key:"move",value:function(t){if(t.touches){var e=this.preV,i=t.touches.length,n=t.touches[0].pageX,s=t.touches[0].pageY;if(this.isDoubleTap=!1,1<i){var o=t.touches[1].pageX,l=t.touches[1].pageY,r={x:t.touches[1].pageX-n,y:t.touches[1].pageY-s};null!==e.x&&(0<this.pinchStartLen&&(t.zoom=c(r)/this.pinchStartLen,this.pinch.dispatch(t,this.element)),t.angle=u(r,e),this.rotate.dispatch(t,this.element)),e.x=r.x,e.y=r.y,null!==this.x2&&null!==this.sx2?(t.deltaX=(n-this.x2+o-this.sx2)/2,t.deltaY=(s-this.y2+l-this.sy2)/2):(t.deltaX=0,t.deltaY=0),this.twoFingerPressMove.dispatch(t,this.element),this.sx2=o,this.sy2=l}else{if(null!==this.x2){t.deltaX=n-this.x2,t.deltaY=s-this.y2;var a=Math.abs(this.x1-this.x2),h=Math.abs(this.y1-this.y2);(10<a||10<h)&&(this._preventTap=!0)}else t.deltaX=0,t.deltaY=0;this.pressMove.dispatch(t,this.element)}this.touchMove.dispatch(t,this.element),this._cancelLongTap(),this.x2=n,this.y2=s,1<i&&t.preventDefault()}}},{key:"end",value:function(t){if(t.changedTouches){this._cancelLongTap();var e=this;t.touches.length<2&&(this.multipointEnd.dispatch(t,this.element),this.sx2=this.sy2=null),this.x2&&30<Math.abs(this.x1-this.x2)||this.y2&&30<Math.abs(this.y1-this.y2)?(t.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout(function(){e.swipe.dispatch(t,e.element)},0)):(this.tapTimeout=setTimeout(function(){e._preventTap||e.tap.dispatch(t,e.element),e.isDoubleTap&&(e.doubleTap.dispatch(t,e.element),e.isDoubleTap=!1)},0),e.isDoubleTap||(e.singleTapTimeout=setTimeout(function(){e.singleTap.dispatch(t,e.element)},250))),this.touchEnd.dispatch(t,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}}},{key:"cancelAll",value:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)}},{key:"cancel",value:function(t){this.cancelAll(),this.touchCancel.dispatch(t,this.element)}},{key:"_cancelLongTap",value:function(){clearTimeout(this.longTapTimeout)}},{key:"_cancelSingleTap",value:function(){clearTimeout(this.singleTapTimeout)}},{key:"_swipeDirection",value:function(t,e,i,n){return Math.abs(t-e)>=Math.abs(i-n)?0<t-e?"Left":"Right":0<i-n?"Up":"Down"}},{key:"on",value:function(t,e){this[t]&&this[t].add(e)}},{key:"off",value:function(t,e){this[t]&&this[t].del(e)}},{key:"destroy",value:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,window.removeEventListener("scroll",this._cancelAllHandler),null}}]),r);function r(t,e){s(this,r),this.element="string"==typeof t?document.querySelector(t):t,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;function i(){}this.rotate=l(this.element,e.rotate||i),this.touchStart=l(this.element,e.touchStart||i),this.multipointStart=l(this.element,e.multipointStart||i),this.multipointEnd=l(this.element,e.multipointEnd||i),this.pinch=l(this.element,e.pinch||i),this.swipe=l(this.element,e.swipe||i),this.tap=l(this.element,e.tap||i),this.doubleTap=l(this.element,e.doubleTap||i),this.longTap=l(this.element,e.longTap||i),this.singleTap=l(this.element,e.singleTap||i),this.pressMove=l(this.element,e.pressMove||i),this.twoFingerPressMove=l(this.element,e.twoFingerPressMove||i),this.touchMove=l(this.element,e.touchMove||i),this.touchEnd=l(this.element,e.touchEnd||i),this.touchCancel=l(this.element,e.touchCancel||i),this._cancelAllHandler=this.cancelAll.bind(this),window.addEventListener("scroll",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}}var m=(t(a,[{key:"zoomIn",value:function(){var t=this.widowWidth();if(!(this.zoomedIn||t<=768)){var e=this.img;if(e.setAttribute("data-style",e.getAttribute("style")),e.style.maxWidth=e.naturalWidth+"px",e.style.maxHeight=e.naturalHeight+"px",e.naturalWidth>t){var i=t/2-e.naturalWidth/2;this.setTranslate(this.img.parentNode,i,0)}this.slide.classList.add("zoomed"),this.zoomedIn=!0}}},{key:"zoomOut",value:function(){this.img.parentNode.setAttribute("style",""),this.img.setAttribute("style",this.img.getAttribute("data-style")),this.slide.classList.remove("zoomed"),this.zoomedIn=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.onclose&&"function"==typeof this.onclose&&this.onclose()}},{key:"dragStart",value:function(t){t.preventDefault(),this.zoomedIn?("touchstart"===t.type?(this.initialX=t.touches[0].clientX-this.xOffset,this.initialY=t.touches[0].clientY-this.yOffset):(this.initialX=t.clientX-this.xOffset,this.initialY=t.clientY-this.yOffset),t.target===this.img&&(this.active=!0,this.img.classList.add("dragging"))):this.active=!1}},{key:"dragEnd",value:function(t){var e=this;t.preventDefault(),this.initialX=this.currentX,this.initialY=this.currentY,this.active=!1,setTimeout(function(){e.dragging=!1,e.img.isDragging=!1,e.img.classList.remove("dragging")},100)}},{key:"drag",value:function(t){this.active&&(t.preventDefault(),"touchmove"===t.type?(this.currentX=t.touches[0].clientX-this.initialX,this.currentY=t.touches[0].clientY-this.initialY):(this.currentX=t.clientX-this.initialX,this.currentY=t.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.img.isDragging=!0,this.dragging=!0,this.setTranslate(this.img,this.currentX,this.currentY))}},{key:"onMove",value:function(t){if(this.zoomedIn){var e=t.clientX-this.img.naturalWidth/2,i=t.clientY-this.img.naturalHeight/2;this.setTranslate(this.img,e,i)}}},{key:"setTranslate",value:function(t,e,i){t.style.transform="translate3d("+e+"px, "+i+"px, 0)"}},{key:"widowWidth",value:function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}}]),a);function a(t,e){var i=this,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(s(this,a),this.img=t,this.slide=e,this.onclose=n,this.img.setZoomEvents)return!1;this.active=!1,this.zoomedIn=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.img.addEventListener("mousedown",function(t){return i.dragStart(t)},!1),this.img.addEventListener("mouseup",function(t){return i.dragEnd(t)},!1),this.img.addEventListener("mousemove",function(t){return i.drag(t)},!1),this.img.addEventListener("click",function(t){if(!i.zoomedIn)return i.zoomIn();i.zoomedIn&&!i.dragging&&i.zoomOut()},!1),this.img.setZoomEvents=!0}var y="navigator"in window&&window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),h=null!==y||void 0!==document.createTouch||"ontouchstart"in window||"onmsgesturechange"in window||navigator.msMaxTouchPoints,d=document.getElementsByTagName("html")[0],g=function(){var t,e=document.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in i)if(void 0!==e.style[t])return i[t]}(),p=function(){var t,e=document.createElement("fakeelement"),i={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(t in i)if(void 0!==e.style[t])return i[t]}(),v=Date.now(),f={selector:".glightbox",elements:null,skin:"clean",closeButton:!0,startAt:null,descPosition:"bottom",width:"900px",height:"506px",beforeSlideChange:null,afterSlideChange:null,beforeSlideLoad:null,afterSlideLoad:null,slideInserted:null,slideRemoved:null,onOpen:function(){document.querySelector(".gotop").classList.contains("show")&&document.querySelector(".gotop").classList.toggle("show")},onClose:function(){document.querySelector(".gotop").setAttribute("style",""),300<window.scrollY&&document.querySelector(".gotop").classList.toggle("show")},loop:!1,touchNavigation:!0,touchFollowAxis:!0,keyboardNavigation:!0,closeOnOutsideClick:!0,openEffect:"zoomIn",closeEffect:"zoomOut",slideEffect:"slide",moreText:"See more",moreLength:60,lightboxHtml:"",cssEfects:{fade:{in:"fadeIn",out:"fadeOut"},zoom:{in:"zoomIn",out:"zoomOut"},slide:{in:"slideInRight",out:"slideOutLeft"},slide_back:{in:"slideInLeft",out:"slideOutRight"}},svg:{close:'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',next:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',prev:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'}};f.slideHtml='<section class="gslide">\n    <div class="gslide-inner-content">\n        <figure class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <figcaption class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </figcaption>\n        </figure>\n    </div>\n</section>';var b={href:"",title:"",type:"",description:"",descPosition:"",effect:"",width:"",height:"",node:!(f.lightboxHtml='<aside id="glightbox-body" class="glightbox-container">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gnext gbtn" tabindex="-1" aria-label="Next">{nextSVG}</button>\n    <button class="gprev gbtn" tabindex="-1" aria-label="Previous">{prevSVG}</button>\n    <button class="gclose gbtn" tabindex="-1" aria-label="Close">{closeSVG}</button>\n</div>\n</aside>'),content:!1};function x(t){var i={},n=!0,e=0,s=arguments.length;"[object Boolean]"===Object.prototype.toString.call(t)&&(n=t,e++);for(var o=function(t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n&&"[object Object]"===Object.prototype.toString.call(t[e])?i[e]=x(!0,i[e],t[e]):i[e]=t[e])};e<s;e++){o(arguments[e])}return i}var S={isFunction:function(t){return"function"==typeof t},isString:function(t){return"string"==typeof t},isNode:function(t){return!(!t||!t.nodeType||1!=t.nodeType)},isArray:function(t){return Array.isArray(t)},isArrayLike:function(t){return t&&t.length&&isFinite(t.length)},isObject:function(t){return"object"===e(t)&&null!=t&&!S.isFunction(t)&&!S.isArray(t)},isNil:function(t){return null==t},has:function(t,e){return null!==t&&hasOwnProperty.call(t,e)},size:function(t){if(S.isObject(t)){if(t.keys)return t.keys().length;var e=0;for(var i in t)S.has(t,i)&&e++;return e}return t.length},isNumber:function(t){return!isNaN(parseFloat(t))&&isFinite(t)}};function w(t,e){if(!S.isNode(t)&&t!==window&&t!==document||(t=[t]),S.isArrayLike(t)||S.isObject(t)||(t=[t]),0!=S.size(t))if(S.isArrayLike(t)&&!S.isObject(t))for(var i=t.length,n=0;n<i&&!1!==e.call(t[n],t[n],n,t);n++);else if(S.isObject(t))for(var s in t)if(S.has(t,s)&&!1===e.call(t[s],t[s],s,t))break}function T(t,e,i){var n=1<arguments.length&&void 0!==e?e:null,s=2<arguments.length&&void 0!==i?i:null,o=t[v]=t[v]||[],l={all:o,evt:null,found:null};return n&&s&&0<S.size(o)&&w(o,function(t,e){if(t.eventName==n&&t.fn.toString()==s.toString())return l.found=!0,l.evt=e,!1}),l}function k(i,t,e){var n=1<arguments.length&&void 0!==t?t:{},s=n.onElement,o=n.withCallback,l=n.avoidDuplicate,r=void 0===l||l,a=n.once,h=void 0!==a&&a,c=n.useCapture,u=void 0!==c&&c,d=2<arguments.length?e:void 0,g=s||[];function p(t){S.isFunction(o)&&o.call(d,t,this),h&&p.destroy()}return S.isString(g)&&(g=document.querySelectorAll(g)),p.destroy=function(){w(g,function(t){var e=T(t,i,p);e.found&&e.all.splice(e.evt,1),t.removeEventListener&&t.removeEventListener(i,p,u)})},w(g,function(t){var e=T(t,i,p);(t.addEventListener&&r&&!e.found||!r)&&(t.addEventListener(i,p,u),e.all.push({eventName:i,fn:p}))}),p}function z(e,t){w(t.split(" "),function(t){return e.classList.add(t)})}function I(e,t){w(t.split(" "),function(t){return e.classList.remove(t)})}function q(t,e){return t.classList.contains(e)}function E(e,t,i){var n=1<arguments.length&&void 0!==t?t:"",s=2<arguments.length&&void 0!==i&&i;if(!e||""===n)return!1;if("none"==n)return S.isFunction(s)&&s(),!1;var o=n.split(" ");w(o,function(t){z(e,"g"+t)}),k(p,{onElement:e,avoidDuplicate:!1,once:!0,withCallback:function(t,e){w(o,function(t){I(e,"g"+t)}),S.isFunction(s)&&s()}})}function C(t){var e=document.createDocumentFragment(),i=document.createElement("div");for(i.innerHTML=t;i.firstChild;)e.appendChild(i.firstChild);return e}function D(t,e){for(;t!==document.body;){if("function"==typeof(t=t.parentElement).matches?t.matches(e):t.msMatchesSelector(e))return t}}function A(t){t.style.display="block"}function L(t){t.style.display="none"}function Y(){return{width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}function M(t){return S.isNumber(t)?"".concat(t,"px"):t}function O(t,e){var i=M(e.width),n=M(e.height);return t.width=S.has(t,"width")&&""!==t.width?M(t.width):i,t.height=S.has(t,"height")&&""!==t.height?M(t.height):n,t}function X(t,e){var n=0<arguments.length&&void 0!==t?t:null,s=1<arguments.length?e:void 0,l=x({descPosition:s.descPosition},b);if(S.isObject(n)&&!S.isNode(n)){S.has(n,"type")||S.has(n,"href")&&(n.type=P(n.href));var i=x(l,n);return O(i,s),i}var o="",r=n.getAttribute("data-glightbox"),a=n.nodeName.toLowerCase();if("a"===a&&(o=n.href),l.href=o,w(l,function(t,e){S.has(s,e)&&"width"!==e&&(l[e]=s[e]);var i=n.dataset[e];S.isNil(i)||(l[e]=i)}),!l.type&&o&&(l.type=P(o)),S.isNil(r)){if("a"==a){var h=n.title;S.isNil(h)||""===h||(l.title=h)}var c=n.getAttribute("data-description");S.isNil(c)||""===c||(l.description=c)}else{var u=[];w(l,function(t,e){u.push(";\\s?"+e)}),u=u.join("\\s?:|"),""!==r.trim()&&w(l,function(t,e){var i=r,n=new RegExp("s?"+e+"s?:s?(.*?)("+u+"s?:|$)"),s=i.match(n);if(s&&s.length&&s[1]){var o=s[1].trim().replace(/;\s*$/,"");l[e]=o}})}return O(l,s),l}function B(t,e,i){var n=this,s=0<arguments.length&&void 0!==t?t:null,o=1<arguments.length&&void 0!==e?e:{},l=2<arguments.length&&void 0!==i&&i;if(q(s,"loaded"))return!1;S.isFunction(this.settings.beforeSlideLoad)&&this.settings.beforeSlideLoad({index:o.index,slide:s,player:!1});var r=o.type,a=o.descPosition,h=s.querySelector(".gslide-media"),c=s.querySelector(".gslide-title"),u=s.querySelector(".gslide-desc"),d=s.querySelector(".gdesc-inner"),g=l,p="gSlideTitle_"+o.index,v="gSlideDesc_"+o.index;if(S.isFunction(this.settings.afterSlideLoad)&&(g=function(){S.isFunction(l)&&l(),n.settings.afterSlideLoad({index:o.index,slide:s})}),""==o.title&&""==o.description?d&&d.parentNode.parentNode.removeChild(d.parentNode):(c&&""!==o.title?(c.id=p,c.innerHTML=o.title):c.parentNode.removeChild(c),u&&""!==o.description?(u.id=v,y&&0<this.settings.moreLength?(o.smallDescription=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:50,i=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=i;if((t=t.trim()).length<=e)return t;var s=t.substr(0,e-1);return n?s+'... <a href="#" class="desc-more">'+i+"</a>":s}(o.description,this.settings.moreLength,this.settings.moreText),u.innerHTML=o.smallDescription,function o(t,l){var e=t.querySelector(".desc-more");if(!e)return!1;k("click",{onElement:e,withCallback:function(t,e){t.preventDefault();var i=document.body,n=D(e,".gslide-desc");if(!n)return!1;n.innerHTML=l.description,z(i,"gdesc-open");var s=k("click",{onElement:[i,D(n,".gslide-description")],withCallback:function(t,e){"a"!==t.target.nodeName.toLowerCase()&&(I(i,"gdesc-open"),z(i,"gdesc-closed"),n.innerHTML=l.smallDescription,o(n,l),setTimeout(function(){I(i,"gdesc-closed")},400),s.destroy())}})}})}.apply(this,[u,o])):u.innerHTML=o.description):(u.parentNode.removeChild(u),c&&(c.classList.add("without-desc"),c.parentNode.classList.add("without-desc"),c.parentNode.parentNode.classList.add("without-desc"))),z(h.parentNode,"desc-".concat(a)),z(d.parentNode,"description-".concat(a))),z(h,"gslide-".concat(r)),z(s,"loaded"),"image"===r){var f=new Image;return f.addEventListener("load",function(){f.naturalWidth>f.offsetWidth&&(z(f,"zoomable"),new m(f,s,function(){n.resize(s)})),S.isFunction(g)&&g()},!1),f.src=o.href,(f.alt="")!==o.title&&f.setAttribute("aria-labelledby",p),""!==o.description&&f.setAttribute("aria-describedby",v),void h.insertBefore(f,h.firstChild)}S.isFunction(g)&&g()}var P=function(t){return null!==(t=t.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/)||console.log("url.match(/.(imglist)$/) is null"),"image"};function _(t,e){var i=1<arguments.length&&void 0!==e?e:"";if(""==i)return t.style.webkitTransform="",t.style.MozTransform="",t.style.msTransform="",t.style.OTransform="",t.style.transform="",!1;t.style.webkitTransform=i,t.style.MozTransform=i,t.style.msTransform=i,t.style.OTransform=i,t.style.transform=i}function F(t){var e=q(t,"gslide-media")?t:t.querySelector(".gslide-media"),i=t.querySelector(".gslide-description");z(e,"greset"),_(e,"translate3d(0, 0, 0)");k(g,{onElement:e,once:!0,withCallback:function(){I(e,"greset")}});e.style.opacity="",i&&(i.style.opacity="")}var H=(t(j,[{key:"init",value:function(){var i=this,t=this.getSelector();t&&(this.baseEvents=k("click",{onElement:t,withCallback:function(t,e){t.preventDefault(),i.open(e)}})),this.elements=this.getElements()}},{key:"open",value:function(t,e){var i=0<arguments.length&&void 0!==t?t:null,n=1<arguments.length&&void 0!==e?e:null;if(0==this.elements.length)return!1;this.activeSlide=null,this.prevActiveSlideIndex=null,this.prevActiveSlide=null;var s=S.isNumber(n)?n:this.settings.startAt;S.isNode(i)&&S.isNil(s)&&(s=this.getElementIndex(i))<0&&(s=0),S.isNumber(s)||(s=0),this.build(),E(this.overlay,"none"==this.settings.openEffect?"none":this.settings.cssEfects.fade.in);var o=document.body,l=window.innerWidth-document.documentElement.clientWidth;if(0<l){var r=document.createElement("style");r.type="text/css",r.className="gcss-styles",r.innerText=".gscrollbar-fixer {margin-right: ".concat(l,"px;}"),document.head.appendChild(r),z(d,"gscrollbar-fixer"),document.querySelector(".gotop").style.right="calc(5% + "+l+"px)"}if(z(o,"glightbox-open"),z(d,"glightbox-open"),y&&(z(document.body,"glightbox-mobile"),this.settings.slideEffect="slide"),this.showSlide(s,!0),1==this.elements.length?(L(this.prevButton),L(this.nextButton)):(A(this.prevButton),A(this.nextButton)),this.lightboxOpen=!0,S.isFunction(this.settings.onOpen)&&this.settings.onOpen(),h&&this.settings.touchNavigation)return function(){var l=this;if(this.events.hasOwnProperty("touch"))return!1;var r,a,t=Y(),h=t.width,c=t.height,u=!1,e=null,d=null,g=null,p=!1,i=1,n=1,v=!1,f=!1,s=null,o=null,m=null,y=null,b=0,x=0,S=!1,w=!1,T={},k={},E=0,C=0,A=this,L=document.getElementById("glightbox-slider"),M=document.querySelector(".goverlay"),O=new N(L,{touchStart:function(t){if(q(t.targetTouches[0].target,"ginner-container")||D(t.targetTouches[0].target,".gslide-desc"))return u=!1;u=!0,k=t.targetTouches[0],T.pageX=t.targetTouches[0].pageX,T.pageY=t.targetTouches[0].pageY,E=t.targetTouches[0].clientX,C=t.targetTouches[0].clientY,e=A.activeSlide,d=e.querySelector(".gslide-media"),g=null,q(d,"gslide-image")&&(g=d.querySelector("img")),I(M,"greset")},touchMove:function(t){if(u&&(k=t.targetTouches[0],!v&&!f)){p=!0;var e,i=t.targetTouches[0].clientX,n=t.targetTouches[0].clientY,s=E-i,o=C-n;if(Math.abs(s)>Math.abs(o)?w=!(S=!1):S=!(w=!1),r=k.pageX-T.pageX,b=100*r/h,a=k.pageY-T.pageY,x=100*a/c,S&&g&&(e=1-Math.abs(a)/c,M.style.opacity=e,l.settings.touchFollowAxis&&(b=0)),w&&(e=1-Math.abs(r)/h,d.style.opacity=e,l.settings.touchFollowAxis&&(x=0)),!g)return _(d,"translate3d(".concat(b,"%, 0, 0)"));_(d,"translate3d(".concat(b,"%, ").concat(x,"%, 0)"))}},touchEnd:function(){if(u){if(p=!1,f||v)return m=s,void(y=o);var t=Math.abs(parseInt(x)),e=Math.abs(parseInt(b));if(!(29<t&&g))return t<29&&e<25?(z(M,"greset"),M.style.opacity=1,F(d)):void 0;l.close()}},multipointEnd:function(){setTimeout(function(){v=!1},50)},multipointStart:function(){v=!0,i=n||1},pinch:function(t){if(!g||p)return!1;v=!0,g.scaleX=g.scaleY=i*t.zoom;var e=i*t.zoom;if(f=!0,e<=1)return f=!1,e=1,o=s=m=y=null,void g.setAttribute("style","");4.5<e&&(e=4.5),g.style.transform="scale3d(".concat(e,", ").concat(e,", 1)"),n=e},pressMove:function(){if(f&&!v){var t=k.pageX-T.pageX,e=k.pageY-T.pageY;m&&(t+=m),y&&(e+=y),o=e;var i="translate3d(".concat(s=t,"px, ").concat(e,"px, 0)");n&&(i+=" scale3d(".concat(n,", ").concat(n,", 1)")),_(g,i)}},swipe:function(t){if(!f)if(v)v=!1;else{if("Left"==t.direction){if(l.index==l.elements.length-1)return F(d);l.nextSlide()}if("Right"==t.direction){if(0==l.index)return F(d);l.prevSlide()}}}});this.events.touch=O}.apply(this),!1;this.settings.keyboardNavigation&&function(){var i=this;if(this.events.hasOwnProperty("keyboard"))return!1;this.events.keyboard=k("keydown",{onElement:window,withCallback:function(t){var e=(t=t||window.event).keyCode;9==e&&t.preventDefault(),13==e&&t.preventDefault(),39==e&&i.nextSlide(),37==e&&i.prevSlide(),27==e&&i.close()}})}.apply(this)}},{key:"openAt",value:function(t){var e=0<arguments.length&&void 0!==t?t:0;this.open(null,e)}},{key:"showSlide",value:function(t,e){var i=this,n=0<arguments.length&&void 0!==t?t:0,s=1<arguments.length&&void 0!==e&&e;A(this.loader),this.index=parseInt(n);var o=this.slidesContainer.querySelector(".current");o&&I(o,"current"),this.slideAnimateOut();var l=this.slidesContainer.querySelectorAll(".gslide")[n];if(q(l,"loaded"))this.slideAnimateIn(l,s),L(this.loader);else{A(this.loader);var r=this.elements[n];r.index=n,this.slidesData[n]=r,B.apply(this,[l,r,function(){L(i.loader),i.resize(),i.slideAnimateIn(l,s)}])}this.slideDescription=l.querySelector(".gslide-description"),this.slideDescriptionContained=this.slideDescription&&q(this.slideDescription.parentNode,"gslide-media"),this.preloadSlide(n+1),this.preloadSlide(n-1),this.updateNavigationClasses(),this.activeSlide=l}},{key:"preloadSlide",value:function(t){if(t<0||t>this.elements.length-1)return!1;if(S.isNil(this.elements[t]))return!1;var e=this.slidesContainer.querySelectorAll(".gslide")[t];if(q(e,"loaded"))return!1;var i=this.elements[t];i.index=t;var n=(this.slidesData[t]=i).sourcetype;"video"==n||"external"==n?console.log("type == video || type == external"):B.apply(this,[e,i])}},{key:"prevSlide",value:function(){this.goToSlide(this.index-1)}},{key:"nextSlide",value:function(){this.goToSlide(this.index+1)}},{key:"goToSlide",value:function(t){var e=0<arguments.length&&void 0!==t&&t;if(this.prevActiveSlide=this.activeSlide,this.prevActiveSlideIndex=this.index,!this.loop()&&(e<0||e>this.elements.length-1))return!1;e<0?e=this.elements.length-1:e>=this.elements.length&&(e=0),this.showSlide(e)}},{key:"insertSlide",value:function(t,e){var i=0<arguments.length&&void 0!==t?t:{},n=1<arguments.length&&void 0!==e?e:-1,s=x({descPosition:this.settings.descPosition},b),o=C(this.settings.slideHtml),l=this.elements.length-1;if(n<0&&(n=this.elements.length),(i=x(s,i)).index=n,i.node=!1,this.elements.splice(n,0,i),this.slidesContainer){if(l<n)this.slidesContainer.appendChild(o);else{var r=this.slidesContainer.querySelectorAll(".gslide")[n];this.slidesContainer.insertBefore(o,r)}(0==this.index&&0==n||this.index-1==n||this.index+1==n)&&this.preloadSlide(n),0==this.index&&0==n&&(this.index=1),this.updateNavigationClasses()}S.isFunction(this.settings.slideInserted)&&this.settings.slideInserted({index:n,slide:this.slidesContainer.querySelectorAll(".gslide")[n]})}},{key:"removeSlide",value:function(t){var e=0<arguments.length&&void 0!==t?t:-1;if(e<0||e>this.elements.length-1)return!1;var i=this.slidesContainer&&this.slidesContainer.querySelectorAll(".gslide")[e];i&&(this.getActiveSlideIndex()==e&&(e==this.elements.length-1?this.prevSlide():this.nextSlide()),i.parentNode.removeChild(i)),this.elements.splice(e,1),S.isFunction(this.settings.slideRemoved)&&this.settings.slideRemoved(e)}},{key:"slideAnimateIn",value:function(t,e){var i=this,n=t.querySelector(".gslide-media"),s=t.querySelector(".gslide-description"),o={index:this.prevActiveSlideIndex,slide:this.prevActiveSlide},l={index:this.index,slide:this.activeSlide};if(0<n.offsetWidth&&s&&(L(s),s.style.display=""),I(t,this.effectsClasses),e)E(t,this.settings.openEffect,function(){S.isFunction(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[o,l])});else{var r=this.settings.slideEffect,a="none"!==r?this.settings.cssEfects[r].in:r;this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(a=this.settings.cssEfects.slide_back.in),E(t,a,function(){S.isFunction(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[o,l])})}setTimeout(function(){i.resize(t)},100),z(t,"current")}},{key:"slideAnimateOut",value:function(){if(!this.prevActiveSlide)return!1;var i=this.prevActiveSlide;I(i,this.effectsClasses),z(i,"prev");var t=this.settings.slideEffect,e="none"!==t?this.settings.cssEfects[t].out:t;S.isFunction(this.settings.beforeSlideChange)&&this.settings.beforeSlideChange.apply(this,[{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide},{index:this.index,slide:this.activeSlide}]),this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(e=this.settings.cssEfects.slide_back.out),E(i,e,function(){var t=i.querySelector(".gslide-media"),e=i.querySelector(".gslide-description");t.style.transform="",I(t,"greset"),t.style.opacity="",e&&(e.style.opacity=""),I(i,"prev")})}},{key:"setElements",value:function(t){var i=this;this.settings.elements=!1;var n=[];w(t,function(t){var e=X(t,i.settings);n.push(e)}),this.elements=n,this.lightboxOpen&&(this.slidesContainer.innerHTML="",w(this.elements,function(){var t=C(i.settings.slideHtml);i.slidesContainer.appendChild(t)}),this.showSlide(0,!0))}},{key:"getElementIndex",value:function(i){var n=!1;return w(this.elements,function(t,e){if(S.has(t,"node")&&t.node==i)return n=e,!0}),n}},{key:"getElements",value:function(t){var n=this,e=0<arguments.length&&void 0!==t?t:null,s=[];this.elements=this.elements?this.elements:[],!S.isNil(this.settings.elements)&&S.isArray(this.settings.elements)&&(s=this.settings.elements);var i=!1,o=this.getSelector();if(null!==e){var l=e.getAttribute("data-gallery");l&&""!==l&&(i=document.querySelectorAll('[data-gallery="'.concat(l,'"]')))}return 0==i&&o&&(i=document.querySelectorAll(this.getSelector())),i&&w(i,function(t,e){var i=X(t,n.settings);i.node=t,i.index=e,s.push(i)}),s}},{key:"getSelector",value:function(){return this.settings.selector&&"data-"==this.settings.selector.substring(0,5)?"*[".concat(this.settings.selector,"]"):this.settings.selector}},{key:"getActiveSlide",value:function(){return this.slidesContainer.querySelectorAll(".gslide")[this.index]}},{key:"getActiveSlideIndex",value:function(){return this.index}},{key:"getAnimationClasses",value:function(){var t=[];for(var e in this.settings.cssEfects)if(this.settings.cssEfects.hasOwnProperty(e)){var i=this.settings.cssEfects[e];t.push("g".concat(i.in)),t.push("g".concat(i.out))}return t.join(" ")}},{key:"build",value:function(){var e=this;if(this.built)return!1;var t=S.has(this.settings.svg,"next")?this.settings.svg.next:"",i=S.has(this.settings.svg,"prev")?this.settings.svg.prev:"",n=S.has(this.settings.svg,"close")?this.settings.svg.close:"",s=this.settings.lightboxHtml;s=C(s=(s=(s=s.replace(/{nextSVG}/g,t)).replace(/{prevSVG}/g,i)).replace(/{closeSVG}/g,n)),document.body.appendChild(s);var o=document.getElementById("glightbox-body"),l=(this.modal=o).querySelector(".gclose");this.prevButton=o.querySelector(".gprev"),this.nextButton=o.querySelector(".gnext"),this.overlay=o.querySelector(".goverlay"),this.loader=o.querySelector(".gloader"),this.slidesContainer=document.getElementById("glightbox-slider"),this.events={},z(this.modal,"glightbox-"+this.settings.skin),this.settings.closeButton&&l&&(this.events.close=k("click",{onElement:l,withCallback:function(t){t.preventDefault(),e.close()}})),l&&!this.settings.closeButton&&l.parentNode.removeChild(l),this.nextButton&&(this.events.next=k("click",{onElement:this.nextButton,withCallback:function(t){t.preventDefault(),e.nextSlide()}})),this.prevButton&&(this.events.prev=k("click",{onElement:this.prevButton,withCallback:function(t){t.preventDefault(),e.prevSlide()}})),this.settings.closeOnOutsideClick&&(this.events.outClose=k("click",{onElement:o,withCallback:function(t){q(document.body,"glightbox-mobile")||D(t.target,".ginner-container")||D(t.target,".gbtn")||q(t.target,"gnext")||q(t.target,"gprev")||e.close()}})),w(this.elements,function(){var t=C(e.settings.slideHtml);e.slidesContainer.appendChild(t)}),h&&z(document.body,"glightbox-touch"),this.events.resize=k("resize",{onElement:window,withCallback:function(){e.resize()}}),this.built=!0}},{key:"resize",value:function(t){var e=0<arguments.length&&void 0!==t?t:null;if((e=e||this.activeSlide)&&!q(e,"zoomed")){var i=Y(),n=e.querySelector(".gslide-image"),s=i.width;(s<=768?z:I)(document.body,"glightbox-mobile"),!n||n&&s<=768&&n.querySelector("img").setAttribute("style","")}}},{key:"reload",value:function(){this.init()}},{key:"updateNavigationClasses",value:function(){var t=this.loop();I(this.nextButton,"disabled"),I(this.prevButton,"disabled"),0==this.index&&this.elements.length-1==0?(z(this.prevButton,"disabled"),z(this.nextButton,"disabled")):0!==this.index||t?this.index!==this.elements.length-1||t||z(this.nextButton,"disabled"):z(this.prevButton,"disabled")}},{key:"loop",value:function(){var t=S.has(this.settings,"loopAtEnd")?this.settings.loopAtEnd:null;return t=S.has(this.settings,"loop")?this.settings.loop:t,t}},{key:"close",value:function(){var n=this;if(!this.lightboxOpen){if(this.events){for(var t in this.events)this.events.hasOwnProperty(t)&&this.events[t].destroy();this.events=null}return!1}if(this.closing)return!1;this.closing=!0,z(this.modal,"glightbox-closing"),E(this.overlay,"none"==this.settings.openEffect?"none":this.settings.cssEfects.fade.out),E(this.activeSlide,this.settings.closeEffect,function(){if(n.activeSlide=null,n.prevActiveSlideIndex=null,n.prevActiveSlide=null,n.built=!1,n.events){for(var t in n.events)n.events.hasOwnProperty(t)&&n.events[t].destroy();n.events=null}var e=document.body;I(d,"glightbox-open"),I(e,"glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"),n.modal.parentNode.removeChild(n.modal),S.isFunction(n.settings.onClose)&&n.settings.onClose();var i=document.querySelector(".gcss-styles");i&&i.parentNode.removeChild(i),n.lightboxOpen=!1,n.closing=null})}},{key:"destroy",value:function(){this.close(),this.baseEvents.destroy()}}]),j);function j(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};s(this,j),this.settings=x(f,t),this.effectsClasses=this.getAnimationClasses(),this.slidesData={}}return function(){var t=new H(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{});return t.init(),t}}),Array.from(document.getElementsByClassName("article-entry")).forEach(function(t){Array.from(t.getElementsByTagName("img")).forEach(function(t){if(!t.parentNode.classList.contains("glightbox")){var e="";if(t.getAttribute("gallery-item-caption")?e="title: "+t.getAttribute("gallery-item-caption")+"; ":t.alt&&(e="title: "+t.alt+"; "),t.src){var i=t.src;".webp"===i.substring(i.length-5,i.length)&&-1!==i.substring(i.length-10,i.length-5).indexOf(".")&&(i=i.substring(0,i.length-5)),t.outerHTML='<a href="'+i+'" title="'+t.alt+'" class="glightbox" data-glightbox="'+e+'" rel="View hi-res version">'+t.outerHTML+"</a>"}else console.log(t+":no Source Attribute")}})}),GLightbox(null);