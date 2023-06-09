'use client'

import clsx from 'clsx'
import { Database } from '@/types/supabase'
import Link from 'next/link'
import Avatar from './Avatar'
import DeleteTodo from './DeleteTodo'
import UpdateActiveTodo from './UpdateActiveTodo'
import timeConvert from '@/utils/timeConvert'
import alternatingBgColor from '@/utils/alternatingBgColor'

interface TodoCardProps {
  todo: Database['public']['Tables']['todos']['Row']
  relatedTodos?: number
  i: number
}

export default function TodoCard({ todo, i }: TodoCardProps) {
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
  const bgColor = alternatingBgColor(i, bgColors)
  const date = new Date(todo.date ?? '')

  return (
    <Link
      href={{
        pathname: `/todo/${todo.id}`,
        query: { colorIndex: i },
      }}
    >
      <div
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
            <UpdateActiveTodo todo={todo!} />
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
      </div>
    </Link>
  )
}
