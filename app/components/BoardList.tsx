import Card from './Card'
import { TasksListProps } from './TasksList'

export default function BoardList({ todos }: TasksListProps) {
  return (
    <div className="pt-5 min-h-screen">
      {todos.map((task, i) => (
        <Card boardList task={task} i={i} key={task.id} />
      ))}
    </div>
  )
}
