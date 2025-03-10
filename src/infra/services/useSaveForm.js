import { useState } from 'react'
import { supabase } from '../supabaseClient'

const useSaveForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const saveForm = async (form) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { data, error } = await supabase
      .from('forms')
      .insert([
        {
          title: form.title,
          published: form.published,
          questions: form.questions,
        },
      ])

    setLoading(false)

    if (error) {
      setError(error)
      return
    }

    setSuccess(true)
    console.log('Form saved successfully:', data)
  }

  return { saveForm, loading, error, success }
}

export default useSaveForm
