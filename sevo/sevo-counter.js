"use strict";

class CounterService {
  constructor(start = 0) {
    this._count = start;
    this.onUpdate = null;
  }

  __fireUpdate(count) {
    if (typeof this.onUpdate === "function") {
      this.onUpdate({ target: this, count: count });
    }
  }

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
    this.__fireUpdate(this._count);
  }

  decrement(step = 1) {
    this.count -= step;
  }

  increment(step = 1) {
    this.count += step;
  }
}

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
        #counter-display, #counter-controls {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            color: rebeccapurple;
        }

        .button {
            padding: 10px 20px;
            border: 2px solid rebeccapurple;
            font-size: 18px;
            color: rebeccapurple;
            background-color: transparent;
            transition: .2s all ease;
        }

        .button:hover {
            background-color: rebeccapurple;
            color: white;
        }

        .button:active {
            color: rebeccapurple;
            background-color: transparent;
        }
    </style>
    <div id="counter-wrapper">
        <div id="counter-display"></div>
        <div id="counter-controls">
            <button class="button" id="counter-decrement-button">-</button>
            <button class="button" id="counter-increment-button">+</button>
        <div>
    </div>
`;

class SevoCounter extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.root.appendChild(template.content.cloneNode(true));

    this.elements = {
      counterWrapper: this.root.querySelector("#counter-wrapper"),
      counterDisplay: this.root.querySelector("#counter-display"),
      counterDecrementButton: this.root.querySelector(
        "#counter-decrement-button"
      ),
      counterIncrementButton: this.root.querySelector(
        "#counter-increment-button"
      ),
    };

    console.log("Constructor SevoCounter");
    console.log(this.startCount);
    if (!this.startCount) this.startCount = 0;
    if (!this.step) this.step = 1;

    // counterService
    this.counterService = new CounterService(0);
    this.counterService.onUpdate = (evt) => {
      console.log("onUpdate");
      this.elements.counterDisplay.innerText = evt.count;
    };
    this.counterService.count = this.startCount;
  }

  static get observedAttributes() {
    return ["start-count", "step"];
  }

  // start-count
  get startCount() {
    return parseInt(this.getAttribute("start-count"));
  }

  set startCount(value) {
    this.setAttribute("start-count", value);
  }

  // step
  get step() {
    return parseInt(this.getAttribute("step"));
  }

  set step(value) {
    this.setAttribute("step", value);
  }

  // connectedCallback
  connectedCallback() {
    //console.log("--- SevoCounter connectedCallback ---");
    //console.log("startCount:", this.startCount);
    //console.log("step:", this.step);

    // clicks
    this.elements.counterDecrementButton.addEventListener("click", () => {
      //console.log("SevoCounter decrement clicked");
      this.counterService.decrement(this.step);
    });

    this.elements.counterIncrementButton.addEventListener("click", () => {
      //console.log("SevoCounter increment clicked");
      this.counterService.increment(this.step);
    });
  }
}

window.customElements.define("sevo-counter", SevoCounter);
