# Code Citations

## License: unknown
https://github.com/JimenaEB/4Geeks-Academy_exercise_postcard/blob/7c6987bf0181d2447294dd62f27c8a6f9c377d52/tutorial-postcard/.learn/exercises/06-lets-start-building/README.md

```
I'll show you how to integrate the UI-Effects library into other projects. There are multiple ways to use it:

---

## 📦 **Method 1: Direct Script Tag (Easiest)**

Create a new HTML file anywhere and paste this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Effects Test - Another Project</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: white;
    }
    h1 { text-align: center; }
  </style>
</head>
<body>
  <h1>🎉 UI Effects Integrated Successfully!</h1>
  <p style="text-align: center; font-size: 18px;">
    Look at the bottom-right corner for the snow button 👇
  </p>

  <!-- Link to the UI Effects bundle -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>
  
  <script>
    // That's it! Initialize the snow button
    UIEffects.createSnowButton();
    
    console.log('✅ UI Effects loaded successfully!');
    console.log('Available commands:');
    console.log('- UIEffects.startSnow()');
    console.log('- UIEffects.stopSnow()');
    console.log('- UIEffects.setSnowWindMode("calm"|"windy"|"blizzard")');
    console.log('- UIEffects.getMetrics()');
  </script>
</body>
</html>
```

**Save this as:** `test-integration.html` on your Desktop

**Then open it in browser** → Snow button appears instantly! ✅

---

## 🚀 **Method 2: With Wind Mode Controls (Like Google AI Studio)**

This is the full version with wind mode buttons:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snow Effect - Full Integration</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: linear-gradient(160deg, #1b2735 0%, #090a0f 100%);
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
    }

    .container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 5000;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    p {
      font-size: 1.2em;
      color: #aaa;
      margin-bottom: 30px;
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
      transform: translateY(-2px);
    }

    button.active {
      background: rgba(100, 200, 255, 0.5);
      border-color: #64c8ff;
      box-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
    }

    #snow-controls {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 8px;
      z-index: 5001;
    }

    #snow-controls button {
      padding: 8px 16px;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  </style>
</head>
<body>
  <!-- Wind Mode Controls -->
  <div id="snow-controls">
    <button data-mode="calm">❄️ Calm</button>
    <button data-mode="windy">💨 Windy</button>
    <button data-mode="blizzard">🌪️ Blizzard</button>
  </div>

  <!-- Main Content -->
  <div class="container">
    <h1>❄️ Let It Snow</h1>
    <p>Watch the beautiful snow fall on your project</p>
    <div class="controls">
      <button id="toggle">🎵 Play/Stop</button>
      <button id="metrics">📊 Show Metrics</button>
    </div>
  </div>

  <!-- Load UI Effects -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>

  <script>
    // Initialize snow button
    UIEffects.createSnowButton();
    
    // Get snow instance
    const snow = UIEffects.effectManager.effects.snow;

    // Wind mode buttons
    document.querySelectorAll('#snow-controls button').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        UIEffects.setSnowWindMode(mode);
        
        // Update active state
        document.querySelectorAll('#snow-controls button').forEach(b => 
          b.classList.remove('active')
        );
        btn.classList.add('active');
      });
    });

    // Set Windy as default
    document.querySelector('[data-mode="windy"]').click();

    // Toggle button
    document.getElementById('toggle').addEventListener('click', function() {
      if (snow.running) {
        UIEffects.stopSnow();
        this.textContent = '▶️ Start';
      } else {
        UIEffects.startSnow();
        this.textContent = '⏸️ Stop';
      }
    });

    // Metrics button
    document.getElementById('metrics').addEventListener('click', function() {
      const metrics = UIEffects.getMetrics();
      alert(`
📊 Performance Metrics:
━━━━━━━━━━━━━━━━━━━━━
FPS: ${metrics.fps}
Snowflakes: ${metrics.flakeCount}
Accumulation: ${metrics.accumulationHeight.toFixed(1)}px
━━━━━━━━━━━━━━━━━━━━━
      `);
    });

    console.log('✅ Full integration working!');
  </script>
</body>
</html>
```

**Save and open** → Full snow effect with controls! 🎉

---

## 🔗 **Method 3: Copy Bundle to Your Project**

If you want to use it in your own project:

### Step 1: Copy the bundle file

Copy this file:
```
e:\OneDrive\Desktop\ui-effects\dist\ui-effects.min.js
```

To your project:
```
your-project/
├── index.html
├── style.css
└── lib/
    └── ui-effects.min.js  ← Paste here
