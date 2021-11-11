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
var AKoiMain = {
  oXHttpReq: null,
  vid: null,
  oldUrl: null,
  DocOnLoad: function (o) {
    try {
      if (
        null != o &&
        null != o.body &&
        null != o.location &&
        ((AKoiMain.vid = AKoiMain.getVid(o)), AKoiMain.vid)
      ) {
        o.querySelector("#info-contents #info").setAttribute(
          "style",
          "flex-wrap: wrap;"
        );
        var t = o.querySelector("#menu-container"),
          e = o.querySelector("#yt5sconverter"),
          n = AKoiMain.GetCommandButton();
        null == e &&
          (null != t
            ? t.parentNode.insertBefore(n, t)
            : (t = o.querySelector("#eow-title")).parentNode.insertBefore(
                n,
                t
              )),
          (AKoiMain.oldUrl = o.location.href),
          AKoiMain.checkChangeVid();
      }
      return !0;
    } catch (o) {
      console.log("Error YT5s.DocOnLoad. ", o);
    }
  },
  checkChangeVid: function () {
    setTimeout(function () {
      AKoiMain.oldUrl == window.location.href
        ? AKoiMain.checkChangeVid()
        : AKoiMain.WaitLoadDom(window.document);
    }, 1e3);
  },
  WaitLoadDom: function (o) {
    (AKoiMain.vid = AKoiMain.getVid(o)),
      AKoiMain.vid
        ? null != o.querySelector("#info #menu-container")
          ? AKoiMain.DocOnLoad(o)
          : setTimeout(function () {
              AKoiMain.WaitLoadDom(o);
            }, 1e3)
        : AKoiMain.checkChangeVid();
  },
  goToYT5s: function (o) {
    try {
      var t = "https://yt5s.com/youtube-to-mp3?q=" + AKoiMain.vid;
      window.open(t, "_blank");
    } catch (o) {
      console.log("Error Yt5s.OnButtonClick. ", o);
    }
  },
  GetCommandButton: function () {
    try {
      var o = document.createElement("button");
      return (
        (o.id = "yt5sconverter"),
        (o.className = "yt-uix-tooltip"),
        o.setAttribute("type", "button"),
        o.setAttribute("title", "Download with yt5s.com"),
        (o.innerHTML = "Download"),
        o.addEventListener(
          "click",
          function (o) {
            AKoiMain.goToYT5s(o);
          },
          !0
        ),
        o.setAttribute(
          "style",
          "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #27ae60; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #27ae60; border-radius: 2px; font-weight:bold"
        ),
        o.setAttribute("onmouseover", "this.style.backgroundColor='#0f9949'"),
        o.setAttribute("onmouseout", "this.style.backgroundColor='#27ae60'"),
        o
      );
    } catch (o) {
      console.log("Error Yt5s.GetCommandButton. ", o);
    }
  },
  getVid: function (o) {
    var t = o.location
      .toString()
      .match(
        /^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/
      );
    return !(!t || !t[3]) && t[3];
  },
};
AKoiMain.WaitLoadDom(window.document);
