'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { Database } from '@/types/supabase'
import Avatar from '@/app/components/Avatar'
import timeConvert from '@/utils/timeConvert'
import UpdateActiveTodoButton from './UpdateActiveTodoButton'

export default function Content({ id }: { id: string }) {
  const [todo, setTodo] = useState<
    Database['public']['Tables']['todos']['Row'] | null
  >(null)
  const { getToken } = useAuth()

  const getTodo = async () => {
    const token = await getToken({ template: 'supabase' })
    const supabase = await supabaseClient(token)
    const { data: todo, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single()

    setTodo(todo)
    if (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getTodo()
  }, [todo])

  const createdAt = new Date(todo?.created_at ?? '')
  return (
    <div className="flex flex-col gap-5">
      {todo && (
        <div className="px-5 py-2 rounded-full border capitalize w-max border-black text-xl">
          {todo.board}
        </div>
      )}

      {!todo && (
        <div className="px-3 py-2 rounded-full border capitalize w-32 h-10 border-black animate-pulse-slow flex items-center bg-slate-200">
          <span className="bg-slate-300 min-w-full block h-4 rounded-full"></span>
        </div>
      )}

      {todo && (
        <h1 className="text-8xl font-bold tracking-tighter">{todo.title}</h1>
      )}

      {!todo && (
        <div className="bg-slate-300 rounded w-80 h-16 animate-pulse-super-slow" />
      )}

      {todo && (
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-slate-500">Time Assigned</p>
            <p className="text-2xl font-bold">{timeConvert(todo.time)}</p>
          </div>
          <Avatar />
        </div>
      )}

      {!todo && (
        <div className="flex justify-between animate-pulse-super-slow">
          <div className="flex flex-col gap-2">
            <p className="bg-slate-300 w-32 h-3"></p>
            <p className="bg-slate-500 w-32 h-5"></p>
          </div>
          <div className="rounded-full h-16 w-16 bg-slate-100"></div>
        </div>
      )}

      {todo && todo.description && (
        <div className="flex flex-col gap-2">
          <p className="text-slate-500">Additional Description</p>
          <p>{todo.description}</p>
        </div>
      )}

      {!todo && (
        <div className="flex flex-col gap-2 animate-pulse-super-slow">
          <p className="bg-slate-300 w-36 h-4"></p>
          <p className="bg-slate-400 w-full h-16"></p>
        </div>
      )}

      {todo && (
        <div className="flex flex-col gap-2">
          <p className="text-slate-500">Created At</p>
          <p>{createdAt.toDateString()}</p>
        </div>
      )}

      {!todo && (
        <div className="flex flex-col gap-2 animate-pulse-super-slow">
          <p className="bg-slate-300 w-24 h-4"></p>
          <p className="bg-slate-400 w-32 h-5"></p>
        </div>
      )}

      {todo && (
        <div className="mt-10">
          <UpdateActiveTodoButton todo={todo} />
        </div>
      )}
    </div>
  )
}
