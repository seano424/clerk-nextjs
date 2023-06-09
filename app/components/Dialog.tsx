import React, { useRef } from 'react'

export default function Dialog() {
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleOpenModal = () => {
    modalRef.current?.showModal()
  }
  return (
    <>
      <dialog
        ref={modalRef}
        className="border-8 fixed inset-0 z-50 w-full container h-full"
        open
      >
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
      <button
        onClick={handleOpenModal}
        className="text-white border-8 my-10 rounded-full px-5 py-3"
      >
        open modal!
      </button>
    </>
  )
}
