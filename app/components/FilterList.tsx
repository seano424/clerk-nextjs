import clsx from 'clsx'
const views = ['Todo', 'Boards']

interface FilterListProps {
  todos: any
  active: number
  setActiveListView: (view: 'todo' | 'board') => void
}

export default function FilterList({
  todos,
  active,
  setActiveListView,
}: FilterListProps) {
  const boardsMap = todos?.map((todo: any) => todo.board)
  const boards = [...new Set(boardsMap)]

  return (
    <div className="flex justify-between pt-10 text-3xl font-light">
      {views.map((view, i) => (
        <button
          key={i}
          onClick={() => setActiveListView(i === 0 ? 'todo' : 'board')}
          className={clsx(
            active === i
              ? 'text-theme-blue-300 border-white'
              : 'text-theme-slate-500 border-theme-slate-500',
            'border-b-2 w-full pb-2',
            i === 0 ? 'justify-start' : 'justify-end',
            'transition-all duration-75 ease-linear',
            'flex items-center gap-3'
          )}
        >
          {todos ? (
            <>
              {i === 0 && (
                <span
                  className={clsx(
                    'px-4 py-1 rounded-full flex items-center justify-center',
                    active === i
                      ? 'text-theme-blue-900 bg-white'
                      : 'text-white border-white border'
                  )}
                >
                  {todos.length}
                </span>
              )}
              {i === 1 && (
                <span
                  className={clsx(
                    'px-4 py-1 rounded-full flex items-center justify-center',
                    active === i
                      ? 'text-theme-blue-900 bg-white'
                      : 'text-white border-white border'
                  )}
                >
                  {boards.length}
                </span>
              )}
            </>
          ) : (
            <span>Loading</span>
          )}
          {view}

          {view === 'Todo' &&
            todos &&
            (todos.length === 0 || todos.length > 1) &&
            's'}
        </button>
      ))}
    </div>
  )
}
