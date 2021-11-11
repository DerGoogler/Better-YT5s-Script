class AKoiMain {
  private oXHttpReq: any = null;
  private vid: any = null;
  private oldUrl: any = null;

  public constructor() {
    console.log("Service sterted");
  }

  /**
   * Dom Loader
   * @param window
   * @returns
   */
  private DocOnLoad(window: any) {
    if (
      null != window &&
      null != window.body &&
      null != window.location &&
      ((this.vid = this.getVid(window)), this.vid)
    ) {
      window
        .querySelector("#info-contents #info")
        .setAttribute("style", "flex-wrap: wrap;");
      var container = window.querySelector("#menu-container");
      var converter = window.querySelector("#yt5sconverter");
      var commandButton = this.getCommandButton();

      null == converter &&
        (null != container
          ? container.parentNode.insertBefore(commandButton, container)
          : (container =
              window.querySelector("#eow-title")).parentNode.insertBefore(
              commandButton,
              container
            )),
        (this.oldUrl = window.location.href),
        this.checkChangeVid();
    }
    return !0;
  }

  /**
   * Checks the change YouTube video
   */
  private checkChangeVid() {
    setTimeout(() => {
      this.oldUrl == window.location.href
        ? this.checkChangeVid()
        : this.waitLoadDom(window.document);
    }, 1e3);
  }

  /**
   * Wait util the dom loads
   * @param window
   */
  public waitLoadDom(window: any) {
    (this.vid = this.getVid(window)),
      this.vid
        ? null != window.querySelector("#info #menu-container")
          ? this.DocOnLoad(window)
          : setTimeout(() => {
              this.waitLoadDom(window);
            }, 1e3)
        : this.checkChangeVid();
  }

  /**
   * Make the download page ready
   * @param window
   * @param type
   */
  private goToYT5s(window: any, type: string) {
    try {
      var mainLink = "https://yt5s.com/youtube-to-" + type + "?q=" + this.vid;
      window.open(mainLink, "_blank");
    } catch (error) {
      console.log("Error Yt5s.OnButtonClick. ", error);
    }
  }

  /**
   * Creastes an download button on the YouTube site
   * @returns
   */
  private getCommandButton() {
    var button: HTMLElement | null = document.createElement("button");

    var buttoStyles =
      "min-height:25px; position:relative; top:1px; cursor: pointer; font: 13px Arial; background: #27ae60; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin: 20px 5px 10px 5px; border: 1px solid #27ae60; border-radius: 2px; font-weight:bold";

    var onmouseover = "this.style.backgroundColor='#0f9949'";
    var onmouseout = "this.style.backgroundColor='#27ae60'";

    return (
      (button.id = "yt5sconverter"),
      (button.className = "yt-uix-tooltip"),
      button.setAttribute("type", "button"),
      button.setAttribute("title", "Download with YT5s.com"),
      (button.innerHTML = "Download as Music"),
      button.addEventListener(
        "click",
        (o) => {
          this.goToYT5s(o, "mp3");
        },
        !0
      ),
      button.setAttribute("style", buttoStyles),
      button.setAttribute("onmouseover", onmouseover),
      button.setAttribute("onmouseout", onmouseout),
      button
    );
  }

  /**
   * Get the video
   * @param window
   * @returns
   */
  private getVid(window: any) {
    var videoURL = window.location
      .toString()
      .match(
        /^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/
      );
    return !(!videoURL || !videoURL[3]) && videoURL[3];
  }
}

// Execute the script
new AKoiMain().waitLoadDom(window.document);
