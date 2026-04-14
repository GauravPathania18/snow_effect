/**
 * Particle System
 * Manages snowflake creation, physics updates, and rendering
 */

export class ParticleSystem {
  constructor(config) {
    this.layers = config.layers;
    this.maxFlakes = config.maxFlakes;
    this.flakes = [];
  }

  /**
   * Initialize all layered snowflakes
   */
  createFlakes(canvasWidth, canvasHeight) {
    const layers = Object.keys(this.layers);
    const perLayer = Math.floor(this.maxFlakes / layers.length);

    for (const layer of layers) {
      for (let i = 0; i < perLayer; i++) {
        this.spawnFlake(layer, canvasWidth, canvasHeight);
      }
    }
  }

  /**
   * Create individual flake
   */
  spawnFlake(layer, canvasWidth, canvasHeight) {
    const cfg = this.layers[layer];

    const flake = {
      layer,
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      r: (Math.random() * 2 + 1) * cfg.size,
      vy: (Math.random() * 20 + 10) * cfg.speed,
      vx: 0,
      swingPhase: Math.random() * Math.PI * 2,
      swingSpeed: 0.6 + Math.random() * 0.4
    };

    this.flakes.push(flake);
    return flake;
  }

  /**
   * Update physics and draw all flakes
   */
  updateAndDraw(delta, ctx, props, accumulation, canvasWidth, canvasHeight) {
    for (const f of this.flakes) {
      const cfg = this.layers[f.layer];

      // Gravity
      f.vy += props.gravity * cfg.speed * delta;

      // Wind horizontal velocity
      f.vx = props.windCurrent * (cfg.speed * 2) * props.windEffect;

      // Side sway (sine wave zigzag)
      f.swingPhase += f.swingSpeed * delta;
      f.x += Math.sin(f.swingPhase) * (8 + props.windEffect * 4) * props.swingAmplitude * delta;

      // Apply velocities
      f.x += f.vx * delta;
      f.y += f.vy * delta;

      // Horizontal wrapping
      if (f.x > canvasWidth) f.x = 0;
      if (f.x < 0) f.x = canvasWidth;

      // Collision with accumulation mound
      const accH = accumulation[Math.floor(f.x)] || 0;
      if (f.y + f.r >= canvasHeight - accH) {
        // Add to accumulation
        this._addToAccumulation(f.x, f.r * 0.3, accumulation, canvasWidth);

        // Respawn flake at top
        f.y = -10;
        f.vy = (Math.random() * 20 + 10) * cfg.speed;
        continue;
      }

      // Draw flake
      this.drawSnowflake(ctx, f.x, f.y, f.r, props.snowColor);
    }
  }

  /**
   * Add flake to accumulation
   */
  _addToAccumulation(x, amount, accumulation, canvasWidth) {
    const maxHeight = 150;
    x = Math.floor(x);

    if (x < 0 || x >= canvasWidth) return;

    accumulation[x] += amount * 2;
    if (accumulation[x] > maxHeight) accumulation[x] = maxHeight;

    // Spread to neighbors and corners for natural fill
    const spread = amount * 0.5;
    if (x > 0) accumulation[x - 1] += spread * 0.7;
    if (x < canvasWidth - 1) accumulation[x + 1] += spread * 0.7;
    if (x > 1) accumulation[x - 2] += spread * 0.2;
    if (x < canvasWidth - 2) accumulation[x + 2] += spread * 0.2;
  }

  /**
   * Draw simple snowflake (optimized for performance)
   */
  drawSnowflake(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Adaptive flake count based on FPS
   */
  adaptToPerformance(fps, fpsThresholdLow, fpsThresholdHigh, maxFlakes) {
    // Auto-reduce flakes if FPS drops
    if (fps < fpsThresholdLow && this.flakes.length > 500) {
      const reduction = Math.floor(this.flakes.length * 0.2);
      this.flakes.splice(0, reduction);
      console.warn(
        `[ParticleSystem] FPS low (${fps}) - removed ${reduction} flakes`
      );
    }

    // Auto-increase flakes if FPS is healthy
    if (fps > fpsThresholdHigh && this.flakes.length < maxFlakes * 0.8) {
      const increase = Math.floor(maxFlakes * 0.1);
      for (let i = 0; i < increase; i++) {
        const randomLayer =
          Object.keys(this.layers)[
            Math.floor(Math.random() * Object.keys(this.layers).length)
          ];
        this.spawnFlake(randomLayer, this.canvasWidth, this.canvasHeight);
      }
    }
  }

  /**
   * Clear all flakes
   */
  clear() {
    this.flakes = [];
  }
}
