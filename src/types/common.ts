import { ReactNode, TdHTMLAttributes } from 'react';
import { DehydratedState } from 'react-query';
import { SupabaseClient as OriginSupabaseClient } from '@supabase/supabase-js';
import { Database } from './database';

export interface DehydratedStateProps {
  dehydratedState: DehydratedState;
}

export type ColumnsType<Type> = Array<{
  title?: string;
  dataIndex?: string;
  width?: string | number;
  align?: TdHTMLAttributes<HTMLTableCellElement>['align'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, record: Type) => ReactNode;
}>;

export type SupabaseClient = OriginSupabaseClient<Database>;
