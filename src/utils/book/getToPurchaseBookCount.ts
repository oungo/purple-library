import { supabase } from '../supabaseClient';

export const getToPurchaseBookCount = async (isbn: string) => {
  return await supabase.from('book').select('id').eq('isbn', isbn).eq('inStock', false);
};
