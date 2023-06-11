'use client'

import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/nextjs'
import { Database } from '@/types/supabase'
import { Dispatch, SetStateAction } from 'react'
import supabaseClient from '@/lib/supabaseClient'
import DialogButton from './DialogButton'
import { EllipsisHorizontalIcon, XCircleIcon } from '@heroicons/react/24/solid'

import Avatar from './Avatar'
import UpdateActiveStateButton from './UpdateActiveStateButton'
import timeConvert from '@/utils/timeConvert'
import alternatingBgColor from '@/utils/alternatingBgColor'

interface CardProps {
  task: Database['public']['Tables']['todos']['Row']
  relatedTasks?: number
  i: number
  boardList?: boolean
  setTodos?: Dispatch<SetStateAction<any>>
}

export default function Card({
  task,
  i,
  boardList,
  setTodos,
  relatedTasks,
}: CardProps) {
  const { getToken, userId } = useAuth()
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
  const bgColor = alternatingBgColor(i, bgColors)
  const date = new Date(task.date ?? '')

  const deleteTodo = async (id: string | number) => {
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
      if (error) throw error
    } catch (e) {
      console.log(e)
    } finally {
      setTodos &&
        setTodos((prevState: any) =>
          prevState.filter(
            (item: {
              title: string
              created_at: string
              id: number
              user_id: string
            }) => item.id !== id
          )
        )
      toast('Deleted task! 🗑')
    }
  }

  return (
    <div
      className={clsx(
        bgColor,
        'text-theme-slate-900 rounded-[40px] capitalize p-5'
      )}
    >
      <div className="flex justify-between items-center">
        <Avatar />
        <div className="flex gap-2 items-center">
          {boardList && (
            <DialogButton data={task}>
              <EllipsisHorizontalIcon className="h-10 w-10" />
            </DialogButton>
          )}
          {!boardList && (
            <>
              <span>{timeConvert(task.time)}</span>
              <UpdateActiveStateButton
                getToken={getToken}
                task={task!}
                userId={userId}
              />
              {!task.active && (
                <button disabled={!task} onClick={() => deleteTodo(task.id)}>
                  <span className="sr-only">Delete task</span>
                  <XCircleIcon className="h-16 w-16 fill-red-500/80 hover:fill-red-500/100 transition-all duration-150 ease-linear" />
                </button>
              )}
              <DialogButton data={task}>
                <EllipsisHorizontalIcon className="h-10 w-10" />
              </DialogButton>
            </>
          )}
        </div>
      </div>
      {boardList && (
        <>
          {relatedTasks && (
            <p className="pt-5">
              {relatedTasks} active task{relatedTasks > 1 && 's'}
            </p>
          )}
          <h4 className="text-2xl">{task.board}</h4>
        </>
      )}
      {!boardList && (
        <>
          <p className="pt-5">{task.board}</p>
          <h4 className="text-2xl">{task.title}</h4>
          <p>{date.toDateString()}</p>
          <p className="text-sm text-theme-blue-300">
            {task.active ? 'Active' : 'Finished'}
          </p>
        </>
      )}
    </div>
  )
}
