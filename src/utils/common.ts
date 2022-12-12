import { ParsedUrlQuery } from 'querystring';

export const PAGE_SIZE = 15;

export const filterQuery = (query: ParsedUrlQuery) => {
  return Object.fromEntries(Object.entries(query).filter(([_, value]) => value));
};

export const formatPrice = (price?: string) => {
  return new Intl.NumberFormat('ko').format(Number(price));
};

export const formatDate = (date: Date | number) => {
  return new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};
