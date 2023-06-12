'use client'

import clsx from 'clsx'
import { useAuth } from '@clerk/nextjs'
import { Database } from '@/types/supabase'
import { Dispatch, SetStateAction } from 'react'

import Avatar from './Avatar'
import DeleteTodo from './DeleteTodo'
import UpdateActiveTodo from './UpdateActiveTodo'
import timeConvert from '@/utils/timeConvert'
import alternatingBgColor from '@/utils/alternatingBgColor'
import modalAtom from '@/lib/modalAtom'
import { useSetAtom } from 'jotai'

interface TodoCardProps {
  todo: Database['public']['Tables']['todos']['Row']
  relatedTodos?: number
  i: number
  setTodos?: Dispatch<SetStateAction<any>>
}

export default function TodoCard({ todo, i }: TodoCardProps) {
  const { getToken, userId } = useAuth()
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
  const bgColor = alternatingBgColor(i, bgColors)
  const date = new Date(todo.date ?? '')
  const setModal = useSetAtom(modalAtom)

  const handleModal = () => {
    setModal({ data: todo, open: true, bgColor: i })
  }

  return (
    <button
      onClick={handleModal}
      className={clsx(
        bgColor,
        'w-full',
        'text-theme-slate-900 rounded-[40px] capitalize p-5'
      )}
    >
      <div className="flex justify-between items-center">
        <Avatar />
        <div className="flex gap-2 items-center">
          <span>{timeConvert(todo.time)}</span>
          <UpdateActiveTodo getToken={getToken} todo={todo!} userId={userId} />
          {!todo.active && <DeleteTodo id={todo.id} />}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <p className="pt-5">{todo.board}</p>
        <h4 className="text-2xl">{todo.title}</h4>
        <p>{date.toDateString()}</p>
        <p className="text-sm text-theme-blue-300">
          {todo.active ? 'Active' : 'Completed'}
        </p>
      </div>
    </button>
  )
}
