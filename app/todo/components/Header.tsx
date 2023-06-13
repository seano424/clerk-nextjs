import Link from 'next/link'
import UpdateTodoButton from './UpdateTodoButton'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Header() {
  return (
    <div className="flex justify-between">
      <Link
        href="/"
        className="bg-black text-white flex justify-center items-center rounded-full h-12 w-12"
      >
        <ArrowLeftIcon className="h-7 w-7" />
      </Link>
      <UpdateTodoButton />
    </div>
  )
}
