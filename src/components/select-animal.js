import { setSelected } from "../state.js";

AFRAME.registerComponent("select-animal", {
  schema: {
    id: { type: "string" },
    label: { type: "string" },
    habitat: { type: "string" }
  },

  init() {
    this.el.addEventListener("click", () => {
      // Store selection
      setSelected({
        id: this.data.id,
        label: this.data.label,
        habitat: this.data.habitat,
        modelSelector: this.el.getAttribute("gltf-model")
      });

      // Spawn a fresh copy on inspection pedestal
      const slot = document.querySelector("#inspectSlot");
      slot.innerHTML = "";

      const clone = document.createElement("a-entity");
      clone.setAttribute("gltf-model", this.el.getAttribute("gltf-model"));
      clone.setAttribute("scale", "1 1 1");
      clone.setAttribute("drag-rotate", "");
      slot.appendChild(clone);

      // Play pick SFX using the entity’s sound component
      this.el.emit("animal-picked");
    });
  }
});
