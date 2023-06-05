import clsx from 'clsx'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

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
  task: {
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
}

export default function Card({ task, i }: CardProps) {
  const { user } = useUser()
  return (
    <div
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
  )
}
