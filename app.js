"use strict";
//import "./sevo/sevo-linked-card.js";
import "./sevo/imports.js";
console.log("app.js");

/*document.addEventListener("click", () => {
  const card = document.querySelector("sevo-linked-card");
  card.remove();
});*/

const cards = document.querySelectorAll("sevo-linked-card");

cards[1].addEventListener("clicked", (evt) => {
  console.log("card clicked");
  console.log("evt:", evt);
  console.log("detail:", evt.detail);
  evt.target.setAttribute("title", "Test");
});

const counter2 = document.getElementById("sevo-counter-2");
counter2.addEventListener("counterChanged", (evt) => {
  console.log("counter2", "count:", evt.detail.count);
});

class Timeout extends EventTarget {
  constructor(time = 1000) {
    super();
    this._time = time;
  }

  run() {
    const startTime = new Date().getTime();
    setTimeout(() => {
      const endTime = new Date().getTime();
      this.dispatchEvent(
        new CustomEvent("timeout", {
          detail: { timeDiff: endTime - startTime },
        })
      );
    }, this._time);
  }
}

const t = new Timeout();
t.addEventListener("timeout", (evt) => {
  console.log("timeout", "time:", evt.detail.timeDiff);
});
t.run();
