import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

/**
 * Font family constants
 */
export const FontFamily = {
  DEFAULT_FONT: 'System',
  MONO: 'System',
};

/**
 * Map font families to their font files
 * Using system fonts since custom fonts were removed
 */
const fontMap = {};

/**
 * Hook to load custom fonts
 * @returns {Object} Object containing font loading state
 */
export function useFonts() {
  // Since we're using system fonts, we can consider them already loaded
  const [fontsLoaded, setFontsLoaded] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  return { fontsLoaded, error };
}

/**
 * Utility function to get the appropriate text style based on text type
 * @param {string} type - The type of text ('header' or 'paragraph')
 * @returns {Object} The font style object
 */
export function getTextStyle(type: 'header' | 'paragraph') {
  // Using system fonts for all text types
  return {};
} 