'use client'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import supabaseClient from '@/lib/supabaseClient'
import FilterView from './FilterView'
import Overview from './Overview'
import TasksList from './TasksList'
import BoardList from './BoardList'
import { Database } from '@/types/supabase'

export default function ListView() {
  const { getToken, isSignedIn } = useAuth()
  const [todos, setTodos] = useState<
    Database['public']['Tables']['todos']['Row'][] | []
  >([])
  const [activeListView, setActiveListView] = useState<'task' | 'board'>('task')
  const [percentageActive, setPercentageActive] = useState(100)
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

  async function getPercentageActive(
    todos: Database['public']['Tables']['todos']['Row'][]
  ) {
    const activeTodos =
      todos.filter((todo) => todo.active === false).length / todos.length
    setPercentageActive(activeTodos * 100)
  }

  useEffect(() => {
    // getTodos()
    todos && getPercentageActive(todos)
  }, [todos])

  if (!isSignedIn) return <></>

  return (
    <>
      <ToastContainer
        autoClose={700}
        hideProgressBar
        draggable
        theme="dark"
        position="top-center"
      />
      <Overview percentageActive={percentageActive} />
      <FilterView
        todos={todos}
        setActiveListView={setActiveListView}
        active={active}
      />

      {!active && <TasksList setTodos={setTodos} todos={todos} />}
      {active && <BoardList setTodos={setTodos} todos={todos} />}
    </>
  )
}
