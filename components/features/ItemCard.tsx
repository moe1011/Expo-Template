import { View, Text, Pressable } from 'react-native';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Item {
  id: string;
  name: string;
  description: string;
  price?: number;
}

interface ItemCardProps {
  item: Item;
  onPress?: () => void;
  onDelete?: () => void;
}

export function ItemCard({ item, onPress, onDelete }: ItemCardProps) {
  return (
    <Card className="mb-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-gray-600 mb-2">{item.description}</Text>
          {item.price !== undefined && (
            <Text className="text-primary font-medium">${item.price.toFixed(2)}</Text>
          )}
        </View>
        
        <View className="flex-row">
          {onPress && (
            <Button
              title="View"
              variant="outline"
              size="sm"
              onPress={onPress}
            />
          )}
          
          {onDelete && (
            <View className="ml-2">
              <Button
                title="Delete"
                variant="secondary"
                size="sm"
                onPress={onDelete}
              />
            </View>
          )}
        </View>
      </View>
    </Card>
  );
} 