export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      book: {
        Row: {
          id: number;
          created_at: string | null;
          author: string | null;
          buyer: string | null;
          category: string | null;
          description: string | null;
          discount: number | null;
          image: string | null;
          inStock: boolean;
          isDeleted: boolean;
          isbn: string | null;
          lender: string | null;
          publisher: string | null;
          title: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          author?: string | null;
          buyer?: string | null;
          category?: string | null;
          description?: string | null;
          discount?: number | null;
          image?: string | null;
          inStock?: boolean;
          isDeleted?: boolean;
          isbn?: string | null;
          lender?: string | null;
          publisher?: string | null;
          title?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          author?: string | null;
          buyer?: string | null;
          category?: string | null;
          description?: string | null;
          discount?: number | null;
          image?: string | null;
          inStock?: boolean;
          isDeleted?: boolean;
          isbn?: string | null;
          lender?: string | null;
          publisher?: string | null;
          title?: string | null;
        };
      };
      user: {
        Row: {
          id: string;
          created_at: string | null;
          email: string | null;
          name: string | null;
          role: string | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          email?: string | null;
          name?: string | null;
          role?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          email?: string | null;
          name?: string | null;
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
