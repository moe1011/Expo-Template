import { FlatList, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ItemCard } from './ItemCard';

// Define Item type
interface Item {
  id: string;
  name: string;
  description: string;
  price?: number;
}

// Define props
interface ItemListProps {
  items: Item[];
  isLoading?: boolean;
  error?: Error | null;
  onDelete?: (id: string) => void;
}

export function ItemList({ 
  items = [], 
  isLoading = false, 
  error = null,
  onDelete
}: ItemListProps) {
  const router = useRouter();

  const handleViewItem = (id: string) => {
    router.push(`/item/${id}`);
  };

  const handleDeleteItem = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard
          item={item}
          onPress={() => handleViewItem(item.id)}
          onDelete={onDelete ? () => handleDeleteItem(item.id) : undefined}
        />
      )}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center py-8">
          <Text className="text-gray-500">No items found</Text>
        </View>
      }
    />
  );
} 