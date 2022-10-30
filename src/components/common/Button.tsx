import { colors } from '@/styles/color';
import React from 'react';
import styled from 'styled-components';

export const PrimaryButton = styled.button`
  background-color: ${colors.primary};
  border: 2px solid ${colors.primary};
  color: ${colors.white};
  padding: 5px 20px;
  border-radius: 10px;
  font-size: small;
  font-weight: bold;
  :hover {
    opacity: 0.9;
  }
  :active {
    background-color: rgb(26, 98, 170);
    border-color: rgb(26, 98, 170);
  }
`;

export const DefaultButton = styled.button`
  background-color: ${colors.white};
  border: 2px solid ${colors.gray};
  color: ${colors.primary};
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
