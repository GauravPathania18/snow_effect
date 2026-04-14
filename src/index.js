/**
 * UIEffects - Main Entry Point
 * Bundles all effects and provides a clean public API
 */

import { effectManager } from './core/EffectManager.js';
import { SnowEffect } from './core/SnowEffect.js';
import { createSnowButton } from './ui/components/SnowButton.js';
import { initializeWindControls } from './ui/components/WindControls.js';
import { EFFECT_MODES } from './config/settings.js';

// Browser compatibility check
(() => {
  const ua = navigator.userAgent;
  const isIE = /MSIE|Trident/.test(ua);
  const isOldEdge = /Edge\/\d{1,2}\./.test(ua);
  
  if (isIE) {
    console.warn('[UIEffects] Internet Explorer detected. Snow effect will not animate. Please upgrade to a modern browser.');
  } else if (isOldEdge) {
    console.warn('[UIEffects] Outdated Edge browser detected. Consider updating for better performance.');
  }
  
  if (!window.requestAnimationFrame) {
    console.error('[UIEffects] Your browser does not support requestAnimationFrame. Snow effect disabled.');
  }
})();

// Initialize effect manager with snow effect
effectManager.register('snow', new SnowEffect());

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  effectManager.cleanup();
});

// ============================================================================
// PUBLIC API
// ============================================================================
const snow = effectManager.effects.snow;

export const UIEffects = {
  // UI Components
  createSnowButton,
  initializeWindControls,
  
  // Core instances
  effectManager,
  snow,

  // Wind mode control
  setSnowWindMode: (mode) => {
    if (!snow) {
      console.error('[UIEffects] Snow effect not initialized');
      return;
    }
    if (!Object.values(EFFECT_MODES).includes(mode)) {
      console.warn(`[UIEffects] Invalid wind mode: ${mode}. Use 'calm', 'windy', or 'blizzard'`);
      return;
    }
    snow.setWindMode(mode);
  },

  // Start snow
  startSnow: () => {
    effectManager.enable('snow');
  },

  // Stop snow
  stopSnow: () => {
    effectManager.disable('snow');
  },

  // Get performance metrics for debugging
  getMetrics: () => {
    if (!snow) return null;
    return snow.getPerformanceMetrics();
  },

  // Debug mode flag
  debug: false
};

// Export components
export {
  createSnowButton,
  initializeWindControls,
  effectManager
};

// Make globally available when bundled
if (typeof window !== 'undefined') {
  window.UIEffects = UIEffects;
}

export default UIEffects;