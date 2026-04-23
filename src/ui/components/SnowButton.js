/**
 * Snow Button Component
 * Toggle button to start/stop snow effect
 */

import { effectManager } from '../../core/EffectManager.js';
import { storage } from '../../utils/storage.js';
import { UI_CONFIG, MESSAGES } from '../../config/settings.js';

export function createSnowButton(options = {}) {
  // Prevent execution if DOM not ready
  if (!document.body) {
    console.warn('[SnowButton] DOM not ready - button creation skipped');
    return;
  }

  // Prevent duplicate buttons
  if (document.getElementById(UI_CONFIG.BUTTON_ID)) {
    return;
  }

  try {
    const button = document.createElement('button');
    button.id = UI_CONFIG.BUTTON_ID;
    button.className = UI_CONFIG.BUTTON_CLASS;

    const render = () => {
      const enabled = effectManager.activeEffectName === 'snow';
      button.innerText = enabled ? MESSAGES.SNOW_ON : MESSAGES.SNOW_OFF;
      button.setAttribute('aria-label', MESSAGES.ARIA_LABEL);
      button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    };

    // Restore previous state from storage
    const savedState = storage.getItem(UI_CONFIG.STORAGE_KEY);
    if (savedState === 'on') {
      effectManager.enable('snow');
    }
    render();

    // Handle button click
    button.addEventListener('click', () => {
      const enabled = effectManager.activeEffectName === 'snow';
      const nextEnabled = !enabled;
      storage.setItem(UI_CONFIG.STORAGE_KEY, nextEnabled ? 'on' : 'off');

      try {
        nextEnabled
          ? effectManager.enable('snow')
          : effectManager.disable('snow');
      } catch (err) {
        console.error('[SnowButton] Failed to toggle snow effect:', err);
      }
      render();
    });

    window.addEventListener('uieffects:state-change', render);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      try {
        window.removeEventListener('uieffects:state-change', render);
        button.remove();
      } catch (err) {
        console.warn('[SnowButton] Cleanup failed:', err);
      }
    });

    document.body.appendChild(button);
  } catch (err) {
    console.error('[SnowButton] Creation failed:', err);
  }
}
