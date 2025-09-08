export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          student_number: string | null
          department: string | null
          year: number | null
          points: number
          level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          student_number?: string | null
          department?: string | null
          year?: number | null
          points?: number
          level?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          student_number?: string | null
          department?: string | null
          year?: number | null
          points?: number
          level?: string
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          code: string
          department: string
          year: number
          semester: number
          description: string | null
          instructor: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          department: string
          year: number
          semester: number
          description?: string | null
          instructor?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          department?: string
          year?: number
          semester?: number
          description?: string | null
          instructor?: string | null
          created_at?: string
        }
      }
      notes: {
        Row: {
          id: string
          title: string
          description: string | null
          content: string | null
          file_url: string | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          subject_id: string | null
          author_id: string
          is_public: boolean
          download_count: number
          view_count: number
          average_rating: number
          rating_count: number
          tags: string[] | null
          difficulty_level: string
          note_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content?: string | null
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          subject_id?: string | null
          author_id: string
          is_public?: boolean
          download_count?: number
          view_count?: number
          average_rating?: number
          rating_count?: number
          tags?: string[] | null
          difficulty_level?: string
          note_type?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: string | null
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          subject_id?: string | null
          author_id?: string
          is_public?: boolean
          download_count?: number
          view_count?: number
          average_rating?: number
          rating_count?: number
          tags?: string[] | null
          difficulty_level?: string
          note_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          note_id: string
          author_id: string
          content: string
          parent_id: string | null
          is_edited: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          note_id: string
          author_id: string
          content: string
          parent_id?: string | null
          is_edited?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          note_id?: string
          author_id?: string
          content?: string
          parent_id?: string | null
          is_edited?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          note_id: string
          user_id: string
          rating: number
          review: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          note_id: string
          user_id: string
          rating: number
          review?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          note_id?: string
          user_id?: string
          rating?: number
          review?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          note_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          note_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          note_id?: string
          created_at?: string
        }
      }
      downloads: {
        Row: {
          id: string
          user_id: string
          note_id: string
          downloaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          note_id: string
          downloaded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          note_id?: string
          downloaded_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          data: any | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          data?: any | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          data?: any | null
          is_read?: boolean
          created_at?: string
        }
      }
      class_groups: {
        Row: {
          id: string
          name: string
          description: string | null
          subject_id: string | null
          creator_id: string
          is_public: boolean
          member_count: number
          max_members: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          subject_id?: string | null
          creator_id: string
          is_public?: boolean
          member_count?: number
          max_members?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          subject_id?: string | null
          creator_id?: string
          is_public?: boolean
          member_count?: number
          max_members?: number
          created_at?: string
          updated_at?: string
        }
      }
      forum_topics: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          author_id: string
          is_pinned: boolean
          is_locked: boolean
          post_count: number
          view_count: number
          last_post_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          author_id: string
          is_pinned?: boolean
          is_locked?: boolean
          post_count?: number
          view_count?: number
          last_post_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          author_id?: string
          is_pinned?: boolean
          is_locked?: boolean
          post_count?: number
          view_count?: number
          last_post_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}