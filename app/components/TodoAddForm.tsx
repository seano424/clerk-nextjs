import React, { Dispatch } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import supabaseClient from '@/lib/supabaseClient'

interface TodoAddFormProps {
  todos: any[]
  setTodos: Dispatch<any>
}

export default function TodoAddForm({ todos, setTodos }: TodoAddFormProps) {
  const { getToken, userId } = useAuth()
  const [newTodo, setNewTodo] = useState('')
  const [newBoard, setNewBoard] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo === '') {
      return
    }

    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)
    const { data } = await supabase
      .from('todos')
      .insert({ title: newTodo, user_id: userId, board: newBoard })
      .select()

    setTodos([...todos, data && data[0]])
    setNewTodo('')
    setNewBoard('')
  }

  return (
    <form className="py-2 flex gap-2" onSubmit={handleSubmit}>
      <input
        className="border pl-1 rounded border-fuchsia-500"
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
        required
        placeholder='Add Todo'
      />
      <input
        className="border pl-1 rounded border-fuchsia-500"
        onChange={(e) => setNewBoard(e.target.value)}
        value={newBoard}
        required
        placeholder='Add Board'
      />
      <button className="rounded-full bg-white px-3 py-2">Add Todo</button>
    </form>
  )
}
