class EffectManager {
  constructor() {
    this.effects = {};
    this.activeEffectName = null;
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
      // Keep exactly one active primary effect.
      for (const [otherName, otherEffect] of Object.entries(this.effects)) {
        if (otherName === name || !otherEffect) continue;
        if (!otherEffect.running) continue;

        // Switching away from snow keeps accumulation and melts it naturally.
        if (otherName === 'snow' && typeof otherEffect.transitionToMelting === 'function') {
          otherEffect.transitionToMelting();
        } else if (typeof otherEffect.stop === 'function') {
          otherEffect.stop();
        }
      }

      effect.start();
      this.activeEffectName = name;
      this._emitStateChange();
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
      if (this.activeEffectName === name) {
        this.activeEffectName = null;
      }
      this._emitStateChange();
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
      this.activeEffectName = null;
      this._emitStateChange();
      this.effects = {};
    } catch (err) {
      console.error('[EffectManager] Cleanup failed:', err);
    }
  }

  _emitStateChange() {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('uieffects:state-change', {
        detail: { activeEffectName: this.activeEffectName }
      })
    );
  }
}

export const effectManager = new EffectManager();

