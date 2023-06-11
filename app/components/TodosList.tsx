'use client'

import clsx from 'clsx'
import Card from './Card'
import { useAuth } from '@clerk/nextjs'
import { useState, Dispatch } from 'react'
import { Database } from '@/types/supabase'
import SkeletonCard from './SkeletonCard'
import { ToastContainer } from 'react-toastify'
import { useSetAtom } from 'jotai'
import modalAtom from '@/lib/modalAtom'
import { initialData } from '@/lib/modalAtom'
import DialogButton from './DialogButton'

export type TodosListProps = {
  todos: Database['public']['Tables']['todos']['Row'][]
  setTodos: Dispatch<any>
}

const fakeTodos = Array(2).fill(5)

export default function TodosList({ todos, setTodos }: TodosListProps) {
  const [showActiveTodos, setShowActiveTodos] = useState(true)
  const { isSignedIn } = useAuth()
  const setModal = useSetAtom(modalAtom)

  const handleModal = () => {
    setModal({ data: initialData, open: true, bgColor: 0 })
  }

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
              onClick={() => setShowActiveTodos(true)}
              className={clsx(
                'rounded-full px-7 py-4',
                showActiveTodos
                  ? 'text-theme-blue-900 bg-theme-blue-300 hover:bg-opacity-95'
                  : 'text-white border-theme-blue-700 border hover:text-opacity-95'
              )}
            >
              Active
            </button>
            <button
              onClick={() => setShowActiveTodos(false)}
              className={clsx(
                'rounded-full px-7 py-4',
                !showActiveTodos
                  ? 'text-theme-blue-900 bg-theme-blue-300 hover:bg-opacity-95'
                  : 'text-white border-theme-blue-700 border hover:text-opacity-95'
              )}
            >
              Finished
            </button>
          </div>
        )}

        {todos
          .filter((t) => t.active === showActiveTodos)
          .map((todo, i) => (
            <Card setTodos={setTodos} todo={todo} i={i} key={todo.id} />
          ))}

        {isSignedIn &&
          todos.length === 0 &&
          fakeTodos.map((_, i) => (
            <SkeletonCard active={showActiveTodos} key={i} />
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