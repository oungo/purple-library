import { Database } from './database';

export type User = Database['public']['Tables']['user']['Row'];
export type UpdateUserData = Database['public']['Tables']['user']['Update'];
