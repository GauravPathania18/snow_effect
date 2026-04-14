import { effectManager } from "../core/EffectManager.js";

// Utility: Safe localStorage access with fallback
const storage = (() => {
  let canUseLocalStorage = false;
  try {
    const test = "__test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    canUseLocalStorage = true;
  } catch (e) {
    console.warn('[createSnowButton] localStorage unavailable (private browsing?) - using session storage');
    canUseLocalStorage = false;
  }

  const memoryStore = {}; // Fallback in-memory storage

  return {
    getItem(key) {
      try {
        return canUseLocalStorage ? localStorage.getItem(key) : memoryStore[key] || null;
      } catch (e) {
        return memoryStore[key] || null;
      }
    },
    setItem(key, value) {
      try {
        if (canUseLocalStorage) {
          localStorage.setItem(key, value);
        }
      } catch (e) {
        // Silently fallback to memory
      }
      memoryStore[key] = value;
    }
  };
})();

export function createSnowButton(options = {}) {
  // Prevent execution if DOM not ready
  if (!document.body) {
    console.warn('[createSnowButton] DOM not ready - button creation skipped');
    return;
  }

  // 🔒 Prevent duplicate buttons
  if (document.getElementById("ui-snow-button")) return;

  try {
    const button = document.createElement("button");
    button.id = "ui-snow-button";
    button.className = "ui-snow-button"; // CSS class instead of inline styles

    let enabled = false;

    // Restore previous state (if any) using safe storage
    const savedState = storage.getItem("ui-snow");
    if (savedState === "on") {
      enabled = true;
      effectManager.enable("snow");
    }

    button.innerText = enabled ? "❄ Stop snow" : "❄ Let it snow";

    // Add ARIA attributes for accessibility
    button.setAttribute("aria-label", "Toggle snow effect");
    button.setAttribute("aria-pressed", enabled ? "true" : "false");

    button.onclick = () => {
      enabled = !enabled;

      button.innerText = enabled ? "❄ Stop snow" : "❄ Let it snow";
      button.setAttribute("aria-pressed", enabled ? "true" : "false");
      storage.setItem("ui-snow", enabled ? "on" : "off");

      try {
        enabled
          ? effectManager.enable("snow")
          : effectManager.disable("snow");
      } catch (err) {
        console.error('[createSnowButton] Failed to toggle snow effect:', err);
        enabled = !enabled; // revert state
      }
    };

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
      try {
        button.remove();
      } catch (err) {
        console.warn('[createSnowButton] Cleanup failed:', err);
      }
    });

    document.body.appendChild(button);
  } catch (err) {
    console.error('[createSnowButton] Creation failed:', err);
  }
}
