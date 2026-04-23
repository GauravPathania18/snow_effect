/**
 * Flower Effect
 * Lightweight falling flower petals animation.
 */
import { AccumulationSystem } from './AccumulationSystem.js';
import { WindSystem } from './WindSystem.js';

export class FlowerEffect {
  constructor(options = {}) {
    this.maxPetals = options.maxPetals || 1500;
    this.fallSpeedMin = options.fallSpeedMin || 14;
    this.fallSpeedMax = options.fallSpeedMax || 42;
    this.windStrength = options.windStrength || 18;
    this.windEffect = options.windEffect || 1.8;
    this.swingAmplitude = options.swingAmplitude || 22;

    this.running = false;
    this.paused = false;
    this.lastTime = 0;
    this.raf = null;

    this.canvas = null;
    this.ctx = null;
    this.petals = [];
    this.accumulation = new AccumulationSystem();
    this.wind = new WindSystem(this.windStrength);
    this.accumulationFrameSkip = 0;
    this.accumulationColor = 'rgba(255, 192, 214, 0.75)';
  }

  start() {
    if (this.running) return;
    this.running = true;

    if (!window.requestAnimationFrame) {
      console.warn('[FlowerEffect] requestAnimationFrame not supported');
      return;
    }

    try {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      if (!this.canvas || !this.ctx) {
        throw new Error('Canvas initialization failed');
      }

      Object.assign(this.canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9998
      });

      document.body.appendChild(this.canvas);
    } catch (err) {
      console.error('[FlowerEffect] Failed to initialize canvas:', err);
      this.running = false;
      return;
    }

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);

    this.resize();
    this.createPetals();
    this.accumulation.init(this.canvas.width);
    this.wind.reset();

    window.addEventListener('resize', this.resize);
    document.addEventListener('visibilitychange', this.handleVisibility);

    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);

    window.removeEventListener('resize', this.resize);
    document.removeEventListener('visibilitychange', this.handleVisibility);

    this.canvas?.remove();
    this.canvas = null;
    this.ctx = null;
    this.petals = [];
    this.accumulation.clear();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.accumulation.init(this.canvas.width);
  }

  handleVisibility() {
    if (document.hidden) {
      this.paused = true;
    } else {
      this.paused = false;
      this.lastTime = performance.now();
    }
  }

  createPetals() {
    this.petals = [];
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(randomY = false) {
    const colors = ['#ffd1dc', '#ffb3c6', '#ffc1a6', '#fbe7c6', '#f9c5d1'];
    const x = Math.random() * this.canvas.width;
    const y = randomY ? Math.random() * this.canvas.height : -20;
    return {
      x,
      y,
      size: 4 + Math.random() * 7,
      vy: this.fallSpeedMin + Math.random() * (this.fallSpeedMax - this.fallSpeedMin),
      driftSeed: Math.random() * Math.PI * 2,
      driftSpeed: 0.7 + Math.random() * 0.9,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.6 + Math.random() * 0.35
    };
  }

  loop(now) {
    if (!this.running) return;

    let delta = (now - this.lastTime) / 1000;
    this.lastTime = now;
    delta = Math.min(delta, 0.03);

    if (this.paused) {
      this.raf = requestAnimationFrame(this.loop);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.wind.update(delta);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.driftSeed += p.driftSpeed * delta;
      p.rotation += p.rotationSpeed * delta;

      const drift = Math.sin(p.driftSeed) * (8 + this.windEffect * 4) * this.swingAmplitude;
      const wind = this.wind.getCurrent() * this.windEffect * 2.2;
      p.x += (drift + wind) * delta;
      p.y += p.vy * delta;

      if (p.x > this.canvas.width + 20) p.x = -20;
      if (p.x < -20) p.x = this.canvas.width + 20;

      const accH = this.accumulation.accumulation[Math.floor(p.x)] || 0;
      if (p.y + p.size >= this.canvas.height - accH) {
        this.addToAccumulation(p.x, p.size * 0.3);
        this.petals[i] = this.createPetal(false);
        continue;
      }

      this.drawPetal(p);
    }

    if (this.accumulationFrameSkip++ % 6 === 0) {
      this.accumulation.smooth();
    }
    this.accumulation.draw(
      this.ctx,
      this.canvas.width,
      this.canvas.height,
      this.accumulationColor
    );

    this.raf = requestAnimationFrame(this.loop);
  }

  addToAccumulation(x, amount) {
    const accumulation = this.accumulation.accumulation;
    const canvasWidth = this.canvas.width;
    const maxHeight = 150;
    const spread = amount * 0.55;
    const xInt = Math.floor(x);

    if (xInt < 0 || xInt >= canvasWidth) return;

    accumulation[xInt] += amount * 1.8;
    if (accumulation[xInt] > maxHeight) accumulation[xInt] = maxHeight;

    if (xInt > 0) accumulation[xInt - 1] += spread * 0.8;
    if (xInt < canvasWidth - 1) accumulation[xInt + 1] += spread * 0.8;
    if (xInt > 1) accumulation[xInt - 2] += spread * 0.25;
    if (xInt < canvasWidth - 2) accumulation[xInt + 2] += spread * 0.25;
  }

  drawPetal(petal) {
    this.ctx.save();
    this.ctx.translate(petal.x, petal.y);
    this.ctx.rotate(petal.rotation);
    this.ctx.globalAlpha = petal.alpha;
    this.ctx.fillStyle = petal.color;
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, petal.size, petal.size * 0.65, Math.PI / 6, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
    this.ctx.globalAlpha = 1;
  }

  getPerformanceMetrics() {
    return {
      petalCount: this.petals.length,
      accumulationHeight: this.accumulation.getMaxHeight()
    };
  }

  setWindMode(mode) {
    const modes = {
      calm: {
        windStrength: 4,
        windEffect: 0.6,
        swingAmplitude: 16
      },
      windy: {
        windStrength: 14,
        windEffect: 1.8,
        swingAmplitude: 22
      },
      blizzard: {
        windStrength: 28,
        windEffect: 4.0,
        swingAmplitude: 30
      }
    };

    const modeConfig = modes[mode];
    if (!modeConfig) {
      console.warn(`[FlowerEffect] Unknown wind mode: ${mode}`);
      return;
    }

    this.windStrength = modeConfig.windStrength;
    this.windEffect = modeConfig.windEffect;
    this.swingAmplitude = modeConfig.swingAmplitude;
    this.wind.setStrength(this.windStrength);
  }
}
