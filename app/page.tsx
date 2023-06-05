'use client'

import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'

import ListView from './components/ListView'
import Hero from './components/Hero'
import TodoList from './components/TodoList'
import TodoAddForm from './components/TodoAddForm'

export default function Home() {
  const { getToken } = useAuth()
  const { isSignedIn, isLoaded, user } = useUser()
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState<any>(null)
  const [activeListView, setActiveListView] = useState<'task' | 'board'>('task')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true)
        const supabaseAccessToken = await getToken({ template: 'supabase' })
        const supabase = await supabaseClient(supabaseAccessToken)
        const { data: todos } = await supabase.from('todos').select('*')
        setTodos(todos)
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
    loadTodos()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="container py-10">
      {isSignedIn ? (
        <>
          <Hero />
          <ListView
            activeListView={activeListView}
            setActiveListView={setActiveListView}
            todos={todos}
          />
          <TodoList todos={todos} />
          <TodoAddForm setTodos={setTodos} todos={todos} />
        </>
      ) : (
        <div>Sign in to create your todo list</div>
      )}
    </main>
  )
}
