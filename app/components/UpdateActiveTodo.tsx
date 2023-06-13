'use client'

import { useAuth } from '@clerk/nextjs'
import { Database } from '@/types/supabase'
import { toast } from 'react-toastify'
import supabaseClient from '@/lib/supabaseClient'
import { CheckCircleIcon, ArrowUturnDownIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface UpdateActiveTodo {
  todo: Database['public']['Tables']['todos']['Row']
}

export default function UpdateActiveStateButton({ todo }: UpdateActiveTodo) {
  const { getToken, isSignedIn } = useAuth()

  const updateActive = async (
    todo: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()

    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })

    const supabase = await supabaseClient(isSignedIn ? supabaseAccessToken : '')

    try {
      const { error } = await supabase
        .from(isSignedIn ? 'todos' : 'todos_public')
        .update({ active: !todo.active })
        .eq('id', todo.id)
        .select()
      if (error) throw error
    } catch (e: any) {
      alert(e.message)
    } finally {
      todo?.active
        ? toast('Completed todo! Good job 🎊')
        : toast('Undoing that! Moved back to active! 💪🏽')
    }
  }

  return (
    <button
      className="cursor-pointer"
      disabled={!todo}
      onClick={(e) => updateActive(todo, e)}
    >
      <span className="sr-only">
        {todo.active ? 'Mark todo done' : 'Undo marking todo done'}
      </span>
      {todo.active ? (
        <div className="h-16 w-16 relative">
          <CheckCircleIcon
            title="Mark Complete"
            className="absolute z-10 inset-0 fill-theme-blue-300 hover:fill-theme-blue-300/80 focus:fill-theme-blue-300/80 transition-all duration-300 ease-linear"
          />
          <span className="h-12 w-12 absolute left-2 right-2 top-2 bg-white rounded-full z-0"></span>
          <span className="sr-only">Complete Todo</span>
        </div>
      ) : (
        <div className="border rounded-full h-[52px] w-[52px] p-3 bg-theme-blue-300 hover:bg-theme-blue-300/80 focus:bg-theme-blue-300/80 transition-all duration-300 ease-linear border-none">
          <ArrowUturnDownIcon title="Undo" className="h-7 w-7 fill-white" />
          <span className="sr-only">Undo complete todo</span>
        </div>
      )}
    </button>
  )
}
