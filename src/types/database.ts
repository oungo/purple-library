export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      book: {
        Row: {
          id: number;
          author: string | null;
          category: string | null;
          description: string | null;
          discount: number | null;
          image: string | null;
          buyer: string | null;
          isbn: string | null;
          publisher: string | null;
          title: string | null;
          buyDate: string | null;
          lender: string | null;
          createdAt: string | null;
          inStock: boolean;
          isDeleted: boolean;
          lendDate: string | null;
        };
        Insert: {
          id?: number;
          author?: string | null;
          category?: string | null;
          description?: string | null;
          discount?: number | null;
          image?: string | null;
          buyer?: string | null;
          isbn?: string | null;
          publisher?: string | null;
          title?: string | null;
          buyDate?: string | null;
          lender?: string | null;
          createdAt?: string | null;
          inStock?: boolean;
          isDeleted?: boolean;
          lendDate?: string | null;
        };
        Update: {
          id?: number;
          author?: string | null;
          category?: string | null;
          description?: string | null;
          discount?: number | null;
          image?: string | null;
          buyer?: string | null;
          isbn?: string | null;
          publisher?: string | null;
          title?: string | null;
          buyDate?: string | null;
          lender?: string | null;
          createdAt?: string | null;
          inStock?: boolean;
          isDeleted?: boolean;
          lendDate?: string | null;
        };
      };
      user: {
        Row: {
          id: number;
          email: string | null;
          name: string | null;
          uid: string | null;
          createdAt: string | null;
          role: string | null;
        };
        Insert: {
          id?: number;
          email?: string | null;
          name?: string | null;
          uid?: string | null;
          createdAt?: string | null;
          role?: string | null;
        };
        Update: {
          id?: number;
          email?: string | null;
          name?: string | null;
          uid?: string | null;
          createdAt?: string | null;
          role?: string | null;
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
