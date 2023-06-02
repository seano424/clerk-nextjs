import { Dispatch } from 'react'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'

interface TodoListProps {
  todos: {
    title: string
    created_at: string
    id: number
    user_id: string
  }[]
  setTodos: Dispatch<any>
}

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const { getToken, userId } = useAuth()

  async function removeTodo(id: number) {
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
      if (error) throw error
    } catch (e) {
      alert(e)
    }

    setTodos((prevState: any) =>
      prevState.filter(
        (todo: {
          title: string
          created_at: string
          id: number
          user_id: string
        }) => todo.id !== id
      )
    )
  }

  return (
    <>
      {todos.length > 0 ? (
        <div className="bg-purple-500 text-white my-2 p-5">
          <span className="text-lg uppercase font-bold">
            {todos.length === 1
              ? todos.length + ' todo'
              : todos.length + ' todos'}
          </span>

          <ul className="flex flex-col gap-2 pt-3">
            {todos.map((todo) => (
              <li className="flex text-lg justify-between items-center">
                {todo.title}
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="bg-red-500 rounded-full h-10 w-10 flex items-center justify-center"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Add some todos</div>
      )}
    </>
  )
}
