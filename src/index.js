import { effectManager } from "./core/EffectManager.js";
import { SnowEffect } from "./core/SnowEffect.js";
import { createSnowButton } from "./ui/createSnowButton.js";

effectManager.register("snow", new SnowEffect());

export {
  createSnowButton,
  effectManager
};
     