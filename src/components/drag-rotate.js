AFRAME.registerComponent("drag-rotate", {
  init() {
    this.dragging = false;
    this.lastX = 0;
    this.lastY = 0;

    const canvas = this.el.sceneEl.canvas;

    const down = (e) => {
      this.dragging = true;
      this.lastX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      this.lastY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    };

    const move = (e) => {
      if (!this.dragging) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? this.lastX;
      const y = e.clientY ?? e.touches?.[0]?.clientY ?? this.lastY;

      const dx = x - this.lastX;
      const dy = y - this.lastY;

      const rot = this.el.getAttribute("rotation");
      this.el.setAttribute("rotation", {
        x: rot.x + dy * 0.2,
        y: rot.y + dx * 0.25,
        z: rot.z
      });

      this.lastX = x;
      this.lastY = y;
    };

    const up = () => (this.dragging = false);

    // Wait until renderstart so canvas exists
    this.el.sceneEl.addEventListener("renderstart", () => {
      canvas.addEventListener("mousedown", down);
      canvas.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);

      canvas.addEventListener("touchstart", down, { passive: true });
      canvas.addEventListener("touchmove", move, { passive: true });
      window.addEventListener("touchend", up);
    });
  }
});
