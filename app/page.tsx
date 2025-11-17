'use client';

import React, { useState } from 'react';
import GlassmorphicWatermark from './components/GlassmorphicWatermark';
import VideoModal from './components/VideoModal';
import MobileSidebar from './components/MobileSidebar';
import DesktopSidebar from './components/DesktopSidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import VideoPelatihanContent from './components/VideoPelatihanContent';
import SimulasiWawancaraContent from './components/SimulasiWawancaraContent';
import PembuatanCVContent from './components/PembuatanCVContent';
import RightSidebar from './components/RightSidebar';
import { videos } from './data';

export default function JobReadyDashboard() {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'video':
        return <VideoPelatihanContent />;
      case 'simulasi':
        return <SimulasiWawancaraContent onVideoClick={handleVideoClick} />;
      case 'cv':
        return <PembuatanCVContent />;
      default:
        return <DashboardContent />;
    }
  };

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