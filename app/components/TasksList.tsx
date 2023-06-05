'use client'
import clsx from 'clsx'
import { useState } from 'react'
import Card from './Card'

interface TasksListProps {
  todos: {
    title: string
    created_at: string
    id: number
    user_id: string
    board: string
    time: number
    active: boolean
    date: string
  }[]
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const currentDate = new Date()

export default function TasksList({ todos }: TasksListProps) {
  const [activeDay, setActiveDay] = useState(currentDate.getDay() - 1)

  return (
    <div className="pt-5 min-h-screen">
      <div className="flex justify-between p-5">
        {days.map((day, i) => (
          <button
            onClick={() => setActiveDay(i)}
            className={clsx(
              activeDay === i ? 'text-white' : 'text-theme-slate-500'
            )}
            key={day}
          >
            {day}
          </button>
        ))}
      </div>
      {todos
        .filter((todo) => new Date(todo.date).getDay() - 1 === activeDay)
        .map((task, i) => (
          <Card task={task} i={i} key={task.id} />
        ))}
    </div>
  )
}
