import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onMenuClick}
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
  );
}