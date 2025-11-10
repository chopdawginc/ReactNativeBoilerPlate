import { MMKV } from 'react-native-mmkv';

class MMKVService {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV();
  }

  /**
   * Get item from storage
   * @param key Storage key
   * @returns Parsed value or null if not found
   */
  getItem<T>(key: string): T | null {
    try {
      const value = this.storage.getString(key);
      if (value === undefined) {
        return null;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`MMKV: Failed to get item with key "${key}":`, error);
      return null;
    }
  }

  /**
   * Set item in storage
   * @param key Storage key
   * @param value Value to store (will be JSON stringified)
   */
  setItem<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      this.storage.set(key, jsonValue);
    } catch (error) {
      console.error(`MMKV: Failed to set item with key "${key}":`, error);
    }
  }

  /**
   * Remove item from storage
   * @param key Storage key
   */
  removeItem(key: string): void {
    try {
      this.storage.delete(key);
    } catch (error) {
      console.error(`MMKV: Failed to remove item with key "${key}":`, error);
    }
  }

  /**
   * Check if key exists
   * @param key Storage key
   * @returns True if key exists
   */
  contains(key: string): boolean {
    return this.storage.contains(key);
  }

  /**
   * Get all keys
   * @returns Array of all keys
   */
  getAllKeys(): string[] {
    return this.storage.getAllKeys();
  }

  /**
   * Clear all storage
   */
  clearAll(): void {
    this.storage.clearAll();
  }
}

// Export singleton instance
export const mmkvService = new MMKVService();

