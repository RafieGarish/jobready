// File: GlobalSearchContent.tsx
import React from 'react';
import Image from 'next/image';
import { Play, FileText, Video, User, Search, ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import { trainingModules, videos, schedule, progress } from '../data';

interface GlobalSearchContentProps {
  searchQuery: string;
  onMenuClick: (menu: string) => void;
  onVideoClick: (index: number) => void;
}

interface SearchResult {
  id: string;
  type: 'training' | 'video' | 'cv' | 'schedule' | 'progress';
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  image?: string;
  score?: number;
  total?: number;
  date?: string;
  originalIndex?: number;
  moduleId?: number;
}

export default function GlobalSearchContent({ searchQuery, onMenuClick, onVideoClick }: GlobalSearchContentProps) {
  if (!searchQuery) {
    return (
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-cyan-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cari Konten</h2>
          <p className="text-gray-600">Ketik di atas untuk mencari pelatihan, video, jadwal, dan lainnya</p>
        </div>
      </div>
    );
  }

  // Search across all content types
  const searchResults: SearchResult[] = [];

  // Search training modules
  trainingModules.forEach(module => {
    if (module.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push({
        id: `training-${module.id}`,
        type: 'training',
        title: module.name,
        icon: module.icon,
        color: module.color,
        description: `Modul pelatihan ${module.name}`,
        moduleId: module.id
      });
    }
  });

  // Search videos
  videos.forEach((video, index) => {
    if (video.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push({
        id: `video-${index}`,
        type: 'video',
        title: video.title,
        image: video.poster,
        description: 'Video pembelajaran',
        originalIndex: index
      });
    }
  });

  // Search schedule
  schedule.forEach((item, index) => {
    if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push({
        id: `schedule-${index}`,
        type: 'schedule',
        title: item.title,
        date: `${item.date} ${item.month} ${item.year}`,
        color: item.color,
        description: 'Jadwal pelatihan'
      });
    }
  });

  // Search progress
  progress.forEach((item, index) => {
    if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push({
        id: `progress-${index}`,
        type: 'progress',
        title: item.title,
        score: item.score,
        total: item.total,
        icon: item.icon,
        color: item.color,
        description: `Progress: ${item.score}/${item.total}`
      });
    }
  });

  // Add CV template search
  if ('cv'.includes(searchQuery.toLowerCase()) || 'template'.includes(searchQuery.toLowerCase()) || 'resume'.includes(searchQuery.toLowerCase()) || 'curriculum vitae'.includes(searchQuery.toLowerCase())) {
    searchResults.push({
      id: 'cv-template',
      type: 'cv',
      title: 'Template CV Professional',
      description: 'Template CV siap pakai'
    });
  }

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'training':
        return <FileText size={20} className="text-blue-500" />;
      case 'video':
        return <Video size={20} className="text-green-500" />;
      case 'cv':
        return <FileText size={20} className="text-purple-500" />;
      case 'schedule':
        return <Calendar size={20} className="text-orange-500" />;
      case 'progress':
        return <TrendingUp size={20} className="text-cyan-500" />;
      default:
        return <Search size={20} className="text-gray-500" />;
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'training':
        return 'Pelatihan';
      case 'video':
        return 'Video';
      case 'cv':
        return 'CV Template';
      case 'schedule':
        return 'Jadwal';
      case 'progress':
        return 'Progress';
      default:
        return 'Lainnya';
    }
  };

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case 'training':
        // Navigate to video pelatihan page
        onMenuClick('video');
        break;
      
      case 'video':
        // Open video modal if index is available
        if (result.originalIndex !== undefined) {
          onVideoClick(result.originalIndex);
        }
        break;
      
      case 'cv':
        // Navigate to CV page
        onMenuClick('cv');
        break;
      
      case 'schedule':
        // Navigate to dashboard where schedule is shown
        onMenuClick('dashboard');
        break;
      
      case 'progress':
        // Navigate to dashboard where progress is shown
        onMenuClick('dashboard');
        break;
      
      default:
        break;
    }
  };

  const getActionDescription = (result: SearchResult) => {
    switch (result.type) {
      case 'training':
        return 'Buka modul pelatihan';
      case 'video':
        return 'Tonton video';
      case 'cv':
        return 'Lihat template CV';
      case 'schedule':
        return 'Lihat jadwal';
      case 'progress':
        return 'Lihat progress';
      default:
        return 'Buka';
    }
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Hasil Pencarian</h2>
          <p className="text-gray-600 mt-1">
            Ditemukan {searchResults.length} hasil untuk "{searchQuery}"
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Semua Kategori</span>
          <ArrowRight size={16} />
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-cyan-200 group"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon/Image */}
                  <div className="flex-shrink-0">
                    {result.image ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={result.image}
                          alt={result.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ) : result.icon ? (
                      <div className={`w-16 h-16 ${result.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform`}>
                        {result.icon}
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                        {getTypeIcon(result.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        result.type === 'training' ? 'bg-blue-100 text-blue-800' :
                        result.type === 'video' ? 'bg-green-100 text-green-800' :
                        result.type === 'cv' ? 'bg-purple-100 text-purple-800' :
                        result.type === 'schedule' ? 'bg-orange-100 text-orange-800' :
                        'bg-cyan-100 text-cyan-800'
                      }`}>
                        {getTypeIcon(result.type)}
                        {getTypeLabel(result.type)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-cyan-600 transition-colors">
                      {result.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-2">
                      {result.description}
                    </p>

                    {/* Additional Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {result.date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {result.date}
                        </span>
                      )}
                      {result.score !== undefined && result.total !== undefined && (
                        <span className="flex items-center gap-1">
                          <TrendingUp size={12} />
                          {result.score}/{result.total} poin
                        </span>
                      )}
                    </div>

                    {/* Action Hint */}
                    <div className="mt-2">
                      <span className="text-xs text-cyan-600 font-medium flex items-center gap-1">
                        {getActionDescription(result)}
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>

                  {/* Action Arrow */}
                  <div className="flex-shrink-0 transform group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tidak ada hasil ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Tidak ada hasil untuk "{searchQuery}". Coba kata kunci lain atau periksa ejaan.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>💡 Tips pencarian:</p>
              <ul className="space-y-1">
                <li>• Gunakan kata kunci yang lebih umum</li>
                <li>• Periksa ejaan kata kunci</li>
                <li>• Coba istilah terkait</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Quick Categories */}
      {searchResults.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Kategori Terkait</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(searchResults.map(r => r.type))).map(type => (
              <button
                key={type}
                onClick={() => {
                  // Filter by category - navigate to the most relevant page
                  if (type === 'training' || type === 'video') {
                    onMenuClick('video');
                  } else if (type === 'cv') {
                    onMenuClick('cv');
                  } else {
                    onMenuClick('dashboard');
                  }
                }}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  type === 'training' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                  type === 'video' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                  type === 'cv' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                  type === 'schedule' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                  'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
                }`}
              >
                {getTypeIcon(type as SearchResult['type'])}
                {getTypeLabel(type as SearchResult['type'])}
                <span className="bg-white/50 rounded-full px-1.5 text-xs">
                  {searchResults.filter(r => r.type === type).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Tips */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-6">
        <h3 className="font-semibold text-cyan-800 mb-2">Tips Pencarian</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-700">
          <div className="space-y-1">
            <p className="font-medium">Kata kunci populer:</p>
            <ul className="space-y-1">
              <li>• Copywriter</li>
              <li>• Microsoft Office</li>
              <li>• Wawancara</li>
              <li>• CV Template</li>
            </ul>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Kategori tersedia:</p>
            <ul className="space-y-1">
              <li>• Video Pelatihan</li>
              <li>• Simulasi Wawancara</li>
              <li>• Template CV</li>
              <li>• Jadwal & Progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}