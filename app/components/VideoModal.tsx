// File: VideoModal.tsx (Alternative - More Robust)
import React, { useRef, useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import { Video } from '../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export default function VideoModal({ isOpen, onClose, video }: VideoModalProps) {
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [isVideoInteracting, setIsVideoInteracting] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle overlay click - only close if not interacting with video
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!isVideoInteracting && e.target === e.currentTarget) {
      onClose();
    }
    setIsVideoInteracting(false);
  };

  // Mark as interacting with video
  const handleVideoInteraction = () => {
    setIsVideoInteracting(true);
  };

  // Reset interaction state after a short delay
  useEffect(() => {
    if (isVideoInteracting) {
      const timer = setTimeout(() => {
        setIsVideoInteracting(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVideoInteracting]);

  if (!isOpen || !video) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalContentRef}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 hover:cursor-pointer transition-all"
        >
          <XCircle size={24} />
        </button>

        <div 
          className="relative aspect-video bg-gray-900"
          onMouseDown={handleVideoInteraction}
          onTouchStart={handleVideoInteraction}
        >
          <video
            ref={modalVideoRef}
            className="w-full h-full object-contain"
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            onMouseDown={handleVideoInteraction}
            onTouchStart={handleVideoInteraction}
            onClick={handleVideoInteraction}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-6 bg-linear-to-b from-gray-50 to-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h3>
          <p className="text-gray-600 text-base">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}