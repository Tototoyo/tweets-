import { supabase } from '../lib/supabaseClient';
import { OutputType, Generation } from '../types';

/**
 * Saves a generated tweet set to the database.
 */
export const saveGeneration = async (
  userId: string,
  topic: string,
  outputType: OutputType,
  tweets: string[]
): Promise<void> => {
  if (!supabase) {
    console.error("Supabase client not initialized. Cannot save generation.");
    return;
  }

  const { error } = await supabase
    .from('generations')
    .insert([{ user_id: userId, topic, output_type: outputType, tweets }]);

  if (error) {
    console.error('Error saving generation to Supabase:', error);
    // We don't throw here to avoid breaking the user experience for a background task.
  }
};

/**
 * Fetches all generations for a user.
 */
export const getGenerations = async (userId: string): Promise<Generation[]> => {
  if (!supabase) {
    throw new Error("Supabase client not initialized.");
  }

  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching generations:', error);
    throw new Error('Failed to fetch your saved generations. Please try again later.');
  }

  return data || [];
};
