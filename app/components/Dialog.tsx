import clsx from 'clsx'
import { useAtom } from 'jotai'
import modalAtom from '@/lib/modalAtom'
import React, { useRef, useEffect } from 'react'

export default function Dialog() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [modal, setModal] = useAtom(modalAtom)

  useEffect(() => {
    modal.open && modalRef.current?.showModal()
    !modal.open &&
      modalRef.current?.close() &&
      setModal((prevState) => ({ ...prevState, open: false }))
  }, [modal])

  const bgColors = [
    'bg-theme-cyan',
    'bg-theme-yellow',
    'bg-white',
    'bg-gray-100',
  ]

  return (
    <>
      <dialog
        ref={modalRef}
        className={clsx(
          'border-8 fixed inset-0 z-50 w-full container h-full',
          bgColors[modal.bgColor]
        )}
      >
        <p>Greetings, one and all!</p>
        <p>{modal.data?.title}</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
      {/* <button
        onClick={() => setModal((prevState) => ({ ...prevState, open: true }))}
        className="text-white border-8 my-10 rounded-full px-5 py-3"
      >
        open modal!
      </button> */}
    </>
  )
}