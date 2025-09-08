import React, { useState } from 'react';
import { 
  Download, 
  Eye, 
  Heart, 
  MessageSquare, 
  Calendar,
  User,
  FileText,
  Image,
  File
} from 'lucide-react';
import { Note } from '../../types';

interface NoteCardProps {
  note: Note;
  onView: (note: Note) => void;
  onDownload: (note: Note) => void;
  onToggleFavorite: (noteId: string) => void;
  isFavorite: boolean;
}

export function NoteCard({ note, onView, onDownload, onToggleFavorite, isFavorite }: NoteCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return Image;
    if (fileType.includes('pdf')) return FileText;
    return File;
  };

  const FileIcon = getFileIcon(note.file_type);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      await onDownload(note);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {note.title}
            </h3>
            <p className="text-sm text-blue-600 font-medium">
              {note.course_name}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <FileIcon className="h-5 w-5 text-gray-400" />
            <button
              onClick={() => onToggleFavorite(note.id)}
              className={`p-1 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {note.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {note.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {note.view_count}
            </span>
            <span className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              {note.download_count}
            </span>
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {note.likes_count}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              0
            </span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{note.uploader_name}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(note.created_at)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onView(note)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            Görüntüle
          </button>
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50"
          >
            <Download className="h-4 w-4 mr-2" />
            {isLoading ? 'İndiriliyor...' : 'İndir'}
          </button>
        </div>
      </div>
    </div>
  );
}