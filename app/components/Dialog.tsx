import clsx from 'clsx'
import { useAtom } from 'jotai'
import modalAtom from '@/lib/modalAtom'
import React, { useRef, useEffect, useState } from 'react'

const fakeData = {
  active: true,
  board: '',
  created_at: '',
  date: '',
  id: '',
  test: '',
  time: 1212,
  title: '',
  user_id: '',
}

export default function Dialog() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [modal] = useAtom(modalAtom)
  const [data, setData] = useState(modal.data)

  useEffect(() => {
    modal.open && modalRef.current?.showModal()
    modalRef.current?.close && setData(modal.data)
  }, [modal])

  const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']

  return (
    <dialog
      ref={modalRef}
      className={clsx(
        'border-8 fixed inset-0 z-50 w-full container h-full',
        bgColors[modal.bgColor]
      )}
    >
      <p>Greetings, one and all!</p>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          value={data?.title}
          placeholder={data?.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <input
          type="text"
          value={data?.title}
          placeholder={data?.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </form>
      <form method="dialog">
        <button>OK</button>
      </form>
    </dialog>
  )
}
