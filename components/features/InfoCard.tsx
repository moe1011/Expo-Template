import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Card } from '../ui/Card';
import { Ionicons } from '@expo/vector-icons';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  onPress?: () => void;
  className?: string;
}

/**
 * A generic info card component with customizable content
 */
export function InfoCard({ 
  title, 
  subtitle, 
  rightContent, 
  icon,
  iconColor = '#3B82F6',
  onPress,
  className = ''
}: InfoCardProps) {
  const content = (
    <View className="flex-row justify-between items-center">
      <View className="flex-1">
        <View className="flex-row items-center">
          {icon && (
            <View className="mr-3">
              <Ionicons name={icon} size={24} color={iconColor} />
            </View>
          )}
          <View>
            <Text className="text-base font-bold text-gray-800">{title}</Text>
            {subtitle && <Text className="text-sm text-gray-600">{subtitle}</Text>}
          </View>
        </View>
      </View>
      {rightContent && (
        <View className="ml-2">
          {rightContent}
        </View>
      )}
      {onPress && !rightContent && (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </View>
  );

  return (
    <Card className={`mb-3 ${className}`}>
      {onPress ? (
        <Pressable onPress={onPress} className="p-1">
          {content}
        </Pressable>
      ) : (
        content
      )}
    </Card>
  );
} 