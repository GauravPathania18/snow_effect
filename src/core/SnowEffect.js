/**
 * Snow Effect - Main Orchestrator
 * Coordinates all snow animation systems
 */

import { ParticleSystem } from './ParticleSystem.js';
import { WindSystem } from './WindSystem.js';
import { AccumulationSystem } from './AccumulationSystem.js';
import { BackgroundDetection } from './BackgroundDetection.js';

export class SnowEffect {
  constructor(options = {}) {
    // Configuration
    this.maxFlakes = options.maxFlakes || 2000;
    this.gravity = options.gravity || 18;
    this.windStrength = options.windStrength || 16;
    this.windEffect = options.windEffect || 2.0;
    this.swingAmplitude = options.swingAmplitude || 1.0;

    // Depth layers for visual realism
    this.layers = {
      back: { speed: 0.5, size: 0.6, opacity: 0.4 },
      mid: { speed: 0.8, size: 0.9, opacity: 0.7 },
      front: { speed: 1.2, size: 1.3, opacity: 1.0 }
    };

    // Initialize subsystems
    this.particles = new ParticleSystem({
      layers: this.layers,
      maxFlakes: this.maxFlakes
    });

    this.wind = new WindSystem(this.windStrength);
    this.accumulation = new AccumulationSystem();

    // Engine state
    this.running = false;
    this.paused = false;
    this.snowfallActive = true;
    this.melting = false;
    this.meltRate = options.meltRate || 6;
    this.lastTime = 0;
    this.raf = null;

    // Canvas
    this.canvas = null;
    this.ctx = null;

    // Performance monitoring
    this.frameCount = 0;
    this.fps = 60;
    this.fpsCheckTime = 0;
    this.fpsUpdateInterval = 1000;
    this.accumulationFrameSkip = 0;

    // Adaptive snow color
    this.snowColor = 'rgba(255,255,255,0.95)';

    // Bind methods
    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  // ========================================================================
  // LIFECYCLE
  // ========================================================================

  start() {
    if (this.running) {
      // If already in melt mode, resume snowfall without recreating canvas.
      if (this.melting) {
        this.melting = false;
        this.snowfallActive = true;
        this.particles.createFlakes(this.canvas.width, this.canvas.height);
      }
      return;
    }
    this.running = true;
    this.snowfallActive = true;
    this.melting = false;

    // Browser support check
    if (!window.requestAnimationFrame) {
      console.warn(
        '[SnowEffect] requestAnimationFrame not supported - animation disabled'
      );
      return;
    }

    try {
      // Create canvas
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      if (!this.canvas || !this.ctx) {
        throw new Error('Canvas initialization failed');
      }

      // Style canvas
      Object.assign(this.canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999
      });

      document.body.appendChild(this.canvas);
    } catch (err) {
      console.error('[SnowEffect] Failed to initialize canvas:', err);
      this.running = false;
      return;
    }

    // Setup
    this.resize();
    window.addEventListener('resize', this.resize);
    document.addEventListener('visibilitychange', this.handleVisibility);
    window.addEventListener('beforeunload', () => this.stop());

    // Initialize particles and systems
    this.particles.createFlakes(this.canvas.width, this.canvas.height);
    this.accumulation.init(this.canvas.width);

    // Detect and set snow color
    const brightness = BackgroundDetection.detectBrightness();
    this.snowColor = BackgroundDetection.getSnowColor(brightness);

    this.wind.reset();

    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop() {
    this.running = false;
    this.snowfallActive = false;
    this.melting = false;
    if (this.raf) cancelAnimationFrame(this.raf);

    window.removeEventListener('resize', this.resize);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    window.removeEventListener('beforeunload', () => this.stop());

    this.canvas?.remove();
    this.particles.clear();
    this.accumulation.clear();

    this.canvas = null;
    this.ctx = null;
  }

  transitionToMelting() {
    if (!this.running) return;
    this.snowfallActive = false;
    this.melting = true;
    this.particles.clear();
  }

  handleVisibility() {
    if (document.hidden) {
      this.paused = true;
    } else {
      this.paused = false;
      this.lastTime = performance.now(); // Avoid delta spike
    }
  }

  resize() {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.accumulation.init(this.canvas.width);

    // Update snow color on resize (background might have changed)
    const brightness = BackgroundDetection.detectBrightness();
    this.snowColor = BackgroundDetection.getSnowColor(brightness);
  }

  // ========================================================================
  // MAIN LOOP
  // ========================================================================

  loop(now) {
    if (!this.running) return;

    let delta = (now - this.lastTime) / 1000;
    this.lastTime = now;
    delta = Math.min(delta, 0.03); // Cap delta to prevent large jumps

    if (this.paused) {
      this.raf = requestAnimationFrame(this.loop);
      return;
    }

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update systems
    this.wind.update(delta);
    this.updateFrameRate(delta);

    // Update and draw particles only while active snowfall is enabled.
    if (this.snowfallActive) {
      this.particles.updateAndDraw(
        delta,
        this.ctx,
        {
          gravity: this.gravity,
          windCurrent: this.wind.getCurrent(),
          windEffect: this.windEffect,
          swingAmplitude: this.swingAmplitude,
          snowColor: this.snowColor
        },
        this.accumulation.accumulation,
        this.canvas.width,
        this.canvas.height
      );
    }

    // Update and draw accumulation (throttled for performance)
    if (this.accumulationFrameSkip++ % 6 === 0) {
      this.accumulation.smooth();
    }
    if (this.melting) {
      this.accumulation.decay(this.meltRate * delta);
      if (this.accumulation.getMaxHeight() <= 0.2) {
        this.stop();
        return;
      }
    }
    this.accumulation.draw(this.ctx, this.canvas.width, this.canvas.height, this.snowColor);

    // Draw FPS monitor
    this.drawFPS();

    this.raf = requestAnimationFrame(this.loop);
  }

  // ========================================================================
  // PERFORMANCE MONITORING
  // ========================================================================

  updateFrameRate(delta) {
    this.frameCount++;
    this.fpsCheckTime += delta * 1000;

    if (this.fpsCheckTime >= this.fpsUpdateInterval) {
      this.fps = Math.round(this.frameCount / (this.fpsCheckTime / 1000));

      // Adapt particle count to performance
      this.particles.adaptToPerformance(
        this.fps,
        30, // fpsThresholdLow
        50, // fpsThresholdHigh
        this.maxFlakes
      );

      this.frameCount = 0;
      this.fpsCheckTime = 0;
    }
  }

  drawFPS() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = 'bold 16px Arial';
    this.ctx.fillText(`FPS: ${this.fps}`, 10, 26);
    this.ctx.fillText(`Snow: ${this.particles.flakes.length}`, 10, 50);
  }

  getPerformanceMetrics() {
    return {
      fps: this.fps,
      flakeCount: this.particles.flakes.length,
      accumulationHeight: this.accumulation.getMaxHeight()
    };
  }

  // ========================================================================
  // WIND MODE API
  // ========================================================================

  setWindMode(mode) {
    const modes = {
      calm: {
        windStrength: 4,
        windEffect: 0.6,
        gravity: 16,
        swingAmplitude: 1.0
      },
      windy: {
        windStrength: 14,
        windEffect: 1.8,
        gravity: 18,
        swingAmplitude: 1.0
      },
      blizzard: {
        windStrength: 28,
        windEffect: 4.0,
        gravity: 25,
        swingAmplitude: 1.6
      }
    };

    const modeConfig = modes[mode];
    if (!modeConfig) {
      console.warn(`[SnowEffect] Unknown wind mode: ${mode}`);
      return;
    }

    this.windStrength = modeConfig.windStrength;
    this.windEffect = modeConfig.windEffect;
    this.gravity = modeConfig.gravity;
    this.swingAmplitude = modeConfig.swingAmplitude;

    // Reset wind with new strength
    this.wind.setStrength(this.windStrength);
  }
}
