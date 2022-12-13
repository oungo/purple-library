import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { filterQuery, getFormValue } from '@/utils/common';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export default function BookSearchInput() {
  const router = useRouter();

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ query: filterQuery({ ...router.query, ...getFormValue(e.target) }) });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="title" defaultValue={router.query.title} />
      <Button>검색</Button>
    </Form>
  );
}
