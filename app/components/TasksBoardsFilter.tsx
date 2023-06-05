interface TasksBoardsFilterProps {
  todos: []
}

export default function TasksBoardsFilter({ todos }: TasksBoardsFilterProps) {
  return (
    <div>
      <button>
        <span>12</span>Tasks
      </button>
      <button>
        <span>3</span>Boards
      </button>
    </div>
  )
}
