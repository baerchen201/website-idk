"use strict";
class AmongUsBg extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log(this);
    }
}
window.customElements.define("amongus-bg", AmongUsBg);
