'use client'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

export default function Avatar() {
  const { user } = useUser()
  return (
    <div>
      {user ? (
        <Image
          className="rounded-full object-cover"
          src={user.profileImageUrl}
          alt="profile pic"
          height={60}
          width={60}
        />
      ) : (
        <span className="h-[60px] w-[60px] bg-theme-slate-500/30 animate-pulse-slow rounded-full"></span>
      )}
    </div>
  )
}
