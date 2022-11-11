import { colors } from '@/styles/color';
import styled from 'styled-components';
import { ErrorType } from '../ErrorBoundary';

const ErrorText = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${colors.darkGray};
`;

interface Props {
  error: ErrorType;
}

export default function Error({ error }: Props) {
  return <ErrorText>에러가 발생했습니다. {error.message}</ErrorText>;
}
