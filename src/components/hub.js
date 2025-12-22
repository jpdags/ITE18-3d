import { state } from "../state.js";

AFRAME.registerComponent("game-timer", {
  tick(_t, dt) {
    state.time += dt / 1000;
  }
});
