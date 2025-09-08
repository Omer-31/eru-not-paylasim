import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, FileText, Upload, Star, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">ERÜ Paylaşım Merkezi'ne Hoş Geldiniz</h1>
        <p className="text-blue-100 text-lg mb-6">
          Ders notlarınızı paylaşın, kaliteli içerikler keşfedin ve akademik başarınızı artırın.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/upload"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Not Yükle
          </Link>
          <Link
            to="/notes"
            className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            Notları İncele
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Not</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
              <p className="text-2xl font-bold text-gray-900">324</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bu Ay</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ortalama Puan</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Popular Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Son Aktiviteler</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Ahmet Yılmaz</span> yeni bir not yükledi
                </p>
                <p className="text-xs text-gray-500">Matematik I - Limit ve Süreklilik</p>
                <p className="text-xs text-gray-400">5 dakika önce</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <Star className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Zeynep Kaya</span> bir notu favorilere ekledi
                </p>
                <p className="text-xs text-gray-500">Fizik II - Elektrik ve Manyetizma</p>
                <p className="text-xs text-gray-400">15 dakika önce</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">3 yeni üye</span> katıldı
                </p>
                <p className="text-xs text-gray-400">1 saat önce</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Notes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Popüler Notlar</h2>
            <Link to="/popular" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Tümünü Gör
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="bg-blue-100 rounded-lg p-2">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Calculus I Özet Notlar</h3>
                <p className="text-sm text-gray-500">Matematik I</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-400">1.2k görüntüleme</span>
                  <span className="text-xs text-gray-400">98 beğeni</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.9</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="bg-green-100 rounded-lg p-2">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Organik Kimya Reaktifleri</h3>
                <p className="text-sm text-gray-500">Kimya II</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-400">856 görüntüleme</span>
                  <span className="text-xs text-gray-400">73 beğeni</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.7</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="bg-purple-100 rounded-lg p-2">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Programlama Algoritmaları</h3>
                <p className="text-sm text-gray-500">Bilgisayar Programlama</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-400">634 görüntüleme</span>
                  <span className="text-xs text-gray-400">45 beğeni</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/upload"
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Not Yükle</h3>
              <p className="text-sm text-gray-500">Ders notlarınızı paylaşın</p>
            </div>
          </Link>

          <Link
            to="/notes"
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
          >
            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Notları İncele</h3>
              <p className="text-sm text-gray-500">Mevcut notlara göz atın</p>
            </div>
          </Link>

          <Link
            to="/favorites"
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
          >
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Favorilerim</h3>
              <p className="text-sm text-gray-500">Kaydettiğiniz notlar</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}