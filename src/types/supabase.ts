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
          lenderEmail: string | null;
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
          lenderEmail?: string | null;
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
          lenderEmail?: string | null;
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
