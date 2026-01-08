import { effectManager } from "../core/EffectManager.js";

export function createSnowButton(options = {}) {
  // 🔒 Prevent duplicate buttons
  if (document.getElementById("ui-snow-button")) return;

  const button = document.createElement("button");
  button.id = "ui-snow-button";

  let enabled = false;

  // Restore previous state (if any)
  const savedState = localStorage.getItem("ui-snow");
  if (savedState === "on") {
    enabled = true;
    effectManager.enable("snow");
  }

  button.innerText = enabled ? "❄ Stop snow" : "❄ Let it snow";

  // Styling (safe defaults)
  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 10000,
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "6px"
  });

  button.onclick = () => {
    enabled = !enabled;

    button.innerText = enabled ? "❄ Stop snow" : "❄ Let it snow";
    localStorage.setItem("ui-snow", enabled ? "on" : "off");

    enabled
      ? effectManager.enable("snow")
      : effectManager.disable("snow");
  };

  document.body.appendChild(button);
}
