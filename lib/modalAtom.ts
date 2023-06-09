import { atom } from 'jotai'
import { Database } from '@/types/supabase'

const modalAtom = atom<{
  open: boolean
  data: Database['public']['Tables']['todos']['Row'] | null,
  bgColor: number
}>({
  open: false,
  data: null,
  bgColor: 0,
})

export default modalAtom