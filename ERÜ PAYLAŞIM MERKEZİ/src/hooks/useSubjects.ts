import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Subject } from '../types'

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name')

      if (error) throw error

      setSubjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dersler yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return {
    subjects,
    loading,
    error,
    refetch: fetchSubjects
  }
}