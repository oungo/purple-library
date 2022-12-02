import { colors } from '@/styles/color';
import styled, { css } from 'styled-components';

export const SpinnerContainer = styled.div<SpinnerProps>`
  display: block;
  position: relative;
  ${(props) => {
    switch (props.size) {
      case 'small':
        return css`
          width: 20px;
          height: 20px;
        `;
      case 'large':
        return css`
          width: 100px;
          height: 100px;
        `;
      default:
        return css`
          width: 30px;
          height: 30px;
        `;
    }
  }}
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid ${colors.primary};
    border-radius: 50%;
    border-color: ${colors.primary} transparent transparent transparent;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    :nth-child(1) {
      animation-delay: -0.45s;
    }
    :nth-child(2) {
      animation-delay: -0.3s;
    }
    :nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

interface SpinnerProps {
  size?: 'default' | 'small' | 'large';
}
export default function Spinner({ size = 'default' }: SpinnerProps) {
  return (
    <SpinnerContainer size={size}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerContainer>
  );
}
