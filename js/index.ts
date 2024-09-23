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
    if (!data_thumbnail) data_thumbnail = "img/youtube-thumbnail.jpg";
    if (!data_channel_icon) data_channel_icon = "img/youtube-channel-icon.webp";
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

window.customElements.define("youtube-video", youtubeVideo);

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
      img.src = "img/an871k4o1sn51.png";
      img.classList.add("funny");

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
});

function is_april_fools(): boolean {
  let d = new Date();
  return (
    (d.getDate() == 1 && d.getMonth() == 4) ||
    new URLSearchParams(location.search).has("april_fools")
  );
}
