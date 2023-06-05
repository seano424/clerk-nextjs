'use client'
import clsx from 'clsx'
import Image from 'next/image'

import { Dispatch, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid'

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

const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
const bgColor = (i: number) => bgColors[i % bgColors.length]
const currentDate = new Date()

export default function TasksList({ todos }: TasksListProps) {
  const { user } = useUser()
  const [activeDay, setActiveDay] = useState(currentDate.getDay() - 1)

  function timeConvert(n: number) {
    var num = n
    var hours = num / 60
    var rhours = Math.floor(hours)
    var minutes = (hours - rhours) * 60
    var rminutes = Math.round(minutes)
    return rhours + 'h ' + rminutes + 'min'
  }

  return (
    <div className="pt-5">
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
          <div
            key={task.id}
            className={clsx(
              bgColor(i),
              'text-theme-slate-900 rounded-[40px] capitalize p-5'
            )}
          >
            <div className="flex justify-between items-center">
              <Image
                className="rounded-full object-cover"
                src={user!.profileImageUrl}
                alt="profile pic"
                height={60}
                width={60}
              />
              <div className="flex gap-2 items-center">
                <span>{timeConvert(task.time)}</span>
                <button className="">
                  <CheckCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
                </button>
              </div>
            </div>
            <p className="pt-5">{task.board}</p>
            <h4 className="text-2xl">{task.title}</h4>
          </div>
        ))}
    </div>
  )
}
