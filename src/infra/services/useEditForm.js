import { useState } from 'react'
import { supabase } from '../supabaseClient'

const useEditForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const editForm = async (formId, updatedForm) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data, error } = await supabase
        .from('forms')
        .update({
          title: updatedForm.title,
          published: updatedForm.published,
          questions: updatedForm.questions,
        })
        .eq('id', formId)

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
      return data
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    editForm,
    loading,
    error,
    success
  }
}

export default useEditForm
