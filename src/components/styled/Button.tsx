import styled from 'styled-components';

export const PrimaryButton = styled.button`
  background-color: rgb(32, 129, 226);
  border: 2px solid rgb(32, 129, 226);
  color: #fff;
  padding: 1rem;
  border-radius: 1rem;
  font-weight: bold;
  :hover {
    opacity: 0.9;
  }
`;

export const Button = styled.button`
  background-color: #fff;
  border: 2px solid rgba(0, 0, 0, 0.1);
  color: rgb(32, 129, 226);
  padding: 1rem;
  border-radius: 1rem;
  font-weight: bold;
  :hover {
    box-shadow: 0 8px 20px 1px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s;
  }
`;
