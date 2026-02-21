import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client with elevated privileges (API routes only)
export const supabaseAdmin = () =>
  createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  })

// Database types
export interface BookingRow {
  id?: string
  created_at?: string
  first_name: string
  last_name: string
  phone: string
  pickup_zip: string
  dropoff_zip: string
  vehicle_make_model: string
  service_type: string
  preferred_shop?: string | null
  notes?: string | null
  tip_amount?: number | null
  payment_method: string
  agreed_to_terms: boolean
  insurance_doc_url?: string | null
  status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
}
