import { RemoveNull } from './common';
import { Database } from './database';

export type User = Database['public']['Tables']['user']['Row'];

export type PartialUser = Partial<RemoveNull<User>>;
