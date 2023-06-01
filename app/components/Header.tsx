import Link from 'next/link'
import { UserButton, currentUser, SignInButton } from '@clerk/nextjs'

export default async function Header() {
  const user = await currentUser()
  return (
    <header className="bg-slate-950 text-slate-50 py-5">
      <nav className="flex justify-between container">
        <Link href="/">Logo</Link>
        {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
      </nav>
    </header>
  )
}
