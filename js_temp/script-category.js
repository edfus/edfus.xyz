"use strict";!function(){var e=!1;document.getElementById("nav-search-btn").addEventListener("click",function(){e||(e=!0,document.getElementById("search-form-wrap").classList.add("on"),setTimeout(function(){e=!1,document.getElementById("search-input").focus()},200))},!1),document.getElementById("nav-search-btn").addEventListener("focusin",function(){e||(e=!0,document.getElementById("search-form-wrap").classList.add("on"),setTimeout(function(){e=!1,document.getElementById("search-input").focus()},200))},!1),document.getElementById("search-input").addEventListener("focusout",function(){document.getElementById("search-form-wrap").classList.remove("on"),setTimeout(function(){e=!1},200)},!1);var t=!1;document.getElementById("main-nav-toggle").addEventListener("click",function(){t||(t=!0,document.getElementById("container").classList.toggle("mobile-nav-on"),setTimeout(function(){t=!1},200))},!1),document.getElementById("wrap").addEventListener("click",function(){!t&&document.getElementById("container").classList.contains("mobile-nav-on")&&document.getElementById("container").classList.remove("mobile-nav-on")}),window.goToTop=function(){var e=document.querySelector("a.gotop"),t=null;window.addEventListener("scroll",function(){null===t&&(t=setTimeout(function(){300<window.scrollY?e.classList.add("show"):e.classList.remove("show"),t=null},200))},!1)},"loading"!==document.readyState?setTimeout(function(){return window.goToTop()},1):document.addEventListener("DOMContentLoaded",function(){return window.goToTop()});var i=document.querySelector("footer#footer");!function(e){function t(e){document.documentElement.scrollHeight-4<=document.documentElement.clientHeight?e.style.cssText="position:absolute;left:0;bottom:0":e.style.cssText=""}var n=0<arguments.length&&void 0!==e?e:i;t(n);var o="onorientationchange"in window?"orientationchange":"resize";window.addEventListener(o,function(){return t(n)},!1)}();function n(){s.style.display="none",Array.from(s.querySelectorAll(".dropdown-item")).forEach(function(e){e.classList.remove("show")})}var o=!1,c=!1,s=document.getElementById("dropdown-whole-control"),d=Array.from(document.querySelectorAll(".to-be-active")),a=document.getElementById("drop"),r=!1,u=s.querySelector(".current.dropdown-item");s.addEventListener("mouseenter",function(){o=!0},!1),s.addEventListener("mouseleave",function(){o=!1,setTimeout(function(){c||(a.classList.remove("active"),n())},200)},!1),d.forEach(function(e){e.addEventListener("mouseenter",function(){e.classList.add("active")},!1),e.addEventListener("mouseleave",function(){e.classList.remove("active")},!1)});var l=Array.from(s.querySelectorAll(".dropdown-item:not(.current)"));s.addEventListener("focusin",function(){o=!0},!1),l.forEach(function(e){e.addEventListener("focus",function(){o=!0,e.classList.add("active")},!1),e.addEventListener("blur",function(){e.classList.remove("active"),o=!1,setTimeout(function(){c||o||(a.classList.remove("active"),n())},1)},!1)});function m(){c=!0,s.style.display=f,u.classList.add("show"),l.forEach(function(e,t){setTimeout(function(){e.classList.add("show")},80*t)}),!1===r&&("flex"!=f?(s.style.top=a.offsetTop+12-u.offsetTop+"px",s.style.left=a.clientWidth-2+"px"):(s.style.top=a.offsetTop-u.offsetTop-5+"px",s.style.left=s.clientWidth-u.offsetLeft+"px",a.style.paddingRight=s.clientWidth-u.offsetLeft-54+"px"),r=!0)}var f=window.matchMedia("(max-width: 1330px)").matches?"flex":"block";a.addEventListener("mouseenter",function(){m()},!1),a.addEventListener("focus",function(){m()},!1);function v(e){c=!1,a.classList.add("active"),setTimeout(function(){o||(a.classList.remove("active"),n())},e)}a.addEventListener("mouseleave",function(){v(200)},!1),a.addEventListener("blur",function(){v(1)},!1)}();