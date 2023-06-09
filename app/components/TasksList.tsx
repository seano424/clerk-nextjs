'use client'

import clsx from 'clsx'
import Card from './Card'
import { useState, Dispatch } from 'react'
import { Database } from '@/types/supabase'
import SkeletonCard from './SkeletonCard'

export type TasksListProps = {
  todos: Database['public']['Tables']['todos']['Row'][]
  setTodos: Dispatch<any>
}

const fakeTodos = Array(2).fill(5)

export default function TasksList({ todos, setTodos }: TasksListProps) {
  const [showActiveTasks, setShowActiveTasks] = useState(true)

  return (
    <div className="pt-5 min-h-screen">
      <div className="flex items-center justify-end pb-8 pt-5 px-10">
        <button
          onClick={() => setShowActiveTasks(true)}
          className={clsx(
            'rounded-full px-7 py-4',
            showActiveTasks
              ? 'text-theme-blue-900 bg-theme-blue-300 hover:bg-opacity-95'
              : 'text-white border-theme-blue-700 border hover:text-opacity-95'
          )}
        >
          Active
        </button>
        <button
          onClick={() => setShowActiveTasks(false)}
          className={clsx(
            'rounded-full px-7 py-4',
            !showActiveTasks
              ? 'text-theme-blue-900 bg-theme-blue-300 hover:bg-opacity-95'
              : 'text-white border-theme-blue-700 border hover:text-opacity-95'
          )}
        >
          Finished
        </button>
      </div>

      {todos
        .filter((t) => t.active === showActiveTasks)
        .map((task, i) => (
          <Card setTodos={setTodos} task={task} i={i} key={task.id} />
        ))}

      {todos.length === 0 &&
        fakeTodos.map((_, i) => (
          <SkeletonCard active={showActiveTasks} key={i} />
        ))}
    </div>
  )
}
