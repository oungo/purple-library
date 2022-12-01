import { ReactNode } from 'react';
import { DehydratedState } from 'react-query';

export interface DehydratedStateProps {
  dehydratedState: DehydratedState;
}

export type ColumnsType = Array<{
  title: string;
  dataIndex: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any) => ReactNode;
}>;
