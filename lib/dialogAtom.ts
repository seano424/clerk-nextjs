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
  description: '',
}

const dialogAtom = atom<{
  open: boolean
  data: typeof initialData | Database['public']['Tables']['todos']['Row'] | Database['public']['Tables']['todos_public']['Row']
  bgColor: number
  type: 'Add' | 'Edit'
}>({
  open: false,
  data: initialData,
  bgColor: 0,
  type: 'Add',
})

export default dialogAtom