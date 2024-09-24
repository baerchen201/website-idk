class youtubeVideo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let thumbnail: HTMLImageElement = document.createElement("img");
    let channel_icon: HTMLImageElement = document.createElement("img");
    let title: HTMLSpanElement = document.createElement("span");
    let channel: HTMLSpanElement = document.createElement("span");

    let data_id: string | null = this.getAttribute("data-id");
    let data_thumbnail: string | null = this.getAttribute("data-thumbnail");
    let data_channel_icon: string | null =
      this.getAttribute("data-channel-icon");
    let data_title: string | null = this.getAttribute("data-title");
    let data_channel: string | null = this.getAttribute("data-channel");

    if (!data_id)
      throw new Error(
        `Empty attribute data-id for youtube-video object ${this}`
      );
    if (!data_thumbnail) data_thumbnail = "img/youtube-thumbnail.svg";
    if (!data_channel_icon) data_channel_icon = "img/youtube-channel-icon.svg";
    if (!data_title) data_title = "";
    if (!data_channel) data_channel = "";

    let anchor: HTMLAnchorElement = document.createElement("a");
    anchor.href = `https://youtu.be/${data_id}`;
    anchor.title = `Watch ${data_title ? data_title : "video"} on YouTube`;
    this.appendChild(anchor);

    thumbnail.src = data_thumbnail
      .replace("%id", data_id)
      .replace("%s", `https://img.youtube.com/vi/${data_id}/`);
    channel_icon.src = data_channel_icon;
    title.innerText = data_title;
    channel.innerText = data_channel;

    anchor.appendChild(thumbnail);
    anchor.appendChild(channel_icon);
    anchor.appendChild(title);
    anchor.appendChild(channel);
  }
}
class youtubeTrack extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let image: HTMLImageElement = document.createElement("img");
    let title: HTMLSpanElement = document.createElement("span");
    let composer: HTMLSpanElement = document.createElement("span");

    let data_id: string | null = this.getAttribute("data-id");
    let data_image: string | null = this.getAttribute("data-image");
    let data_title: string | null = this.getAttribute("data-title");
    let data_composer: string | null = this.getAttribute("data-composer");

    if (!data_id)
      throw new Error(
        `Empty attribute data-id for youtube-track object ${this}`
      );
    if (!data_image) data_image = "img/youtube-thumbnail.svg"; //TODO: Replace with proper default image/album-art
    if (!data_title) data_title = "";
    if (!data_composer) data_composer = "";

    let anchor: HTMLAnchorElement = document.createElement("a");
    anchor.href = `https://youtu.be/${data_id}`;
    anchor.title = `Listen to ${data_title ? data_title : "track"} on YouTube`;
    this.appendChild(anchor);

    image.src = data_image
      .replace("%id", data_id)
      .replace("%s", `https://img.youtube.com/vi/${data_id}/`);
    title.innerText = data_title;
    composer.innerText = data_composer;

    anchor.appendChild(image);
    anchor.appendChild(title);
    anchor.appendChild(composer);
  }
}

window.customElements.define("youtube-video", youtubeVideo);
window.customElements.define("youtube-track", youtubeTrack);

