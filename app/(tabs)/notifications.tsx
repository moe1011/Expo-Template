import { View, SafeAreaView, Text, FlatList } from "react-native";
import { Container } from "../../components/layout/Container";
import { Header, Paragraph } from "../../components/ui";
import { StatusBar } from 'expo-status-bar';

/**
 * Sample notification data
 */
const sampleNotifications = [
  { id: '1', title: 'Welcome!', message: 'Thanks for using our app template.', time: '2 min ago' },
  { id: '2', title: 'Getting Started', message: 'Customize this template to fit your needs.', time: '1 hour ago' },
  { id: '3', title: 'Tip', message: 'You can edit the colors in tailwind.config.js', time: '1 day ago' },
];

/**
 * Notifications Screen Component
 * Displays user notifications
 */
export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Container className="px-4 pt-2">
        <Header className="text-3xl font-bold mb-6">Notifications</Header>
        
        {sampleNotifications.length > 0 ? (
          <FlatList
            data={sampleNotifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-white p-4 rounded-xl mb-3 shadow">
                <View className="flex-row justify-between">
                  <Text className="font-medium text-lg">{item.title}</Text>
                  <Text className="text-gray-500 text-xs">{item.time}</Text>
                </View>
                <Text className="text-gray-600 mt-1">{item.message}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <View className="bg-secondary/10 w-20 h-20 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl">🔔</Text>
            </View>
            <Paragraph className="text-center text-gray-600">
              You don't have any notifications yet.
            </Paragraph>
          </View>
        )}
      </Container>
    </SafeAreaView>
  );
} 