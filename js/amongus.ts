class AmongUsBg extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log(this);

    let free = 50;
    let _ = () => {
      if (free > 0) {
        free--;
        let star: AmongUsStar = document.createElement(
          "amongus-star"
        ) as AmongUsStar;
        console.log(star);
        star._bg().then(() => {
          free++;
          star.remove();
        });
        this.appendChild(star);
      }
      setTimeout(_, Math.floor(Math.random() * 50 + 50));
    };
    _();
  }
}

class AmongUsStar extends HTMLElement {
  constructor() {
    super();
  }

  _bg(): Promise<void> {
    this.style.top = `${Math.random() * 100}%`;
    this.style.left = `${Math.random() * 100}%`;

    return this.blink(2000, 5000);
  }

  blink(fade: number, duration: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.animate([{ opacity: "0" }, { opacity: "1" }], {
        easing: "ease-out",
        duration: fade,
        fill: "forwards",
      }).addEventListener("finish", () => {
        setTimeout(() => {
          this.animate([{ opacity: "1" }, { opacity: "0" }], {
            easing: "ease-out",
            duration: fade,
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
