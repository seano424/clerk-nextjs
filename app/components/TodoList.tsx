interface TodoListProps {
  todos: {
    title: string
    created_at: string
    id: number
    user_id: string
  }[]
}

export default function TodoList({ todos }: TodoListProps) {
  console.log(todos)

  function removeTodo(id: number) {
    
  }

  return (
    <div className="bg-purple-500 text-white my-2 p-5">
      <span className="text-lg uppercase font-bold">
        {todos.length && todos.length === 1
          ? todos.length + ' todo'
          : todos.length + ' todos'}
      </span>
      {todos.length && (
        <ul className="flex flex-col gap-2 pt-3">
          {todos.map((todo) => (
            <li className="flex text-lg justify-between items-center">
              {todo.title}
              <button onClick={() => removeTodo(todo.id)} className="bg-red-500 rounded-full h-10 w-10 flex items-center justify-center">
                -
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
