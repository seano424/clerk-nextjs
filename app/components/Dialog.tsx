import React, { useRef, useEffect } from 'react'
import { useAtom } from 'jotai'
import { modalAtom } from './Card'

export default function Dialog() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [modal, setModal] = useAtom(modalAtom)

  // const handleModal = async () => {
  //   setModal((prevState) => ({ ...prevState, open: true }))
  //   modal.open
  //     ? modalRef.current?.showModal()
  //     : modalRef.current?.close() &&
  //       setModal((prevState) => ({ ...prevState, open: false }))
  // }

  useEffect(() => {
    modal.open && modalRef.current?.showModal()
    !modal.open &&
      modalRef.current?.close() &&
      setModal((prevState) => ({ ...prevState, open: false }))
  }, [modal])

  return (
    <>
      <dialog
        ref={modalRef}
        className="border-8 fixed inset-0 z-50 w-full container h-full"
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
