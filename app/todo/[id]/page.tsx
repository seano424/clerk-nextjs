'use client'

import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import Content from '../components/Content'
import Heading from '../components/Heading'

export default function Page({ params: { id } }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const colorIndex = Number(searchParams.get('colorIndex')) || 0
  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']

  return (
    <main className={clsx(bgColors[colorIndex], 'min-h-screen pt-10')}>
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <Heading />
        <Content id={id} />
      </div>
    </main>
  )
}
