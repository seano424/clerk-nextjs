import Link from 'next/link'
import { UserButton, currentUser, SignInButton } from '@clerk/nextjs'

export default async function Header() {
  const user = await currentUser()
  return (
    <header className="text-primary-dark py-5">
      <nav className="flex justify-between container">
        <Link href="/">Logo</Link>
        {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
      </nav>
    </header>
  )
}
