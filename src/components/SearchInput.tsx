import { KeyboardEvent } from 'react';
import { useKeywordStore } from '../store/useKeywordStore';

export default function SearchInput() {
  const store = useKeywordStore();

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    store.change(e.currentTarget.value);
  };

  return <input onKeyUp={handleKeyup} />;
}
