class EffectManager {
  constructor() {
    this.effects = {};
  }

  register(name, effect) {
    this.effects[name] = effect;
  }

  enable(name) {
    const effect = this.effects[name];
    if (!effect) {
      console.warn(`[EffectManager] Effect '${name}' not found`);
      return;
    }
    if (!effect.start) {
      console.warn(`[EffectManager] Effect '${name}' has no start method`);
      return;
    }
    try {
      effect.start();
    } catch (err) {
      console.error(`[EffectManager] Failed to enable '${name}':`, err);
    }
  }

  disable(name) {
    const effect = this.effects[name];
    if (!effect) {
      console.warn(`[EffectManager] Effect '${name}' not found`);
      return;
    }
    if (!effect.stop) {
      console.warn(`[EffectManager] Effect '${name}' has no stop method`);
      return;
    }
    try {
      effect.stop();
    } catch (err) {
      console.error(`[EffectManager] Failed to disable '${name}':`, err);
    }
  }

  // Cleanup all effects on page unload
  cleanup() {
    try {
      for (const effect of Object.values(this.effects)) {
        if (effect && effect.stop) {
          effect.stop();
        }
      }
      this.effects = {};
    } catch (err) {
      console.error('[EffectManager] Cleanup failed:', err);
    }
  }
}

export const effectManager = new EffectManager();

