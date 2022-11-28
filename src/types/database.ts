export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      book: {
        Row: {
          id: number;
          createdAt: string | null;
          title: string;
          author: string | null;
          publisher: string | null;
          isbn: string;
          inStock: boolean;
          image: string | null;
          discount: string | null;
          buyer: string | null;
          buyDate: string | null;
          lender: string | null;
        };
        Insert: {
          id?: number;
          createdAt?: string | null;
          title: string;
          author?: string | null;
          publisher?: string | null;
          isbn: string;
          inStock?: boolean;
          image?: string | null;
          discount?: string | null;
          buyer?: string | null;
          buyDate?: string | null;
          lender?: string | null;
        };
        Update: {
          id?: number;
          createdAt?: string | null;
          title?: string;
          author?: string | null;
          publisher?: string | null;
          isbn?: string;
          inStock?: boolean;
          image?: string | null;
          discount?: string | null;
          buyer?: string | null;
          buyDate?: string | null;
          lender?: string | null;
        };
      };
      user: {
        Row: {
          id: number;
          created_at: string | null;
          email: string | null;
          name: string | null;
          role: string | null;
          uid: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          email?: string | null;
          name?: string | null;
          role?: string | null;
          uid?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          email?: string | null;
          name?: string | null;
          role?: string | null;
          uid?: string | null;
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
