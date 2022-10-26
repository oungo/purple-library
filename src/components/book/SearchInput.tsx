import { useBoundStore } from '@/store/useBoundStore';
import { KeyboardEvent } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 50%;
  height: 3rem;
  padding: 10px;
  display: block;
  margin: auto;
  border: none;
  border: 1px solid gray;
  border-radius: 0.5rem;
`;

export default function SearchInput() {
  const change = useBoundStore((state) => state.change);

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    change(e.currentTarget.value);
  };

  return <Input onKeyUp={handleKeyup} placeholder="검색" />;
}
