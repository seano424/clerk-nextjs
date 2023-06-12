'use client'

import clsx from 'clsx'
import { CheckCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, XCircleIcon } from '@heroicons/react/24/solid'

import Avatar from './Avatar'

interface CardProps {
  boardList?: boolean
  filter?: '' | 'active' | 'completed'
}

export default function SkeletonCard({ boardList, filter }: CardProps) {
  const active = filter === 'active'

  return (
    <div className="text-theme-slate-900 rounded-[40px] capitalize p-5 bg-slate-200 animate-pulse-super-slow">
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
              <button disabled>
                <CheckCircleIcon className="h-16 w-16 fill-theme-slate-900/90 animate-pulse-super-slow hover:fill-theme-slate-900/100 transition-all duration-150 ease-linear" />
              </button>

              <button disabled>
                <XCircleIcon className="h-16 w-16 fill-theme-slate-900/90 animate-pulse-super-slow hover:fill-theme-slate-900/100 transition-all duration-150 ease-linear" />
              </button>
            </>
          )}
        </div>
      </div>

      <p className="mt-5 bg-slate-300 w-24 h-6 animate-pulse-slow"></p>
      <h4 className="mt-1 text-2xl bg-slate-300 w-36 h-8 animate-pulse-slow"></h4>
    </div>
  )
}
