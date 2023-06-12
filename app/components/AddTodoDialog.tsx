import clsx from 'clsx'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/nextjs'
import dialogAtom from '@/lib/dialogAtom'
import supabaseClient from '@/lib/supabaseClient'
import React, { useRef, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { initialData } from '@/lib/dialogAtom'

export default function AddTodoDialog() {
  const addDialog = useRef<HTMLDialogElement>(null)
  const { userId, getToken } = useAuth()
  const [modal, setModal] = useAtom(dialogAtom)
  const [data, setData] = useState<
    Database['public']['Tables']['todos']['Row'] | typeof initialData
  >(modal.data)

  useEffect(() => {
    if (modal.type === 'Add') {
      addDialog.current?.removeAttribute('open')
      modal.open && addDialog.current?.showModal()
      addDialog.current?.close && setData(initialData)
    } else {
      addDialog.current?.close()
    }
  }, [modal])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userId) return
    try {
      const { title, board, active } = data
      const supabaseAccessToken = await getToken({ template: 'supabase' })
      const supabase = await supabaseClient(supabaseAccessToken)
      const { error } = await supabase
        .from('todos')
        .insert({ title, board, active, user_id: userId })
      addDialog.current?.close() &&
        setModal((prevState) => ({ ...prevState, open: false }))
      toast.success('Todo created successfully!')
      if (error) throw error
    } catch (error) {
      alert(error)
    }
  }

  return (
    <dialog ref={addDialog}>
      <div
        className={clsx(
          'fixed bg-black/30 inset-0 z-50 flex flex-col justify-center items-center'
        )}
      >
        <div className={clsx('p-1 rounded-3xl border-8 bg-white')}>
          <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col container max-w-sm w-[400px] items-start gap-2 p-10 rounded-3xl"
          >
            <h2 className="text-theme-slate-900 text-xl font-medium pb-4">
              Add New Todos
            </h2>
            <label
              className="text-theme-slate-900 text-lg font-medium"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="border-2 w-full text-slate-600 p-4 rounded-xl border-slate-200 focus-visible:ring-0 focus:outline-none bg-slate-100"
              name="title"
              type="text"
              value={data.title}
              placeholder="Title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <label
              className="text-theme-slate-900 text-lg font-medium"
              htmlFor="board"
            >
              Board Name
            </label>
            <input
              className="border-2 w-full text-slate-600 p-4 rounded-xl border-slate-200 focus-visible:ring-0 focus:outline-none bg-slate-100"
              name="board"
              type="text"
              value={data.board}
              placeholder="Board Name"
              onChange={(e) => setData({ ...data, board: e.target.value })}
            />
            <div className="flex gap-2">
              <label
                className="text-theme-slate-900 text-lg font-medium"
                htmlFor="active"
              >
                Active
              </label>
              <input
                name="active"
                type="checkbox"
                checked={data.active}
                onChange={(e) => setData({ ...data, active: e.target.checked })}
              />
            </div>
            <div className="mt-10 flex flex-row-reverse justify-between w-full">
              <button
                type="submit"
                className="px-10 py-3 rounded-full text-white bg-sky-400"
              >
                Send
              </button>
              <button
                className="text-red-500 font-medium text-lg"
                onClick={(e) => {
                  e.preventDefault()
                  addDialog.current?.close() &&
                    setModal({ ...modal, open: false })
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}
