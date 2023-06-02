'use client'

import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

export default function Home() {
  const { getToken } = useAuth()
  const { isSignedIn, isLoaded, user } = useUser()
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState<any>(null)

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
      <h1>I am the home page</h1>
      {isSignedIn ? (
        <>
          <span>Welcome {user.fullName}</span>
          <TodoList setTodos={setTodos} todos={todos} />
          <AddTodoForm todos={todos} setTodos={setTodos} />
        </>
      ) : (
        <div>Sign in to create your todo list</div>
      )}
      {/* <button onClick={fetchData}>Fetch data</button> */}
    </main>
  )
}
