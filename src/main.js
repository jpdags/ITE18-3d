import "./components/game-timer.js";
import "./components/hud.js";
import "./components/select-animal.js";
import "./components/habitat-zone.js";
import "./components/drag-rotate.js";

AFRAME.scenes[0].addEventListener("loaded", () => {
  const hud = document.querySelector("#hud");
  hud.setAttribute("hud-update", "");
});
