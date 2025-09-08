import React, { useState } from 'react';
import { Upload, FileText, Image, AlertCircle } from 'lucide-react';

export default function UploadNotePage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Not Yükle</h1>
        <p className="text-gray-600">Ders notlarınızı paylaşın ve diğer öğrencilere yardımcı olun</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dosya Yükle</h2>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <FileText className="h-12 w-12 text-blue-600 mx-auto" />
                  <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">
                    Dosyayı buraya sürükleyin veya
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                    />
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                      Dosya Seç
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Note Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Not Bilgileri</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Not Başlığı *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: Matematik I - Limit ve Süreklilik"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ders
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Ders seçin</option>
                  <option value="matematik1">Matematik I</option>
                  <option value="fizik1">Fizik I</option>
                  <option value="kimya1">Kimya I</option>
                  <option value="programlama">Programlama</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Notunuz hakkında kısa bir açıklama yazın..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Etiketler
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="limit, türev, integral (virgülle ayırın)"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="public"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="public" className="ml-2 block text-sm text-gray-900">
                  Herkese açık olarak paylaş
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Notu Yükle
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upload Guidelines */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Yükleme Kuralları</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Maksimum dosya boyutu: 50MB</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Desteklenen formatlar: PDF, DOC, PPT, JPG, PNG</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Telif hakkı ihlali yapan içerik paylaşmayın</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Açık ve anlaşılır başlık kullanın</span>
              </li>
            </ul>
          </div>

          {/* Recent Uploads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Son Yüklenenler</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Calculus Özet Notlar
                  </p>
                  <p className="text-xs text-gray-500">2 saat önce</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <Image className="h-8 w-8 text-green-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Fizik Formülleri
                  </p>
                  <p className="text-xs text-gray-500">5 saat önce</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}