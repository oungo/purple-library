export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      book: {
        Row: {
          id: number;
          inStock: boolean;
          author: string | null;
          category: string | null;
          description: string | null;
          discount: number | null;
          image: string | null;
          buyer: string | null;
          isbn: string | null;
          publisher: string | null;
          title: string | null;
          createdAt: string | null;
          buyDate: string | null;
          isDeleted: boolean;
          lender: string | null;
        };
        Insert: {
          id?: number;
          inStock?: boolean;
          author?: string | null;
          category?: string | null;
          description?: string | null;
          discount?: number | null;
          image?: string | null;
          buyer?: string | null;
          isbn?: string | null;
          publisher?: string | null;
          title?: string | null;
          createdAt?: string | null;
          buyDate?: string | null;
          isDeleted?: boolean;
          lender?: string | null;
        };
        Update: {
          id?: number;
          inStock?: boolean;
          author?: string | null;
          category?: string | null;
          description?: string | null;
          discount?: number | null;
          image?: string | null;
          buyer?: string | null;
          isbn?: string | null;
          publisher?: string | null;
          title?: string | null;
          createdAt?: string | null;
          buyDate?: string | null;
          isDeleted?: boolean;
          lender?: string | null;
        };
      };
      user: {
        Row: {
          id: number;
          createdAt: string | null;
          email: string | null;
          name: string | null;
          role: string | null;
          uid: string | null;
        };
        Insert: {
          id?: number;
          createdAt?: string | null;
          email?: string | null;
          name?: string | null;
          role?: string | null;
          uid?: string | null;
        };
        Update: {
          id?: number;
          createdAt?: string | null;
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
