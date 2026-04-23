// Initialize the embedded SnowEffect instance from UIEffects
try {
  // 1. Create the Let It Snow toggle button
  UIEffects.createSnowButton();
  UIEffects.createFlowerButton();
  UIEffects.createAutumnButton();

  // 2. Access the snow instance
  const snow = UIEffects.effectManager.effects.snow;

  if (!snow) {
    console.error('[main.js] Snow effect instance not found');
  } else {
    // 3. Wire wind mode buttons with active state management
    const windButtons = document.querySelectorAll("#snow-controls button");
    
    windButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        windButtons.forEach(b => b.classList.remove("active"));
        // Add to clicked button
        btn.classList.add("active");
        
        // Change wind mode
        const mode = btn.dataset.mode;
        UIEffects.setWindMode(mode);
      });
    });

    // Set "Windy" as default active button state
    const windyBtn = document.querySelector('button[data-mode="windy"]');
    if (windyBtn) {
      windyBtn.classList.add("active");
    }
  }
} catch (err) {
  console.error('[main.js] Failed to initialize snow effect:', err);
}
