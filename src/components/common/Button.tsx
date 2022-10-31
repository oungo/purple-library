import { colors } from '@/styles/color';
import React from 'react';
import styled from 'styled-components';

export const PrimaryButton = styled.button`
  background-color: ${colors.brand};
  border: 2px solid ${colors.brand};
  color: ${colors.white};
  padding: 5px 20px;
  border-radius: 10px;
  font-size: small;
  font-weight: bold;
  :hover {
    opacity: 0.9;
  }
  :active {
    background-color: ${colors.brandAccent};
    border-color: ${colors.brandAccent};
  }
`;

export const DefaultButton = styled.button`
  background-color: ${colors.white};
  border: 2px solid ${colors.gray};
  color: ${colors.brand};
  padding: 5px 20px;
  border-radius: 10px;
  font-size: small;
  font-weight: bold;
  :hover {
    box-shadow: 0 8px 20px 1px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s;
  }
  :active {
    background-color: ${colors.gray};
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  color?: 'primary' | 'default';
  onClick?: () => void;
}

export default function Button({ color = 'default', children, ...props }: ButtonProps) {
  if (color === 'primary') return <PrimaryButton {...props}>{children}</PrimaryButton>;
  return <DefaultButton {...props}>{children}</DefaultButton>;
}
