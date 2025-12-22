import { state, addScore, setSelected } from "../state.js";

AFRAME.registerComponent("habitat-zone", {
  schema: {
    habitat: { type: "string" },
    label: { type: "string" }
  },

  init() {
    // Label on top of the zone
    const tag = document.createElement("a-text");
    tag.setAttribute("value", this.data.label);
    tag.setAttribute("align", "center");
    tag.setAttribute("position", "0 0.9 0");
    tag.setAttribute("width", "6");
    tag.setAttribute("color", "white");
    this.el.appendChild(tag);

    this.el.addEventListener("click", () => {
      if (!state.selected) return;

      // Correct placement
      if (state.selected.habitat === this.data.habitat && !state.placed[this.data.habitat]) {
        state.placed[this.data.habitat] = true;
        addScore(100);
        this.el.emit("correct-place");

        // Drop a copy on the zone as a “placed” marker
        const placed = document.createElement("a-entity");
        placed.setAttribute("gltf-model", state.selected.modelSelector);
        placed.setAttribute("position", "0 1.1 0");
        placed.setAttribute("scale", "1 1 1");
        this.el.appendChild(placed);

        // Clear selection + inspection slot
        document.querySelector("#inspectSlot").innerHTML = "";
        setSelected(null);

        // Win condition (3 habitats done)
        if (Object.values(state.placed).every(Boolean)) {
          document.querySelector("#winText").setAttribute("visible", true);
        }
      } else {
        addScore(-10);
        this.el.emit("wrong-place");
      }
    });
  }
});
