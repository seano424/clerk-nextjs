'use client'

import clsx from 'clsx'
import { useRef, useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import dialogAtom from '@/lib/dialogAtom'
import supabaseClient from '@/lib/supabaseClient'
import { useAuth } from '@clerk/nextjs'

export default function UpdateTodoDialog() {
  const [dialog, setDialog] = useAtom(dialogAtom)
  const [todo, setTodo] = useState(dialog.data)

  const { getToken, isSignedIn } = useAuth()
  const updateDialog = useRef<HTMLDialogElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { title, board, active, id, description } = todo
      const supabaseAccessToken = await getToken({ template: 'supabase' })
      const supabase = await supabaseClient(
        isSignedIn ? supabaseAccessToken : ''
      )
      const { error } = await supabase
        .from(isSignedIn ? 'todos' : 'todos_public')
        .update({ title, board, active, description })
        .match({ id: id })
      updateDialog.current?.close() &&
        setDialog((prevState) => ({ ...prevState, open: false }))
      if (error) throw error
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (dialog.type === 'Edit') {
      setTodo(dialog.data)
      updateDialog.current?.removeAttribute('open')
      dialog.open && updateDialog.current?.showModal()
      updateDialog.current?.close && setTodo(dialog.data)
    } else {
      updateDialog.current?.close()
    }
  }, [dialog])

  return (
    <dialog ref={updateDialog}>
      <div
        className={clsx(
          'fixed bg-black/30 inset-0 z-50 flex flex-col justify-center items-center'
        )}
      >
        <div className={clsx('p-1 rounded-3xl border-8 bg-white')}>
          <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col container max-w-sm md:max-w-xl w-[800px] items-start gap-2 p-10 rounded-3xl"
          >
            <h2 className="text-theme-slate-900 text-xl font-medium pb-4">
              Update Todos!
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
              value={todo.title}
              placeholder="Title"
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
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
              value={todo.board}
              placeholder="Board Name"
              onChange={(e) => setTodo({ ...todo, board: e.target.value })}
            />
            <label
              className="text-theme-slate-900 text-lg font-medium"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              rows={5}
              cols={33}
              className="border-2 w-full text-slate-600 p-4 rounded-xl border-slate-200 focus-visible:ring-0 focus:outline-none bg-slate-100"
              name="description"
              value={todo.description ?? ''}
              placeholder="Description"
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
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
                checked={todo.active}
                onChange={(e) => setTodo({ ...todo, active: e.target.checked })}
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
                  updateDialog.current?.close() &&
                    setDialog((prevState) => ({ ...prevState, open: false }))
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
