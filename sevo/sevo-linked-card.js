const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
        * {
            box-sizing: "border-box";
        }
        .card {
            background-color: white;
            box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.4);
        }

        .card-header {
            /*background-color: lightgray;*/
            padding-top: 20px;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 10px;
        }

        .card-title {
            color: rebeccapurple;
            margin: 0;
            padding: 0;
            font-size: 24px;
        }

        .card-body {
            padding-top: 10px;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 10px;
        }

        .card-footer {
            /*background-color: lightcyan;*/
            padding-top: 20px;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 20px;

            border-top: 1px solid rgba(0, 0, 0, .05);
        }

        .card-button {
            display: inline-block;
            border: 2px solid rebeccapurple;
            padding: 10px 20px;
            color: rebeccapurple;
            text-decoration: none;
            background-color: transparent;
            transition: all .2s ease;
        }

        .card-button:hover,
        .card-button:focus {
            background-color: rebeccapurple;
            color: white;
        }

        :host {
            margin: 20px;
        }

    </style>
    <div class="card">
        <div part="card-header" class="card-header">
            <h3 part="card-title" class="card-title">Title</h3>
        </div>
        <div part="card-body" class="card-body"><slot></slot></div>
        <div part="card-footer" class="card-footer">
            <a part="card-button" class="card-button" href="#">Mehr...</a>
        </div>
    </div>
`;

class SevoLinkedCard extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.root.appendChild(template.content.cloneNode(true));

    this.elements = {
      cardButton: this.root.querySelector(".card-button"),
      cardTitle: this.root.querySelector(".card-title"),
      cardBody: this.root.querySelector(".card-body"),
      cardSlot: this.root.querySelector("slot"),
    };
  }

  // observedAttributes
  static get observedAttributes() {
    return ["title", "href", "target"];
  }

  // title
  get title() {
    return this.getAttribute("title");
  }

  set title(value) {
    this.setAttribute("title", value);
  }

  // href
  get href() {
    return this.getAttribute("href");
  }

  set href(value) {
    this.setAttribute("href", value);
  }

  // target
  get target() {
    return this.getAttribute("target");
  }

  set target(value) {
    this.setAttribute("target", value);
  }

  // connectedCallback
  connectedCallback() {
    console.log("connected");
    this.elements.cardButton.addEventListener("click", (evt) => {
      this.dispatchEvent(
        new CustomEvent("clicked", { detail: { msg: "Hello", number: 42 } })
      );
    });

    console.log(this.elements.cardSlot.assignedNodes());
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  // attributeChangedCallback
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback");
    console.log(
      "attribute changed:",
      name,
      "oldValue:",
      oldValue,
      "newValue:",
      newValue
    );

    if (this.title) {
      this.elements.cardTitle.innerText = this.title;
    }

    if (this.href) {
      this.elements.cardButton.setAttribute("href", this.href);
    }

    if (this.target) {
      this.elements.cardButton.setAttribute("target", this.target);
    }
  }
}

window.customElements.define("sevo-linked-card", SevoLinkedCard);
