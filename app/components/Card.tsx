'use client'

import clsx from 'clsx'
import { useAuth } from '@clerk/nextjs'
import ActiveButton from './ActiveButton'
import { toast } from 'react-toastify'
import supabaseClient from '@/lib/supabaseClient'
import { EllipsisHorizontalIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { Dispatch, SetStateAction } from 'react'
import { timeConvert, alternatingBgColor } from '@/lib/utils'
import Avatar from './Avatar'

interface CardProps {
  task: {
    title: string
    created_at: string
    id: number
    user_id: string
    board: string
    time: number
    active: boolean
    date: string
  }
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

  const deleteTodo = async (id: string | number) => {
    const notify = (text: string) => toast(text)

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
      alert(e)
    } finally {
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
      notify('Deleted task! 🗑')
    }
  }

  return (
    <div
      className={clsx(
        alternatingBgColor(i, bgColors),
        'text-theme-slate-900 rounded-[40px] capitalize p-5'
      )}
    >
      <div className="flex justify-between items-center">
        <Avatar />
        <div className="flex gap-2 items-center">
          {boardList && (
            <button>
              <EllipsisHorizontalIcon className="h-10 w-10" />
            </button>
          )}
          {!boardList && (
            <>
              <span>{timeConvert(task.time)}</span>
              <ActiveButton
                active={task!.active}
                getToken={getToken}
                setTodos={setTodos}
                task={task!}
                userId={userId}
              />
              {!task.active && (
                <button disabled={!task} onClick={() => deleteTodo(task.id)}>
                  <span className="sr-only">Delete task</span>
                  <XCircleIcon className="h-16 w-16 fill-red-400/90 hover:fill-red-400/100 transition-all duration-150 ease-linear" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {boardList ? (
        <>
          {relatedTasks && (
            <p className="pt-5">
              {relatedTasks} active task{relatedTasks > 1 && 's'}
            </p>
          )}
          <h4 className="text-2xl">{task.board}</h4>
        </>
      ) : (
        <>
          <p className="pt-5">{task.board}</p>
          <h4 className="text-2xl">{task.title}</h4>
        </>
      )}
    </div>
  )
}
