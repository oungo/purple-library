import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import styled from 'styled-components';

const TabList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;
`;
const TabItem = styled.li`
  cursor: pointer;
`;

export default function Tabs() {
  const router = useRouter();

  const handleClickTab = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement;
    if (target.tagName !== 'LI') return;

    const tabValue = target.dataset.tabValue;

    const query = { ...router.query, inStock: tabValue, page: null };
    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([_, value]) => value));

    router.replace({
      pathname: router.pathname,
      query: filteredQuery,
    });
  };

  return (
    <TabList onClick={handleClickTab}>
      <TabItem data-tab-value={null}>전체</TabItem>
      <TabItem data-tab-value={false}>구매 예정</TabItem>
      <TabItem data-tab-value={true}>보유 도서</TabItem>
    </TabList>
  );
}
