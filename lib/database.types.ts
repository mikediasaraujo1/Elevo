export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          whatsapp: string | null;
          subscribed: boolean;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          whatsapp?: string | null;
          subscribed?: boolean;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          whatsapp?: string | null;
          subscribed?: boolean;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      proposals: {
        Row: {
          id: string;
          user_id: string;
          slug: string;
          titulo: string;
          endereco: string;
          bairro: string;
          cidade: string;
          preco: number;
          area_m2: number | null;
          quartos: number | null;
          banheiros: number | null;
          vagas: number | null;
          descricao: string | null;
          fotos: string[];
          views: number;
          last_viewed: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          slug: string;
          titulo: string;
          endereco: string;
          bairro: string;
          cidade: string;
          preco: number;
          area_m2?: number | null;
          quartos?: number | null;
          banheiros?: number | null;
          vagas?: number | null;
          descricao?: string | null;
          fotos?: string[];
          views?: number;
          last_viewed?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          slug?: string;
          titulo?: string;
          endereco?: string;
          bairro?: string;
          cidade?: string;
          preco?: number;
          area_m2?: number | null;
          quartos?: number | null;
          banheiros?: number | null;
          vagas?: number | null;
          descricao?: string | null;
          fotos?: string[];
          views?: number;
          last_viewed?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      proposal_views: {
        Row: {
          id: string;
          proposal_id: string;
          ip: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          proposal_id: string;
          ip?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          proposal_id?: string;
          ip?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      track_proposal_view: {
        Args: {
          p_slug: string;
          p_ip: string;
          p_user_agent: string;
        };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Proposal = Database["public"]["Tables"]["proposals"]["Row"];
