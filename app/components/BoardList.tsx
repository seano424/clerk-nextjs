'use client'
import Card from './Card'
import { TasksListProps } from './TasksList'
import SkeletonCard from './SkeletonCard'
import { useAuth } from '@clerk/nextjs'

const fakeTodos = Array(2).fill(5)

export default function BoardList({ todos }: TasksListProps) {
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
    <div className="pt-5 min-h-screen">
      {arrayUniqueByKey.map((task, i) => (
        <Card
          relatedTasks={count(task.board ?? '')}
          boardList
          task={task}
          i={i}
          key={task.id}
        />
      ))}

      {isSignedIn &&
        todos.length === 0 &&
        fakeTodos.map((_, i) => <SkeletonCard active boardList key={i} />)}
    </div>
  )
}
