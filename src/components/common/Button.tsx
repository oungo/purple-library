import { colors } from '@/styles/color';
import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonType = 'primary' | 'default';
interface ButtonComponentProps {
  buttonType?: ButtonType;
  fullWidth?: boolean;
}
const ButtonComponent = styled.button<ButtonComponentProps>`
  width: ${(props) => props.fullWidth && '100%'};
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
  padding: 10px 20px;
  border-radius: 5px;
  font-size: small;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  buttonType?: ButtonType;
  fullWidth?: boolean;
}

export default function Button({ buttonType, fullWidth, children, ...props }: ButtonProps) {
  return (
    <ButtonComponent buttonType={buttonType} fullWidth={fullWidth} {...props}>
      {children}
    </ButtonComponent>
  );
}
