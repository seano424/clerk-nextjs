import modalAtom from '@/lib/modalAtom'
import { useSetAtom } from 'jotai'

export default function AddTodoButton() {
  const setModal = useSetAtom(modalAtom)

  const handleModal = () => {
    setModal((prevState) => ({ ...prevState, open: true, type: 'Add' }))
  }
  return (
    <div className="fixed bottom-5 left-0 right-0">
      <div className="flex justify-center mt-5">
        <button
          onClick={handleModal}
          className="rounded-full text-5xl font-light h-20 w-20 bg-theme-blue-300 text-white shadow-2xl"
        >
          +
        </button>
      </div>
    </div>
  )
}
