'use client'

import { useSetAtom } from 'jotai'
import dialogAtom from '@/lib/dialogAtom'
import { useParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

export default function UpdateTodoButton() {
  const setModal = useSetAtom(dialogAtom)
  const { getToken } = useAuth()
  const params = useParams()

  const getTodo = async () => {
    const supabaseAccessToken = await getToken({ template: 'supabase' })
    const supabase = await supabaseClient(supabaseAccessToken)
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', params.id)
      .single()
    if (error) {
      throw error
    }
    return data
  }

  const handleModal = async () => {
    const data = await getTodo()
    setModal((prevState) => ({ ...prevState, data, open: true, type: 'Edit' }))
  }

  return (
    <button
      onClick={handleModal}
      className="bg-black text-white rounded-full h-12 w-12 flex justify-center items-center"
    >
      <EllipsisHorizontalIcon className="h-9 w-9" />
    </button>
  )
}