```

### Step 2: Link in your HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My App</h1>
  <!-- Your content here -->

  <!-- Link the bundle -->
  <script src="lib/ui-effects.min.js"></script>
  
  <script>
    // Initialize
    UIEffects.createSnowButton();
  </script>
</body>
</html>
```

---

## 📦 **Method 4: using CDN (Future Option)**

Once you deploy to a server, you can link via URL:

```html
<script src="https://your-domain.com/ui-effects.min.js"></script>
<script>
  UIEffects.createSnowButton();
</script>
```

---

## ✅ **Test in Different Scenarios**

### **React Project**

```jsx
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load script dynamically
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.async = true;
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }, []);

  return <div><h1>React App with Snow Effect</h1></div>;
}

export default App;
```

### **Vue Project**

```vue
<template>
  <div id="app">
    <h1>Vue App with Snow Effect</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }
}
</script>
```

### **Next.js Project**

```jsx
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/ui-effects.min.js'; // Place in public/ folder
    script.async = true;
    script.onload = () => {
      if (window.UIEffects) {
        window.UIEffects.createSnowButton();
      }
    };
    document.body.appendChild(script);
  }, []);

  return <h1>Next.js with
```


## License: unknown
https://github.com/Nishi-Kanta-Paul/EduHub44/blob/2f69ae9a4e99a3c3011257f6e935ddb92e7d436b/eduhub/UiUx_Tuto.php

```
I'll show you how to integrate the UI-Effects library into other projects. There are multiple ways to use it:

---

## 📦 **Method 1: Direct Script Tag (Easiest)**

Create a new HTML file anywhere and paste this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Effects Test - Another Project</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: white;
    }
    h1 { text-align: center; }
  </style>
</head>
<body>
  <h1>🎉 UI Effects Integrated Successfully!</h1>
  <p style="text-align: center; font-size: 18px;">
    Look at the bottom-right corner for the snow button 👇
  </p>

  <!-- Link to the UI Effects bundle -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>
  
  <script>
    // That's it! Initialize the snow button
    UIEffects.createSnowButton();
    
    console.log('✅ UI Effects loaded successfully!');
    console.log('Available commands:');
    console.log('- UIEffects.startSnow()');
    console.log('- UIEffects.stopSnow()');
    console.log('- UIEffects.setSnowWindMode("calm"|"windy"|"blizzard")');
    console.log('- UIEffects.getMetrics()');
  </script>
</body>
</html>
```

**Save this as:** `test-integration.html` on your Desktop

**Then open it in browser** → Snow button appears instantly! ✅

---

## 🚀 **Method 2: With Wind Mode Controls (Like Google AI Studio)**

This is the full version with wind mode buttons:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snow Effect - Full Integration</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: linear-gradient(160deg, #1b2735 0%, #090a0f 100%);
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
    }

    .container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 5000;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    p {
      font-size: 1.2em;
      color: #aaa;
      margin-bottom: 30px;
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
      transform: translateY(-2px);
    }

    button.active {
      background: rgba(100, 200, 255, 0.5);
      border-color: #64c8ff;
      box-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
    }

    #snow-controls {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 8px;
      z-index: 5001;
    }

    #snow-controls button {
      padding: 8px 16px;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  </style>
</head>
<body>
  <!-- Wind Mode Controls -->
  <div id="snow-controls">
    <button data-mode="calm">❄️ Calm</button>
    <button data-mode="windy">💨 Windy</button>
    <button data-mode="blizzard">🌪️ Blizzard</button>
  </div>

  <!-- Main Content -->
  <div class="container">
    <h1>❄️ Let It Snow</h1>
    <p>Watch the beautiful snow fall on your project</p>
    <div class="controls">
      <button id="toggle">🎵 Play/Stop</button>
      <button id="metrics">📊 Show Metrics</button>
    </div>
  </div>

  <!-- Load UI Effects -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>

  <script>
    // Initialize snow button
    UIEffects.createSnowButton();
    
    // Get snow instance
    const snow = UIEffects.effectManager.effects.snow;

    // Wind mode buttons
    document.querySelectorAll('#snow-controls button').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        UIEffects.setSnowWindMode(mode);
        
        // Update active state
        document.querySelectorAll('#snow-controls button').forEach(b => 
          b.classList.remove('active')
        );
        btn.classList.add('active');
      });
    });

    // Set Windy as default
    document.querySelector('[data-mode="windy"]').click();

    // Toggle button
    document.getElementById('toggle').addEventListener('click', function() {
      if (snow.running) {
        UIEffects.stopSnow();
        this.textContent = '▶️ Start';
      } else {
        UIEffects.startSnow();
        this.textContent = '⏸️ Stop';
      }
    });

    // Metrics button
    document.getElementById('metrics').addEventListener('click', function() {
      const metrics = UIEffects.getMetrics();
      alert(`
📊 Performance Metrics:
━━━━━━━━━━━━━━━━━━━━━
FPS: ${metrics.fps}
Snowflakes: ${metrics.flakeCount}
Accumulation: ${metrics.accumulationHeight.toFixed(1)}px
━━━━━━━━━━━━━━━━━━━━━
      `);
    });

    console.log('✅ Full integration working!');
  </script>
