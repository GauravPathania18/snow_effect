# UIEffects Examples

This folder contains example implementations of UIEffects to help you get started.

## Examples

### 1. Basic Example (`basic.html`)

A simple implementation showing:
- Creating the snow toggle button
- Changing wind modes
- Monitoring performance metrics
- Basic styling

**Features:**
- Simple, clean UI
- Wind mode buttons (Calm, Windy, Blizzard)
- Real-time performance metrics (FPS, flake count)
- Start/Stop controls

**Use this when:**
- Getting started with UIEffects
- Learning the basic API
- Building a simple implementation

### 2. Advanced Example (`advanced.html`)

A comprehensive implementation showcasing:
- Full programmatic control
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
// Create toggle button
UIEffects.createSnowButton();

// Control snow
UIEffects.startSnow();
UIEffects.stopSnow();

// Change wind mode
UIEffects.setSnowWindMode('calm');    // calm, windy, blizzard
UIEffects.setSnowWindMode('windy');
UIEffects.setSnowWindMode('blizzard');

// Get performance data
const metrics = UIEffects.getMetrics();
console.log(metrics.fps);           // Current FPS
console.log(metrics.flakeCount);    // Particle count
console.log(metrics.accumulationHeight); // Snow pile height

// Access effects manager
const snow = UIEffects.effectManager.effects.snow;

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

### Toggle Snow with Custom Button

```javascript
const btn = document.getElementById('myBtn');
let snowing = false;

btn.addEventListener('click', () => {
  if (snowing) {
    UIEffects.stopSnow();
  } else {
    UIEffects.startSnow();
  }
  snowing = !snowing;
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
// Change wind mode every 3 seconds
let modes = ['calm', 'windy', 'blizzard'];
let current = 0;

setInterval(() => {
  UIEffects.setSnowWindMode(modes[current]);
  current = (current + 1) % modes.length;
}, 3000);
```

### Conditional Initialization

```javascript
// Only show snow on desktop
if (window.innerWidth > 1024) {
  UIEffects.createSnowButton();
}

// Or respect user preferences
if (!window.matchMedia('(prefers-reduced-motion)').matches) {
  UIEffects.startSnow();
}
```

## Troubleshooting

### Snow not appearing?
- Check browser console for errors
- Verify the script tag path is correct
- Ensure DOM is ready before initializing

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

**Happy coding with UIEffects!** ❄️
