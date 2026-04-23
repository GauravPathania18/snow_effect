# UIEffects - Particle Animation Library

A lightweight, high-performance JavaScript library that adds beautiful particle animations to any web page. Features snow, falling flowers, and autumn leaves effects with adaptive wind modes, accumulation physics, and seamless integration.

[![npm version](https://img.shields.io/npm/v/ui-effects.svg)](https://www.npmjs.com/package/ui-effects)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/size-13%20KB-brightgreen.svg)](dist/ui-effects.min.js)

## ✨ Features

- 🎯 **Lightweight** - Only 13 KB minified with zero dependencies
- ❄️ **Snow Effect** - Realistic snowfall with accumulation physics
- 🌸 **Flower Effect** - Beautiful falling flower petals
- 🍂 **Autumn Effect** - Falling leaves with seasonal colors
- 🎨 **Adaptive Colors** - Automatically detects background and adjusts particle colors
- 🌬️ **Multiple Wind Modes** - Calm, Windy, and Blizzard presets
- 📊 **Performance Optimized** - Adaptive particle count, ~2000 particles at 60 FPS
- 🧊 **Realistic Physics** - Gravity, wind drift, zigzag motion, and ground accumulation
- 🎭 **Modular Architecture** - Well-organized, testable, and extensible codebase
- ♿ **Accessible** - Full ARIA support and keyboard friendly
- 🔧 **Easy Integration** - Simple API for any project

## 🚀 Quick Start

### Installation

#### Via Script Tag
```html
<script src="https://cdn.jsdelivr.net/npm/ui-effects@latest/dist/ui-effects.min.js"></script>
<script>
  // Create toggle buttons for any effect
  UIEffects.createSnowButton();
  UIEffects.createFlowerButton();
  UIEffects.createAutumnButton();
</script>
```

#### Via NPM
```bash
npm install ui-effects
```

```javascript
import UIEffects from 'ui-effects';

// Create toggle buttons for any effect
UIEffects.createSnowButton();
UIEffects.createFlowerButton();
UIEffects.createAutumnButton();
```

### Basic Usage

```javascript
// Start effects
UIEffects.startSnow();
UIEffects.startFlowers();
UIEffects.startAutumn();

// Change wind mode (applies to all effects)
UIEffects.setWindMode('blizzard');  // 'calm', 'windy', or 'blizzard'

// Get performance metrics
const metrics = UIEffects.getMetrics();
console.log(`FPS: ${metrics.fps}, Particles: ${metrics.flakeCount}`);

// Stop effects
UIEffects.stopSnow();
UIEffects.stopFlowers();
UIEffects.stopAutumn();
```

## 📖 Documentation

- **[API Reference](./docs/API_REFERENCE.md)** - Complete API and methods
- **[Development Guide](./docs/DEVELOPMENT.md)** - Architecture and development setup
- **[Contributing](./CONTRIBUTING.md)** - Contribution guidelines
- **[Examples](./examples/)** - Code examples and use cases

## 🎮 Demo

Try the interactive demo:

```bash
npm start
```

This will build the project and open the demo in your browser at [localhost:8080](http://localhost:8080).

## 🏗️ Architecture

UIEffects uses a modular, well-organized architecture for maintainability and extensibility:

```
src/
├── core/                      # Core effect engines
│   ├── EffectManager.js      # Effect registry & lifecycle
│   ├── SnowEffect.js         # Snow animation engine
│   ├── FlowerEffect.js       # Falling flowers engine
│   ├── AutumnEffect.js       # Falling leaves engine
│   ├── ParticleSystem.js     # Particle physics & rendering
│   ├── WindSystem.js         # Wind simulation
│   ├── AccumulationSystem.js # Ground pile management
│   └── BackgroundDetection.js # Adaptive color detection
├── ui/                        # UI components
│   ├── components/
│   │   ├── SnowButton.js     # Snow toggle button
│   │   ├── FlowerButton.js   # Flower toggle button
│   │   ├── AutumnButton.js   # Autumn toggle button
│   │   └── WindControls.js   # Wind mode selector
│   └── createSnowButton.js   # Component exports
├── config/
│   └── settings.js           # Centralized configuration
├── utils/
│   └── storage.js            # Safe storage utilities
└── index.js                  # Main entry point
```

## 📊 Performance

Optimized for performance and efficiency:

- **Minimal Bundle** - 13 KB minified + gzipped
- **Adaptive Rendering** - Automatically adjusts particle count based on FPS
- **Efficient Physics** - Optimized calculations for gravity, wind, and physics
- **Hardware Accelerated** - Canvas 2D rendering
- **Smart Cleanup** - Zero memory leaks with proper lifecycle management

**Tested Performance:**
- ✅ ~2000 particles at 60 FPS (modern browsers)
- ✅ Auto-reduces to 500+ particles on low-end devices
- ✅ Minimal CPU usage in calm/windy modes

## 🎨 Wind Modes

Wind modes apply to all effects (snow, flowers, autumn leaves):

### Calm Mode
```javascript
UIEffects.setWindMode('calm');
```
Gentle, peaceful particle fall - perfect for relaxing or minimalist designs.

### Windy Mode (Default)
```javascript
UIEffects.setWindMode('windy');
```
Moderate, natural particle movement with realistic wind drift.

### Blizzard Mode
```javascript
UIEffects.setWindMode('blizzard');
```
Intense, dramatic particle storm with heavy wind and rapid motion.

## 🔧 Customization

### Custom Configuration

#### Snow Effect
```javascript
import { SnowEffect } from 'ui-effects/src/core/SnowEffect.js';

const customSnow = new SnowEffect({
  maxFlakes: 1500,      // Number of snowflakes
  gravity: 20,          // Downward force
  windStrength: 14,     // Wind magnitude
  windEffect: 1.8       // Visual wind amplification
});

customSnow.start();
```

#### Flower Effect
```javascript
import { FlowerEffect } from 'ui-effects/src/core/FlowerEffect.js';

const customFlowers = new FlowerEffect({
  maxPetals: 1500,      // Number of petals
  fallSpeedMin: 14,     // Minimum fall speed
  fallSpeedMax: 42,     // Maximum fall speed
  windStrength: 18,     // Wind magnitude
  windEffect: 1.8       // Visual wind amplification
});

customFlowers.start();
```

#### Autumn Effect
```javascript
import { AutumnEffect } from 'ui-effects/src/core/AutumnEffect.js';

const customAutumn = new AutumnEffect({
  maxPetals: 1800,      // Number of leaves
  fallSpeedMin: 20,     // Minimum fall speed
  fallSpeedMax: 52,     // Maximum fall speed
  windStrength: 26,     // Wind magnitude
  windEffect: 2.0       // Visual wind amplification
});

customAutumn.start();
```

### Settings

Modify `src/config/settings.js` to customize globally:
- Wind mode parameters
- UI labels and messages
- Storage configuration
- Default behaviors

## 📦 Development

### Build Commands

```bash
# Production build (minified, 13 KB)
npm run build

# Development build (readable source maps)
npm run build:dev

# Watch mode - rebuild on file changes
npm run watch

# Run test suite
npm test

# Start dev server with demo
npm start
```

### Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |
| Mobile | Latest | ✅ Full |

Graceful degradation for older browsers - no errors, just no animation.

## 📝 License

ISC License - See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- How to report bugs
- How to submit pull requests
- Development environment setup

## 💡 Common Examples

### Auto-Start Effects on Load

```javascript
window.addEventListener('load', () => {
  UIEffects.startSnow();
  UIEffects.startFlowers();
  UIEffects.startAutumn();
  UIEffects.setWindMode('windy');
});
```

### Custom Toggle Buttons

```javascript
// Snow toggle
const snowBtn = document.getElementById('toggle-snow');
snowBtn.addEventListener('click', () => {
  const snow = UIEffects.effectManager.effects.snow;
  if (snow.running) {
    UIEffects.stopSnow();
  } else {
    UIEffects.startSnow();
  }
});

// Flower toggle
const flowerBtn = document.getElementById('toggle-flowers');
flowerBtn.addEventListener('click', () => {
  const flowers = UIEffects.effectManager.effects.flowers;
  if (flowers.running) {
    UIEffects.stopFlowers();
  } else {
    UIEffects.startFlowers();
  }
});

// Autumn toggle
const autumnBtn = document.getElementById('toggle-autumn');
autumnBtn.addEventListener('click', () => {
  const autumn = UIEffects.effectManager.effects.autumn;
  if (autumn.running) {
    UIEffects.stopAutumn();
  } else {
    UIEffects.startAutumn();
  }
});
```

### Monitor Performance

```javascript
const monitor = setInterval(() => {
  const metrics = UIEffects.getMetrics();
  if (metrics) {
    console.log(`FPS: ${metrics.fps}, Flakes: ${metrics.flakeCount}`);
  }
}, 1000);
```

### Wind Control Panel

```html
<div id="wind-controls">
  <button data-mode="calm">Calm</button>
  <button data-mode="windy">Windy</button>
  <button data-mode="blizzard">Blizzard</button>
</div>

<script>
  // Initialize wind controls for all effects
  const snow = UIEffects.effectManager.effects.snow;
  UIEffects.initializeWindControls(snow);
</script>
```

## 🐛 Troubleshooting

**Snow not appearing?**
- Check browser console for errors
- Verify script is loaded correctly
- Ensure DOM is ready before initialization
- Check z-index if overlapping with elements

**Performance issues?**
- UIEffects auto-adapts to performance
- Check `UIEffects.getMetrics()` for FPS reading
- Reduce `maxFlakes` if needed (see Customization)

**Color detection not working?**
- Verify background is a solid color or gradient
- Ensure body element has computed background
- Check browser DevTools computed styles

**Which effect should I use?**
- **Snow**: Winter themes, holiday seasons, cold atmospheres
- **Flowers**: Spring themes, romantic contexts, soft aesthetics
- **Autumn**: Fall themes, warm colors, seasonal transitions

## 📞 Support & Issues

- 🐛 [Bug Reports](https://github.com/yourusername/ui-effects/issues)
- 💡 [Feature Requests](https://github.com/yourusername/ui-effects/issues)
- 📚 [Documentation](./docs/)
- 💬 [Discussions](https://github.com/yourusername/ui-effects/discussions)

## 🙏 Thanks

Built with care for developers who want beautiful, performant animations without complexity.

---

**Made with ❄️ and JavaScript** | [MIT License](LICENSE)
