import { colors } from '@/styles/color';
import styled from 'styled-components';

const ErrorText = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${colors.darkGray};
`;

export default function Error() {
  return <ErrorText>에러가 발생했습니다</ErrorText>;
}
