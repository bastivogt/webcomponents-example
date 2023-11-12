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
