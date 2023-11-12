const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
        .image-header {
            padding-top: 80px;
            padding-bottom: 80px;
            padding-left: 20px;
            padding-right: 20px;

            background-color: lightpink;
            height: 500px;

        
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
        }


    </style>
    <section part="image" class="image-header">
        <div class="content"><slot></slot></div>
    </section>  
`;

class SevoImageHeader extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.root.appendChild(template.content.cloneNode(true));

    this.elements = {
      headerTitle: this.root.querySelector(".header-title"),
      headerImage: this.root.querySelector(".image-header"),
    };
  }

  static get observedAttributes() {
    return ["url"];
  }

  get url() {
    return this.getAttribute("url");
  }

  set url(value) {
    this.setAttribute("url", value);
  }

  connectedCallback() {
    console.log("image-header connectedCallback");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("image-header attributeChangedCallback");

    console.log(this.url);
    if (this.url) {
      this.elements.headerImage.style[
        "background-image"
      ] = `url("${this.url}")`;
    }
  }
}

window.customElements.define("sevo-image-header", SevoImageHeader);
