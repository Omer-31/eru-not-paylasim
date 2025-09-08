import React from 'react';
import { TrendingUp, Star, Download, Eye } from 'lucide-react';

export default function PopularNotesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Popüler Notlar</h1>
        <p className="text-gray-600">En çok beğenilen ve indirilen notlar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bu Hafta Trend</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Yüksek Puan</p>
              <p className="text-2xl font-bold text-gray-900">4.9</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam İndirme</p>
              <p className="text-2xl font-bold text-gray-900">2.1k</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Notes List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Bu Haftanın Popüler Notları</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <TrendingUp className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Popüler notlar yükleniyor
            </h3>
            <p className="text-gray-500">
              En popüler notlar burada görünecek
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}