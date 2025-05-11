import { View, SafeAreaView, Text, Image } from "react-native";
import { Container } from "../components/layout/Container";
import { Header, Paragraph } from "../components/ui";
import { Button } from "../components/ui/Button";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar';

/**
 * Landing/welcome screen component
 * The first screen users see when opening the app
 */
export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <StatusBar style="light" />
      <Container className="justify-start items-center pt-12 pb-8 px-6 flex-1">
        <View className="items-center mb-6">
          {/* Replace this with your own logo */}
          <Text className="text-white text-4xl font-bold">
            App Logo
          </Text>
        </View>

        <View className="bg-primary rounded-2xl px-9 my-4 items-center justify-center py-10">
          {/* Replace this with your own illustration or image */}
          <View className="w-64 h-64 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-black text-5xl">🚀</Text>
          </View>
        </View>

        <View className="w-full items-center mt-6">
          <Header className="text-white font-semibold text-4xl mb-2 text-center">
            Welcome
          </Header>
          <Paragraph className="text-white text-base mb-8 text-center">
            Your app description goes here. Tell users what your app does in a few words.
          </Paragraph>

          <Button
            title="Continue"
            size="lg"
            showArrow={true}
            variant="primary"
            className="w-[95%] py-4 px-6 mb-4 shadow"
            onPress={() => router.push("/(tabs)/home")}
          />

          {/* Uncomment this section if you need login/signup functionality
          <View className="flex-row items-center mt-2">
            <Text className="text-white text-base">
              Already have an account?{' '}
            </Text>
            <Pressable
              onPress={() => router.push("/(auth)/login")}
            >
              <Text className="text-primary text-base font-medium underline">
                Log in
              </Text>
            </Pressable>
          </View>
          */}
        </View>
      </Container>
    </SafeAreaView>
  );
}
