import { supabase } from '../supabaseClient';

export interface UpdateBookValues {
  inStock: string;
}

export const updateBook = async (id: number, values: Partial<UpdateBookValues>) => {
  return await supabase.from('book').update(values).eq('id', id);
};
