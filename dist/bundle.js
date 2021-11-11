// ==UserScript==
// @name        YT5s Download YouTube
// @namespace   https://yt5s.com
// @version     2.0
// @date        2019-07-23
// @author      A Max
// @description YT5s Downloader: Download Video and Audio for free
// @homepage    https://yt5s.com
// @icon        https://yt5s.com/icon/icon-96x96.png
// @icon64      https://yt5s.com/icon/icon-96x96.png
// @updateURL   https://yt5s.com/helper.meta.js
// @downloadURL https://yt5s.com/helper.user.js
// @include     http://*
// @include     https://*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @connect     youtube.com
// @connect     m.youtube.com
// @connect     www.youtube.com
// @connect     youtube-nocookie.com
// @connect     youtu.be
// @connect     yt5s.com
// @connect     self
// @connect     *
// ==/UserScript==

(()=>{"use strict";(new(function(){function t(){this.oXHttpReq=null,this.vid=null,this.oldUrl=null,console.log("Service sterted")}return t.prototype.DocOnLoad=function(t){if(null!=t&&null!=t.body&&null!=t.location&&(this.vid=this.getVid(t),this.vid)){t.querySelector("#info-contents #info").setAttribute("style","flex-wrap: wrap;");var o=t.querySelector("#menu-container"),e=t.querySelector("#yt5sconverter"),n=this.getCommandButton();null==e&&(null!=o?o.parentNode.insertBefore(n,o):(o=t.querySelector("#eow-title")).parentNode.insertBefore(n,o)),this.oldUrl=t.location.href,this.checkChangeVid()}return!0},t.prototype.checkChangeVid=function(){var t=this;setTimeout((function(){t.oldUrl==window.location.href?t.checkChangeVid():t.waitLoadDom(window.document)}),1e3)},t.prototype.waitLoadDom=function(t){var o=this;this.vid=this.getVid(t),this.vid?null!=t.querySelector("#info #menu-container")?this.DocOnLoad(t):setTimeout((function(){o.waitLoadDom(t)}),1e3):this.checkChangeVid()},t.prototype.goToYT5s=function(t,o){try{var e="https://yt5s.com/youtube-to-"+o+"?q="+this.vid;t.open(e,"_blank")}catch(t){console.log("Error Yt5s.OnButtonClick. ",t)}},t.prototype.getCommandButton=function(){var t=this,o=document.createElement("button");return o.id="yt5sconverter",o.className="yt-uix-tooltip",o.setAttribute("type","button"),o.setAttribute("title","Download with YT5s.com"),o.innerHTML="Download as Music",o.addEventListener("click",(function(o){t.goToYT5s(o,"mp3")}),!0),o.setAttribute("style","min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #27ae60; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #27ae60; border-radius: 2px; font-weight:bold"),o.setAttribute("onmouseover","this.style.backgroundColor='#0f9949'"),o.setAttribute("onmouseout","this.style.backgroundColor='#27ae60'"),o},t.prototype.getVid=function(t){var o=t.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);return!(!o||!o[3])&&o[3]},t}())).waitLoadDom(window.document)})();