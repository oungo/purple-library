import { colors } from '@/styles/color';
import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const InputComponent = styled.input<{ fullWidth?: boolean }>`
  width: ${(props) => props.fullWidth && '100%'};
  padding: 5px 10px;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  :focus,
  :hover {
    border-color: ${colors.primary};
  }
  :active {
    border-color: ${colors.primaryVariant};
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  fullWidth?: boolean;
}

export default function Input({ fullWidth, ...props }: InputProps) {
  return <InputComponent fullWidth={fullWidth} {...props} />;
}
