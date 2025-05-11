// Simple in-memory storage implementation (temporary replacement for MMKV)
const memoryStorage = new Map<string, string>();

// Interface for the storage adapter
export interface StorageAdapter {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  getAllKeys: () => string[];
}

// Memory storage adapter that mimics the MMKV interface
export const mmkvStorage: StorageAdapter = {
  getItem: (key: string) => {
    return memoryStorage.get(key) || null;
  },
  
  setItem: (key: string, value: string) => {
    memoryStorage.set(key, value);
  },
  
  removeItem: (key: string) => {
    memoryStorage.delete(key);
  },
  
  clear: () => {
    memoryStorage.clear();
  },
  
  getAllKeys: () => {
    return Array.from(memoryStorage.keys());
  }
};

// Helper functions for working with JSON data
export const storageUtils = {
  // Get JSON data from storage
  getJSON: <T>(key: string): T | null => {
    const value = mmkvStorage.getItem(key);
    
    if (!value) {
      return null;
    }
    
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing JSON for key "${key}":`, error);
      return null;
    }
  },
  
  // Store JSON data in storage
  setJSON: <T>(key: string, value: T): void => {
    try {
      mmkvStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing JSON for key "${key}":`, error);
    }
  },
  
  // Get string from storage with default fallback
  getString: (key: string, defaultValue: string = ''): string => {
    const value = mmkvStorage.getItem(key);
    return value !== null ? value : defaultValue;
  },
  
  // Get boolean from storage with default fallback
  getBoolean: (key: string, defaultValue: boolean = false): boolean => {
    const value = mmkvStorage.getItem(key);
    if (value === null) return defaultValue;
    return value === 'true';
  },
  
  // Get number from storage with default fallback
  getNumber: (key: string, defaultValue: number = 0): number => {
    const value = mmkvStorage.getItem(key);
    if (value === null) return defaultValue;
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  }
};

// Storage keys constants to prevent string duplication and typos
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  APP_SETTINGS: 'app_settings',
  THEME_SETTING: 'theme_setting',
  ONBOARDED: 'onboarded',
  LAST_NOTIFICATION_TIME: 'last_notification_time',
}; 