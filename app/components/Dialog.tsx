import clsx from 'clsx'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/nextjs'
import modalAtom from '@/lib/modalAtom'
import supabaseClient from '@/lib/supabaseClient'
import { initialData } from '@/lib/modalAtom'
import React, { useRef, useEffect, useState } from 'react'

export default function Dialog() {
  const dialog = useRef<HTMLDialogElement>(null)
  const { userId, getToken } = useAuth()
  const [modal, setModal] = useAtom(modalAtom)
  const [data, setData] = useState(modal.data)

  useEffect(() => {
    dialog.current?.removeAttribute('open')
    modal.open && dialog.current?.showModal()
    dialog.current?.close && setData(modal.data)
  }, [modal])

  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { title, board, active, id } = data
      const supabaseAccessToken = await getToken({ template: 'supabase' })
      const supabase = await supabaseClient(supabaseAccessToken)
      const { error } = await supabase
        .from('todos')
        .upsert({ title, board, active, user_id: userId!, id })
      dialog.current?.close() &&
        setModal({ data: initialData, open: false, bgColor: 0 })
      if (id === 0) {
        toast.success('Task created successfully!')
      } else {
        toast.success('Task updated successfully!')
      }
      if (error) throw error
    } catch (error) {
      alert(error)
    }
  }

  return (
    <dialog ref={dialog}>
      <div
        className={clsx(
          'border-8 fixed inset-0 z-50 w-full container h-full flex flex-col justify-center items-center',
          bgColors[modal.bgColor]
        )}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col container max-w-sm w-full items-start gap-2 bg-white p-10 rounded-3xl"
        >
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
                dialog.current?.close() && setModal({ ...modal, open: false })
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