</body>
</html>
```

**Save and open** → Full snow effect with controls! 🎉

---

## 🔗 **Method 3: Copy Bundle to Your Project**

If you want to use it in your own project:

### Step 1: Copy the bundle file

Copy this file:
```
e:\OneDrive\Desktop\ui-effects\dist\ui-effects.min.js
```

To your project:
```
your-project/
├── index.html
├── style.css
└── lib/
    └── ui-effects.min.js  ← Paste here
```

### Step 2: Link in your HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My App</h1>
  <!-- Your content here -->

  <!-- Link the bundle -->
  <script src="lib/ui-effects.min.js"></script>
  
  <script>
    // Initialize
    UIEffects.createSnowButton();
  </script>
</body>
</html>
```

---

## 📦 **Method 4: using CDN (Future Option)**

Once you deploy to a server, you can link via URL:

```html
<script src="https://your-domain.com/ui-effects.min.js"></script>
<script>
  UIEffects.createSnowButton();
</script>
```

---

## ✅ **Test in Different Scenarios**

### **React Project**

```jsx
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load script dynamically
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.async = true;
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }, []);

  return <div><h1>React App with Snow Effect</h1></div>;
}

export default App;
```

### **Vue Project**

```vue
<template>
  <div id="app">
    <h1>Vue App with Snow Effect</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }
}
</script>
```

### **Next.js Project**

```jsx
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/ui-effects.min.js'; // Place in public/ folder
    script.async = true;
    script.onload = () => {
      if (window.UIEffects) {
        window.UIEffects.createSnowButton();
      }
    };
    document.body.appendChild(script);
  }, []);

  return <h1>Next.js with
```


## License: unknown
https://github.com/JimenaEB/4Geeks-Academy_exercise_postcard/blob/7c6987bf0181d2447294dd62f27c8a6f9c377d52/tutorial-postcard/.learn/exercises/06-lets-start-building/README.md

```
I'll show you how to integrate the UI-Effects library into other projects. There are multiple ways to use it:

---

## 📦 **Method 1: Direct Script Tag (Easiest)**

Create a new HTML file anywhere and paste this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Effects Test - Another Project</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: white;
    }
    h1 { text-align: center; }
  </style>
</head>
<body>
  <h1>🎉 UI Effects Integrated Successfully!</h1>
  <p style="text-align: center; font-size: 18px;">
    Look at the bottom-right corner for the snow button 👇
  </p>

  <!-- Link to the UI Effects bundle -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>
  
  <script>
    // That's it! Initialize the snow button
    UIEffects.createSnowButton();
    
    console.log('✅ UI Effects loaded successfully!');
    console.log('Available commands:');
    console.log('- UIEffects.startSnow()');
    console.log('- UIEffects.stopSnow()');
    console.log('- UIEffects.setSnowWindMode("calm"|"windy"|"blizzard")');
    console.log('- UIEffects.getMetrics()');
  </script>
</body>
</html>
```

**Save this as:** `test-integration.html` on your Desktop

**Then open it in browser** → Snow button appears instantly! ✅

---

## 🚀 **Method 2: With Wind Mode Controls (Like Google AI Studio)**

This is the full version with wind mode buttons:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snow Effect - Full Integration</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: linear-gradient(160deg, #1b2735 0%, #090a0f 100%);
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
    }

    .container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 5000;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    p {
      font-size: 1.2em;
      color: #aaa;
      margin-bottom: 30px;
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
      transform: translateY(-2px);
    }

    button.active {
      background: rgba(100, 200, 255, 0.5);
      border-color: #64c8ff;
      box-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
    }

    #snow-controls {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 8px;
      z-index: 5001;
    }

    #snow-controls button {
      padding: 8px 16px;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  </style>
