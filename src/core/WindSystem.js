/**
 * Wind System
 * Manages wind physics and directional changes
 */

export class WindSystem {
  constructor(windStrength) {
    this.windStrength = windStrength;
    this.wind = {
      current: (Math.random() * 2 - 1) * windStrength,
      target: (Math.random() * 2 - 1) * windStrength,
      timer: 2 + Math.random() * 2
    };
  }

  /**
   * Update wind with smooth interpolation
   */
  update(delta) {
    this.wind.timer -= delta;

    // Random new wind direction
    if (this.wind.timer <= 0) {
      this.wind.target = (Math.random() * 2 - 1) * this.windStrength;
      this.wind.timer = 3 + Math.random() * 3;
    }

    // Smooth interpolation
    const smoothing = 0.08;
    this.wind.current +=
      (this.wind.target - this.wind.current) * smoothing;
  }

  /**
   * Get current wind value
   */
  getCurrent() {
    return this.wind.current;
  }

  /**
   * Reset wind to new random state
   */
  reset() {
    this.wind.current = (Math.random() * 2 - 1) * this.windStrength;
    this.wind.target = (Math.random() * 2 - 1) * this.windStrength;
    this.wind.timer = 2 + Math.random() * 2;
  }

  /**
   * Set wind strength (for mode changes)
   */
  setStrength(strength) {
    this.windStrength = strength;
    this.reset();
  }
}
