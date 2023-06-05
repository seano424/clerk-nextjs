import { UserButton, currentUser, SignInButton } from '@clerk/nextjs'

export default async function Header() {
  const user = await currentUser()
  return (
    <header className="text-primary-dark h-28 flex flex-col justify-center">
      <nav className="flex justify-between container">
        <div className="h-12 w-12 flex items-center justify-center">
          <span className="z-50 relative">
            {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
          </span>
          <span className="h-12 w-12 bg-slate-50 rounded-full absolute animate-pulse-slow" />
        </div>
      </nav>
    </header>
  )
}
