# API Reference

Complete documentation for the UIEffects API.

## Table of Contents

- [UIEffects Object](#uieffects-object)
- [Effect Manager](#effect-manager)
- [Snow Effect](#snow-effect)
- [Component Functions](#component-functions)

---

## UIEffects Object

The main global object that provides the public API.

### Methods

#### `createSnowButton(options?)`

Creates a floating toggle button to start/stop the snow effect.

**Parameters:**
- `options` (Object, optional) - Unused; reserved for future use

**Returns:** `undefined`

**Example:**
```javascript
UIEffects.createSnowButton();
```

**Behavior:**
- Creates a button with id `ui-snow-button`
- Places it in the bottom-right corner
- Saves state to localStorage
- Prevents duplicate buttons

---

#### `initializeWindControls(snow)`

Initializes wind mode button controls for the snow effect.

**Parameters:**
- `snow` (SnowEffect) - Snow effect instance

**Returns:** `undefined`

**Example:**
```javascript
const snow = UIEffects.effectManager.effects.snow;
UIEffects.initializeWindControls(snow);
```

**Linked Elements:**
- Button elements with `data-mode` attribute
- Automatically adds/removes `active` class

---

#### `startSnow()`

Starts the snow animation.

**Returns:** `undefined`

**Example:**
```javascript
UIEffects.startSnow();
```

---

#### `stopSnow()`

Stops the snow animation immediately.

**Returns:** `undefined`

**Example:**
```javascript
UIEffects.stopSnow();
```

---

#### `setSnowWindMode(mode)`

Changes the wind mode for the active snow effect.

**Parameters:**
- `mode` (String) - One of: `'calm'`, `'windy'`, `'blizzard'`

**Returns:** `undefined`

**Throws:** Warning logged to console if invalid mode

**Example:**
```javascript
UIEffects.setSnowWindMode('blizzard');  // Intense snowstorm
UIEffects.setSnowWindMode('calm');      // Gentle snow
UIEffects.setSnowWindMode('windy');     // Moderate wind
```

**Wind Mode Details:**

| Mode | Wind Strength | Wind Effect | Gravity | Swing Amplitude |
|------|---------------|------------|---------|-----------------|
| calm | 4 | 0.6 | 16 | 1.0 |
| windy | 14 | 1.8 | 18 | 1.0 |
| blizzard | 28 | 4.0 | 25 | 1.6 |

---

#### `getMetrics()`

Returns performance metrics for the snow effect.

**Returns:** Object or `null`
```javascript
{
  fps: Number,                 // Frames per second (0-60+)
  flakeCount: Number,          // Current number of particles
  accumulationHeight: Number   // Max snow pile height in pixels
}
```

**Example:**
```javascript
const metrics = UIEffects.getMetrics();
console.log(`Running at ${metrics.fps} FPS with ${metrics.flakeCount} flakes`);
```

---

### Properties

#### `effectManager`

Reference to the EffectManager instance.

**Type:** `EffectManager`

**Usage:**
```javascript
UIEffects.effectManager.effects.snow // Access snow effect
UIEffects.effectManager.enable('snow')
UIEffects.effectManager.disable('snow')
```

---

#### `debug`

Debug mode flag (not actively used currently).

**Type:** `Boolean`

**Default:** `false`

---

## Effect Manager

Central manager for all visual effects.

### Methods

#### `register(name, effect)`

Registers a new effect.

**Parameters:**
- `name` (String) - Effect identifier
- `effect` (Object) - Effect instance with `start()` and `stop()` methods

**Returns:** `undefined`

---

#### `enable(name)`

Starts a registered effect.

**Parameters:**
- `name` (String) - Effect identifier

**Returns:** `undefined`

**Example:**
```javascript
UIEffects.effectManager.enable('snow');
```

---

#### `disable(name)`

Stops a registered effect.

**Parameters:**
- `name` (String) - Effect identifier

**Returns:** `undefined`

**Example:**
```javascript
UIEffects.effectManager.disable('snow');
```

---

#### `cleanup()`

Stops and cleans up all registered effects.

**Returns:** `undefined`

**Called automatically** on page unload.

---

### Properties

#### `effects`

Object containing all registered effects.

**Type:** `Object`

**Example:**
```javascript
const snow = UIEffects.effectManager.effects.snow; // SnowEffect instance
```

---

## Snow Effect

Core class for snow animations.

### Constructor

```javascript
new SnowEffect(options)
```

**Parameters:**
```javascript
{
  maxFlakes: 2000,           // Max particle count (default: 2000)
  gravity: 18,               // Downward force (default: 18)
  windStrength: 16,          // Wind magnitude (default: 16)
  windEffect: 2.0,           // Visual wind amplification (default: 2.0)
  swingAmplitude: 1.0        // Zigzag motion intensity (default: 1.0)
}
```

**Example:**
```javascript
import { SnowEffect } from 'ui-effects/src/core/SnowEffect.js';

const snow = new SnowEffect({
  maxFlakes: 1500,
  gravity: 20,
  windStrength: 12
});

snow.start();
```

### Methods

#### `start()`

Initializes and starts the snow animation.

**Returns:** `undefined`

**Setup includes:**
- Canvas creation and styling
- Event listeners (resize, visibility)
- Particle initialization
- Background color detection

---

#### `stop()`

Stops the animation and cleans up resources.

**Returns:** `undefined`

**Cleanup includes:**
- Canvas removal
- Event listener cleanup
- Memory cleanup

---

#### `setWindMode(mode)`

Changes wind behavior.

**Parameters:**
- `mode` (String) - `'calm'`, `'windy'`, or `'blizzard'`

**Returns:** `undefined`

**Example:**
```javascript
const snow = UIEffects.effectManager.effects.snow;
snow.setWindMode('blizzard');
```

---

#### `getPerformanceMetrics()`

Returns real-time performance data.

**Returns:**
```javascript
{
  fps: Number,
  flakeCount: Number,
  accumulationHeight: Number
}
```

---

### Properties

#### `running`

Whether the effect is currently running.

**Type:** `Boolean`

---

#### `paused`

Whether the effect is paused (tab hidden).

**Type:** `Boolean`

---

## Component Functions

### createSnowButton

Standalone function to create the toggle button.

```javascript
export function createSnowButton(options = {})
```

**Features:**
- Persistent state via localStorage
- ARIA accessibility attributes
- Duplicate prevention
- Automatic cleanup on unload

---

### initializeWindControls

Standalone function to initialize wind mode buttons.

```javascript
export function initializeWindControls(snow)
```

**Requires HTML:**
```html
<button data-mode="calm">Calm</button>
<button data-mode="windy">Windy</button>
<button data-mode="blizzard">Blizzard</button>
```

**Features:**
- Active state management
- Click listeners
- Mode validation

---

## Core Subsystems

While these are typically used internally, they can be imported directly for advanced use:

### ParticleSystem

Manages snowflake particles.

```javascript
import { ParticleSystem } from 'ui-effects/src/core/ParticleSystem.js';
```

### WindSystem

Manages wind physics.

```javascript
import { WindSystem } from 'ui-effects/src/core/WindSystem.js';
```

### AccumulationSystem

Manages snow piles.

```javascript
import { AccumulationSystem } from 'ui-effects/src/core/AccumulationSystem.js';
```

### BackgroundDetection

Manages color detection.

```javascript
import { BackgroundDetection } from 'ui-effects/src/core/BackgroundDetection.js';
```

---

## Events

### Window Events

**`visibility:change`** - Automatically pauses when tab loses focus

**`resize`** - Automatically adjusts canvas to window size

**`beforeunload`** - Automatically cleans up resources

---

## Examples

### Complete Setup

```javascript
// 1. Create button
UIEffects.createSnowButton();

// 2. Get snow instance
const snow = UIEffects.effectManager.effects.snow;

// 3. Initialize wind controls
UIEffects.initializeWindControls(snow);

// 4. Set default mode
UIEffects.setSnowWindMode('windy');

// 5. Monitor performance
setInterval(() => {
  const metrics = UIEffects.getMetrics();
  if (metrics && metrics.fps < 30) {
    console.warn('Low FPS detected:', metrics.fps);
  }
}, 1000);
```

### Programmatic Control

```javascript
// Start snow
UIEffects.startSnow();

// Change to blizzard after 5 seconds
setTimeout(() => {
  UIEffects.setSnowWindMode('blizzard');
}, 5000);

// Stop after 10 seconds
setTimeout(() => {
  UIEffects.stopSnow();
}, 10000);
```

---

## Error Handling

The library includes built-in error handling. Check browser console for warnings/errors:

```
[SnowEffect] Warning message...
[UIEffects] Error message...
[EffectManager] Issue notification...
```

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Canvas 2D | ✅ | ✅ | ✅ | ✅ |
| requestAnimationFrame | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| ARIA Support | ✅ | ✅ | ✅ | ✅ |

---

## Performance Tips

1. **Reduce maxFlakes** for low-end devices
2. **Use calm/windy modes** for better performance
3. **Monitor getMetrics()** to detect issues
4. **Disable on mobile** if performance is poor
5. **Use blizzard sparingly** - CPU intensive

---

For questions or issues, please refer to the [main documentation](../README.md).
