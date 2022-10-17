interface PaginationProps {
  total: number;
}

export default function Pagination({ total }: PaginationProps) {
  if (!total) null;

  return <div>{total}</div>;
}
