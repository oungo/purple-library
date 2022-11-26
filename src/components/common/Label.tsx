import { LabelHTMLAttributes } from 'react';
import styled from 'styled-components';

const LabelComponent = styled.label`
  display: block;
`;

interface ILabelProps extends LabelHTMLAttributes<HTMLElement> {}

export default function Label({ children, ...props }: ILabelProps) {
  return <LabelComponent {...props}>{children}</LabelComponent>;
}
