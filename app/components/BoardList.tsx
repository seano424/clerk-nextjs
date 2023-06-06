'use client'
import Card from './Card'
import { TasksListProps } from './TasksList'

export default function BoardList({ todos }: TasksListProps) {
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
          relatedTasks={count(task.board)}
          boardList
          task={task}
          i={i}
          key={task.id}
        />
      ))}
    </div>
  )
}
