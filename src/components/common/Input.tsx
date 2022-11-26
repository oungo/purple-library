import { colors } from '@/styles/color';
import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const InputComponent = styled.input`
  padding: 10px;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  :focus,
  :hover {
    border-color: ${colors.primary};
  }
  :active {
    border-color: ${colors.primaryVariant};
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLElement> {}

export default function Input({ ...props }: InputProps) {
  return <InputComponent {...props} />;
}
