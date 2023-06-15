'use client'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'jotai'
import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import supabaseClient from '@/lib/supabaseClient'
import FilterList from './FilterList'
import Overview from './Overview'
import TodosList from './TodosList'
import BoardList from './BoardList'
import { Database } from '@/types/supabase'
import AddTodoDialog from './AddTodoDialog'
import AddTodoButton from './AddTodoButton'

export default function ListView() {
  const { getToken, isSignedIn } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [todos, setTodos] = useState<
    | Database['public']['Tables']['todos']['Row'][]
    | Database['public']['Tables']['todos_public']['Row'][]
    | null
  >(null)
  const [activeListView, setActiveListView] = useState<'todo' | 'board'>('todo')
  const active = activeListView === 'todo' ? 0 : 1

  async function getTodos() {
    try {
      const supabaseAccessToken = await getToken({ template: 'supabase' })
      const supabase = await supabaseClient(
        isSignedIn ? supabaseAccessToken : ''
      )
      const { data: todos } = await supabase
        .from(isSignedIn ? 'todos' : 'todos_public')
        .select('*')
        .order('active', { ascending: false })
        .order('created_at', { ascending: false })
      setTodos(todos)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTodos()
  }, [todos, isSignedIn])

  return (
    <Provider>
      <AddTodoDialog />
      <Overview todos={todos} />
      <FilterList
        todos={todos}
        setActiveListView={setActiveListView}
        active={active}
      />

      {!active && <TodosList loading={loading} todos={todos} />}
      {active && <BoardList todos={todos} />}

      {isSignedIn && <AddTodoButton />}
    </Provider>
  )
}
