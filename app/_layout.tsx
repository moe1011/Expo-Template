import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from "../utils/fonts";
import "../global.css";

export default function RootLayout() {
  const { fontsLoaded, error } = useFonts();

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  // Show error message if font loading failed
  if (error) {
    console.error('Error loading fonts:', error);
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
