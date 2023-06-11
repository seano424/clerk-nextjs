'use client'

import clsx from 'clsx'
import Card from './Card'
import { useAuth } from '@clerk/nextjs'
import { useState, Dispatch } from 'react'
import { Database } from '@/types/supabase'
import SkeletonCard from './SkeletonCard'
import { ToastContainer } from 'react-toastify'
import DialogButton from './DialogButton'

export type TodosListProps = {
  todos: Database['public']['Tables']['todos']['Row'][]
  setTodos: Dispatch<any>
}

const fakeTodos = Array(2).fill(5)

export default function TodosList({ todos, setTodos }: TodosListProps) {
  const [filterTodos, setFilterTodos] = useState<'' | 'completed' | 'active'>(
    ''
  )
  const { isSignedIn } = useAuth()

  const showAllTodos = filterTodos === ''
  const showActiveTodos = filterTodos === 'active'
  const showCompletedTodos = filterTodos === 'completed'

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
        {todos.length > 0 && (
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
              All Todos
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
              Active Todos
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
              Completed Todos
            </button>
          </div>
        )}

        {showAllTodos &&
          todos.map((todo, i) => (
            <Card setTodos={setTodos} todo={todo} i={i} key={todo.id} />
          ))}

        {showActiveTodos &&
          todos
            .filter((t) => t.active === true)
            .map((todo, i) => (
              <Card setTodos={setTodos} todo={todo} i={i} key={todo.id} />
            ))}

        {showCompletedTodos &&
          todos
            .filter((t) => t.active === false)
            .map((todo, i) => (
              <Card setTodos={setTodos} todo={todo} i={i} key={todo.id} />
            ))}

        {isSignedIn &&
          todos.length === 0 &&
          fakeTodos.map((_, i) => (
            <SkeletonCard filter={filterTodos} key={i} />
          ))}
        <div className="flex justify-center mt-5">
          <DialogButton className="rounded-full text-5xl font-light h-20 w-20 bg-white">
            +
          </DialogButton>
        </div>
      </div>
    </>
  )
}
