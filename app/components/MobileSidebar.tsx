// File: MobileSidebar.tsx
import React from 'react';
import { X, Menu, Play, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

export default function MobileSidebar({ 
  isOpen, 
  onClose, 
  activeMenu, 
  onMenuClick 
}: MobileSidebarProps) {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Menu },
    { id: 'video', label: 'Video Pelatihan', icon: Play },
    { id: 'simulasi', label: 'Simulasi Wawancara', icon: User },
    { 
      id: 'cv', 
      label: 'Pembuatan CV', 
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  ];

  return (
    <div className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div 
        className="absolute inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-64 bg-white h-full overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo Image */}
            <div className="shrink-0">
              <Image
                src="/logo.jpg" // Make sure to put your logo.png in the public folder
                alt="JobReady Pacitan"
                width={140} // Adjusted for mobile sidebar
                height={42} // Adjusted for mobile sidebar
                className="h-8 w-auto" // This will maintain aspect ratio
                priority
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback-mobile');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback text logo */}
              <div id="logo-fallback-mobile" className="hidden items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  JR
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">
                    Job<span className="text-cyan-500">Ready</span>
                  </h1>
                  <p className="text-xs text-gray-500">Pacitan</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onMenuClick(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeMenu === item.id ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {typeof item.icon === 'function' ? <item.icon /> : React.createElement(item.icon, { size: 20 })}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          {/* My Account Button */}
          <button 
            onClick={() => {
              onMenuClick('account');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeMenu === 'account' 
                ? 'bg-linear-to-r from-cyan-500 to-teal-500 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User size={20} />
            <span className="font-medium">My Account</span>
          </button>
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 transition-colors"
          >
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
}