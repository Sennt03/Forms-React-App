import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const useFetchForms = () => {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true)
      setError(null)

      const cachedForms = localStorage.getItem('forms')
      if (cachedForms) {
        setForms(JSON.parse(cachedForms))
        setLoading(false)
      }

      const { data, error } = await supabase
        .from('forms')
        .select('*')

      if (error) {
        setError(error)
      } else {
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setForms(sortedData)
        localStorage.setItem('forms', JSON.stringify(sortedData)) // Guarda en cache
      }
      setLoading(false)
    }

    fetchForms()
  }, [])

  return { forms, loading, error, setForms }
}

export default useFetchForms
