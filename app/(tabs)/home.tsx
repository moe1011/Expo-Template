import { View, SafeAreaView, Text, ScrollView } from "react-native";
import { Container } from "../../components/layout/Container";
import { Header, Paragraph } from "../../components/ui";
import { Button } from "../../components/ui/Button";
import { StatusBar } from 'expo-status-bar';

/**
 * Home Screen Component
 * Main dashboard screen for the app
 */
export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Container className="px-4 pt-2">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Welcome section */}
          <View className="mb-6">
            <Header className="text-3xl font-bold mb-2">Welcome back!</Header>
            <Paragraph className="text-gray-600">
              This is your personalized home screen
            </Paragraph>
          </View>

          {/* Cards section */}
          <View className="mb-6">
            <Text className="font-medium text-lg mb-3">Quick Actions</Text>
            <View className="flex-row justify-between mb-4">
              <View className="bg-white rounded-xl p-4 shadow w-[48%]">
                <View className="bg-primary/20 w-12 h-12 rounded-full items-center justify-center mb-3">
                  <Text className="text-2xl">📊</Text>
                </View>
                <Text className="font-medium">Card Title 1</Text>
                <Text className="text-sm text-gray-500 mt-1">Short description</Text>
              </View>
              
              <View className="bg-white rounded-xl p-4 shadow w-[48%]">
                <View className="bg-secondary/20 w-12 h-12 rounded-full items-center justify-center mb-3">
                  <Text className="text-2xl">🔍</Text>
                </View>
                <Text className="font-medium">Card Title 2</Text>
                <Text className="text-sm text-gray-500 mt-1">Short description</Text>
              </View>
            </View>
          </View>

          {/* Featured content */}
          <View className="mb-6">
            <Text className="font-medium text-lg mb-3">Featured Content</Text>
            <View className="bg-white rounded-xl p-5 shadow mb-4">
              <View className="flex-row items-center mb-4">
                <View className="w-14 h-14 bg-primary/20 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">🌟</Text>
                </View>
                <View>
                  <Text className="font-medium text-base">Featured Title</Text>
                  <Text className="text-sm text-gray-500">Helpful information goes here</Text>
                </View>
              </View>
              <Button 
                title="Learn More" 
                variant="outline" 
                size="sm"
                onPress={() => {}} 
              />
            </View>
          </View>

          {/* List section */}
          <View className="mb-6">
            <Text className="font-medium text-lg mb-3">Recent Activity</Text>
            {[1, 2, 3].map((item) => (
              <View key={item} className="bg-white rounded-xl p-4 shadow mb-3 flex-row items-center">
                <View className="w-10 h-10 bg-secondary/10 rounded-full items-center justify-center mr-3">
                  <Text>#{item}</Text>
                </View>
                <View>
                  <Text className="font-medium">List Item {item}</Text>
                  <Text className="text-sm text-gray-500">Additional details for item {item}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Call to action */}
          <View className="mb-10 bg-primary/10 p-5 rounded-xl">
            <Text className="font-medium text-lg mb-2">Ready to get started?</Text>
            <Text className="text-gray-700 mb-4">
              This template can be customized to fit your app's needs
            </Text>
            <Button 
              title="Get Started"
              variant="primary"
              showArrow={true}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
} 