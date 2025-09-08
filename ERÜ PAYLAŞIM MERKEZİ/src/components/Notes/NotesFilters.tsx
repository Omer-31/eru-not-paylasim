import React from 'react';
import { Filter, Search, X } from 'lucide-react';

interface NotesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCourse: string;
  onCourseChange: (course: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedClassLevel: string;
  onClassLevelChange: (classLevel: string) => void;
  courses: string[];
  departments: string[];
  classLevels: string[];
  onClearFilters: () => void;
}

export function NotesFilters({
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  selectedDepartment,
  onDepartmentChange,
  selectedClassLevel,
  onClassLevelChange,
  courses,
  departments,
  classLevels,
  onClearFilters,
}: NotesFiltersProps) {
  const hasActiveFilters = searchQuery || selectedCourse || selectedDepartment || selectedClassLevel;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Filtreler</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Temizle</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Not başlığı ara..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Course Filter */}
        <div>
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tüm Dersler</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tüm Bölümler</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        {/* Class Level Filter */}
        <div>
          <select
            value={selectedClassLevel}
            onChange={(e) => onClassLevelChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tüm Sınıflar</option>
            {classLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">Aktif filtreler:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Arama: "{searchQuery}"
              </span>
            )}
            {selectedCourse && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ders: {selectedCourse}
              </span>
            )}
            {selectedDepartment && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Bölüm: {selectedDepartment}
              </span>
            )}
            {selectedClassLevel && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Sınıf: {selectedClassLevel}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}