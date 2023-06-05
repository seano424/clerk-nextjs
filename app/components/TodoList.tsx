'use client'
import { Dispatch, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { CheckIcon } from '@heroicons/react/24/solid'

interface TodoListProps {
  todos: {
    title: string
    created_at: string
    id: number
    user_id: string
  }[]
}

export default function TodoList({ todos }: TodoListProps) {
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
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
