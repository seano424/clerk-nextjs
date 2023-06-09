'use client'

import clsx from 'clsx'
import Card from './Card'
import { useState, Dispatch } from 'react'
import SkeletonCard from './SkeletonCard'
import TodoAddForm from './TodoAddForm'

export type Todo = {
  title: string
  created_at: string
  id: number
  user_id: string
  board: string
  time: number
  active: boolean
  date: string
}

export type TasksListProps = {
  todos: Todo[]
  setTodos: Dispatch<any>
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const currentDate = new Date()
const fakeTodos = Array(2).fill(5)

export default function TasksList({ todos, setTodos }: TasksListProps) {
  const [activeDay, setActiveDay] = useState(currentDate.getDay() - 1)
  const [showActiveTasks, setShowActiveTasks] = useState(true)

  return (
    <div className="pt-5 min-h-screen">
      <div className="flex items-center justify-end pb-8 pt-5 px-10">
        <button
          onClick={() => setShowActiveTasks(true)}
          className={clsx(
            'rounded-full px-7 py-4',
            showActiveTasks
              ? 'text-theme-blue-900 bg-theme-blue-300 hover:bg-opacity-95'
              : 'text-white border-theme-blue-700 border hover:text-opacity-95'
          )}
        >
          Active
        </button>
        <button
          onClick={() => setShowActiveTasks(false)}
          className={clsx(
            'rounded-full px-7 py-4',
            !showActiveTasks
              ? 'text-theme-blue-900 bg-theme-blue-300 hover:bg-opacity-95'
              : 'text-white border-theme-blue-700 border hover:text-opacity-95'
          )}
        >
          Done
        </button>
      </div>
      <div className="flex justify-between px-10 pb-10">
        {days.map((day, i) => (
          <button
            onClick={() => setActiveDay(i)}
            className={clsx(
              'text-lg',
              activeDay === i ? 'text-white' : 'text-theme-slate-500'
            )}
            key={day}
          >
            {day}
          </button>
        ))}
      </div>
      {todos
        ? todos
            .filter((todo) => new Date(todo.date).getDay() - 1 === activeDay)
            .filter((t) => t.active === showActiveTasks)
            .map((task, i) => (
              <Card setTodos={setTodos} task={task} i={i} key={task.id} />
            ))
        : fakeTodos.map((_, i) => (
            <SkeletonCard boardList={false} active={showActiveTasks} key={i} />
          ))}

      <TodoAddForm />
    </div>
  )
}
