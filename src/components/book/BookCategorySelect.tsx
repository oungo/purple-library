import { SelectHTMLAttributes } from 'react';

const CATEGORIES = [
  'IT일반',
  '네트워크',
  '클라우드',
  'DB',
  '자료구조',
  '빅데이터',
  '프로그래밍언어',
  '보안',
  '알고리즘',
  '기획',
  '마케팅',
  '경제',
  '경영',
  '조직관리',
  '디자인',
  '가상자산',
  '물류',
  '프로그래밍기초',
];

interface BookCategorySelectProps extends SelectHTMLAttributes<HTMLElement> {}

export default function BookCategorySelect({ ...props }: BookCategorySelectProps) {
  return (
    <select {...props}>
      {CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
