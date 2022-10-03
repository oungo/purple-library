import Header from './Header';

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
