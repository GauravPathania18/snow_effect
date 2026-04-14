/**
 * Accumulation System
 * Manages snow pile and ground accumulation
 */

export class AccumulationSystem {
  constructor() {
    this.accumulation = [];
  }

  /**
   * Initialize accumulation array
   */
  init(canvasWidth) {
    this.accumulation = new Array(canvasWidth).fill(0);
  }

  /**
   * Smooth accumulation for natural appearance (light smoothing to preserve jagged edges)
   */
  smooth() {
    const arr = this.accumulation;
    const smoothed = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      const L = arr[i - 1] || 0;
      const C = arr[i];
      const R = arr[i + 1] || 0;

      smoothed[i] = L * 0.1 + C * 0.8 + R * 0.1;
    }

    this.accumulation = smoothed;
  }

  /**
   * Draw accumulated snow as polygon on ground
   */
  draw(ctx, canvasWidth, canvasHeight, color = 'rgba(255,255,255,0.95)') {
    ctx.fillStyle = color;
    ctx.beginPath();

    ctx.moveTo(0, canvasHeight);

    for (let x = 0; x < canvasWidth; x++) {
      ctx.lineTo(x, canvasHeight - this.accumulation[x]);
    }

    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Get accumulation height at position
   */
  getHeightAt(x) {
    return this.accumulation[Math.floor(x)] || 0;
  }

  /**
   * Clear accumulation
   */
  clear() {
    this.accumulation = [];
  }

  /**
   * Get max accumulation height
   */
  getMaxHeight() {
    return Math.max(...this.accumulation);
  }
}
