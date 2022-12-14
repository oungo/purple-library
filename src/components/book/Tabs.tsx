import { colors } from '@/styles/color';
import { filterQuery } from '@/utils/common';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import styled from 'styled-components';

const TabList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;
`;
const TabItem = styled.li<{ active: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.active ? colors.primary : colors.darkGray)};
`;

export default function Tabs() {
  const router = useRouter();

  const handleClickTab = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement;
    if (target.tagName !== 'LI') return;

    const tabValue = target.dataset.tabValue;

    router.push(
      {
        pathname: router.pathname,
        query: filterQuery({ inStock: tabValue, page: '' }),
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <TabList onClick={handleClickTab}>
      <TabItem active={!router.query.inStock} data-tab-value={null}>
        전체
      </TabItem>
      <TabItem active={router.query.inStock === 'false'} data-tab-value={false}>
        구매 예정
      </TabItem>
      <TabItem active={router.query.inStock === 'true'} data-tab-value={true}>
        보유 도서
      </TabItem>
    </TabList>
  );
}
