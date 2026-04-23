/**
 * Wind Controls Component
 * Control panel for wind modes (calm, windy, blizzard)
 */

import { EFFECT_MODES } from '../../config/settings.js';

export function initializeWindControls(target) {
  if (!target) {
    console.error('[WindControls] Wind target not provided');
    return;
  }

  const windButtons = document.querySelectorAll('button[data-mode]');

  if (windButtons.length === 0) {
    console.warn('[WindControls] No wind control buttons found in DOM');
    return;
  }

  windButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      windButtons.forEach(b => b.classList.remove('active'));

      // Add to clicked button
      btn.classList.add('active');

      // Change wind mode
      const mode = btn.dataset.mode;
      if (Object.values(EFFECT_MODES).includes(mode)) {
        const targets = Array.isArray(target) ? target : [target];
        targets.forEach(effect => {
          if (effect && typeof effect.setWindMode === 'function') {
            effect.setWindMode(mode);
          }
        });
      } else {
        console.warn(`[WindControls] Invalid wind mode: ${mode}`);
      }
    });
  });

  // Set default active mode (windy)
  const windyBtn = document.querySelector(`button[data-mode="${EFFECT_MODES.WINDY}"]`);
  if (windyBtn) {
    windyBtn.classList.add('active');
  }
}
