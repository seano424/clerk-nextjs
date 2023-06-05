import clsx from 'clsx'
const views = ['Task', 'Boards']

interface FilterViewProps {
  todos: any
  active: number
  setActiveListView: (view: 'task' | 'board') => void
}

export default function FilterView({
  todos,
  active,
  setActiveListView,
}: FilterViewProps) {
  return (
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
          {todos ? (
            <span>{i === 0 && todos.length}</span>
          ) : (
            <span>loading</span>
          )}
          {view}
          {todos && i === 0 && todos.length > 1 && 's'}
        </button>
      ))}
    </div>
  )
}
