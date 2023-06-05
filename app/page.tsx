import { currentUser } from '@clerk/nextjs'

import ListView from './components/ListView'
import Hero from './components/Hero'

export default async function Home() {
  const user = await currentUser()

  return (
    <main className="container">
      {user ? (
        <>
          <Hero />
          <ListView />
          {/* <TasksList todos={todos} />
          <TodoAddForm setTodos={setTodos} todos={todos} /> */}
        </>
      ) : (
        <div>Sign in to create your todo list</div>
      )}
    </main>
  )
}
