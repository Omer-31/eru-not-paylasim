import React from 'react';
import { Heart, BookOpen, Star } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
        <p className="text-gray-600">Kaydettiğiniz notlar</p>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <Heart className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Henüz favori notunuz yok
          </h3>
          <p className="text-gray-500 mb-6">
            Beğendiğiniz notları favorilere ekleyerek daha sonra kolayca erişebilirsiniz
          </p>
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Notları İncele</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Star className="h-4 w-4" />
              <span>Popüler Notlar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}