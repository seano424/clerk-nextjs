'use client'
import Card from './Card'
import { Database } from '@/types/supabase'
import SkeletonCard from './SkeletonCard'
import { useAuth } from '@clerk/nextjs'
import DialogButton from './DialogButton'

const fakeTodos = Array(2).fill(5)

export default function BoardList({
  todos,
}: {
  todos: Database['public']['Tables']['todos']['Row'][]
}) {
  const { isSignedIn } = useAuth()
  const key = 'board'
  const arrayUniqueByKey = [
    ...new Map(todos.map((item) => [item[key], item])).values(),
  ]
  const boardsMap = todos.map((todo: any) => todo.board)
  const count = (word: string) => {
    return boardsMap.filter((x) => x === word).length
  }
  return (
    <>
      <div className="pt-5 min-h-screen">
        {arrayUniqueByKey.map((todo, i) => (
          <Card
            relatedTodos={count(todo.board ?? '')}
            boardList
            todo={todo}
            i={i}
            key={todo.id}
          />
        ))}

        {isSignedIn &&
          todos.length === 0 &&
          fakeTodos.map((_, i) => <SkeletonCard active boardList key={i} />)}
      </div>

      {isSignedIn && (
        <div className="fixed bottom-5 left-0 right-0">
          <div className="flex justify-center mt-5">
            <DialogButton className="rounded-full text-5xl font-light h-20 w-20 bg-theme-blue-300 text-white shadow-2xl">
              +
            </DialogButton>
          </div>
        </div>
      )}
    </>
  )
}
