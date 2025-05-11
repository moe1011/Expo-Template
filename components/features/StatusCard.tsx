import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../ui/Card';
import { Ionicons } from '@expo/vector-icons';

type StatusType = 'success' | 'warning' | 'error' | 'info';

interface StatusCardProps {
  title: string;
  message: string;
  status: StatusType;
  className?: string;
}

/**
 * A status card component to display information, success, warnings, or errors
 */
export function StatusCard({ 
  title, 
  message, 
  status = 'info',
  className = '' 
}: StatusCardProps) {
  // Define status-specific styles
  const statusConfig = {
    success: {
      iconName: 'checkmark-circle',
      iconColor: '#10B981', // Green
      borderColor: 'border-green-500'
    },
    warning: {
      iconName: 'warning',
      iconColor: '#FBBF24', // Yellow
      borderColor: 'border-yellow-500'
    },
    error: {
      iconName: 'close-circle',
      iconColor: '#EF4444', // Red
      borderColor: 'border-red-500'
    },
    info: {
      iconName: 'information-circle',
      iconColor: '#3B82F6', // Blue
      borderColor: 'border-blue-500'
    }
  };

  const config = statusConfig[status];

  return (
    <Card className={`border-l-4 ${config.borderColor} ${className}`}>
      <View className="flex-row items-start">
        <Ionicons 
          name={config.iconName as any} 
          size={24} 
          color={config.iconColor} 
          style={{ marginRight: 12 }}
        />
        <View className="flex-1">
          <Text className="text-base font-bold mb-1">{title}</Text>
          <Text className="text-sm text-gray-600">{message}</Text>
        </View>
      </View>
    </Card>
  );
} 