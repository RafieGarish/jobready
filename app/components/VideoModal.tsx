import React, { useRef, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { Video } from '../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export default function VideoModal({ isOpen, onClose, video }: VideoModalProps) {
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
        >
          <XCircle size={24} />
        </button>

        <div className="relative aspect-video bg-gray-900">
          <video
            ref={modalVideoRef}
            className="w-full h-full object-contain"
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-6 bg-linear-to-b from-gray-50 to-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h3>
          <p className="text-gray-600 text-base">
            Klik tombol tutup di pojok kanan atas atau tekan tombol Escape untuk menutup video.
          </p>
        </div>
      </div>

      <div 
        className="absolute inset-0"
        onClick={onClose}
      ></div>
    </div>
  );
}