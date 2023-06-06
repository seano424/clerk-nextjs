'use client'

import clsx from 'clsx'
import { CheckCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { timeConvert, alternatingBgColor } from '@/lib/utils'

import Avatar from './Avatar'

interface CardProps {
  boardList: boolean
  active: boolean
  i: number
}

export default function GhostCard({ boardList, i, active }: CardProps) {
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']

  return (
    <div
      className={clsx(
        alternatingBgColor(i, bgColors),
        'text-theme-slate-900 rounded-[40px] capitalize p-5'
      )}
    >
      <div className="flex justify-between items-center">
        <Avatar />
        <div className="flex gap-2 items-center">
          {boardList && (
            <button>
              <EllipsisHorizontalIcon className="h-10 w-10" />
            </button>
          )}
          {!boardList && (
            <>
              <span>{timeConvert(90)}</span>
              <button
                disabled
                className={clsx(
                  !active &&
                    'border-2 rounded-full p-2 border-theme-blue-900 hover:border-opacity-60 transition-all duration-150 ease-linear'
                )}
              >
                <span className="sr-only">
                  {active ? 'Mark task done' : 'Undo marking task done'}
                </span>
                {active ? (
                  <CheckCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
                ) : (
                  <ArrowUturnLeftIcon className="h-8 w-8 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
                )}
              </button>
              {!active && (
                <button disabled>
                  <span className="sr-only">Delete task</span>
                  <XCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {boardList ? (
        <>
          <p className="pt-5">2 active tasks</p>
          <h4 className="text-2xl">My board</h4>
        </>
      ) : (
        <>
          <p className="pt-5">My board</p>
          <h4 className="text-2xl">Task Title</h4>
        </>
      )}
    </div>
  )
}
