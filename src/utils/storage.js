/**
 * Storage utility for safe localStorage/sessionStorage access
 * Provides fallback to in-memory storage for private browsing mode
 */

class StorageManager {
  constructor() {
    this.canUseLocalStorage = this._detectLocalStorage();
    this.memoryStore = {};
  }

  /**
   * Detect if localStorage is available
   */
  _detectLocalStorage() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('[StorageManager] localStorage unavailable - using in-memory fallback');
      return false;
    }
  }

  /**
   * Get item from storage
   */
  getItem(key) {
    try {
      if (this.canUseLocalStorage) {
        return localStorage.getItem(key);
      }
      return this.memoryStore[key] || null;
    } catch (e) {
      return this.memoryStore[key] || null;
    }
  }

  /**
   * Set item in storage
   */
  setItem(key, value) {
    try {
      if (this.canUseLocalStorage) {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      // Silently fallback to memory
    }
    this.memoryStore[key] = value;
  }

  /**
   * Remove item from storage
   */
  removeItem(key) {
    try {
      if (this.canUseLocalStorage) {
        localStorage.removeItem(key);
      }
    } catch (e) {
      // Silently fallback to memory
    }
    delete this.memoryStore[key];
  }

  /**
   * Clear storage
   */
  clear() {
    try {
      if (this.canUseLocalStorage) {
        localStorage.clear();
      }
    } catch (e) {
      // Silently fallback
    }
    this.memoryStore = {};
  }
}

export const storage = new StorageManager();
