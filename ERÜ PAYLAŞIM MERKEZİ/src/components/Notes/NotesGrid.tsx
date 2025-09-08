import React from 'react';
import { Note } from '../../types';
import { NoteCard } from './NoteCard';
import { BookOpen } from 'lucide-react';

interface NotesGridProps {
  notes: Note[];
  loading: boolean;
  onView: (note: Note) => void;
  onDownload: (note: Note) => void;
  onToggleFavorite: (noteId: string) => void;
  favoriteNotes: string[];
}

export function NotesGrid({ 
  notes, 
  loading, 
  onView, 
  onDownload, 
  onToggleFavorite, 
  favoriteNotes 
}: NotesGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md border border-gray-200 animate-pulse">
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="flex space-x-2">
                <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Henüz not bulunamadı
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Bu filtrelere uygun ders notu bulunmamaktadır. Farklı filtreler deneyebilir 
          veya ilk notu siz yükleyebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onView={onView}
          onDownload={onDownload}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favoriteNotes.includes(note.id)}
        />
      ))}
    </div>
  );
}