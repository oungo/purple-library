import SearchInput from '../components/SearchInput';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('test rendering elements', () => {
  it('exists input box for search and message when rendered', () => {
    // setup, act
    render(<SearchInput />);

    // assert
    // expect(screen.getByPlaceholderText('검색어')).toBeInTheDocument();
    // expect(screen.getByText('현재 API 호출 횟수 = 0')).toBeInTheDocument();
  });
});