</head>
<body>
  <!-- Wind Mode Controls -->
  <div id="snow-controls">
    <button data-mode="calm">❄️ Calm</button>
    <button data-mode="windy">💨 Windy</button>
    <button data-mode="blizzard">🌪️ Blizzard</button>
  </div>

  <!-- Main Content -->
  <div class="container">
    <h1>❄️ Let It Snow</h1>
    <p>Watch the beautiful snow fall on your project</p>
    <div class="controls">
      <button id="toggle">🎵 Play/Stop</button>
      <button id="metrics">📊 Show Metrics</button>
    </div>
  </div>

  <!-- Load UI Effects -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>

  <script>
    // Initialize snow button
    UIEffects.createSnowButton();
    
    // Get snow instance
    const snow = UIEffects.effectManager.effects.snow;

    // Wind mode buttons
    document.querySelectorAll('#snow-controls button').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        UIEffects.setSnowWindMode(mode);
        
        // Update active state
        document.querySelectorAll('#snow-controls button').forEach(b => 
          b.classList.remove('active')
        );
        btn.classList.add('active');
      });
    });

    // Set Windy as default
    document.querySelector('[data-mode="windy"]').click();

    // Toggle button
    document.getElementById('toggle').addEventListener('click', function() {
      if (snow.running) {
        UIEffects.stopSnow();
        this.textContent = '▶️ Start';
      } else {
        UIEffects.startSnow();
        this.textContent = '⏸️ Stop';
      }
    });

    // Metrics button
    document.getElementById('metrics').addEventListener('click', function() {
      const metrics = UIEffects.getMetrics();
      alert(`
📊 Performance Metrics:
━━━━━━━━━━━━━━━━━━━━━
FPS: ${metrics.fps}
Snowflakes: ${metrics.flakeCount}
Accumulation: ${metrics.accumulationHeight.toFixed(1)}px
━━━━━━━━━━━━━━━━━━━━━
      `);
    });

    console.log('✅ Full integration working!');
  </script>
</body>
</html>
```

**Save and open** → Full snow effect with controls! 🎉

---

## 🔗 **Method 3: Copy Bundle to Your Project**

If you want to use it in your own project:

### Step 1: Copy the bundle file

Copy this file:
```
e:\OneDrive\Desktop\ui-effects\dist\ui-effects.min.js
```

To your project:
```
your-project/
├── index.html
├── style.css
└── lib/
    └── ui-effects.min.js  ← Paste here
```

### Step 2: Link in your HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My App</h1>
  <!-- Your content here -->

  <!-- Link the bundle -->
  <script src="lib/ui-effects.min.js"></script>
  
  <script>
    // Initialize
    UIEffects.createSnowButton();
  </script>
</body>
</html>
```

---

## 📦 **Method 4: using CDN (Future Option)**

Once you deploy to a server, you can link via URL:

```html
<script src="https://your-domain.com/ui-effects.min.js"></script>
<script>
  UIEffects.createSnowButton();
</script>
```

---

## ✅ **Test in Different Scenarios**

### **React Project**

```jsx
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load script dynamically
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.async = true;
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }, []);

  return <div><h1>React App with Snow Effect</h1></div>;
}

export default App;
```

### **Vue Project**

```vue
<template>
  <div id="app">
    <h1>Vue App with Snow Effect</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }
}
</script>
```

### **Next.js Project**

```jsx
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/ui-effects.min.js'; // Place in public/ folder
    script.async = true;
    script.onload = () => {
      if (window.UIEffects) {
        window.UIEffects.createSnowButton();
      }
    };
    document.body.appendChild(script);
  }, []);

  return <h1>Next.js with
```


## License: unknown
https://github.com/Nishi-Kanta-Paul/EduHub44/blob/2f69ae9a4e99a3c3011257f6e935ddb92e7d436b/eduhub/UiUx_Tuto.php

```
I'll show you how to integrate the UI-Effects library into other projects. There are multiple ways to use it:

---

## 📦 **Method 1: Direct Script Tag (Easiest)**

Create a new HTML file anywhere and paste this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Effects Test - Another Project</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: white;
    }
    h1 { text-align: center; }
  </style>
</head>
<body>
  <h1>🎉 UI Effects Integrated Successfully!</h1>
  <p style="text-align: center; font-size: 18px;">
    Look at the bottom-right corner for the snow button 👇
  </p>

  <!-- Link to the UI Effects bundle -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>
  
  <script>
    // That's it! Initialize the snow button
    UIEffects.createSnowButton();
    
    console.log('✅ UI Effects loaded successfully!');
    console.log('Available commands:');
    console.log('- UIEffects.startSnow()');
    console.log('- UIEffects.stopSnow()');
    console.log('- UIEffects.setSnowWindMode("calm"|"windy"|"blizzard")');
    console.log('- UIEffects.getMetrics()');
  </script>
</body>
</html>
```

**Save this as:** `test-integration.html` on your Desktop

