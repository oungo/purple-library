import { colors } from '@/styles/color';
import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import Spinner, { SpinnerContainer } from './Spinner';

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
  ${(props) =>
    props.$loading &&
    css`
      opacity: 0.5;
      :hover {
        background-color: ${colors.primary};
        opacity: 0.4;
      }
    `}
  position: relative;
  padding: ${(props) => {
    switch (props.size) {
      case 'small':
        return '3px 10px';
      case 'large':
        return '20px 40px';
      default:
        return '10px 20px';
    }
  }};
  border-radius: 5px;
  font-size: small;
`;
const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${SpinnerContainer} {
    div {
      border-color: ${colors.white} transparent transparent transparent;
    }
  }
`;

type ButtonComponentProps = Omit<ButtonProps, 'loading'> & { $loading?: boolean };
interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  buttonType?: 'primary' | 'default';
  fullWidth?: boolean;
  loading?: boolean;
  size?: 'default' | 'small' | 'large';
}

export default function Button({
  buttonType,
  fullWidth,
  loading,
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonComponent
      buttonType={buttonType}
      fullWidth={fullWidth}
      $loading={loading}
      disabled={loading}
      size={size}
      {...props}
    >
      {loading && (
        <LoadingContainer>
          <Spinner size={size} />
        </LoadingContainer>
      )}

      {children}
    </ButtonComponent>
  );
}
