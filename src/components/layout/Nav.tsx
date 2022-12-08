import { useCheckAdmin } from '@/hooks/use-check-admin';
import Link from 'next/link';
export default function Nav() {
  const isAdmin = useCheckAdmin();

  if (!isAdmin) return null;

  return <Link href="/user">사용자 목록</Link>;
}
