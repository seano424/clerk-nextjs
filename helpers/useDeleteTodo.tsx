import { toast } from 'react-toastify'
import supabaseClient from '@/lib/supabaseClient'

const useDeleteTodo = async (
  id: string | number,
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
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
    if (error) throw error
  } catch (e) {
    alert(e)
  } finally {
    setState((prevState: any) =>
      prevState.filter(
        (item: {
          title: string
          created_at: string
          id: number
          user_id: string
        }) => item.id !== id
      )
    )
    notify('Deleted task! 🗑')
  }
}

export default useDeleteTodo
