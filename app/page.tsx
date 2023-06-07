import { auth } from '@clerk/nextjs'

import ListView from './components/ListView'
import Hero from './components/Hero'

export default async function Home() {
  const { session } = await auth()
  return (
    <main className="container">
      <Hero />
      {session && <ListView />}
    </main>
  )
}
