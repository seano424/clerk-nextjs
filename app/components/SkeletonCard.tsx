'use client'

import clsx from 'clsx'
import { CheckCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, XCircleIcon } from '@heroicons/react/24/solid'

import Avatar from './Avatar'

interface CardProps {
  boardList?: boolean
  active?: boolean
}

export default function SkeletonCard({ boardList, active }: CardProps) {
  return (
    <div
      className={clsx(
        'text-theme-slate-900 rounded-[40px] capitalize p-5 bg-slate-200 animate-pulse-super-slow'
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
              <span className="bg-slate-300 w-20 h-6 animate-pulse"></span>
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
                  <CheckCircleIcon className="h-16 w-16 fill-theme-slate-900/90 animate-pulse-super-slow hover:fill-theme-slate-900/100 transition-all duration-150 ease-linear" />
                ) : (
                  <ArrowUturnLeftIcon className="h-8 w-8 fill-theme-slate-900/90 animate-pulse-super-slow hover:fill-theme-slate-900/100 transition-all duration-150 ease-linear" />
                )}
              </button>
              {!active && (
                <button disabled>
                  <span className="sr-only">Delete task</span>
                  <XCircleIcon className="h-16 w-16 fill-theme-slate-900/90 animate-pulse-super-slow hover:fill-theme-slate-900/100 transition-all duration-150 ease-linear" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <p className="mt-5 bg-slate-300 w-24 h-6 animate-pulse-slow"></p>
      <h4 className="mt-1 text-2xl bg-slate-300 w-36 h-8 animate-pulse-slow"></h4>
    </div>
  )
}
