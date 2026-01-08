class EffectManager {
  constructor() {
    this.effects = {};
  }

  register(name, effect) {
    this.effects[name] = effect;
  }

  enable(name) {
    this.effects[name]?.start();
  }

  disable(name) {
    this.effects[name]?.stop();
  }
}

export const effectManager = new EffectManager();

