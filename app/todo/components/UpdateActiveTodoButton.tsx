import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { Database } from '@/types/supabase'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'

export default function UpdateActiveTodoButton({
  todo,
}: {
  todo: Database['public']['Tables']['todos']['Row']
}) {
  const [isComplete, setIsComplete] = useState(todo.active)
  const { getToken, userId } = useAuth()

  const updateActive = async () => {
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })

    const supabase = await supabaseClient(supabaseAccessToken)

    try {
      const { error } = await supabase
        .from('todos')
        .update({ active: !todo.active })
        .eq('id', todo.id)
        .eq('user_id', userId)
        .select()
        .single()
      if (error) throw error
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    setIsComplete(todo.active)
  }, [todo.active])


  console.log(todo.active);
  

  return (
    <button
      onClick={updateActive}
      className="bg-black text-white h-32 rounded-full w-full text-2xl relative"
    >
      <div
        className={clsx(
          'h-28 relative z-10 mx-5 bg-white rounded-full flex items-center justify-center transition-all duration-300 ease-linear',
          isComplete ? 'w-[calc(100%-2.5rem)]' : 'w-28'
        )}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <CheckIcon
            className={clsx(
              'h-16 w-16 text-black',
              'relative z-20',
              'transition-opacity ease-linear',
              'delay-300 duration-300',
              isComplete ? 'opacity-0' : 'opacity-100'
            )}
          />
        </div>
        <p
          className={clsx(
            'text-black',
            'transition-opacity ease-linear',
            isComplete ? 'opacity-100 delay-700 duration-700' : 'opacity-0'
          )}
        >
          🎉 Completed! 🎊
        </p>
      </div>
      <span className="absolute inset-0 flex justify-center items-center">
        Set As Done
      </span>
    </button>
  )
}
