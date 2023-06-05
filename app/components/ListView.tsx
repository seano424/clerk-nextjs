'use client'
import clsx from 'clsx'
import { Dispatch, useState, SetStateAction } from 'react'

const views = ['Task', 'Boards']

interface ListViewProps {
  todos: []
  setActiveListView: Dispatch<SetStateAction<'task' | 'board'>>
  activeListView: 'task' | 'board'
}

export default function ListView({
  todos,
  activeListView,
  setActiveListView,
}: ListViewProps) {
  const active = activeListView === 'task' ? 0 : 1
  return (
    <>
      <div className="flex justify-between pt-10 text-3xl font-light">
        {views.map((view, i) => (
          <button
            onClick={() => setActiveListView(i === 0 ? 'task' : 'board')}
            className={clsx(
              active === i
                ? 'text-theme-blue-300 border-white'
                : 'text-theme-slate-500 border-theme-slate-500',
              'border-b-2 w-full flex gap-3 pb-2',
              i === 0 ? 'justify-start' : 'justify-end',
              'transition-all duration-75 ease-linear'
            )}
          >
            <span>{i === 0 && todos.length}</span>
            {view}
            {i === 0 && todos.length > 1 && 's'}
          </button>
        ))}
      </div>
    </>
  )
}
