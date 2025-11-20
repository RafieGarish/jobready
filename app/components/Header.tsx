// File: Header.tsx (updated with proper event handling)
import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export default function Header({ 
  onMenuClick, 
  searchQuery, 
  onSearchChange, 
  onClearSearch 
}: HeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Sync local search with parent search query
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Header input changed:', value);
    setLocalSearch(value);
    onSearchChange(value);
  };

  const handleClearSearch = () => {
    console.log('Clearing search from header');
    setLocalSearch('');
    onClearSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClearSearch();
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="text-gray-600" size={20} />
        </button>
        
        {/* Search Container */}
        <div className={`flex-1 relative transition-all duration-200 ${
          isSearchFocused ? 'ring-2 ring-cyan-500 rounded-lg' : ''
        }`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          
          <input
            type="text"
            value={localSearch}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Cari pelatihan, video, atau modul..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border-0 rounded-lg text-gray-600 text-sm lg:text-base focus:outline-none focus:ring-0"
          />
          
          {/* Clear Search Button */}
          {localSearch && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors"
            >
              <X className="text-gray-400 hover:text-gray-600" size={18} />
            </button>
          )}
        </div>
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