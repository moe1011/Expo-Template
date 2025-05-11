import { QueryClient } from '@tanstack/react-query';
import { CACHE_TIME } from '../constants/api';

// Create a QueryClient instance with default configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default behavior for all queries
      staleTime: CACHE_TIME.SHORT, // Default stale time of 1 minute
      cacheTime: CACHE_TIME.LONG, // Default cache time of 1 hour
      retry: 2, // Retry failed queries twice
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false, // Don't auto-refetch when app comes to foreground
      refetchOnMount: true, // Refetch on component mount if data is stale
      refetchOnReconnect: true, // Refetch when reconnecting
      suspense: false, // Don't use React Suspense by default
    },
    mutations: {
      // Default behavior for all mutations
      retry: 1, // Retry failed mutations once
      retryDelay: 1000, // Delay between retries
    },
  },
});

// Helper function to clear the entire cache (useful for logout)
export const clearQueryCache = () => {
  return queryClient.clear();
};

// Helper function to clear queries by key pattern
export const invalidateQueries = (queryKey: string | string[]) => {
  return queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
};

// Helper function to prefetch a query
export const prefetchQuery = async <T>(
  queryKey: string | string[],
  queryFn: () => Promise<T>,
  staleTime?: number
) => {
  await queryClient.prefetchQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn,
    staleTime
  });
};

// Helper function to set query data directly (useful for optimistic updates)
export const setQueryData = <T>(queryKey: string | string[], data: T) => {
  queryClient.setQueryData(Array.isArray(queryKey) ? queryKey : [queryKey], data);
};

// Helper function to get query data synchronously
export const getQueryData = <T>(queryKey: string | string[]): T | undefined => {
  return queryClient.getQueryData<T>(Array.isArray(queryKey) ? queryKey : [queryKey]);
}; 