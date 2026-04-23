# UIEffects Examples

This folder contains example implementations of UIEffects to help you get started.

## Examples

### 1. Basic Example (`basic.html`)

A simple implementation showing:
- Creating toggle buttons for all effects (snow, flowers, autumn)
- Changing wind modes
- Monitoring performance metrics
- Basic styling

**Features:**
- Simple, clean UI
- Toggle buttons for Snow, Flowers, and Autumn effects
- Wind mode buttons (Calm, Windy, Blizzard)
- Real-time performance metrics (FPS, particle count)
- Start/Stop controls

**Use this when:**
- Getting started with UIEffects
- Learning the basic API
- Building a simple implementation

### 2. Advanced Example (`advanced.html`)

A comprehensive implementation showcasing:
- Full programmatic control of all three effects
- Event logging system
- Automated sequences
- Real-time metrics
- Professional styling

**Features:**
- Glassmorphism UI design
- Event timeline/log
- Demo sequence automation
- Advanced state management
- Performance monitoring
- Individual effect controls

**Use this when:**
- Building a production application
- Need advanced control features
- Want to understand all capabilities
- Building custom wind mode logic

## Usage

Each example is a standalone HTML file. You can:

1. **Open directly in your browser**
   ```bash
   open basic.html
   # or
   open advanced.html
   ```

2. **Serve with a local server**
   ```bash
   # From the project root
   npm start

   # Then navigate to examples/basic.html or examples/advanced.html
   ```

3. **Check the demos on GitHub Pages**
   - Link will be available once deployed

## Customizing Examples

### Modify the HTML

Edit the HTML directly:
```html
<button data-mode="calm">Calm</button>
<button data-mode="windy">Windy</button>
<button data-mode="blizzard">Blizzard</button>
```

### Change Styling

Update the CSS in the `<style>` tag:
```css
button:hover {
  background: #your-color;
  transform: translateY(-2px);
}
```

### Add Custom Logic

Extend the JavaScript:
```javascript
// Add your own event handlers
document.getElementById('myButton').addEventListener('click', () => {
  UIEffects.setSnowWindMode('custom');
});
```

## API Usage in Examples

All examples use these common UIEffects methods:

```javascript
// Create toggle buttons for all effects
UIEffects.createSnowButton();
UIEffects.createFlowerButton();
UIEffects.createAutumnButton();

// Control effects
UIEffects.startSnow();
UIEffects.stopSnow();
UIEffects.startFlowers();
UIEffects.stopFlowers();
UIEffects.startAutumn();
UIEffects.stopAutumn();

// Change wind mode (applies to all effects)
UIEffects.setWindMode('calm');    // calm, windy, blizzard
UIEffects.setWindMode('windy');
UIEffects.setWindMode('blizzard');

// Get performance data
const metrics = UIEffects.getMetrics();
console.log(metrics.fps);           // Current FPS
console.log(metrics.flakeCount);    // Particle count
console.log(metrics.accumulationHeight); // Ground pile height

// Access effect instances
const snow = UIEffects.effectManager.effects.snow;
const flowers = UIEffects.effectManager.effects.flowers;
const autumn = UIEffects.effectManager.effects.autumn;

// Initialize wind controls
UIEffects.initializeWindControls(snow);
```

## Creating Your Own Example

1. Create a new file: `my-example.html`

2. Include the UIEffects script:
   ```html
   <script src="../dist/ui-effects.min.js"></script>
   ```

3. Initialize UIEffects:
   ```javascript
   <script>
     UIEffects.createSnowButton();
   </script>
   ```

4. Add your HTML and styling

5. Use the UIEffects API to add functionality

## Common Patterns

### Toggle Effects with Custom Buttons

```javascript
// Snow toggle
const snowBtn = document.getElementById('snowBtn');
let snowing = false;
snowBtn.addEventListener('click', () => {
  if (snowing) {
    UIEffects.stopSnow();
  } else {
    UIEffects.startSnow();
  }
  snowing = !snowing;
});

// Flower toggle
const flowerBtn = document.getElementById('flowerBtn');
let flowering = false;
flowerBtn.addEventListener('click', () => {
  if (flowering) {
    UIEffects.stopFlowers();
  } else {
    UIEffects.startFlowers();
  }
  flowering = !flowering;
});

// Autumn toggle
const autumnBtn = document.getElementById('autumnBtn');
let autumnRunning = false;
autumnBtn.addEventListener('click', () => {
  if (autumnRunning) {
    UIEffects.stopAutumn();
  } else {
    UIEffects.startAutumn();
  }
  autumnRunning = !autumnRunning;
});
```

### Monitor Performance

```javascript
setInterval(() => {
  const metrics = UIEffects.getMetrics();
  if (metrics && metrics.fps < 30) {
    console.warn('Low FPS:', metrics.fps);
  }
}, 1000);
```

### Programmatic Wind Changes

```javascript
// Change wind mode every 3 seconds (affects all effects)
let modes = ['calm', 'windy', 'blizzard'];
let current = 0;

setInterval(() => {
  UIEffects.setWindMode(modes[current]);
  current = (current + 1) % modes.length;
}, 3000);
```

### Conditional Initialization

```javascript
// Only show effects on desktop
if (window.innerWidth > 1024) {
  UIEffects.createSnowButton();
  UIEffects.createFlowerButton();
  UIEffects.createAutumnButton();
}

// Or respect user preferences
if (!window.matchMedia('(prefers-reduced-motion)').matches) {
  UIEffects.startSnow();
}
```

## Troubleshooting

### Effects not appearing?
- Check browser console for errors
- Verify the script tag path is correct
- Ensure DOM is ready before initializing
- Check if effect is running: `UIEffects.effectManager.effects.snow.running`

### Performance issues?
- Check `UIEffects.getMetrics()` for FPS
- Reduce particle count if needed
- Use 'calm' or 'windy' modes for better performance

### Events not firing?
- Ensure UIEffects is loaded before your script
- Check that buttons have correct `data-mode` attributes
- Verify event listeners are attached to correct elements

## Learn More

- [Main README](../README.md) - Overview and features
- [API Reference](../docs/API_REFERENCE.md) - Complete API documentation
- [Development Guide](../docs/DEVELOPMENT.md) - Architecture and internals
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute

## Need Help?

- 📚 Read the [API Reference](../docs/API_REFERENCE.md)
- 🐛 Check [GitHub Issues](https://github.com/yourusername/ui-effects/issues)
- 💬 Open a [Discussion](https://github.com/yourusername/ui-effects/discussions)
- 📖 Review the [Documentation](../docs/)

---

**Happy coding with UIEffects!** ❄️ 🌸 🍂
