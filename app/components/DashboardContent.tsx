import React from 'react';
import Image from 'next/image';
import { trainingModules } from '../data';

export default function DashboardContent() {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-cyan-400 via-teal-400 to-cyan-500 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">Learn anytime,</h2>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Grow every time</h2>
          <p className="text-cyan-50 mb-6 text-sm lg:text-base">
            karena setiap langkah kecil hari ini akan mempersiapkanmu menghadapi peluang besar esok hari
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-cyan-600 px-6 py-2 rounded-full font-semibold hover:bg-cyan-50 transition-all shadow-lg text-sm lg:text-base">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-all text-sm lg:text-base">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 w-64 lg:w-96 h-full opacity-20 hidden md:block">
          <div className="absolute top-8 right-12 text-6xl">🎓</div>
          <div className="absolute top-20 right-32 text-4xl">🌍</div>
          <div className="absolute bottom-20 right-20 text-5xl">📚</div>
          <div className="absolute bottom-32 right-40 text-3xl">⏰</div>
        </div>
      </div>

      {/* Video Training Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Video Pelatihan</h3>
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
      </div>

      {/* Interview Simulation Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800">Simulasi Wawancara</h3>
          <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all font-medium text-sm lg:text-base w-full sm:w-auto">
            See All
          </button>
        </div>
        
        <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
          <div className="aspect-video lg:aspect-auto lg:h-48">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop"
              alt="Interview"
              width={800}
              height={400}
              className="w-full h-full object-cover"
              priority
              onError={(e) => {
                e.currentTarget.outerHTML = `
                  <div class="w-full h-full bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <div class="text-center p-4">
                      <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-gray-500 text-2xl">📷</span>
                      </div>
                      <p class="text-gray-600 text-sm">Image failed to load</p>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
          <div className="p-4 lg:p-6">
            <h4 className="font-bold text-gray-800 mb-2 text-sm lg:text-base">Practice Interview Skills</h4>
            <p className="text-xs lg:text-sm text-gray-600">Improve your interview techniques with AI-powered feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
}