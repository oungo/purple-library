import { supabase } from '../supabaseClient';

export const deleteBook = async (id: number) => {
  return await supabase.from('book').delete().eq('id', id);
};
