/**
 * Autumn Button Component
 * Toggle button to start/stop falling leaves effect
 */
import { effectManager } from '../../core/EffectManager.js';
import { storage } from '../../utils/storage.js';
import { UI_CONFIG, MESSAGES } from '../../config/settings.js';

export function createAutumnButton() {
  if (!document.body) {
    console.warn('[AutumnButton] DOM not ready - button creation skipped');
    return;
  }

  if (document.getElementById(UI_CONFIG.AUTUMN_BUTTON_ID)) {
    return;
  }

  try {
    const button = document.createElement('button');
    button.id = UI_CONFIG.AUTUMN_BUTTON_ID;
    button.className = UI_CONFIG.AUTUMN_BUTTON_CLASS;

    const render = () => {
      const enabled = effectManager.activeEffectName === 'autumn';
      button.innerText = enabled ? MESSAGES.AUTUMN_ON : MESSAGES.AUTUMN_OFF;
      button.setAttribute('aria-label', MESSAGES.AUTUMN_ARIA_LABEL);
      button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    };

    const savedState = storage.getItem(UI_CONFIG.AUTUMN_STORAGE_KEY);
    if (savedState === 'on') {
      effectManager.enable('autumn');
    }
    render();

    button.addEventListener('click', () => {
      const enabled = effectManager.activeEffectName === 'autumn';
      const nextEnabled = !enabled;
      storage.setItem(UI_CONFIG.AUTUMN_STORAGE_KEY, nextEnabled ? 'on' : 'off');

      try {
        nextEnabled
          ? effectManager.enable('autumn')
          : effectManager.disable('autumn');
      } catch (err) {
        console.error('[AutumnButton] Failed to toggle falling leaves effect:', err);
      }
      render();
    });

    window.addEventListener('uieffects:state-change', render);

    window.addEventListener('beforeunload', () => {
      try {
        window.removeEventListener('uieffects:state-change', render);
        button.remove();
      } catch (err) {
        console.warn('[AutumnButton] Cleanup failed:', err);
      }
    });

    document.body.appendChild(button);
  } catch (err) {
    console.error('[AutumnButton] Creation failed:', err);
  }
}
