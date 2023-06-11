'use client'

import clsx from 'clsx'
import { useAuth } from '@clerk/nextjs'
import { Database } from '@/types/supabase'
import { Dispatch, SetStateAction } from 'react'
import UpsertTodo from './UpsertTodo'

import Avatar from './Avatar'
import DeleteTodo from './DeleteTodo'
import UpdateActiveTodo from './UpdateActiveTodo'
import timeConvert from '@/utils/timeConvert'
import alternatingBgColor from '@/utils/alternatingBgColor'

interface CardProps {
  todo: Database['public']['Tables']['todos']['Row']
  relatedTodos?: number
  i: number
  boardList?: boolean
  setTodos?: Dispatch<SetStateAction<any>>
}

export default function Card({ todo, i, boardList, relatedTodos }: CardProps) {
  const { getToken, userId } = useAuth()
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
  const bgColor = alternatingBgColor(i, bgColors)
  const date = new Date(todo.date ?? '')

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
          {boardList && <UpsertTodo i={i} todo={todo} />}
          {!boardList && (
            <>
              <span>{timeConvert(todo.time)}</span>
              <UpdateActiveTodo
                getToken={getToken}
                todo={todo!}
                userId={userId}
              />
              <DeleteTodo id={todo.id} />
              <UpsertTodo i={i} todo={todo} />
            </>
          )}
        </div>
      </div>
      {boardList && (
        <>
          {relatedTodos && (
            <p className="pt-5">
              {relatedTodos} active todo{relatedTodos > 1 && 's'}
            </p>
          )}
          <h4 className="text-2xl">{todo.board}</h4>
        </>
      )}
      {!boardList && (
        <>
          <p className="pt-5">{todo.board}</p>
          <h4 className="text-2xl">{todo.title}</h4>
          <p>{date.toDateString()}</p>
          <p className="text-sm text-theme-blue-300">
            {todo.active ? 'Active' : 'Completed'}
          </p>
        </>
      )}
    </div>
  )
}
