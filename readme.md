# Purple Library

사내 도서 관리를 보다 편하게 하기 위한 서비스.

## Description

기존에 사내 도서를 엑셀 파일로 관리하면서 도서명, 출판사, 저자 등 데이터를 하나하나 직접 입력 해야하고, 누구나 자유롭게 어떤 데이터든지 수정이 가능한 상태였습니다.

Purple Library를 통해 한번의 버튼 클릭으로 구매 예정도서를 추가하고, 대여, 반납을 보다 편리하게 가능하도록 했고, 관리자만 데이터 관리가 가능하도록 했습니다.

## Tech Stack

React, Typescript, Nextjs, Styled-Component, React-Query, Zustand, Supabase

## Getting Started

먼저 도서 검색이나, api 호출을 위한 개발 환경 설정이 필요합니다.

1. 아래 명령어를 통해 저장소를 다운로드합니다.

```
git clone https://github.com/oungo/purple-library.git
```

2. 최상위 디렉토리에 .env.local 파일을 생성하고, 네이버 도서 검색을 위한 키와, supabase 관련 키를 설정해줍니다. NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET는 [네이버 개발자 센터](https://developers.naver.com/apps/#/register)에서 애플리케이션을 등록하면 발급받을 수 있습니다. NEXT_PUBLIC_SUPABASE_URL와 NEXT_PUBLIC_SUPABASE_ANON_KEY는 [supabase 가이드 문서](https://supabase.com/docs/guides/resources/supabase-cli/local-development)에 따라 supabase 로컬 서버를 띄우면 제공되는 API URL과 anon key를 넣으시면 됩니다.

```NAVER_BOOK_LIST_API_ENDPOINT=https://openapi.naver.com/v1/search/book.json
NAVER_BOOK_INFO_API_ENDPOINT=https://openapi.naver.com/v1/search/book_adv.json
NAVER_CLIENT_ID=naver_client_id
NAVER_CLIENT_SECRET=naver_client_secret

NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=next_public_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=next_public_supabase_anon_key
```

3. 위에서 안내한 설정을 마친 후 디렉토리에서 패키지를 다운받고 실행하시면 됩니다.

```
yarn install
```
