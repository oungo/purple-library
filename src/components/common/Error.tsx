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
  return (
    <ErrorText>
      <p>에러가 발생했습니다. </p>
      <p>{error.message || error.errorMessage}</p>
      <p>Code: {error.code || error.errorCode}</p>
    </ErrorText>
  );
}