**Then open it in browser** → Snow button appears instantly! ✅

---

## 🚀 **Method 2: With Wind Mode Controls (Like Google AI Studio)**

This is the full version with wind mode buttons:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snow Effect - Full Integration</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: linear-gradient(160deg, #1b2735 0%, #090a0f 100%);
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
    }

    .container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 5000;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    p {
      font-size: 1.2em;
      color: #aaa;
      margin-bottom: 30px;
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
      transform: translateY(-2px);
    }

    button.active {
      background: rgba(100, 200, 255, 0.5);
      border-color: #64c8ff;
      box-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
    }

    #snow-controls {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 8px;
      z-index: 5001;
    }

    #snow-controls button {
      padding: 8px 16px;
      font-size: 12px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  </style>
</head>
<body>
  <!-- Wind Mode Controls -->
  <div id="snow-controls">
    <button data-mode="calm">❄️ Calm</button>
    <button data-mode="windy">💨 Windy</button>
    <button data-mode="blizzard">🌪️ Blizzard</button>
  </div>

  <!-- Main Content -->
  <div class="container">
    <h1>❄️ Let It Snow</h1>
    <p>Watch the beautiful snow fall on your project</p>
    <div class="controls">
      <button id="toggle">🎵 Play/Stop</button>
      <button id="metrics">📊 Show Metrics</button>
    </div>
  </div>

  <!-- Load UI Effects -->
  <script src="file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js"></script>

  <script>
    // Initialize snow button
    UIEffects.createSnowButton();
    
    // Get snow instance
    const snow = UIEffects.effectManager.effects.snow;

    // Wind mode buttons
    document.querySelectorAll('#snow-controls button').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        UIEffects.setSnowWindMode(mode);
        
        // Update active state
        document.querySelectorAll('#snow-controls button').forEach(b => 
          b.classList.remove('active')
        );
        btn.classList.add('active');
      });
    });

    // Set Windy as default
    document.querySelector('[data-mode="windy"]').click();

    // Toggle button
    document.getElementById('toggle').addEventListener('click', function() {
      if (snow.running) {
        UIEffects.stopSnow();
        this.textContent = '▶️ Start';
      } else {
        UIEffects.startSnow();
        this.textContent = '⏸️ Stop';
      }
    });

    // Metrics button
    document.getElementById('metrics').addEventListener('click', function() {
      const metrics = UIEffects.getMetrics();
      alert(`
📊 Performance Metrics:
━━━━━━━━━━━━━━━━━━━━━
FPS: ${metrics.fps}
Snowflakes: ${metrics.flakeCount}
Accumulation: ${metrics.accumulationHeight.toFixed(1)}px
━━━━━━━━━━━━━━━━━━━━━
      `);
    });

    console.log('✅ Full integration working!');
  </script>
</body>
</html>
```

**Save and open** → Full snow effect with controls! 🎉

---

## 🔗 **Method 3: Copy Bundle to Your Project**

If you want to use it in your own project:

### Step 1: Copy the bundle file

Copy this file:
```
e:\OneDrive\Desktop\ui-effects\dist\ui-effects.min.js
```

To your project:
```
your-project/
├── index.html
├── style.css
└── lib/
    └── ui-effects.min.js  ← Paste here
```

### Step 2: Link in your HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My App</h1>
  <!-- Your content here -->

  <!-- Link the bundle -->
  <script src="lib/ui-effects.min.js"></script>
  
  <script>
    // Initialize
    UIEffects.createSnowButton();
  </script>
</body>
</html>
```

---

## 📦 **Method 4: using CDN (Future Option)**

Once you deploy to a server, you can link via URL:

```html
<script src="https://your-domain.com/ui-effects.min.js"></script>
<script>
  UIEffects.createSnowButton();
</script>
```

---

## ✅ **Test in Different Scenarios**

### **React Project**

```jsx
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load script dynamically
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.async = true;
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }, []);

  return <div><h1>React App with Snow Effect</h1></div>;
}

export default App;
```

### **Vue Project**

```vue
<template>
  <div id="app">
    <h1>Vue App with Snow Effect</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'file:///e:/OneDrive/Desktop/ui-effects/dist/ui-effects.min.js';
    script.onload = () => {
      window.UIEffects.createSnowButton();
    };
    document.body.appendChild(script);
  }
}
</script>
```

### **Next.js Project**

```jsx
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/ui-effects.min.js'; // Place in public/ folder
    script.async = true;
    script.onload = () => {
      if (window.UIEffects) {
        window.UIEffects.createSnowButton();
      }
    };
    document.body.appendChild(script);
  }, []);

  return <h1>Next.js with
```

