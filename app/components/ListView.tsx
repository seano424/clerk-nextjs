'use client'

import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import supabaseClient from '@/lib/supabaseClient'
import FilterView from './FilterView'

export default function ListView() {
  const { getToken } = useAuth()
  const [todos, setTodos] = useState<any>(null)
  const [activeListView, setActiveListView] = useState<'task' | 'board'>('task')
  const [loading, setLoading] = useState(true)

  const active = activeListView === 'task' ? 0 : 1

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

  return (
    <>
      <FilterView
        todos={todos}
        setActiveListView={setActiveListView}
        active={active}
      />
    </>
  )
}
