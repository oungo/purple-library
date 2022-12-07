import { useBoundStore } from '@/store/useBoundStore';
import { colors } from '@/styles/color';
import { KeyboardEvent } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 50%;
  height: 3rem;
  padding: 10px;
  border: none;
  border: 1px solid ${colors.gray};
  border-radius: 0.5rem;
`;

export default function SearchInput() {
  const change = useBoundStore((state) => state.change);

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    change(e.currentTarget.value);
  };

  return <Input onKeyUp={handleKeyup} placeholder="검색" />;
}
