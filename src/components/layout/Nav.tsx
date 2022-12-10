import { useUser } from '@/hooks/use-user';
import Link from 'next/link';

export default function Nav() {
  const { data: user } = useUser();

  if (user?.data?.role !== 'admin') return null;

  return <Link href="/user">사용자 목록</Link>;
}
