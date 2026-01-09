export class SnowEffect {
  constructor(options = {}) {

    // -------------------------------------------------------------------------
    // PERFORMANCE-BALANCED SETTINGS
    // -------------------------------------------------------------------------
    this.maxFlakes = options.maxFlakes || 2000;      // Total flakes on screen
    this.gravity = options.gravity || 18;           // Downward force
    this.windStrength = options.windStrength || 6;  // Max wind speed

    // Depth layers for realism
    this.layers = {
      back:  { speed: 0.5, size: 0.6, opacity: 0.4 },
      mid:   { speed: 0.8, size: 0.9, opacity: 0.7 },
      front: { speed: 1.2, size: 1.3, opacity: 1.0 }
    };

    // -------------------------------------------------------------------------
    // STATE CONTAINERS
    // -------------------------------------------------------------------------
    this.flakes = [];

    // Wind starts immediately (fixed slow start issue)
    this.wind = {
      current: (Math.random() * 2 - 1) * this.windStrength,
      target:  (Math.random() * 2 - 1) * this.windStrength,
      timer:   2 + Math.random() * 2
    };

    // Flag for strong wind interpolation during startup
    this.initializingWind = true;

    this.accumulation = [];  
    this.running = false;
    this.paused = false;
    this.lastTime = 0;

    // Bind event methods
    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }


  // ==========================================================================
  // START EFFECT
  // ==========================================================================
  start() {
    if (this.running) return;
    this.running = true;

    // Create fullscreen canvas overlay
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

    // Randomize wind every time effect starts
    this.wind.current = (Math.random() * 2 - 1) * this.windStrength;
    this.wind.target  = (Math.random() * 2 - 1) * this.windStrength;
    this.wind.timer   = 2 + Math.random() * 2;

    // Strong wind mode for first second
    this.initializingWind = true;
    setTimeout(() => (this.initializingWind = false), 1000);

    // Setup
    this.resize();
    window.addEventListener("resize", this.resize);
    document.addEventListener("visibilitychange", this.handleVisibility);

    this.createFlakes();
    this.initAccumulation();

    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }


  // ==========================================================================
  // STOP EFFECT
  // ==========================================================================
  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);

    window.removeEventListener("resize", this.resize);
    document.removeEventListener("visibilitychange", this.handleVisibility);

    this.canvas?.remove();
    this.flakes = [];
    this.accumulation = [];
  }


  // ==========================================================================
  // HANDLE TAB HIDE/SHOW
  // ==========================================================================
  handleVisibility() {
    if (document.hidden) {
      this.paused = true;
    } else {
      this.paused = false;
      this.lastTime = performance.now(); // avoid delta spike
    }
  }


  // ==========================================================================
  // RESIZE CANVAS + RESET ACCUMULATION
  // ==========================================================================
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initAccumulation(); // rebuild accumulation map
  }


  // ==========================================================================
  // CREATE ALL LAYERED SNOWFLAKES
  // ==========================================================================
  createFlakes() {
    const layers = Object.keys(this.layers);
    const perLayer = Math.floor(this.maxFlakes / layers.length);

    for (const layer of layers) {
      for (let i = 0; i < perLayer; i++) {
        this.flakes.push(this.spawnFlake(layer));
      }
    }
  }


  // Create individual flake
  spawnFlake(layer) {
    const cfg = this.layers[layer];

    return {
      layer,
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,

      r: (Math.random() * 2 + 1) * cfg.size,

      vy: (Math.random() * 20 + 10) * cfg.speed,
      vx: 0,

      swingPhase: Math.random() * Math.PI * 2,
      swingSpeed: 0.4 + Math.random() * 0.3
    };
  }


  // ==========================================================================
  // ACCUMULATION SYSTEM
  // ==========================================================================
  initAccumulation() {
    this.accumulation = new Array(this.canvas.width).fill(0);
  }

  addToAccumulation(x, amount) {
    const maxHeight = 60;
    x = Math.floor(x);

    if (x < 0 || x >= this.canvas.width) return;

    this.accumulation[x] += amount;

    // Spread a bit to neighbors for smoothing
    const spread = amount * 0.3;
    if (x > 0) this.accumulation[x - 1] += spread * 0.5;
    if (x < this.canvas.width - 1) this.accumulation[x + 1] += spread * 0.5;

    if (this.accumulation[x] > maxHeight) this.accumulation[x] = maxHeight;
  }

  smoothAccumulation() {
    const arr = this.accumulation;
    const smoothed = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      const L = arr[i - 1] || 0;
      const C = arr[i];
      const R = arr[i + 1] || 0;

      smoothed[i] = L * 0.25 + C * 0.5 + R * 0.25;
    }

    this.accumulation = smoothed;
  }

  drawAccumulation() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();

    ctx.moveTo(0, this.canvas.height);

    for (let x = 0; x < this.canvas.width; x++) {
      ctx.lineTo(x, this.canvas.height - this.accumulation[x]);
    }

    ctx.lineTo(this.canvas.width, this.canvas.height);
    ctx.closePath();
    ctx.fill();
  }


  // ==========================================================================
  // WIND SYSTEM WITH FIXED SLOW-START PROBLEM
  // ==========================================================================
  updateWind(delta) {
    this.wind.timer -= delta;

    // Random new wind direction
    if (this.wind.timer <= 0) {
      this.wind.target = (Math.random() * 2 - 1) * this.windStrength;
      this.wind.timer = 3 + Math.random() * 3;
    }

    // Use faster interpolation for first second
    const smoothing = this.initializingWind ? 0.15 : 0.02;

    this.wind.current += (this.wind.target - this.wind.current) * smoothing;
  }


  // ==========================================================================
  // MAIN LOOP
  // ==========================================================================
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

    this.updateWind(delta);
    this.updateAndDrawFlakes(delta);

    this.smoothAccumulation();
    this.drawAccumulation();

    this.raf = requestAnimationFrame(this.loop);
  }


  // ==========================================================================
  // UPDATE & DRAW SNOWFLAKES
  // ==========================================================================
  updateAndDrawFlakes(delta) {
    const ctx = this.ctx;

    for (const f of this.flakes) {
      const cfg = this.layers[f.layer];

      // Gravity
      f.vy += this.gravity * cfg.speed * delta;

      // Wind horizontal velocity
      f.vx = this.wind.current * (cfg.speed*2);

      // Side sway (sine wave)
      f.swingPhase += f.swingSpeed * delta;
      f.x += Math.sin(f.swingPhase) * 10 * delta;

      // Apply velocities
      f.x += f.vx * delta;
      f.y += f.vy * delta;

      // Horizontal wrapping
      if (f.x > this.canvas.width) f.x = 0;
      if (f.x < 0) f.x = this.canvas.width;

      // Collision with accumulation mound
      const accH = this.accumulation[Math.floor(f.x)];
      if (f.y + f.r >= this.canvas.height - accH) {

        this.addToAccumulation(f.x, f.r * 0.3);

        // Respawn flake at top
        f.y = -10;
        f.vy = (Math.random() * 20 + 10) * cfg.speed;

        continue;
      }

      // Draw flake
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${cfg.opacity})`;
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
