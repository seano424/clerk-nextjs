'use client'

import React from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { XCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function DeleteTodo({ id }: { id: string | number }) {
  const { getToken, isSignedIn } = useAuth()

  const deleteTodo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(isSignedIn ? supabaseAccessToken : '')

    try {
      const { error } = await supabase
        .from(isSignedIn ? 'todos' : 'todos_public')
        .delete()
        .eq('id', id)
      if (error) throw error
    } catch (e) {
      console.log(e)
    } finally {
      toast('Deleted todo! 🗑')
    }
  }
  return (
    <>
      {isSignedIn ? (
        <button className="cursor-pointer" onClick={deleteTodo}>
          <span className="sr-only">Delete todo</span>
          <XCircleIcon
            title="Delete"
            className="h-16 w-16 fill-red-500 hover:fill-red-500/80 transition-all duration-150 ease-linear"
          />
        </button>
      ) : (
        <Link href="/sign-in">
          <span className="sr-only">Sign in today!</span>
          <XCircleIcon
            title="Delete"
            className="h-16 w-16 fill-red-500 hover:fill-red-500/80 transition-all duration-150 ease-linear"
          />
        </Link>
      )}
    </>
  )
}
