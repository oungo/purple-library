import { ReactNode, TdHTMLAttributes } from 'react';
import { DehydratedState } from 'react-query';

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

export type RemoveNull<Type> = {
  [Property in keyof Type]: NonNullable<Type[Property]>;
};
