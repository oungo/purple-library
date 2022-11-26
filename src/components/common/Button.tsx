import { colors } from '@/styles/color';
import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonType = 'primary' | 'default';
const ButtonComponent = styled.button<{ buttonType?: ButtonType }>`
  ${(props) => {
    switch (props.buttonType) {
      case 'primary':
        return css`
          background-color: ${colors.primary};
          border: 1px solid ${colors.primary};
          color: ${colors.white};
          :hover {
            opacity: 0.8;
          }
          :active {
            background-color: ${colors.primaryVariant};
            border-color: ${colors.primaryVariant};
          }
        `;
      default:
        return css`
          background-color: ${colors.white};
          border: 1px solid ${colors.gray};
          color: ${colors.black};
          :hover {
            border-color: ${colors.primary};
            color: ${colors.primary};
          }
          :active {
            border-color: ${colors.primaryVariant};
            color: ${colors.primaryVariant};
          }
        `;
    }
  }}
  padding: 5px 20px;
  border-radius: 5px;
  font-size: small;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  buttonType?: ButtonType;
}

export default function Button({ buttonType, children, ...props }: ButtonProps) {
  return (
    <ButtonComponent buttonType={buttonType} {...props}>
      {children}
    </ButtonComponent>
  );
}
