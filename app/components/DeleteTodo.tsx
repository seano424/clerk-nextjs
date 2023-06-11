'use client'

import React from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { XCircleIcon } from '@heroicons/react/24/solid'

export default function DeleteTodo({ id }: { id: string | number }) {
  const { getToken, userId } = useAuth()

  const deleteTodo = async () => {
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
      console.log(e)
    } finally {
      toast('Deleted task! 🗑')
    }
  }
  return (
    <button onClick={deleteTodo}>
      <span className="sr-only">Delete task</span>
      <XCircleIcon className="h-16 w-16 fill-red-500/80 hover:fill-red-500/100 transition-all duration-150 ease-linear" />
    </button>
  )
}
