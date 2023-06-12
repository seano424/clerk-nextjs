import Link from 'next/link'
import { currentUser } from '@clerk/nextjs'

const welcomes = ['Good Morning', 'Good Afternoon', 'Good Evening']

const welcome = (h: number) => {
  if (h < 11) return welcomes[0]
  if (h < 18) return welcomes[1]
  return welcomes[2]
}

export default async function Hero() {
  const date = new Date()
  const user = await currentUser()

  return (
    <div className="flex flex-col gap-5 pb-10">
      <h1 className="text-theme-blue-300 text-8xl font-bold tracking-tighter">
        {welcome(date.getHours())}
      </h1>
      {!user && (
        <div className="text-2xl sm:text-3xl text-white">
          <h2>Welcome to your favorite Todo App!</h2>
          <h2 className="mb-20">Sign in to get started.</h2>
          <Link
            className="bg-theme-yellow text-theme-blue-900 py-2 px-4 rounded-md font-bold"
            href="/sign-in"
          >
            Get Started now
          </Link>
        </div>
      )}
    </div>
  )
}
