import Image from 'next/image'
import { Dispatch } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import {
  EllipsisHorizontalIcon,
  PlusIcon,
  CheckIcon,
} from '@heroicons/react/24/solid'

interface TodoListProps {
  todos: {
    title: string
    created_at: string
    id: number
    user_id: string
  }[]
  setTodos: Dispatch<any>
}

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const { getToken, userId } = useAuth()
  const { user } = useUser()

  async function removeTodo(id: number) {
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
      if (error) throw error
    } catch (e) {
      alert(e)
    }

    setTodos((prevState: any) =>
      prevState.filter(
        (todo: {
          title: string
          created_at: string
          id: number
          user_id: string
        }) => todo.id !== id
      )
    )
  }

  return (
    <>
      {todos.length > 0 && (
        <ul className="flex flex-col gap-2 py-8">
          <span className="text-primary-slate">
            {todos.length === 1
              ? todos.length + ' todo'
              : todos.length + ' todos'}
          </span>
          {todos.map((todo) => (
            <li className="flex filter backdrop-blur text-lg justify-between items-center bg-gradient-to-r from-primary-blue via-primary-blue/80 to-primary-blue text-primary-light rounded-3xl p-5 shadow-xl">
              {todo.title}
              <button
                onClick={() => removeTodo(todo.id)}
                className="bg-white/80 filter backdrop-blur rounded-full h-8 w-8 flex items-center justify-center hover:bg-white/70 transition-all duration-150 ease-linear shadow-lg"
              >
                <CheckIcon className="text-primary-dark h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
