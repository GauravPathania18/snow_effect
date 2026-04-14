# UIEffects - Snow Animation Library

A lightweight, high-performance JavaScript library that adds realistic snow animations to any web page. Features adaptive wind modes, snow accumulation physics, and intelligent color detection for seamless integration.

[![npm version](https://img.shields.io/npm/v/ui-effects.svg)](https://www.npmjs.com/package/ui-effects)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/size-13%20KB-brightgreen.svg)](dist/ui-effects.min.js)

## ✨ Features

- 🎯 **Lightweight** - Only 13 KB minified with zero dependencies
- 🎨 **Adaptive Colors** - Automatically detects background and adjusts snow color
- 🌬️ **Multiple Wind Modes** - Calm, Windy, and Blizzard presets
- 📊 **Performance Optimized** - Adaptive flake count, ~2000 particles at 60 FPS
- 🧊 **Realistic Physics** - Gravity, wind drift, zigzag motion, and snow accumulation
- 🎭 **Modular Architecture** - Well-organized, testable, and extensible codebase
- ♿ **Accessible** - Full ARIA support and keyboard friendly
- 🔧 **Easy Integration** - Simple API for any project

## 🚀 Quick Start

### Installation

#### Via Script Tag
```html
<script src="https://cdn.jsdelivr.net/npm/ui-effects@latest/dist/ui-effects.min.js"></script>
<script>
  UIEffects.createSnowButton();
</script>
```

#### Via NPM
```bash
npm install ui-effects
```

```javascript
import UIEffects from 'ui-effects';
UIEffects.createSnowButton();
```

### Basic Usage

```javascript
// Start snow effect
UIEffects.startSnow();

// Change wind mode
UIEffects.setSnowWindMode('blizzard');  // 'calm', 'windy', or 'blizzard'

// Get performance metrics
const metrics = UIEffects.getMetrics();
console.log(`FPS: ${metrics.fps}, Flakes: ${metrics.flakeCount}`);

// Stop snow effect
UIEffects.stopSnow();
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
│   ├── SnowEffect.js         # Main orchestrator
│   ├── ParticleSystem.js     # Particle physics & rendering
│   ├── WindSystem.js         # Wind simulation
│   ├── AccumulationSystem.js # Snow pile management
│   └── BackgroundDetection.js # Adaptive color detection
├── ui/                        # UI components
│   ├── components/
│   │   ├── SnowButton.js     # Toggle button component
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

### Calm Mode
```javascript
UIEffects.setSnowWindMode('calm');
```
Gentle, peaceful snowfall - perfect for relaxing or minimalist designs.

### Windy Mode (Default)
```javascript
UIEffects.setSnowWindMode('windy');
```
Moderate, natural snowfall with realistic wind drift.

### Blizzard Mode
```javascript
UIEffects.setSnowWindMode('blizzard');
```
Intense, dramatic snowstorm with heavy wind and rapid motion.

## 🔧 Customization

### Custom Configuration

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

### Auto-Start Snow on Load

```javascript
window.addEventListener('load', () => {
  UIEffects.startSnow();
  UIEffects.setSnowWindMode('windy');
});
```

### Custom Toggle Button

```javascript
const toggleBtn = document.getElementById('toggle-snow');
toggleBtn.addEventListener('click', () => {
  const metrics = UIEffects.getMetrics();
  if (metrics) {
    UIEffects.stopSnow();
  } else {
    UIEffects.startSnow();
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

## 📞 Support & Issues

- 🐛 [Bug Reports](https://github.com/yourusername/ui-effects/issues)
- 💡 [Feature Requests](https://github.com/yourusername/ui-effects/issues)
- 📚 [Documentation](./docs/)
- 💬 [Discussions](https://github.com/yourusername/ui-effects/discussions)

## 🙏 Thanks

Built with care for developers who want beautiful, performant animations without complexity.

---

**Made with ❄️ and JavaScript** | [MIT License](LICENSE)
