'use client'

import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import alternatingBgColor from '@/utils/alternatingBgColor'

import Avatar from './Avatar'
import UpsertTodo from './UpsertTodo'
import { Database } from '@/types/supabase'

interface BoardCardProps {
  todo: Database['public']['Tables']['todos']['Row']
  relatedTodos: { board: string; active: boolean }[] | undefined
  i: number
  setTodos?: Dispatch<SetStateAction<any>>
}

export default function BoardCard({ todo, i, relatedTodos }: BoardCardProps) {
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
  const bgColor = alternatingBgColor(i, bgColors)

  const howManyActiveTodos = relatedTodos?.filter(
    (x) => x.active === true
  ).length

  const howManyNotActiveTodos = relatedTodos?.filter(
    (x) => x.active === false
  ).length

  return (
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
          <UpsertTodo i={i} todo={todo} />
        </div>
      </div>

      <div className="flex flex-col items-start mt-2 gap-2 p-2">
        <h4 className="text-2xl -ml-1 font-bold">{todo.board}</h4>
        <p className="flex justify-between w-full items-center gap-2">
          {relatedTodos && (
            <span>
              {relatedTodos.length} todo
              {relatedTodos.length === 0
                ? 's'
                : relatedTodos.length > 1 && 's'}{' '}
              in this board
            </span>
          )}
          <span>
            {howManyActiveTodos} active todo{howManyActiveTodos !== 1 && 's'}
          </span>
          <span>
            {howManyNotActiveTodos} completed todo
            {howManyNotActiveTodos !== 1 && 's'}
          </span>
        </p>
      </div>
    </div>
  )
}
