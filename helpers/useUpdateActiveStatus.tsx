import { toast } from 'react-toastify'
import supabaseClient from '@/lib/supabaseClient'

const useUpdateActiveStatus = async (
  task: any,
  setState: any,
  userId: any,
  getToken: any
) => {
  const notify = (text: string) => toast(text)

  const supabaseAccessToken = await getToken({
    template: 'supabase',
  })

  const supabase = await supabaseClient(supabaseAccessToken)

  try {
    const { error } = await supabase
      .from('todos')
      .update({ active: !task?.active })
      .eq('id', task.id)
      .eq('user_id', userId)
      .select()
    setState((prevState: any) => {
      if (prevState.id === task.id) {
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

export default useUpdateActiveStatus
