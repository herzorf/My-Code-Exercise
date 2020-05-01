import "./style.css";
import "./scssStyle.styl";
import png from "./assets/1.png";

console.log("这是index.js");

const div = document.getElementById("app");
div.innerHTML = `<img src = "${png}">`;
const button = document.createElement("button");
button.innerText = "懒加载";
div.appendChild(button);
button.onclick = () => {
  const lazy = import("./lazy.js");
  lazy.then(
    (module) => {
      const fn = module.default;
      fn();
    },
    () => {}
  );
};
