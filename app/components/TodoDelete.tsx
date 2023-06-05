import React, { Dispatch } from 'react'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { CheckIcon } from '@heroicons/react/24/solid'

interface TodoDeleteProps {
  setTodos: Dispatch<any>
  todoId: number
}

export default async function TodoDelete({
  todoId,
  setTodos,
}: TodoDeleteProps) {
  const { getToken, userId } = useAuth()

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
    <div>
      <button
        onClick={() => removeTodo(todoId)}
        className="bg-white/80 filter backdrop-blur rounded-full h-8 w-8 flex items-center justify-center hover:bg-white/70 transition-all duration-150 ease-linear shadow-lg"
      >
        <CheckIcon className="text-primary-dark h-5 w-5" />
      </button>
    </div>
  )
}
