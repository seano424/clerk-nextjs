import Link from 'next/link'
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid'

export default function Heading() {
  return (
    <div className="flex justify-between">
      <Link
        href="/"
        className="bg-black text-white flex justify-center items-center rounded-full h-12 w-12"
      >
        <ArrowLeftIcon className="h-7 w-7" />
      </Link>
      <button className="bg-black text-white rounded-full h-12 w-12 flex justify-center items-center">
        <EllipsisHorizontalIcon className="h-9 w-9" />
      </button>
    </div>
  )
}
