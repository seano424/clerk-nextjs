import DialogButton from './DialogButton'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { Database } from '@/types/supabase'

export default function UpsertTodo({
  todo,
  i,
}: {
  todo: Database['public']['Tables']['todos']['Row']
  i: number
}) {
  return (
    <DialogButton i={i} data={todo}>
      <EllipsisHorizontalIcon className="h-10 w-10 hover:bg-white/60 rounded-full transition-all duration-200 ease-linear" />
    </DialogButton>
  )
}
