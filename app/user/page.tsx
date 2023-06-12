import { UserButton, currentUser } from '@clerk/nextjs'

export default async function User() {
  const user = await currentUser()
  if (!user) return <div>Not logged in</div>

  return (
    <main className=''>
      <h1>I am the user page: {user.lastName}</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  )
}
