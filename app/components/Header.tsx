import { UserButton, currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Header() {
  const user = await currentUser()
  return (
    <header className="text-primary-dark h-28 flex flex-col justify-center">
      <nav className="flex justify-between container">
        {user && (
          <div className="h-12 w-12 flex items-center justify-center relative">
            <span className="z-50 relative">
              <UserButton afterSignOutUrl="/" />
            </span>
            <span className="h-12 w-12 bg-slate-50 rounded-full absolute animate-pulse-slow" />
          </div>
        )}
        {!user && (
          <Link
            href="/sign-in"
            className="flex justify-center items-center bg-theme-cyan text-theme-blue-900 text-xl font-bold rounded-md px-4 py-2"
          >
            Sign in
          </Link>
        )}
      </nav>
    </header>
  )
}
