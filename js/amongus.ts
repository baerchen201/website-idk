class AmongUsBg extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    for (
      let i = 0;
      i < 50; //* Number of stars here
      i++
    )
      setTimeout(() => {
        this.createStar();
      }, Math.floor(Math.random() * 50 + 25) * i);

    for (
      let i = 0;
      i < 7; //* Limit of amogi here
      i++
    )
      setTimeout(() => {
        this.createAmogus();
      }, Math.floor(Math.random() * 10000 + 5000) * i);
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

  createAmogus() {
    let amogus: AmongUsAmogus = document.createElement(
      "amongus-amogus"
    ) as AmongUsAmogus;
    amogus._bg(1.5, "x-").then(() => {
      setTimeout(() => {
        this.createAmogus();
      }, Math.floor(Math.random() * 3000 + 500));
      amogus.remove();
    });
    this.appendChild(amogus);
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

class AmongUsAmogus extends HTMLElement {
  constructor() {
    super();
  }

  _bg(
    speed: number = 1,
    direction: "x+" | "x-" | "y+" | "y-" = "x+"
  ): Promise<void> {
    this.style.top =
      direction.charAt(0) == "x"
        ? `calc(${Math.random() * 100}% - var(--scale)/2)`
        : "";
    this.style.left =
      direction.charAt(0) == "y"
        ? `calc(${Math.random() * 100}% - var(--scale)/2)`
        : "";

    return this.anim(speed, direction);
  }

  anim(
    speed: number = 1,
    direction: "x+" | "x-" | "y+" | "y-" = "x+"
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      let _anim: Keyframe[];
      switch (direction) {
        case "x+":
          _anim = [{ left: "calc(-1 * var(--scale))" }, { left: "100%" }];
          break;
        case "x-":
          _anim = [{ left: "100%" }, { left: "calc(-1 * var(--scale))" }];
          break;
        case "y+":
          _anim = [{ top: "calc(-1 * var(--scale))" }, { top: "100%" }];
          break;
        case "y-":
          _anim = [{ top: "100%" }, { top: "calc(-1 * var(--scale))" }];
          break;

        default:
          _anim = [];
          break;
      }

      this.animate(_anim, {
        duration: Math.floor((Math.random() * 50000 + 30000) / speed),
        fill: "forwards",
      }).addEventListener("finish", () => {
        resolve();
      });
    });
  }
}

window.customElements.define("amongus-bg", AmongUsBg);
window.customElements.define("amongus-star", AmongUsStar);
window.customElements.define("amongus-amogus", AmongUsAmogus);
