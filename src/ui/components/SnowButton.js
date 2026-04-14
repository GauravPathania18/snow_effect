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

    let enabled = false;

    // Restore previous state from storage
    const savedState = storage.getItem(UI_CONFIG.STORAGE_KEY);
    if (savedState === 'on') {
      enabled = true;
      effectManager.enable('snow');
    }

    // Set initial button text
    button.innerText = enabled ? MESSAGES.SNOW_ON : MESSAGES.SNOW_OFF;

    // Add accessibility attributes
    button.setAttribute('aria-label', MESSAGES.ARIA_LABEL);
    button.setAttribute('aria-pressed', enabled ? 'true' : 'false');

    // Handle button click
    button.addEventListener('click', () => {
      enabled = !enabled;

      button.innerText = enabled ? MESSAGES.SNOW_ON : MESSAGES.SNOW_OFF;
      button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      storage.setItem(UI_CONFIG.STORAGE_KEY, enabled ? 'on' : 'off');

      try {
        enabled
          ? effectManager.enable('snow')
          : effectManager.disable('snow');
      } catch (err) {
        console.error('[SnowButton] Failed to toggle snow effect:', err);
        enabled = !enabled; // Revert state on error
      }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      try {
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
