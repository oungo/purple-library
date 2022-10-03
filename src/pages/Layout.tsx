import * as React from 'react';

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
