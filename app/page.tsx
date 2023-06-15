import ListView from './components/ListView'
import Hero from './components/Hero'
import Header from './components/Header'

export default function Home() {
  return (
    <main className="bg-theme-blue-900">
      <div className="max-w-4xl mx-auto">
        {/* @ts-expect-error Server Component */}
        <Header />
        <div className="container">
          {/* @ts-expect-error Server Component */}
          <Hero />
          <ListView />
        </div>
      </div>
    </main>
  )
}
