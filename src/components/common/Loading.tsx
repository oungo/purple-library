import { colors } from '@/styles/color';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  margin: auto;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 8px;
    border: 4px solid ${colors.primary};
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

export default function Loading() {
  return (
    <LoadingWrapper className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}
