import { effectManager } from "./core/EffectManager.js";
import { SnowEffect } from "./core/SnowEffect.js";
import { createSnowButton } from "./ui/createSnowButton.js";

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

effectManager.register("snow", new SnowEffect());

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  effectManager.cleanup();
});

// ============================================================================
// CONVENIENCE API - Expose commonly used methods
// ============================================================================
const snow = effectManager.effects.snow;

const UIEffects = {
  createSnowButton,
  effectManager,

  // Simple wind mode control
  setSnowWindMode: (mode) => {
    if (!snow) {
      console.error('[UIEffects] Snow effect not initialized');
      return;
    }
    if (!['calm', 'windy', 'blizzard'].includes(mode)) {
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

  // Get current performance metrics (for debugging)
  getMetrics: () => {
    if (!snow) return null;
    return snow.getPerformanceMetrics();
  },

  // Enable verbose logging
  debug: false
};

export {
  createSnowButton,
  effectManager,
  UIEffects as default
};

// Make globally available when bundled
if (typeof window !== 'undefined') {
  window.UIEffects = UIEffects;
}
     