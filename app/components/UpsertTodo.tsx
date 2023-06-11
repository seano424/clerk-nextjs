import DialogButton from './DialogButton'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { Database } from '@/types/supabase'

export default function UpsertTodo({
  todo,
}: {
  todo: Database['public']['Tables']['todos']['Row']
}) {
  return (
    <DialogButton data={todo}>
      <EllipsisHorizontalIcon className="h-10 w-10" />
    </DialogButton>
  )
}
