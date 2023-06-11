import { atom } from 'jotai'
import { Database } from '@/types/supabase'

export const initialData = {
  active: true,
  board: '',
  created_at: '',
  date: '',
  id: 0,
  time: '',
  title: '',
  user_id: '',
}

const modalAtom = atom<{
  open: boolean
  data: Database['public']['Tables']['todos']['Row'] | typeof initialData,
  bgColor: number
}>({
  open: false,
  data: initialData,
  bgColor: 0,
})

export default modalAtom