import { currentUser } from '@clerk/nextjs'

import ListView from './components/ListView'
import Hero from './components/Hero'
import TodoAddForm from './components/TodoAddForm'

export default async function Home() {
  const user = await currentUser()

  return (
    <main className="container">
      {user ? (
        <>
          <Hero />
          <ListView />
        </>
      ) : (
        <div>Sign in to create your todo list</div>
      )}
    </main>
  )
}
