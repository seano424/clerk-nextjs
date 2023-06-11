import clsx from 'clsx'
import { Database } from '@/types/supabase'
import { toast } from 'react-toastify'
import supabaseClient from '@/lib/supabaseClient'
import { CheckCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

interface UpdateActiveTodo {
  todo: Database['public']['Tables']['todos']['Row']
  userId: any
  getToken: any
}

export default function UpdateActiveStateButton({
  todo,
  userId,
  getToken,
}: UpdateActiveTodo) {
  const updateActive = async (todo: any) => {
    const notify = (text: string) => toast(text)

    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })

    const supabase = await supabaseClient(supabaseAccessToken)

    try {
      const { error } = await supabase
        .from('todos')
        .update({ active: !todo.active })
        .eq('id', todo.id)
        .eq('user_id', userId)
        .select()
      if (error) throw error
    } catch (e) {
      alert(e)
    } finally {
      todo?.active
        ? notify('Completed todo! Good job 🎊')
        : notify('Undoing that! Moved back to active! 💪🏽')
    }
  }

  return (
    <button
      disabled={!todo}
      onClick={() => updateActive(todo)}
      className={clsx(
        !todo.active &&
          'group border-4 rounded-full p-[5px] border-theme-blue-300 hover:border-theme-blue-700 transition-all duration-300 ease-linear'
      )}
    >
      <span className="sr-only">
        {todo.active ? 'Mark todo done' : 'Undo marking todo done'}
      </span>
      {todo.active ? (
        <CheckCircleIcon className="h-16 w-16 fill-theme-blue-300/100 group-hover:fill-red-500/90 transition-all duration-200 ease-linear" />
      ) : (
        <ArrowUturnLeftIcon className="h-8 w-8 fill-theme-blue-300 group-hover:fill-theme-blue-900 transition-all duration-300 ease-linear" />
      )}
    </button>
  )
}
