import { Text, View, SafeAreaView, TextInput, Pressable } from "react-native";
import { Button } from "../../components/ui/Button";
import { Header } from "../../components/ui";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";

export default function SignupScreen() {
  const router = useRouter();

  // Toggle password visibility state (for demo purposes)
  const togglePasswordVisibility = () => {
    // Implement proper toggle logic here
    console.log("Toggle password visibility");
  };

  return (
    <SafeAreaView className="flex-1 bg-background pt-8 px-5 w-full">
      <StatusBar style="dark" />
      {/* App logo placeholder */}
      <View className="items-center mb-3">
        <Text className="text-primary text-4xl font-bold">App Logo</Text>
      </View>

      {/* White container card - adjusted padding and roundness */}
      <View className="bg-white rounded-xl px-5 py-6 w-[95%] mx-auto">
        {/* Header section with better spacing */}
        <Header className="text-3xl font-bold text-gray-900 mb-1 text-center w-full">
          Create account
        </Header>
        <Text className="text-secondary text-base mb-6 text-center w-full">
          Already have an account?{" "}
          <Text
            className="text-secondary font-bold underline"
            onPress={() => router.replace("/(auth)/login")}
          >
            Log in
          </Text>
        </Text>

        {/* Form section with proper spacing */}
        <View className="w-full gap-6">
          {/* Email Field */}
          <View className="mb-1">
            <Text className="text-base font-medium text-black mb-2">
              Email address
            </Text>
            <TextInput
              placeholder="Your email"
              className="border border-gray-300 rounded-lg p-3.5 text-base placeholder:text-black/50"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Field */}
          <View className="mb-1">
            <Text className="text-base font-medium text-black mb-2">
              Password
            </Text>
            <View className="relative flex-row items-center">
              <TextInput
                placeholder="Password"
                className="border border-gray-300 rounded-lg p-3.5 text-base w-full placeholder:text-black/50"
                secureTextEntry={true}
              />
              <Pressable
                className="absolute right-3"
                onPress={togglePasswordVisibility}
              >
                <Ionicons name="eye-off-outline" size={22} color="gray" />
              </Pressable>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View className="mb-1">
            <Text className="text-base font-medium text-black mb-2">
              Confirm Password
            </Text>
            <View className="relative flex-row items-center">
              <TextInput
                placeholder="Password"
                className="border border-gray-300 rounded-lg p-3.5 text-base w-full placeholder:text-black/50"
                secureTextEntry={true}
              />
              <Pressable
                className="absolute right-3"
                onPress={togglePasswordVisibility}
              >
                <Ionicons name="eye-off-outline" size={22} color="gray" />
              </Pressable>
            </View>
          </View>

          {/* Create Account Button */}
          <Button
            title="Create account"
            variant="secondary"
            size="lg"
            className="mt-4 w-full py-4"
            onPress={() => {
              router.replace("/home");
            }}
          />

          {/* "Or sign up with" divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-black/70 text-base px-3">or Sign up with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login Buttons Row */}
          <View className="flex-row justify-between gap-5">
            {/* Facebook */}
            <Pressable className="flex-1 border border-gray-300 rounded-lg py-4 items-center">
              <FontAwesome name="facebook" size={24} color="#1877F2" />
            </Pressable>
            
            {/* Google */}
            <Pressable className="flex-1 border border-gray-300 rounded-lg py-4 items-center">
              <AntDesign name="google" size={24} color="#DB4437" />
            </Pressable>
            
            {/* Apple */}
            <Pressable className="flex-1 border border-gray-300 rounded-lg py-4 items-center">
              <AntDesign name="apple1" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
      {/* Terms Text - adjusted spacing */}
      <View className="items-center mt-8">
        <Text className="text-sm text-secondary text-center">
          By signing up, you agree to our{" "}
          <Text className="font-bold underline text-secondary">
            Terms of Service
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
