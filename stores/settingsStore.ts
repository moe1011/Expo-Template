import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/storage';
import { ColorSchemeName } from 'react-native';

// Define settings types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppSettings {
  themeMode: ThemeMode;
  pushNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  soundEffectsEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  autoPlayVideos: boolean;
  downloadOverCellular: boolean;
  language: string;
  fontScale: number;
}

// Define store state
interface SettingsState extends AppSettings {
  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  togglePushNotifications: () => void;
  toggleEmailNotifications: () => void;
  toggleSoundEffects: () => void;
  toggleHapticFeedback: () => void;
  toggleAutoPlayVideos: () => void;
  toggleDownloadOverCellular: () => void;
  setLanguage: (lang: string) => void;
  setFontScale: (scale: number) => void;
  resetSettings: () => void;
  
  // Computed properties
  resolvedTheme: () => ColorSchemeName;
}

// Default settings
const defaultSettings: AppSettings = {
  themeMode: 'system',
  pushNotificationsEnabled: true,
  emailNotificationsEnabled: true,
  soundEffectsEnabled: true,
  hapticFeedbackEnabled: true,
  autoPlayVideos: true,
  downloadOverCellular: false,
  language: 'en',
  fontScale: 1.0,
};

// Create the store
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // Initial state
      ...defaultSettings,
      
      // Actions
      setThemeMode: (mode) => set({ themeMode: mode }),
      
      togglePushNotifications: () => set((state) => ({
        pushNotificationsEnabled: !state.pushNotificationsEnabled,
      })),
      
      toggleEmailNotifications: () => set((state) => ({
        emailNotificationsEnabled: !state.emailNotificationsEnabled,
      })),
      
      toggleSoundEffects: () => set((state) => ({
        soundEffectsEnabled: !state.soundEffectsEnabled,
      })),
      
      toggleHapticFeedback: () => set((state) => ({
        hapticFeedbackEnabled: !state.hapticFeedbackEnabled,
      })),
      
      toggleAutoPlayVideos: () => set((state) => ({
        autoPlayVideos: !state.autoPlayVideos,
      })),
      
      toggleDownloadOverCellular: () => set((state) => ({
        downloadOverCellular: !state.downloadOverCellular,
      })),
      
      setLanguage: (lang) => set({ language: lang }),
      
      setFontScale: (scale) => set({ fontScale: scale }),
      
      resetSettings: () => set(defaultSettings),
      
      // Computed properties
      resolvedTheme: () => {
        // This is a function that will be called from components
        // to get the current theme based on system preference and user setting
        const { themeMode } = get();
        
        if (themeMode === 'system') {
          // Return null which means use system default
          return null;
        }
        
        return themeMode;
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// Selectors for common use cases
export const useThemeMode = () => useSettingsStore((state) => state.themeMode);
export const useResolvedTheme = () => useSettingsStore((state) => state.resolvedTheme());
export const useFontScale = () => useSettingsStore((state) => state.fontScale);
export const useLanguage = () => useSettingsStore((state) => state.language);
export const usePushNotificationsEnabled = () => 
  useSettingsStore((state) => state.pushNotificationsEnabled);
export const useEmailNotificationsEnabled = () => 
  useSettingsStore((state) => state.emailNotificationsEnabled); 