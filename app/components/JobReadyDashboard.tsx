// File: JobReadyDashboard.tsx (updated)
'use client';

import React, { useState } from 'react';
import GlassmorphicWatermark from './GlassmorphicWatermark';
import VideoModal from './VideoModal';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import VideoPelatihanContent from './VideoPelatihanContent';
import SimulasiWawancaraContent from './SimulasiWawancaraContent';
import PembuatanCVContent from './PembuatanCVContent';
import RightSidebar from './RightSidebar';
import VideoCallScreen from './VideoCallScreen'; // Add this import
import { videos } from '../data';

export default function JobReadyDashboard() {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState<boolean>(false); // Add this state

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
    // Here you could add logic to show results/feedback after the call
  };

  const handleBackFromCall = () => {
    setIsVideoCallActive(false);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'video':
        return <VideoPelatihanContent />;
      case 'simulasi':
        return <SimulasiWawancaraContent onVideoClick={handleVideoClick} onStartPractice={handleStartPractice} />;
      case 'cv':
        return <PembuatanCVContent />;
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
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {renderContent()}
            <RightSidebar />
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