// File: PembuatanCVContent.tsx
import React from 'react';
import Image from 'next/image';

export default function PembuatanCVContent() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Template CV</h2>
        </div>
  
        <div 
          className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => window.open('/templates/Lamaran-ke-Instansi.pdf', '_blank')}
        >
          <div className="relative aspect-video bg-gray-100 border-2 border-dashed border-gray-300">
            <Image
              src="/thumbnail/cv-thumbnail.png"
              alt="CV Template Preview"
              fill
              className="object-cover transition-transform hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <span class="text-red-500 font-bold text-xl">📄</span>
                    </div>
                    <p class="text-center text-gray-600 text-sm px-2">
                      CV Template Preview<br/>
                      <span class="text-xs mt-1 block">Click to view full PDF</span>
                    </p>
                  </div>
                `;
              }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/15 hover:bg-black/10 transition-all">
              <div className="flex flex-col items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <span className="text-gray-800 text-xs lg:text-sm font-medium font-sans">Lihat PDF</span>
              </div>
            </div>
          </div>
            
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg lg:text-xl">Professional CV Template</h3>
                <p className="text-xs lg:text-sm text-gray-600 mt-1">Klik gambar di atas untuk melihat template lengkap</p>
              </div>
              <button 
                className="px-3 py-1 lg:px-4 lg:py-2 bg-cyan-500 text-white rounded-lg text-xs lg:text-sm font-medium hover:bg-cyan-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('/sample-cv.pdf', '_blank');
                }}
              >
                Lihat PDF
              </button>
            </div>
          </div>
        </div>
          <button className="bg-cyan-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all font-medium text-sm lg:text-base w-full sm:w-auto">
            See All
          </button>
      </div>
    </div>
  );
}