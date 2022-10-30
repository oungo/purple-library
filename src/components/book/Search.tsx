import styled from 'styled-components';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

const Container = styled.div`
  position: relative;
`;

export default function Search() {
  return (
    <Container>
      <SearchInput />
      <SearchResult />
    </Container>
  );
}