window.addEventListener("load", () => {
  document.getElementById("google")!.addEventListener("keypress", (e) => {
    console.log(e);
    if (e.key == "Enter") {
      let url = new URL("https://google.com/search");
      url.searchParams.set("q", (e.target as HTMLInputElement).value);
      if (e.ctrlKey) window.open(url, "_blank");
      else location.href = url.toString();
    }
  });

  window.addEventListener("focus", () => {
    if (is_april_fools() || Math.random() < 0.04) {
      let aud = document.createElement("audio");
      aud.src = "aud/vineboom.ogg";
      document.body.appendChild(aud);

      let img = document.createElement("img");
      img.src = "img/Red_Amogus.png";
      img.classList.add("jumpscare");

      aud.addEventListener("ended", () => {
        try {
          img.outerHTML = "";
        } catch {}
        aud.outerHTML = "";
      });

      aud
        .play()
        .then(() => {
          document.body.appendChild(img);
        })
        .catch(() => {
          aud.dispatchEvent(new Event("ended"));
        });
    }
  });

  // Change all links to open in new tabs unless specified otherwise
  let links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    const e = links[i];
    if (!e.target) e.target = "_blank";
  }

  let videos = document.getElementById("videos") as HTMLDivElement;
  if (videos.children.length % 2 != 0) videos.classList.add("odd");

  let _v = videos.children;
  for (let i = 0; i < _v.length; i++) {
    const video = _v[i];
    let _i = video.getElementsByTagName("img");
    let thumbnail = _i[0] as HTMLImageElement,
      channel_image = _i[1] as HTMLImageElement;
    thumbnail.alt = "< Video Thumbnail >";
    channel_image.alt = "< Channel icon >";
  }

  let crash_btn: HTMLButtonElement = document.getElementById(
    "crash"
  ) as HTMLButtonElement;
  crash_btn.disabled = false;
  crash_btn.addEventListener("click", () => {
    // The following code is based on https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
    //* ====================
    let processor = {
      init: function () {
        let out = document.createElement("canvas");
        [
          "click",
          "mousedown",
          "mouseup",
          "contextmenu",
          "drag",
          "mouseover",
        ].forEach((e) => {
          out.addEventListener(e, (ev) => {
            ev.preventDefault();
            return false;
          });
        });

        let vid = document.createElement("video");
        vid.src = "vid/jet.webm";
        vid.preload = "metadata";

        let buf = document.createElement("canvas");

        out.classList.add("crash");
        vid.classList.add("crash");
        buf.classList.add("crash", "_");

        document.body.appendChild(out);
        document.body.appendChild(vid);
        document.body.appendChild(buf);

        console.log(vid, out, buf);

        this.doLoad(vid, out, buf);
        vid.play();
      },
      doLoad: function (
        video: HTMLVideoElement,
        canvas: HTMLCanvasElement,
        _buffer: HTMLCanvasElement
      ) {
        let buffer = _buffer.getContext("2d", { willReadFrequently: true });
        if (!buffer) throw new Error("Buffer creation failed");

        let context = canvas.getContext("2d");
        if (!context) throw new Error("Invalid context");

        let self = this;
        video.addEventListener(
          "play",
          function () {
            self.timerCallback(video, context, buffer);
          },
          false
        );
      },

      timerCallback: function (
        video: HTMLVideoElement,
        context: CanvasRenderingContext2D,
        buffer: CanvasRenderingContext2D
      ) {
        if (video.paused || video.ended) return location.reload();
        this.computeFrame(video, context, buffer);
        let self = this;
        setTimeout(function () {
          self.timerCallback(video, context, buffer);
        }, 0);
      },

      computeFrame: function (
        video: HTMLVideoElement,
        context: CanvasRenderingContext2D,
        buffer: CanvasRenderingContext2D
      ) {
        let width = video.videoWidth / 2,
          height = video.videoHeight / 2;
        if (!width || !height)
          return console.log("Invalid width/height", width, height);
        buffer.drawImage(video, 0, 0, width, height);
        let frame = buffer.getImageData(0, 0, width, height);
        let l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
          let r = frame.data[i * 4 + 0];
          let g = frame.data[i * 4 + 1];
          let b = frame.data[i * 4 + 2];
          if (g > 100 && r < 30 && b < 30) frame.data[i * 4 + 3] = 0;
        }
        context.putImageData(frame, 0, 0);
        return;
      },
    };
    //* ====================
    processor.init();
  });
});

function is_april_fools(): boolean {
  let d = new Date();
  return (
    (d.getDate() == 1 && d.getMonth() == 4) ||
    new URLSearchParams(location.search).has("april_fools")
  );
}
