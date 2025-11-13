// app/page.tsx
'use client';

import React, { useState } from 'react';
import { Search, Bell, Menu, Settings, User, LogOut, HelpCircle, Play, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface TrainingModule {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface Schedule {
  date: string;
  month: string;
  year: string;
  title: string;
  color: string;
}

interface Progress {
  title: string;
  score: number;
  total: number;
  icon: string;
  color: string;
}

interface Message {
  name: string;
  time: string;
  message: string;
  avatar: string;
}

export default function JobReadyDashboard() {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const trainingModules: TrainingModule[] = [
    { id: 1, name: 'Copywriter', icon: '📝', color: 'bg-cyan-500' },
    { id: 2, name: 'Microsoft Office', icon: '📊', color: 'bg-blue-500' },
    { id: 3, name: 'Legal Officer', icon: '⚖️', color: 'bg-amber-500' },
    { id: 4, name: 'Desain Canva', icon: '🎨', color: 'bg-purple-500' },
    { id: 5, name: 'Sales & Marketing', icon: '📈', color: 'bg-pink-500' }
  ];

  const schedule: Schedule[] = [
    { date: '20', month: 'Agustus', year: '2025', title: 'Copywriter', color: 'bg-cyan-500' },
    { date: '12', month: 'September', year: '2025', title: 'Desain Canva', color: 'bg-purple-500' }
  ];

  const progress: Progress[] = [
    { title: 'Pembuatan CV', score: 80, total: 100, icon: '📄', color: 'bg-cyan-500' },
    { title: 'Pelatihan Copywriter', score: 55, total: 100, icon: '✍️', color: 'bg-teal-500' },
    { title: 'Simulasi Wawancara', score: 78, total: 100, icon: '💼', color: 'bg-blue-500' }
  ];

  const messages: Message[] = [
    { 
      name: 'Ayunia Latifa', 
      time: '58 Minute Ago', 
      message: 'Udah lamar pekerjaan di link yang aku kirim kemarin?',
      avatar: '👩'
    }
  ];

  // Mobile sidebar component
  const MobileSidebar = () => (
    <div className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="relative w-64 bg-white h-full overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
              JR
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Job<span className="text-cyan-500">Ready</span>
              </h1>
              <p className="text-xs text-gray-500">Pacitan</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          {['dashboard', 'video', 'simulasi', 'cv', 'settings'].map((menu) => (
            <button
              key={menu}
              onClick={() => {
                setActiveMenu(menu);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeMenu === menu ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {menu === 'dashboard' && <Menu size={20} />}
              {menu === 'video' && <Play size={20} />}
              {menu === 'simulasi' && <User size={20} />}
              {menu === 'cv' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {menu === 'settings' && <Settings size={20} />}
              <span className="font-medium capitalize">
                {menu === 'simulasi' ? 'Simulasi Wawancara' :
                 menu === 'video' ? 'Video Pelatihan' :
                 menu === 'cv' ? 'Pembuatan CV' : menu}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 transition-colors">
            <User size={20} />
            <span className="font-medium">My Account</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle size={20} />
            <span className="font-medium">Help</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboardContent = () => (
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
        
        {/* Decorative elements - hidden on mobile */}
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

  const renderVideoPelatihanContent = () => (
    <div className="lg:col-span-2 space-y-6">
      {/* Video Training Modules Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Video Pelatihan</h2>
        <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all font-medium text-sm lg:text-base w-full sm:w-auto">
          See All
        </button>
      </div>

      {/* Training Modules Grid */}
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

      {/* Pelatihan Copywriter */}
      <div>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Pelatihan Copywriter</h3>
        <div className="bg-linear-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl relative h-72">
          <Image
            src="/copywriting.jpg"
            alt="Copywriter Training"
            fill
            className="rounded-lg object-cover"
          />
          <div className="p-4 lg:p-8 flex justify-center lg:justify-end">
            <button className="bg-cyan-500 text-white px-6 lg:px-8 py-3 rounded-full font-semibold hover:bg-cyan-600 transition-all shadow-lg text-sm lg:text-base">
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Pelatihan Microsoft Office */}
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
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-20 h-20 lg:w-32 lg:h-32 bg-pink-500 rounded-bl-full"></div>
        </div>
      </div>
    </div>
  );

  const renderSimulasiWawancaraContent = () => (
    <div className="lg:col-span-2 space-y-6">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Selamat Datang !</h2>
        
        {/* Info Box */}
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

      {/* Search Bar */}
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

      {/* Video Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Video 1 */}
        <div className="bg-black rounded-xl lg:rounded-2xl overflow-hidden shadow-xl aspect-video relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="text-gray-800 ml-1" size={20} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Video 2 */}
        <div className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-xl aspect-video relative group cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop"
            alt="Interview Practice"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="text-gray-800 ml-1" size={20} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Start Practice Button */}
      <div className="flex justify-center pt-4">
        <button className="bg-cyan-500 text-white px-8 lg:px-12 py-3 lg:py-4 rounded-full font-bold text-base lg:text-lg hover:bg-cyan-600 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
          Mulai Praktik
        </button>
      </div>
    </div>
  );

  const renderPembuatanCVContent = () => (
    <div className="lg:col-span-2 space-y-6">
      {/* Template CV Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Template CV</h2>
          <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all font-medium text-sm lg:text-base w-full sm:w-auto">
            See All
          </button>
        </div>

        {/* CV Template Card */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-6 shadow-lg">
          <div className="aspect-[8.5/11] bg-gray-50 rounded-lg overflow-hidden mb-4 relative">
            <div className="p-6 space-y-4">
              {/* CV Header */}
              <div className="text-center border-b-2 border-gray-300 pb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Anna Katrina Marchesi</h3>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <span>📞</span> +123-456-7890
                  </span>
                  <span className="flex items-center gap-1">
                    <span>✉️</span> hello@reallygreatsite.com
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📍</span> 123 Anywhere St., Any City
                  </span>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">Tentang Saya</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Seorang Digital Marketing Strategist yang berpengalaman dalam mengembangkan dan 
                  mengimplementasikan strategi pemasaran digital yang efektif. Memiliki kemampuan analisis 
                  yang kuat, serta berpengalaman dalam pengoptimalan media sosial. Berhasil memimpin 
                  beberapa proyek pemasaran digital yang meningkatkan awareness brand dan konversi penjualan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Surat Lamaran Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Template Surat Lamaran</h2>
        </div>

        {/* Cover Letter Template Card */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-6 shadow-lg">
          <div className="aspect-[8.5/11] bg-gray-50 rounded-lg overflow-hidden relative">
            <div className="p-6 space-y-3 text-xs">
              {/* Letter Header */}
              <div className="text-right text-gray-600">
                <p>Bogor, 10 Juli 2019</p>
              </div>

              <div className="space-y-1 text-gray-600">
                <p className="font-semibold">Perihal: Lamaran Pekerjaan</p>
                <p className="mt-3">Yth, Bapak / Ibu Kepala Sekolah</p>
                <p>SMA Cahaya Rancamaya</p>
                <p>di - Bogor</p>
              </div>

              <p className="text-gray-600">Dengan hormat,</p>

              <p className="text-gray-600 leading-relaxed">
                Berdasarkan informasi yang saya peroleh dari Bapak Kiki Novianto, salah seorang staff 
                TU Bapak/Ibu, bahwa SMA Cahaya Rancamaya sedang membutuhkan guru Matematika. 
                Dengan ini saya membuat permohonan lamaran pekerjaan untuk menjadi guru di sekolah 
                yang Bapak/Ibu pimpin, adapun data pribadi saya adalah sebagai berikut :
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white shadow-lg flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
              JR
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Job<span className="text-cyan-500">Ready</span>
              </h1>
              <p className="text-xs text-gray-500">Pacitan</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4">
          {['dashboard', 'video', 'simulasi', 'cv', 'settings'].map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeMenu === menu ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {menu === 'dashboard' && <Menu size={20} />}
              {menu === 'video' && <Play size={20} />}
              {menu === 'simulasi' && <User size={20} />}
              {menu === 'cv' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {menu === 'settings' && <Settings size={20} />}
              <span className="font-medium capitalize">
                {menu === 'simulasi' ? 'Simulasi Wawancara' :
                 menu === 'video' ? 'Video Pelatihan' :
                 menu === 'cv' ? 'Pembuatan CV' : menu}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 transition-colors">
            <User size={20} />
            <span className="font-medium">My Account</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle size={20} />
            <span className="font-medium">Help</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="text-gray-600" size={20} />
            </button>
            <Search className="text-gray-400 hidden sm:block" size={20} />
            <input
              type="text"
              placeholder="Search Here"
              className="flex-1 outline-none text-gray-600 text-sm lg:text-base"
            />
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block transition-colors">
              <Menu className="text-gray-600" size={20} />
            </button>
            <button className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg relative transition-colors">
              <Bell className="text-white" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm lg:text-base">Dania Supramadani</p>
                <p className="text-xs text-gray-500 hidden lg:block">daniasuprama@gmail.com</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm lg:text-base">
                DS
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Conditional Content Based on Active Menu */}
            {activeMenu === 'dashboard' && renderDashboardContent()}
            {activeMenu === 'video' && renderVideoPelatihanContent()}
            {activeMenu === 'simulasi' && renderSimulasiWawancaraContent()}
            {activeMenu === 'simulasi' && renderPembuatanCVContent()}

            {/* Right Column - Sidebar */}
            <div className="space-y-4 lg:space-y-6">
              {/* Schedule */}
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">Jadwal</h3>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 lg:gap-4">
                      <div className={`${item.color} rounded-xl p-3 text-white text-center min-w-[60px] lg:min-w-[70px]`}>
                        <div className="text-xs">{item.year}</div>
                        <div className="text-xs font-medium">{item.month}</div>
                        <div className="text-xl lg:text-2xl font-bold">{item.date}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm lg:text-base">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">Riwayat</h3>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="space-y-3 lg:space-y-4">
                  {progress.map((item, index) => (
                    <div key={index} className={`${item.color} rounded-xl p-3 lg:p-4 text-white`}>
                      <div className="flex items-center gap-2 lg:gap-3 mb-2">
                        <span className="text-xl lg:text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-xs lg:text-sm">{item.title}</p>
                          <p className="text-xs opacity-90">Poin: {item.score}/{item.total}</p>
                        </div>
                      </div>
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all"
                          style={{ width: `${(item.score / item.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">Pesan</h3>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                {messages.map((msg, index) => (
                  <div key={index} className="bg-linear-to-br from-cyan-400 to-teal-500 rounded-xl p-3 lg:p-4 text-white">
                    <div className="flex items-start gap-2 lg:gap-3 mb-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center text-xl lg:text-2xl">
                        {msg.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm lg:text-base">{msg.name}</p>
                        <p className="text-xs opacity-80">🕐 {msg.time}</p>
                      </div>
                    </div>
                    <p className="text-xs lg:text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}