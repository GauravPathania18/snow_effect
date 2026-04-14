// Initialize the embedded SnowEffect instance from UIEffects
const snow = UIEffects.effectManager.effects.snow;

// Bind buttons to wind modes
document.querySelectorAll("#snow-controls button").forEach(btn => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;
    snow.setWindMode(mode);
  });
});
