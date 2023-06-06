'use client'

import clsx from 'clsx'
import { useAuth } from '@clerk/nextjs'
import ActiveButton from './ActiveButton'
import {
  CheckCircleIcon,
  EllipsisHorizontalIcon,
  XCircleIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/solid'
import { Dispatch, SetStateAction } from 'react'
import { timeConvert, alternatingBgColor } from '@/lib/utils'
import useDeleteTodo from '@/helpers/useDeleteTodo'
import useUpdateActiveStatus from '@/helpers/useUpdateActiveStatus'
import Avatar from './Avatar'

interface CardProps {
  task?: {
    title: string
    created_at: string
    id: number
    user_id: string
    board: string
    time: number
    active: boolean
    date: string
  }
  i: number
  boardList?: boolean
  setTodos: Dispatch<SetStateAction<any>>
}

export default function Card({ task, i, boardList, setTodos }: CardProps) {
  const { getToken, userId } = useAuth()

  return (
    <div
      className={clsx(
        alternatingBgColor(i),
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
              <span>{timeConvert(task?.time ?? 90)}</span>
              <ActiveButton
                active={task!.active}
                getToken={getToken}
                setTodos={setTodos}
                task={task!}
                userId={userId}
              />
              <button
                disabled={!task}
                onClick={() =>
                  useDeleteTodo(task!.id, setTodos, userId, getToken)
                }
              >
                <span className="sr-only">Delete task</span>
                <XCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
              </button>
            </>
          )}
        </div>
      </div>
      {boardList ? (
        <>
          <p className="pt-5">2 active tasks</p>
          <h4 className="text-2xl">{task?.board ?? 'My board'}</h4>
        </>
      ) : (
        <>
          <p className="pt-5">{task?.board ?? 'My board'}</p>
          <h4 className="text-2xl">{task?.title ?? 'Task Title'}</h4>
        </>
      )}
    </div>
  )
}
