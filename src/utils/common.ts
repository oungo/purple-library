import { ParsedUrlQuery } from 'querystring';

export const PAGE_SIZE = 15;

export const filterQuery = (query: ParsedUrlQuery) => {
  return Object.fromEntries(Object.entries(query).filter(([_, value]) => value));
};

export const formatPrice = (price = 0) => {
  return new Intl.NumberFormat('ko').format(price);
};

export const formatDate = (date: Date | number) => {
  return new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormValue = <ElementType>(form: ElementType): { [key: string]: any } => {
  return Object.fromEntries(new FormData(form as HTMLFormElement));
};
