import { View, SafeAreaView, Text, Image, Pressable } from "react-native";
import { Container } from "../components/layout/Container";
import { Header, Paragraph } from "../components/ui";
import { Button } from "../components/ui/Button";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';

/**
 * Landing/welcome screen component
 * The first screen users see when opening the app
 */
export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <StatusBar style="light" />
      
      <Container className="justify-between items-center flex-1 py-8">
        {/* Main content area with scan image placeholder */}
        <View className="flex-1 w-full items-center justify-center">
          <Text className="text-white text-center px-5">
            *some sort of scan image of a man's torso and points getting highlighted and a rank, etc, preview of the app pretty much (good graphic or animation)*
          </Text>
        </View>

        {/* Bottom section with text and button */}
        <View className="w-full items-center mt-6 px-4">
          <Text className="text-white text-4xl font-bold mb-2 text-center">
            Personalized Fitness
          </Text>
          <Text className="text-white text-4xl font-bold mb-16 text-center">
            Analysis & Tracking
          </Text>

          <Button
            title="Get Started"
            size="lg"
            variant="secondary"
            className="w-full py-5 mb-4"
            onPress={() => router.push("/(tabs)/home")}
          />
          
          
          <Pressable
            onPress={() => router.push("/(auth)/login")}
            className="mt-2 mb-6"
          >
            <Text className="text-white text-base">
              Purchased on web? Sign In
            </Text>
          </Pressable>
        </View>
      </Container>
    </SafeAreaView>
  );
}
