import React from 'react';
import { Menu, Play, User, Settings, LogOut, HelpCircle } from 'lucide-react';

interface DesktopSidebarProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

export default function DesktopSidebar({ activeMenu, onMenuClick }: DesktopSidebarProps) {
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
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="hidden lg:flex w-64 bg-white shadow-lg flex-col">
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

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuClick(item.id)}
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
  );
}