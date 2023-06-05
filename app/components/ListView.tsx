'use client'

import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import supabaseClient from '@/lib/supabaseClient'
import FilterView from './FilterView'
import Overview from './Overview'
import TasksList from './TasksList'
import BoardList from './BoardList'

export default function ListView() {
  const { getToken } = useAuth()
  const [todos, setTodos] = useState<any>(null)
  const [activeListView, setActiveListView] = useState<'task' | 'board'>('task')

  const active = activeListView === 'task' ? 0 : 1

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const supabaseAccessToken = await getToken({ template: 'supabase' })
        const supabase = await supabaseClient(supabaseAccessToken)
        const { data: todos } = await supabase.from('todos').select('*')
        setTodos(todos)
      } catch (error) {
        alert(error)
      } finally {
      }
    }
    loadTodos()
  }, [])

  return (
    <>
      <Overview />
      <FilterView
        todos={todos}
        setActiveListView={setActiveListView}
        active={active}
      />
      {!active && <TasksList todos={todos} />}
      {active && <BoardList todos={todos} />}
    </>
  )
}
