import React from 'react'
import useUpdateActiveStatus from '@/helpers/useUpdateActiveStatus'
import { CheckCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { Todo } from './TasksList'
import clsx from 'clsx'

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
  return (
    <button
      disabled={!task}
      onClick={() => useUpdateActiveStatus(task, setTodos, userId, getToken)}
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
