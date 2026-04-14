/**
 * Background Detection
 * Detects background color and adapts snow color accordingly
 */

export class BackgroundDetection {
  /**
   * Detect background brightness
   */
  static detectBrightness() {
    try {
      const bg = window.getComputedStyle(document.body).background;
      if (!bg) return 255;

      // CASE 1: rgb() or rgba()
      if (bg.startsWith('rgb')) {
        return BackgroundDetection._extractRGB(bg);
      }

      // CASE 2: hex color
      if (bg.startsWith('#')) {
        return BackgroundDetection._extractHex(bg);
      }

      // CASE 3: gradient
      if (bg.includes('gradient')) {
        return BackgroundDetection._extractGradient(bg);
      }

      return 255;
    } catch (err) {
      console.warn('[BackgroundDetection] Detection failed:', err);
      return 255;
    }
  }

  /**
   * Extract brightness from rgb/rgba
   */
  static _extractRGB(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return 255;

    const r = parseInt(match[0], 10);
    const g = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);

    // Standard luminance formula
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  /**
   * Extract brightness from hex
   */
  static _extractHex(hex) {
    const hexStr = hex.replace('#', '');
    if (hexStr.length < 6) return 255;

    const bigint = parseInt(hexStr, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  /**
   * Extract brightness from gradient
   */
  static _extractGradient(gradient) {
    const colorMatch = gradient.match(
      /rgb[a]?\([^)]+\)|#[0-9A-Fa-f]{6}/
    );
    if (!colorMatch) return 255;

    const col = colorMatch[0];

    if (col.startsWith('rgb')) {
      return BackgroundDetection._extractRGB(col);
    }

    if (col.startsWith('#')) {
      return BackgroundDetection._extractHex(col);
    }

    return 255;
  }

  /**
   * Determine snow color based on brightness
   */
  static getSnowColor(brightness) {
    if (brightness < 100) {
      return 'rgba(255,255,255,0.95)'; // Bright snow on dark background
    } else if (brightness < 180) {
      return 'rgba(220,220,220,0.9)'; // Neutral snow
    } else {
      return 'rgba(170,170,170,0.9)'; // Darker snow on bright background
    }
  }
}
