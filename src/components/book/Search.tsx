import styled from 'styled-components';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

const Container = styled.div`
  position: relative;
  text-align: center;
  flex: 1;
`;

export default function Search() {
  return (
    <Container>
      <SearchInput />
      <SearchResult />
    </Container>
  );
}
