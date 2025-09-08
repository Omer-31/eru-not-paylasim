export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject_id: string;
  author_id: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  tags?: string[];
  is_public: boolean;
  view_count: number;
  favorite_count: number;
  created_at: string;
  updated_at: string;
  author?: User;
  subject?: Subject;
  is_favorited?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  note_id: string;
  created_at: string;
}

export interface SearchFilters {
  query?: string;
  subject_id?: string;
  tags?: string[];
  author_id?: string;
}