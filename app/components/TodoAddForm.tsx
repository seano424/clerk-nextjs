'use client'
import React, { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'

function TodoAddForm() {
  const { userId, getToken } = useAuth()
  const [title, setTitle] = useState('')
  const [board, setBoard] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)
    try {
      const { error } = await supabase
        .from('todos')
        .insert({
          title: title,
          user_id: userId,
          board: board.length ? board : 'myself',
        })
        .select()
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white p-5 rounded flex gap-2"
    >
      <input
        className="border rounded p-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Add a task"
      />
      <input
        className="border rounded p-2"
        onChange={(e) => setBoard(e.target.value)}
        value={board}
        type="text"
        placeholder="Add a board"
      />
      <button type="submit">submit</button>
    </form>
  )
}

export default TodoAddForm
