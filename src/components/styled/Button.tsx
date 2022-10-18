import { colors } from '@/styles/color';
import styled from 'styled-components';

interface ButtonProps {
  flex?: boolean;
}

export const PrimaryButton = styled.button<ButtonProps>`
  flex: ${(props) => (props.flex ? 1 : 'none')};
  background-color: ${colors.primary};
  border: 2px solid ${colors.primary};
  color: #fff;
  padding: 1.5rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  :hover {
    opacity: 0.9;
  }
  :active {
    background-color: rgb(26, 98, 170);
    border-color: rgb(26, 98, 170);
  }
`;

export const Button = styled.button<ButtonProps>`
  flex: ${(props) => (props.flex ? 1 : 'none')};
  background-color: #fff;
  border: 2px solid ${colors.gray};
  color: ${colors.primary};
  padding: 1rem;
  border-radius: 1rem;
  font-weight: bold;
  :hover {
    box-shadow: 0 8px 20px 1px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s;
  }
  :active {
    background-color: ${colors.gray};
  }
`;
