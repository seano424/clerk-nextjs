'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/nextjs'
import {
  CheckCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid'

const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
const bgColor = (i: number) => bgColors[i % bgColors.length]

function timeConvert(n: number) {
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + 'h ' + rminutes + 'min'
}

interface CardProps {
  task?: {
    title: string
    created_at: string
    id: number
    user_id: string
    board: string
    time: number
    active: boolean
    date: string
  }
  i: number
  boardList?: boolean
}

export default function Card({ task, i, boardList }: CardProps) {
  const { user } = useUser()
  const notify = () => toast('Wow so easy!')

  return (
    <div
      className={clsx(
        bgColor(i),
        'text-theme-slate-900 rounded-[40px] capitalize p-5'
      )}
    >
      <div className="flex justify-between items-center">
        {user ? (
          <Image
            className="rounded-full object-cover"
            src={user.profileImageUrl}
            alt="profile pic"
            height={60}
            width={60}
          />
        ) : (
          <span className="h-[60px] w-[60px] bg-theme-slate-500/30 animate-pulse-slow rounded-full"></span>
        )}
        <div className="flex gap-2 items-center">
          {boardList ? (
            <button>
              <EllipsisHorizontalIcon className="h-10 w-10" />
            </button>
          ) : (
            <>
              <span>{timeConvert(task?.time ?? 90)}</span>
              <button onClick={notify}>
                <CheckCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
              </button>
            </>
          )}
        </div>
      </div>
      {boardList ? (
        <>
          <p className="pt-5">2 active tasks</p>
          <h4 className="text-2xl">{task?.board ?? 'My board'}</h4>
        </>
      ) : (
        <>
          <p className="pt-5">{task?.board ?? 'My board'}</p>
          <h4 className="text-2xl">{task?.title ?? 'Task Title'}</h4>
        </>
      )}
    </div>
  )
}
