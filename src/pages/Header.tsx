import Image from 'next/image';
import styled from 'styled-components';

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
`;

export default function Header() {
  return (
    <Head>
      <Image src="/images/book.png" alt="아이콘" width={50} height={50} />
      <nav>
        <ul>
          <li>전체</li>
          <li>내 책</li>
        </ul>
      </nav>
    </Head>
  );
}
