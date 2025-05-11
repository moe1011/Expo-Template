import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../utils/supabase';

// Types
interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
}

// Get all items
export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Item[];
    },
  });
}

// Get a single item by ID
export function useItem(id: string) {
  return useQuery({
    queryKey: ['items', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as Item;
    },
    enabled: !!id, // Only run if ID is provided
  });
}

// Create a new item
export function useCreateItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newItem: Omit<Item, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('items')
        .insert(newItem)
        .select()
        .single();
        
      if (error) throw error;
      return data as Item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}

// Update an item
export function useUpdateItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Item> & { id: string }) => {
      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data as Item;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['items', data.id] });
    },
  });
}

// Delete an item
export function useDeleteItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.setQueryData(['items', id], undefined);
    },
  });
} 