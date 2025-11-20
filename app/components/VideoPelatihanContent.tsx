// File: VideoPelatihanContent.tsx
import React from 'react';
import Image from 'next/image';
import { trainingModules } from '../data';

export default function VideoPelatihanContent() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Video Pelatihan</h2>
        <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all font-medium text-sm lg:text-base w-full sm:w-auto">
          See All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
        {trainingModules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center hover:shadow-lg lg:hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className={`w-12 h-12 lg:w-20 lg:h-20 ${module.color} rounded-xl lg:rounded-2xl flex items-center justify-center text-2xl lg:text-4xl mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform`}>
              {module.icon}
            </div>
            <p className="font-semibold text-gray-800 text-xs lg:text-sm">{module.name}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Pelatihan Copywriter</h3>
        <div className="bg-linear-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl relative h-72">
          <Image
            src="/copywriting.jpg"
            alt="Copywriter Training"
            fill
            className="rounded-lg object-cover"
            priority
            onError={(e) => {
              e.currentTarget.parentElement!.innerHTML = `
                <div class="absolute inset-0 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span class="text-blue-600 text-3xl">🎨</span>
                    </div>
                    <p class="text-gray-600 text-sm">Image failed to load</p>
                  </div>
                </div>
              `;
            }}
          />
          <div className="p-4 lg:p-8 flex justify-center lg:justify-end">
            <button className="bg-cyan-500 text-white px-6 lg:px-8 py-3 rounded-full font-semibold hover:bg-cyan-600 transition-all shadow-lg text-sm lg:text-base">
              Continue
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Pelatihan Microsoft Office</h3>
        <div className="bg-linear-to-r from-cyan-400 via-teal-400 to-cyan-500 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl relative h-48 lg:h-64">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 w-full max-w-sm lg:w-80 shadow-2xl">
              <div className="flex items-center gap-3 lg:gap-4 mb-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-xl flex items-center justify-center text-2xl lg:text-3xl">
                  📊
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm lg:text-lg">Microsoft Office</h4>
                  <p className="text-xs lg:text-sm text-gray-600">Master Office Suite</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 lg:w-32 lg:h-32 bg-pink-500 rounded-bl-full"></div>
        </div>
      </div>
    </div>
  );
}