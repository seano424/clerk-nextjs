import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''

const supabaseClient = async (supabaseAccessToken: any) => {
  const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  })
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase
}

export default supabaseClient
