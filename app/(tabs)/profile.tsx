import { View, SafeAreaView, Text, Pressable, ScrollView } from "react-native";
import { Container } from "../../components/layout/Container";
import { Header, Paragraph } from "../../components/ui";
import { Button } from "../../components/ui/Button";
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

/**
 * Profile Screen Component
 * User profile and settings
 */
export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Container className="px-4 pt-2">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header className="text-3xl font-bold mb-6">Profile</Header>
          
          {/* Profile card */}
          <View className="bg-white rounded-xl p-5 shadow mb-6">
            <View className="flex-row items-center">
              <View className="w-20 h-20 bg-primary/20 rounded-full items-center justify-center mr-4">
                <Text className="text-4xl">👤</Text>
              </View>
              <View>
                <Text className="font-bold text-xl">User Name</Text>
                <Text className="text-gray-500">user@example.com</Text>
              </View>
            </View>
            <Button
              title="Edit Profile"
              variant="outline"
              size="sm"
              className="mt-4"
              onPress={() => {}}
            />
          </View>
          
          {/* Settings list */}
          <View className="bg-white rounded-xl shadow mb-6">
            <Text className="font-medium text-lg p-4 border-b border-gray-100">
              Settings
            </Text>
            
            {[
              { icon: "notifications-outline" as const, title: 'Notifications' },
              { icon: "lock-closed-outline" as const, title: 'Privacy' },
              { icon: "help-circle-outline" as const, title: 'Help Center' },
              { icon: "information-circle-outline" as const, title: 'About' }
            ].map((item, index) => (
              <Pressable 
                key={index}
                className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-100"
                onPress={() => {}}
              >
                <Ionicons name={item.icon} size={24} color="#6B7280" />
                <Text className="ml-3 flex-1">{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </Pressable>
            ))}
          </View>
          
          {/* Logout button */}
          <Button
            title="Log Out"
            variant="secondary"
            className="mb-10"
            onPress={() => {}}
          />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
} 