"use strict";
class AmongUsBg extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log(this);
        let free = 125;
        let _ = () => {
            if (free > 0) {
                free--;
                let star = document.createElement("amongus-star");
                console.log(star);
                star
                    ._bg(Math.floor(Math.random() * 2250 + 3000), Math.floor(Math.random() * 50 + 50), Math.floor(Math.random() * 2250 + 3000))
                    .then(() => {
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
    _bg(fadein, duration, fadeout) {
        this.style.top = `${Math.random() * 100}%`;
        this.style.left = `${Math.random() * 100}%`;
        return this.blink(fadein, duration, fadeout);
    }
    blink(fadein, duration, fadeout) {
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
