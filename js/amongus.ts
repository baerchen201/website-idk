class AmongUsBg extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    for (
      let i = 0;
      i < 75; //* Number of stars here
      i++
    )
      setTimeout(() => {
        this.createStar();
      }, Math.floor(Math.random() * 50 + 25) * i);
  }

  createStar() {
    let star: AmongUsStar = document.createElement(
      "amongus-star"
    ) as AmongUsStar;
    star
      ._bg(
        Math.floor(Math.random() * 2250 + 3000),
        Math.floor(Math.random() * 1500 + 500),
        Math.floor(Math.random() * 2250 + 3000)
      )
      .then(() => {
        setTimeout(() => {
          this.createStar();
        }, Math.floor(Math.random() * 200 + 50));
        star.remove();
      });
    this.appendChild(star);
  }
}

class AmongUsStar extends HTMLElement {
  constructor() {
    super();
  }

  _bg(fadein: number, duration: number, fadeout: number): Promise<void> {
    this.style.top = `${Math.random() * 100}%`;
    this.style.left = `${Math.random() * 100}%`;

    return this.blink(fadein, duration, fadeout);
  }

  blink(fadein: number, duration: number, fadeout: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.animate([{ opacity: "0" }, { opacity: "1" }], {
        easing: "ease-out",
        duration: fadein,
        fill: "forwards",
      }).addEventListener("finish", () => {
        setTimeout(() => {
          this.animate([{ opacity: "1" }, { opacity: "0" }], {
            easing: "ease-out",
            duration: fadeout,
            fill: "forwards",
          }).addEventListener("finish", () => {
            resolve();
          });
        }, duration);
      });
    });
  }
}

window.customElements.define("amongus-bg", AmongUsBg);
window.customElements.define("amongus-star", AmongUsStar);
