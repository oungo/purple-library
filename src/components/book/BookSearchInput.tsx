import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { filterQuery } from '@/utils/common';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

interface SearchFormValue {
  [key: string]: string;
}

export default function BookSearchInput() {
  const router = useRouter();

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formValue = Object.fromEntries(formData) as SearchFormValue;

    router.push({ query: filterQuery({ ...router.query, ...formValue }) });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="title" defaultValue={router.query.title} />
      <Button>검색</Button>
    </Form>
  );
}
