import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen 
          name="login" 
          options={{ 
            title: "Log In",
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            title: "Sign Up",
            headerShown: false
          }} 
        />
      </Stack>
    </>
  );
} 