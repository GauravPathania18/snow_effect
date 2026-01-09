export class SnowEffect {
  constructor(options = {}) {
    this.running = false;
    this.flakes = [];

    // Config parameters
    this.maxFlakes = options.maxFlakes || 250;
    this.gravity = options.gravity || 20;
    this.baseFallSpeed = options.baseFallSpeed || 30;

    // Wind configuration
    this.wind = {
      target: 0,
      current: 0,
      changeTimer: 0
    };

    this.lastTime = 0;
    this.paused = false;

    // Binding
    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  start() {
    if (this.running) return;
    this.running = true;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    Object.assign(this.canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      pointerEvents: "none",
      zIndex: 9999
    });

    document.body.appendChild(this.canvas);

    this.resize();
    window.addEventListener("resize", this.resize);
    document.addEventListener("visibilitychange", this.handleVisibility);

    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop() {
    this.running = false;

    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("visibilitychange", this.handleVisibility);

    this.flakes = [];
    this.canvas?.remove();
  }

  handleVisibility() {
    if (document.hidden) {
      this.paused = true;
    } else {
      this.paused = false;
      // Reset lastTime to avoid giant delta after switching tabs
      this.lastTime = performance.now();
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createFlake() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: Math.random() * 2 + 0.8,
      velocityY: this.baseFallSpeed + Math.random() * 20,
      velocityX: 0
    };
  }

  updateWind(delta) {
    this.wind.changeTimer -= delta;

    // Change wind direction every few seconds
    if (this.wind.changeTimer <= 0) {
      this.wind.target = (Math.random() * 2 - 1) * 15;  // slow wind
      this.wind.changeTimer = 3 + Math.random() * 4;
    }

    // Smooth interpolation
    this.wind.current += (this.wind.target - this.wind.current) * 0.01;
  }

  loop(now) {
    if (!this.running) return;

    let delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    // Prevent massive jumps when tab is inactive
    delta = Math.min(delta, 0.03);

    if (this.paused) {
      // Skip physics but keep the animation loop alive
      this.raf = requestAnimationFrame(this.loop);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Maintain population
    while (this.flakes.length < this.maxFlakes) {
      this.flakes.push(this.createFlake());
    }

    this.updateWind(delta);

    for (const flake of this.flakes) {
      // Gravity (smooth acceleration)
      flake.velocityY += this.gravity * delta;

      // Wind influence
      flake.velocityX += this.wind.current * delta;

      // Position update
      flake.x += flake.velocityX * delta;
      flake.y += flake.velocityY * delta;

      // Wrap horizontally
      if (flake.x > this.canvas.width) flake.x = 0;
      if (flake.x < 0) flake.x = this.canvas.width;

      // Respawn at top
      if (flake.y > this.canvas.height) {
        flake.y = -10;
        flake.velocityY = this.baseFallSpeed + Math.random() * 20;
        flake.velocityX = 0;
      }

      // Draw
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      this.ctx.fill();
    }

    this.raf = requestAnimationFrame(this.loop);
  }
}
