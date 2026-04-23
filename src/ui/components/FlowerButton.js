/**
 * Flower Button Component
 * Toggle button to start/stop flower effect
 */
import { effectManager } from '../../core/EffectManager.js';
import { storage } from '../../utils/storage.js';
import { UI_CONFIG, MESSAGES } from '../../config/settings.js';

export function createFlowerButton() {
  if (!document.body) {
    console.warn('[FlowerButton] DOM not ready - button creation skipped');
    return;
  }

  if (document.getElementById(UI_CONFIG.FLOWER_BUTTON_ID)) {
    return;
  }

  try {
    const button = document.createElement('button');
    button.id = UI_CONFIG.FLOWER_BUTTON_ID;
    button.className = UI_CONFIG.FLOWER_BUTTON_CLASS;

    const render = () => {
      const enabled = effectManager.activeEffectName === 'flowers';
      button.innerText = enabled ? MESSAGES.FLOWERS_ON : MESSAGES.FLOWERS_OFF;
      button.setAttribute('aria-label', MESSAGES.FLOWERS_ARIA_LABEL);
      button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    };

    const savedState = storage.getItem(UI_CONFIG.FLOWER_STORAGE_KEY);
    if (savedState === 'on') {
      effectManager.enable('flowers');
    }
    render();

    button.addEventListener('click', () => {
      const enabled = effectManager.activeEffectName === 'flowers';
      const nextEnabled = !enabled;
      storage.setItem(UI_CONFIG.FLOWER_STORAGE_KEY, nextEnabled ? 'on' : 'off');

      try {
        nextEnabled
          ? effectManager.enable('flowers')
          : effectManager.disable('flowers');
      } catch (err) {
        console.error('[FlowerButton] Failed to toggle flower effect:', err);
      }
      render();
    });

    window.addEventListener('uieffects:state-change', render);

    window.addEventListener('beforeunload', () => {
      try {
        window.removeEventListener('uieffects:state-change', render);
        button.remove();
      } catch (err) {
        console.warn('[FlowerButton] Cleanup failed:', err);
      }
    });

    document.body.appendChild(button);
  } catch (err) {
    console.error('[FlowerButton] Creation failed:', err);
  }
}
