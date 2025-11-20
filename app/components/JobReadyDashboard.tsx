// File: JobReadyDashboard.tsx (updated)
'use client';

import React, { useState, useMemo } from 'react';
import GlassmorphicWatermark from './GlassmorphicWatermark';
import VideoModal from './VideoModal';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import VideoPelatihanContent from './VideoPelatihanContent';
import SimulasiWawancaraContent from './SimulasiWawancaraContent';
import PembuatanCVContent from './PembuatanCVContent';
import MyAccountContent from './MyAccountContent';
import GlobalSearchContent from './GlobalSearchContent'; // Add this import
import RightSidebar from './RightSidebar';
import VideoCallScreen from './VideoCallScreen';
import { videos, trainingModules } from '../data';

export default function JobReadyDashboard() {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  const handleStartPractice = () => {
    setIsVideoCallActive(true);
  };

  const handleEndCall = () => {
    setIsVideoCallActive(false);
  };

  const handleBackFromCall = () => {
    setIsVideoCallActive(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // If there's a search query, show global search results instead of normal content
  // File: JobReadyDashboard.tsx (updated renderContent function)
  const renderContent = () => {
    // Show global search when there's a search query
    if (searchQuery) {
      return (
        <GlobalSearchContent 
          searchQuery={searchQuery}
          onMenuClick={setActiveMenu}
          onVideoClick={handleVideoClick}
        />
      );
    }
  
    // Otherwise show normal content based on active menu
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'video':
        return <VideoPelatihanContent />;
      case 'simulasi':
        return (
          <SimulasiWawancaraContent 
            onVideoClick={handleVideoClick} 
            onStartPractice={handleStartPractice}
          />
        );
      case 'cv':
        return <PembuatanCVContent />;
      case 'account':
        return <MyAccountContent />;
      default:
        return <DashboardContent />;
    }
  };

  // Show video call screen when active
  if (isVideoCallActive) {
    return <VideoCallScreen onEndCall={handleEndCall} onBack={handleBackFromCall} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans relative">
      <GlassmorphicWatermark />

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
      />

      <DesktopSidebar
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {renderContent()}
            {/* Hide right sidebar when searching */}
            {!searchQuery && activeMenu !== 'account' && <RightSidebar />}
          </div>
        </main>
      </div>

      <VideoModal
        isOpen={modalOpen}
        onClose={closeModal}
        video={selectedVideo !== null ? videos[selectedVideo] : null}
      />
    </div>
  );
}