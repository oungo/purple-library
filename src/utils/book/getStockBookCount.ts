import { supabase } from '../supabaseClient';

export const getStockBookCount = async (isbn: string) => {
  return await supabase.from('book').select('id').eq('isbn', isbn).eq('inStock', true);
};
