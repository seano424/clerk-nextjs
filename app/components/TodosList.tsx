'use client'

import clsx from 'clsx'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import TodoCard from './TodoCard'
import SkeletonCard from './SkeletonCard'
import { Database } from '@/types/supabase'

export type TodosListProps = {
  todos:
    | Database['public']['Tables']['todos']['Row'][]
    | Database['public']['Tables']['todos_public']['Row'][]
    | null
  loading: boolean
}

export default function TodosList({ todos, loading }: TodosListProps) {
  const [filterTodos, setFilterTodos] = useState<'' | 'completed' | 'active'>(
    ''
  )
  const { isSignedIn } = useAuth()
  const showAllTodos = filterTodos === ''
  const showActiveTodos = filterTodos === 'active'
  const showCompletedTodos = filterTodos === 'completed'
  const skeletonTodos = new Array(5).fill(0)

  return (
    <>
      <ToastContainer
        autoClose={700}
        hideProgressBar
        draggable
        theme="dark"
        position="top-center"
      />
      <div className="pt-5 min-h-screen">
        {todos && (
          <div className="flex items-center justify-end pb-8 pt-5 px-10">
            <button
              onClick={() => setFilterTodos('')}
              className={clsx(
                'rounded-full px-7 py-4',
                filterTodos === ''
                  ? 'text-white bg-theme-blue-300'
                  : 'text-theme-blue-900 bg-white hover:bg-theme-cyan transition-all duration-100 ease-linear'
              )}
            >
              All Todos ({todos.length})
            </button>
            <button
              onClick={() => setFilterTodos('active')}
              className={clsx(
                'rounded-full px-7 py-4',
                filterTodos === 'active'
                  ? 'text-white bg-theme-blue-300'
                  : 'text-theme-blue-900 bg-white hover:bg-theme-cyan transition-all duration-100 ease-linear'
              )}
            >
              Active Todos ({todos.filter((t) => t.active === true).length})
            </button>
            <button
              onClick={() => setFilterTodos('completed')}
              className={clsx(
                'rounded-full px-7 py-4',
                filterTodos === 'completed'
                  ? 'text-white bg-theme-blue-300'
                  : 'text-theme-blue-900 bg-white hover:bg-theme-cyan transition-all duration-100 ease-linear'
              )}
            >
              Completed Todos ({todos.filter((t) => t.active === false).length})
            </button>
          </div>
        )}

        {showAllTodos &&
          todos &&
          todos.map((todo, i) => <TodoCard todo={todo} i={i} key={todo.id} />)}

        {showActiveTodos &&
          todos &&
          todos
            .filter((t) => t.active === true)
            .map((todo, i) => <TodoCard todo={todo} i={i} key={todo.id} />)}

        {showCompletedTodos &&
          todos &&
          todos
            .filter((t) => t.active === false)
            .map((todo, i) => <TodoCard todo={todo} i={i} key={todo.id} />)}

        {loading && skeletonTodos.map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </>
  )
}
