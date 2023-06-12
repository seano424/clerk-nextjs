// app/layout.tsx
import './globals.css'

import { Work_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const workSans = Work_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`flex flex-col min-h-screen ${workSans.className}`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
