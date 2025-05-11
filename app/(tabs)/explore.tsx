import { View, SafeAreaView, Text } from "react-native";
import { Container } from "../../components/layout/Container";
import { Header, Paragraph } from "../../components/ui";
import { Button } from "../../components/ui/Button";
import { StatusBar } from 'expo-status-bar';

/**
 * Explore Screen Component
 * For discovering content in the app
 */
export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Container className="justify-center items-center">
        <View className="items-center">
          <Header className="text-3xl font-bold mb-2">Explore</Header>
          <Paragraph className="text-center text-gray-600 mb-6">
            This is a placeholder for the explore screen.
            Customize it based on your app requirements.
          </Paragraph>
          
          <View className="bg-primary/20 w-20 h-20 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl">🧭</Text>
          </View>
          
          <Button
            title="Explore Content"
            variant="primary"
            onPress={() => {}}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
} 