import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  TrendingUp, 
  Heart, 
  Upload,
  FileText,
  Users,
  Settings
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Ana Sayfa', path: '/' },
  { icon: FileText, label: 'Tüm Notlar', path: '/notes' },
  { icon: TrendingUp, label: 'Popüler Notlar', path: '/popular' },
  { icon: Heart, label: 'Favorilerim', path: '/favorites' },
  { icon: Upload, label: 'Not Yükle', path: '/upload' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
      <nav className="p-4">
        {/* Main Navigation */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">İstatistikler</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Toplam Not:</span>
              <span className="font-medium text-gray-900">1,247</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Aktif Kullanıcı:</span>
              <span className="font-medium text-gray-900">324</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Bu Hafta:</span>
              <span className="font-medium text-blue-600">+47</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Hızlı Erişim</h3>
          <div className="space-y-2">
            <Link
              to="/subjects"
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Dersler</span>
            </Link>
            <Link
              to="/users"
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Kullanıcılar</span>
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}