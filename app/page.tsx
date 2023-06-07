import ListView from './components/ListView'
import Hero from './components/Hero'

export default async function Home() {
  return (
    <main className="container">
      {/* @ts-expect-error Server Component */}
      <Hero />
      <ListView />
    </main>
  )
}
