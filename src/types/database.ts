export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      book: {
        Row: {
          id: number;
          title: string;
          createdAt: string | null;
          author: string | null;
          publisher: string | null;
          isbn: string;
          inStock: boolean;
          image: string | null;
          discount: string | null;
          buyer: string | null;
          buyDate: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          createdAt?: string | null;
          author?: string | null;
          publisher?: string | null;
          isbn: string;
          inStock?: boolean;
          image?: string | null;
          discount?: string | null;
          buyer?: string | null;
          buyDate?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          createdAt?: string | null;
          author?: string | null;
          publisher?: string | null;
          isbn?: string;
          inStock?: boolean;
          image?: string | null;
          discount?: string | null;
          buyer?: string | null;
          buyDate?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
