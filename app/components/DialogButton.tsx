'use client'

import modalAtom from '@/lib/modalAtom'
import { useSetAtom } from 'jotai'
import { initialData } from '@/lib/modalAtom'
import { Database } from '@/types/supabase'

export default function DialogButton({
  children,
  className,
  data,
  i,
}: {
  children: React.ReactNode
  className?: string
  data?: Database['public']['Tables']['todos']['Row']
  i?: number
}) {
  const setModal = useSetAtom(modalAtom)

  const handleModal = () => {
    setModal({ data: data ?? initialData, open: true, bgColor: i ?? 2 })
  }

  return (
    <button onClick={handleModal} className={className}>
      {children}
    </button>
  )
}
