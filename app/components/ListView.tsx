'use client'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'jotai'
import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import supabaseClient from '@/lib/supabaseClient'
import FilterList from './FilterList'
import Overview from './Overview'
import TasksList from './TasksList'
import BoardList from './BoardList'
import { Database } from '@/types/supabase'
import Dialog from './Dialog'

export default function ListView() {
  const { getToken } = useAuth()
  const [todos, setTodos] = useState<
    Database['public']['Tables']['todos']['Row'][] | []
  >([])
  const [activeListView, setActiveListView] = useState<'task' | 'board'>('task')
  const [percentageActive, setPercentageActive] = useState<number | null>(null)
  const active = activeListView === 'task' ? 0 : 1

  async function getTodos() {
    try {
      const supabaseAccessToken = await getToken({ template: 'supabase' })
      const supabase = await supabaseClient(supabaseAccessToken)
      const { data: todos } = await supabase.from('todos').select('*')
      setTodos(todos ?? [])
    } catch (error) {
      alert(error)
    } finally {
    }
  }

  useEffect(() => {
    getTodos()
    if (todos.length > 1) {
      const activeTodos =
        todos.filter((todo) => todo.active === false).length / todos.length
      setPercentageActive(activeTodos * 100)
    }
  }, [todos])

  return (
    <Provider>
      <Dialog />
      <Overview percentageActive={percentageActive} />
      <FilterList
        todos={todos}
        setActiveListView={setActiveListView}
        active={active}
      />

      {!active && <TasksList setTodos={setTodos} todos={todos} />}
      {active && <BoardList setTodos={setTodos} todos={todos} />}
    </Provider>
  )
}
