// File: SimulasiWawancaraContent.tsx (updated)
import React from 'react';
import Image from 'next/image';
import { Play, Search } from 'lucide-react';
import { videos } from '../data';

interface SimulasiWawancaraContentProps {
  onVideoClick: (index: number) => void;
  onStartPractice: () => void; // Add this prop
}

export default function SimulasiWawancaraContent({ onVideoClick, onStartPractice }: SimulasiWawancaraContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Selamat Datang !</h2>
        
        <div className="bg-linear-to-r from-cyan-400 via-teal-400 to-blue-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-xl">
          <h3 className="font-bold text-lg mb-3">Ketentuan Sebelum Memulai</h3>
          <ol className="space-y-2 text-xs lg:text-sm">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>Pilih bidang pekerjaan yang sesuai dengan posisi yang Anda lamar.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <div>
                <div>Pastikan perangkat siap:</div>
                <ul className="ml-4 mt-1 space-y-1">
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Kamera menyala (untuk analisis bahasa tubuh).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Mikrofon berfungsi baik (untuk analisis intonasi dan kejelasan suara).</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>Gunakan tempat yang tenang agar hasil analisis lebih akurat.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">4.</span>
              <span>Berikan jawaban seolah-olah ini wawancara nyata, semakin serius, semakin besar manfaatnya.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">5.</span>
              <div>
                <div>Setelah sesi selesai, Anda akan mendapatkan:</div>
                <ul className="ml-4 mt-1 space-y-1">
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Umpan balik otomatis terkait bahasa tubuh, pilihan kata, dan kejelasan jawaban.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>○</span>
                    <span>Saran untuk meningkatkan performa wawancara Anda.</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">6.</span>
              <span>Latihan dapat diulang kapan saja hingga Anda merasa lebih percaya diri.</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 lg:px-6 py-3 rounded-full border-2 border-gray-300 focus:border-cyan-500 focus:outline-none pr-12 text-sm lg:text-base"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100">
          <Search className="text-gray-400" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {videos.map((video, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-xl relative group cursor-pointer"
            onClick={() => onVideoClick(index)}
          >
            <div className="relative aspect-video bg-gray-100">
              <Image
                src={video.poster}
                alt={video.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
                      <div class="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                        <span class="text-cyan-600 font-bold text-xl">📹</span>
                      </div>
                      <p class="text-center text-gray-600 text-sm px-2">
                        ${video.title}<br/>
                        <span class="text-xs mt-1 block">Thumbnail failed to load</span>
                      </p>
                    </div>
                  `;
                }}
              />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/5 transition-all">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-white shadow-lg">
                <Play className="text-cyan-600 ml-1" size={24} fill="currentColor" />
              </div>
            </div>
            
            <div className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs lg:text-sm p-2 rounded-lg">
              {video.title}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button 
          onClick={onStartPractice}
          className="bg-cyan-500 text-white px-8 lg:px-12 py-3 lg:py-4 rounded-full font-bold text-base lg:text-lg hover:bg-cyan-600 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          Mulai Praktik
        </button>
      </div>
    </div>
  );
}