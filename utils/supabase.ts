import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Get environment variables
const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.supabaseKey || process.env.SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(
  SUPABASE_URL as string,
  SUPABASE_ANON_KEY as string,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
); 