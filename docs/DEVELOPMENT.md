# Development Guide

This guide explains the architecture of UIEffects and how to set up a development environment.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Directory Structure](#directory-structure)
- [Setup Instructions](#setup-instructions)
- [Building & Testing](#building--testing)
- [Core Modules](#core-modules)
- [Adding Features](#adding-features)
- [Code Style](#code-style)

---

## Architecture Overview

UIEffects is built on a **modular, decoupled architecture** where each system has a single responsibility:

```
┌─────────────────────────────────────────────────────────────┐
│                    UIEffects Library                        │
│           Main Entry Point (src/index.js)                   │
└───────────┬───────────────────────────────────────────────────┘
            │
            ├──────→ EffectManager
            │        └─ Effect registry & lifecycle
            │           ├─ Register effects
            │           ├─ Enable/disable effects
            │           └─ Global cleanup
            │
            ├──────→ SnowEffect
            │        └─ Snowflake animation engine
            │           ├─ 6-pointed star rendering
            │           ├─ Snow accumulation
            │           └─ White/opaque particles
            │
            ├──────→ FlowerEffect
            │        └─ Falling petals animation
            │           ├─ Soft pink colors
            │           ├─ Gentle swaying motion
            │           └─ Ground accumulation
            │
            ├──────→ AutumnEffect
            │        └─ Falling leaves animation
            │           ├─ Orange/brown seasonal colors
            │           ├─ Heavier falling motion
            │           └─ Ground accumulation
            │
            ├──────→ ParticleSystem
            │        └─ Shared particle physics
            │           ├─ Physics calculations
            │           └─ Canvas rendering
            │
            ├──────→ WindSystem
            │        └─ Wind simulation
            │           ├─ Direction changes
            │           └─ Smooth transitions
            │
            ├──────→ AccumulationSystem
            │        └─ Ground piles
            │           ├─ Height map
            │           └─ Ground rendering
            │
            └──────→ BackgroundDetection
                     └─ Color analysis
                        ├─ Brightness detection
                        └─ Particle color selection
```

### Design Principles

1. **Single Responsibility** - Each module does one thing well
2. **Low Coupling** - Modules communicate through clear interfaces
3. **High Cohesion** - Related functionality grouped together
4. **Testability** - Every system can be tested independently
5. **Extensibility** - Easy to add new features without breaking existing code

---

## Directory Structure

```
ui-effects/
├── src/
│   ├── core/                      # Core animation systems
│   │   ├── EffectManager.js      # Effect registry & lifecycle
│   │   ├── SnowEffect.js         # Snow animation engine
│   │   ├── FlowerEffect.js       # Flower petals engine
│   │   ├── AutumnEffect.js       # Falling leaves engine
│   │   ├── ParticleSystem.js     # Particle physics
│   │   ├── WindSystem.js         # Wind simulation
│   │   ├── AccumulationSystem.js # Ground piles
│   │   └── BackgroundDetection.js # Color detection
│   │
│   ├── ui/                        # UI components
│   │   ├── components/
│   │   │   ├── SnowButton.js     # Snow toggle button
│   │   │   ├── FlowerButton.js   # Flower toggle button
│   │   │   ├── AutumnButton.js   # Autumn toggle button
│   │   │   └── WindControls.js   # Wind selector
│   │   └── createSnowButton.js   # Component exports
│   │
│   ├── config/
│   │   └── settings.js           # Configuration constants
│   │
│   ├── utils/
│   │   └── storage.js            # Storage utilities
│   │
│   └── index.js                  # Main entry point
│
├── dist/                          # Compiled bundles (generated)
├── docs/                          # Documentation
├── tests/
│   └── smoke.test.js             # Basic tests
├── examples/                      # Code examples
├── public/
│   └── index.html                # Demo page
├── package.json
├── README.md
└── CONTRIBUTING.md
```

---

## Setup Instructions

### Prerequisites

- Node.js >= 14.0
- npm >= 6.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ui-effects.git
   cd ui-effects
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   Opens demo at [localhost:8080](http://localhost:8080)

### Development Workflow

```bash
# Watch mode - rebuilds on file changes
npm run watch

# In another terminal, start the demo server
npx http-server -c-1

# Make changes to files in src/
# Changes are automatically rebundled
```

---

## Building & Testing

### Build Commands

```bash
# Production build (minified, 13 KB)
npm run build
# Output: dist/ui-effects.min.js, dist/ui-effects.min.js.map

# Development build (readable, with source maps)
npm run build:dev
# Output: dist/ui-effects.js

# Watch mode (rebuilds on changes)
npm run watch

# Start demo server
npm start

# Run tests
npm test
```

### Build Pipeline

Uses **esbuild** for fast, efficient bundling:

```
src/ → esbuild → dist/ui-effects.min.js
       ├─ Bundle all modules
       ├─ Tree shake unused code
       ├─ Minify output
       └─ Generate source maps
```

---

## Core Modules

### EffectManager.js (~100 lines)

**Role:** Central registry for all effects.

**Key Responsibilities:**
- Effect registration
- Enable/disable lifecycle
- Global cleanup coordination

**Key Methods:**
```javascript
register(name, effect)   // Register a new effect
enable(name)             // Start an effect
disable(name)            // Stop an effect
cleanup()                // Clean up all effects
```

---

### SnowEffect.js (~260 lines)

**Role:** Snow animation engine.

**Key Responsibilities:**
- Canvas setup and cleanup
- Animation loop management
- Event handling (resize, visibility)
- System coordination
- 6-pointed snowflake rendering

**Key Methods:**
```javascript
start()              // Initialize animation
stop()               // Stop and clean up
loop(now)            // Main animation loop
setWindMode(mode)    // Change wind behavior
getPerformanceMetrics() // Return FPS/flakes
```

**Integration Points:**
```javascript
// Creates subsystems
this.particles = new ParticleSystem({...});
this.wind = new WindSystem(this.windStrength);
this.accumulation = new AccumulationSystem();

// Uses them in loop
this.wind.update(delta);
this.particles.updateAndDraw(...);
this.accumulation.draw(...);
```

---

### FlowerEffect.js (~250 lines)

**Role:** Falling flower petals animation engine.

**Key Responsibilities:**
- Canvas setup and cleanup
- Petal physics and rendering
- Soft pink color scheme
- Gentle swaying motion

**Key Methods:**
```javascript
start()              // Initialize animation
stop()               // Stop and clean up
loop(now)            // Main animation loop
setWindMode(mode)    // Change wind behavior
```

---

### AutumnEffect.js (~260 lines)

**Role:** Falling leaves animation engine.

**Key Responsibilities:**
- Canvas setup and cleanup
- Leaf physics and rendering
- Seasonal orange/brown colors
- Heavier falling motion

**Key Methods:**
```javascript
start()              // Initialize animation
stop()               // Stop and clean up
loop(now)            // Main animation loop
setWindMode(mode)    // Change wind behavior
```

---

### ParticleSystem.js (~200 lines)

**Role:** Manages snowflake creation, physics, and rendering.

**Key Responsibilities:**
- Particle creation and spawning
- Physics calculations (gravity, wind, zigzag)
- Collision detection
- Canvas rendering (6-pointed stars)
- Adaptive flake count

**Key Methods:**
```javascript
createFlakes()       // Initialize layered particles
spawnFlake()         // Create individual particle
updateAndDraw()      // Physics loop + rendering
drawSnowflake()      // Render 6-pointed star
adaptToPerformance() // Adjust flake count
```

**Physics Formula:**
```javascript
// Apply gravity
f.vy += gravity * layerSpeed * delta;

// Apply wind
f.vx = windCurrent * layerSpeed * windEffect;

// Zigzag motion
f.x += sin(swingPhase) * amplitude * delta;

// Position update
f.x += f.vx * delta;
f.y += f.vy * delta;
```

---

### WindSystem.js (~60 lines)

**Role:** Simulates wind behavior with smooth transitions.

**Key Responsibilities:**
- Wind direction tracking
- Target wind calculation
- Smooth interpolation
- Mode-based transitions

**Key Methods:**
```javascript
update(delta)        // Update wind per frame
getCurrent()         // Get current wind value
setStrength(s)       // Change wind power
reset()              // Randomize direction
```

**Algorithm:**
```javascript
// Smooth interpolation between current and target
this.wind.current += (target - current) * 0.08;

// Random transitions every 3-6 seconds
if (timer <= 0) {
  target = randomDirection * windStrength;
  timer = 3 + random * 3;
}
```

---

### AccumulationSystem.js (~60 lines)

**Role:** Manages ground snow piles and collision detection.

**Key Responsibilities:**
- Height map management
- Collision point queries
- Ground rendering
- Smoothing algorithm

**Key Methods:**
```javascript
init(width)          // Initialize height map
getHeightAt(x)       // Query height at position
smooth()             // Apply smoothing filter
draw()               // Render ground pile
```

**Smoothing Algorithm:**
```javascript
// Gaussian blur for natural appearance
smoothed[i] = L*0.25 + C*0.5 + R*0.25
```

---

### BackgroundDetection.js (~100 lines)

**Role:** Analyzes page background and adapts snow color.

**Key Responsibilities:**
- Background brightness calculation
- Color format parsing (RGB, hex, gradient)
- Adaptive snow color selection
- Contrast optimization

**Supported Formats:**
- Solid: `rgb()`, `rgba()`, `#RRGGBB`
- Gradients: Extracts first color stop
- Fallback: White on black

**Brightness Formula:**
```javascript
// Standard luminance formula
brightness = 0.299*R + 0.587*G + 0.114*B
```

---

## Adding Features

### Add a New Wind Mode

**File:** `src/core/SnowEffect.js`

```javascript
setWindMode(mode) {
  const modes = {
    calm: { /* ... */ },
    windy: { /* ... */ },
    blizzard: { /* ... */ },
    // Add new mode
    custom: {
      windStrength: 8,
      windEffect: 1.2,
      gravity: 17,
      swingAmplitude: 0.8
    }
  };
  
  // Rest of implementation
}
```

### Extend ParticleSystem

**Add custom particle behavior:**

```javascript
// src/core/ParticleSystem.js
export class ParticleSystem {
  // Add new feature
  applyCustomForce(flake, customForce) {
    flake.vy += customForce.y * delta;
    flake.vx += customForce.x * delta;
  }
}
```

### Add New UI Component

**File:** `src/ui/components/MyComponent.js`

```javascript
export function myComponent() {
  // Component logic
}
```

**Export in:** `src/index.js`

```javascript
import { myComponent } from './ui/components/MyComponent.js';

export const UIEffects = {
  myComponent,
  // ...
};
```

### Add Custom Effect

**File:** `src/core/MyEffect.js`

```javascript
export class MyEffect {
  start() { /* ... */ }
  stop() { /* ... */ }
}
```

**Register in:** `src/index.js`

```javascript
import { MyEffect } from './core/MyEffect.js';
effectManager.register('myEffect', new MyEffect());
```

---

## Code Style

### Naming Conventions

- **Classes:** PascalCase (e.g., `ParticleSystem`)
- **Functions:** camelCase (e.g., `createFlakes`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_HEIGHT`)
- **Private methods:** Leading underscore (e.g., `_updatePhysics`)

### Comments

- Use JSDoc for public APIs
- Explain the "why", not the "what"
- Group related code with section comments

```javascript
// ===================================================================
// PHYSICS CALCULATIONS
// ===================================================================

/**
 * Update particle position based on physics
 * @param {Object} flake - Particle object
 * @param {Number} delta - Time delta in seconds
 */
function updatePhysics(flake, delta) {
  // Apply forces
  flake.vy += gravity * delta;
}
```

### Error Handling

- Always include try-catch for DOM operations
- Log errors with module prefix

```javascript
try {
  this.canvas = document.createElement('canvas');
} catch (err) {
  console.error('[SnowEffect] Canvas creation failed:', err);
  this.running = false;
}
```

### Performance

- Minimize allocations in loops
- Cache frequently accessed values
- Reuse arrays when possible
- Profile with browser DevTools

---

## Testing

### Run Tests

```bash
npm test
```

### Unit Testing Strategy

Each module can be tested independently:

```javascript
// Test ParticleSystem
import { ParticleSystem } from './src/core/ParticleSystem.js';

describe('ParticleSystem', () => {
  it('should create flakes', () => {
    const ps = new ParticleSystem({...});
    ps.createFlakes(800, 600);
    expect(ps.flakes.length).toBe(2000);
  });
});
```

---

## Performance Optimization Tips

1. **Profile with DevTools**
   - Chrome: DevTools → Performance
   - Firefox: Developer Tools → Performance

2. **Monitor Frame Rate**
   ```javascript
   UIEffects.getMetrics()  // Returns current FPS
   ```

3. **Optimize Particle Count**
   - Automatically adapted based on FPS
   - Can be manually tuned via constructor options

4. **Use Requestd Animation Frame**
   - Automatically synced with display refresh rate

5. **Cache Values**
   - Canvas width/height
   - Layer configurations
   - Wind values

---

## Debugging

### Enable Console Logging

```javascript
UIEffects.debug = true;  // Current flag (not actively used)
```

### Check Browser Console

```
[SnowEffect] Module.method - Log message
[EffectManager] Error description
[ParticleSystem] Warning about performance
```

### Use DevTools Breakpoints

1. Open DevTools (F12)
2. Go to Sources tab
3. Find file in src/ folder
4. Click line number to set breakpoint
5. Reload page

---

## Release Checklist

- [ ] Tests pass
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] Performance verified
- [ ] Bundle size checked
- [ ] Version bumped in package.json
- [ ] Changelog updated
- [ ] Build successful (`npm run build`)
- [ ] Demo works (`npm start`)

---

## Useful Resources

- [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN - requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [esbuild Documentation](https://esbuild.github.io/)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

For questions about development, please open an issue or see [CONTRIBUTING.md](../CONTRIBUTING.md).
