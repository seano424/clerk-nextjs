import { atom } from 'jotai'
import { Database } from '@/types/supabase'

const initialData = {
  active: true,
  board: 'my board',
  created_at: '',
  date: '',
  id: '',
  time: 1212,
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