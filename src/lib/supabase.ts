import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-key';

/** True hanya jika env vars benar-benar tersedia */
export const supabaseReady =
  !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ── Types ────────────────────────────────────────────────────────────── */

export interface KenaganRow {
  id: string;
  pengirim: string;
  pesan: string;
  warna: string;
  rotasi: number;
  offset_x: number;
  offset_y: number;
  creator_id: string;
  created_at: string;
}

export interface VoteRow {
  id: string;
  kategori_id: number;
  siswa_id: number;
  voter_id: string;
  created_at: string;
}

export interface QuizScoreRow {
  id: string;
  nama: string;
  score: number;
  total: number;
  created_at: string;
}
