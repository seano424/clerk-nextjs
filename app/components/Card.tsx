'use client'

import clsx from 'clsx'
import { useAuth } from '@clerk/nextjs'
import { Database } from '@/types/supabase'
import { Dispatch, SetStateAction } from 'react'
import UpsertTodo from './UpsertTodo'

import Avatar from './Avatar'
import DeleteTodo from './DeleteTodo'
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

export default function Card({ task, i, boardList, relatedTasks }: CardProps) {
  const { getToken, userId } = useAuth()
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
  const bgColor = alternatingBgColor(i, bgColors)
  const date = new Date(task.date ?? '')

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
          {boardList && <UpsertTodo task={task} />}
          {!boardList && (
            <>
              <span>{timeConvert(task.time)}</span>
              <UpdateActiveStateButton
                getToken={getToken}
                task={task!}
                userId={userId}
              />
              {!task.active && <DeleteTodo id={task.id} />}
              <UpsertTodo task={task} />
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
