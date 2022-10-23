import { useModalStore } from '@/store/useModalStore';

export default function BookModal() {
  const isOpen = useModalStore((state) => state.isOpen);

  if (!isOpen) return null;

  return <div>도서 수정</div>;
}
