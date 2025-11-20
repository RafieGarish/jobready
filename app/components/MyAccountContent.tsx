// File: MyAccountContent.tsx
'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, Camera, Lock, Bell, Shield, Globe, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MyAccountContent() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // User data state
  const [userData, setUserData] = useState({
    name: 'Dania Supramadani',
    email: 'daniasuprama@gmail.com',
    phone: '+62 812-3456-7890',
    location: 'Pacitan, Jawa Timur',
    bio: 'Fresh graduate yang sedang mencari peluang kerja di bidang copywriting dan digital marketing.',
    joinDate: 'Bergabung sejak Januari 2024'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    monthlyReports: true,
    jobAlerts: true,
    language: 'indonesia',
    theme: 'light'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, you would save to backend here
    console.log('Saved user data:', userData);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Akun Saya</h2>
          <p className="text-gray-600 mt-1">Kelola informasi profil dan preferensi akun Anda</p>
        </div>
        
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-all font-medium"
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all font-medium"
          >
            <Edit size={18} />
            Edit Profil
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'profile' 
                  ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span className="font-medium">Profil</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'preferences' 
                  ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell size={20} />
              <span className="font-medium">Preferensi</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'security' 
                  ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shield size={20} />
              <span className="font-medium">Keamanan</span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'billing' 
                  ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CreditCard size={20} />
              <span className="font-medium">Langganan</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-linear-to-br from-cyan-400 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {isEditing && (
                      <button className="absolute -bottom-2 -right-2 bg-cyan-500 text-white p-2 rounded-full shadow-lg hover:bg-cyan-600 transition-colors">
                        <Camera size={16} />
                      </button>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                          <textarea
                            value={userData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{userData.name}</h3>
                        <p className="text-gray-600 mt-2">{userData.bio}</p>
                        <div className="flex items-center gap-1 text-gray-500 mt-3">
                          <Calendar size={16} />
                          <span className="text-sm">{userData.joinDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-400" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-400" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-400" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      ) : (
                        <p className="text-gray-900">{userData.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-linear-to-br from-cyan-500 to-teal-500 rounded-2xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm opacity-90">Pelatihan</div>
                </div>
                <div className="bg-linear-to-br from-blue-500 to-indigo-500 rounded-2xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm opacity-90">Simulasi</div>
                </div>
                <div className="bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm opacity-90">Sertifikat</div>
                </div>
                <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white text-center">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm opacity-90">Progress</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Notifikasi</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Email Notifications</p>
                      <p className="text-sm text-gray-600">Terima pemberitahuan melalui email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.emailNotifications}
                        onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Push Notifications</p>
                      <p className="text-sm text-gray-600">Pemberitahuan real-time di browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.pushNotifications}
                        onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Laporan Bulanan</p>
                      <p className="text-sm text-gray-600">Kirim laporan progress bulanan</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.monthlyReports}
                        onChange={(e) => handlePreferenceChange('monthlyReports', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Peringatan Lowongan</p>
                      <p className="text-sm text-gray-600">Notifikasi lowongan kerja yang sesuai</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.jobAlerts}
                        onChange={(e) => handlePreferenceChange('jobAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Preferensi Umum</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bahasa</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    >
                      <option value="indonesia">Bahasa Indonesia</option>
                      <option value="english">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ubah Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      placeholder="Masukkan password saat ini"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      placeholder="Masukkan password baru"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      placeholder="Konfirmasi password baru"
                    />
                  </div>
                  <button className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-all font-medium">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sesi Aktif</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Chrome - Windows</p>
                      <p className="text-sm text-gray-600">Aktif sekarang • Pacitan, Indonesia</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Keluar
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Firefox - Android</p>
                      <p className="text-sm text-gray-600">2 hari yang lalu • Surabaya, Indonesia</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Langganan Saat Ini</h3>
                <div className="bg-linear-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold">JobReady Premium</h4>
                      <p className="opacity-90">Akses penuh ke semua fitur</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">Gratis</p>
                      <p className="opacity-90">Selamanya</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h5 className="font-semibold text-gray-800">Fitur yang didapat:</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Video pelatihan tidak terbatas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Simulasi wawancara AI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Template CV profesional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Sertifikat kelulusan</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Riwayat Aktivitas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div>
                      <p className="font-medium">Pelatihan Copywriter</p>
                      <p className="text-sm text-gray-600">15 Agustus 2024 • Selesai</p>
                    </div>
                    <span className="text-green-500 font-medium">+100 Poin</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-b">
                    <div>
                      <p className="font-medium">Simulasi Wawancara</p>
                      <p className="text-sm text-gray-600">10 Agustus 2024 • 85%</p>
                    </div>
                    <span className="text-blue-500 font-medium">+85 Poin</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-b">
                    <div>
                      <p className="font-medium">Pembuatan CV</p>
                      <p className="text-sm text-gray-600">5 Agustus 2024 • Selesai</p>
                    </div>
                    <span className="text-green-500 font-medium">+50 Poin</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}