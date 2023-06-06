import clsx from 'clsx'
import { Todo } from './TasksList'
import { toast } from 'react-toastify'
import supabaseClient from '@/lib/supabaseClient'
import { CheckCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

interface ActiveButtonProps {
  active: boolean
  task: Todo
  setTodos: any
  userId: any
  getToken: any
}

export default function ActiveButton({
  active,
  task,
  setTodos,
  userId,
  getToken,
}: ActiveButtonProps) {
  const updateActive = async (task: any) => {
    const notify = (text: string) => toast(text)

    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })

    const supabase = await supabaseClient(supabaseAccessToken)

    try {
      const { error } = await supabase
        .from('todos')
        .update({ active: !task?.active })
        .eq('id', task.id)
        .eq('user_id', userId)
        .select()
      setTodos((prevState: any) => {
        if (prevState.id === task.id) {
          return {
            ...prevState,
            active: !prevState.active,
          }
        }
        return prevState
      })
      if (error) throw error
    } catch (e) {
      alert(e)
    } finally {
      task?.active
        ? notify('Completed task! Good job 🎊')
        : notify('Undoing that! Moved back to active! 💪🏽')
    }
  }

  return (
    <button
      disabled={!task}
      onClick={() => updateActive(task)}
      className={clsx(
        !active &&
          'border-2 rounded-full p-2 border-theme-blue-900 hover:border-opacity-60 transition-all duration-150 ease-linear'
      )}
    >
      <span className="sr-only">
        {active ? 'Mark task done' : 'Undo marking task done'}
      </span>
      {active ? (
        <CheckCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
      ) : (
        <ArrowUturnLeftIcon className="h-8 w-8 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
      )}
    </button>
  )
}
