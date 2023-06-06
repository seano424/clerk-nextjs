'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { useAuth } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import {
  CheckCircleIcon,
  EllipsisHorizontalIcon,
  XCircleIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/solid'
import supabaseClient from '@/lib/supabaseClient'
import { Dispatch, SetStateAction } from 'react'

const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
const bgColor = (i: number) => bgColors[i % bgColors.length]

function timeConvert(n: number) {
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + 'h ' + rminutes + 'min'
}

interface CardProps {
  task?: {
    title: string
    created_at: string
    id: number
    user_id: string
    board: string
    time: number
    active: boolean
    date: string
  }
  i: number
  boardList?: boolean
  setTodos: Dispatch<SetStateAction<any>>
}

export default function Card({ task, i, boardList, setTodos }: CardProps) {
  const { user } = useUser()
  const { getToken, userId } = useAuth()
  const notify = (text: string) => toast(text)

  const updateActiveState = async (id: number) => {
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ active: !task?.active })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
      console.log('I am data: ', data)
      setTodos((prevState: any) => {
        if (prevState.id === id) {
          return {
            ...prevState,
            active: !prevState.active,
          }
        }
        return prevState
      })
      if (error) throw error
    } catch (e) {
      alert(e)
    } finally {
      task?.active
        ? notify('Completed task! Good job 🎊')
        : notify('Undoing that! Moved back to active! 💪🏽')
    }
  }

  const deleteTodo = async (id: number) => {
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)
      if (error) throw error
    } catch (e) {
      alert(e)
    } finally {
      setTodos((prevState: any) =>
        prevState.filter(
          (todo: {
            title: string
            created_at: string
            id: number
            user_id: string
          }) => todo.id !== id
        )
      )
      notify('Deleted task! 🗑')
    }
  }

  return (
    <div
      className={clsx(
        bgColor(i),
        'text-theme-slate-900 rounded-[40px] capitalize p-5'
      )}
    >
      <div className="flex justify-between items-center">
        {user ? (
          <Image
            className="rounded-full object-cover"
            src={user.profileImageUrl}
            alt="profile pic"
            height={60}
            width={60}
          />
        ) : (
          <span className="h-[60px] w-[60px] bg-theme-slate-500/30 animate-pulse-slow rounded-full"></span>
        )}
        <div className="flex gap-2 items-center">
          {boardList ? (
            <button>
              <EllipsisHorizontalIcon className="h-10 w-10" />
            </button>
          ) : (
            <>
              <span>{timeConvert(task?.time ?? 90)}</span>
              {task?.active ? (
                <button
                  disabled={!task}
                  onClick={() => updateActiveState(task!.id)}
                >
                  <span className="sr-only">Mark task done</span>
                  <CheckCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
                </button>
              ) : (
                <>
                  <button
                    disabled={!task}
                    className="border-2 rounded-full p-2 border-theme-blue-900 hover:border-opacity-60 transition-all duration-150 ease-linear"
                    onClick={() => updateActiveState(task!.id)}
                  >
                    <span className="sr-only">Undo marking task done</span>
                    <ArrowUturnLeftIcon className="h-8 w-8 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
                  </button>
                  <button disabled={!task} onClick={() => deleteTodo(task!.id)}>
                    <span className="sr-only">Delete task</span>
                    <XCircleIcon className="h-16 w-16 fill-theme-blue-900/90 hover:fill-theme-blue-900/100 transition-all duration-150 ease-linear" />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {boardList ? (
        <>
          <p className="pt-5">2 active tasks</p>
          <h4 className="text-2xl">{task?.board ?? 'My board'}</h4>
        </>
      ) : (
        <>
          <p className="pt-5">{task?.board ?? 'My board'}</p>
          <h4 className="text-2xl">{task?.title ?? 'Task Title'}</h4>
        </>
      )}
    </div>
  )
}
