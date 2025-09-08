import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Note, NotesFilters } from '../types'

export const useNotes = (filters: NotesFilters = {}) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNotes()
  }, [filters])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('notes')
        .select(`
          *,
          subject:subjects(*),
          author:profiles(*)
        `)
        .eq('is_public', true)

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%, description.ilike.%${filters.search}%`)
      }

      if (filters.subject_id) {
        query = query.eq('subject_id', filters.subject_id)
      }

      if (filters.author_id) {
        query = query.eq('author_id', filters.author_id)
      }

      if (filters.difficulty_level) {
        query = query.eq('difficulty_level', filters.difficulty_level)
      }

      if (filters.note_type) {
        query = query.eq('note_type', filters.note_type)
      }

      if (filters.rating_min) {
        query = query.gte('average_rating', filters.rating_min)
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.contains('tags', filters.tags)
      }

      // Apply sorting
      const sortBy = filters.sort_by || 'created_at'
      const sortOrder = filters.sort_order || 'desc'
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })

      const { data, error } = await query

      if (error) throw error

      setNotes(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Notlar yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return {
    notes,
    loading,
    error,
    refetch: fetchNotes
  }
}