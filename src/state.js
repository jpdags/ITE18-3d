export const state = {
  time: 0,
  score: 0,
  selected: null, // { id, label, habitat, modelSelector }
  placed: { farm: false, forest: false, ocean: false }
};

export function setSelected(sel) {
  state.selected = sel;
}

export function addScore(n) {
  state.score += n;
}
