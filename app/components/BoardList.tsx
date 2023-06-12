'use client'

import { useAuth } from '@clerk/nextjs'

import SkeletonCard from './SkeletonCard'
import DialogButton from './DialogButton'
import BoardCard from './BoardCard'
import { Database } from '@/types/supabase'

const fakeTodos = Array(2).fill(5)

export default function BoardList({
  todos,
}: {
  todos: Database['public']['Tables']['todos']['Row'][] | null
}) {
  const { isSignedIn } = useAuth()
  const key = 'board'
  const arrayUniqueByKey = [
    ...new Map(todos?.map((item) => [item[key], item])).values(),
  ]
  const boardsMap = todos?.map((todo: any) => ({
    board: todo.board,
    active: todo.active,
  }))

  const consolidateBoards = (board: string) => {
    return boardsMap?.filter((x) => x.board === board)
  }

  return (
    <>
      <div className="pt-5 min-h-screen">
        {arrayUniqueByKey.map((todo, i) => (
          <BoardCard
            relatedTodos={todos ? consolidateBoards(todo.board) : undefined}
            key={i}
            i={i}
            todo={todo}
          />
        ))}

        {isSignedIn &&
          todos &&
          todos.length === 0 &&
          fakeTodos.map((_, i) => <SkeletonCard boardList key={i} />)}
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
