import { atom } from 'jotai'
import { Database } from '@/types/supabase'

const todosAtom = atom<Database['public']['Tables']['todos']['Row'][] | null>(null)

export default todosAtom