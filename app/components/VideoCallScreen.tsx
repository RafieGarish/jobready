// File: VideoCallScreen.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, Phone, Settings, User, ArrowLeft } from 'lucide-react';

interface VideoCallScreenProps {
  onEndCall: () => void;
  onBack: () => void;
}

export default function VideoCallScreen({ onEndCall, onBack }: VideoCallScreenProps) {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Simulate call timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initialize video streams
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        // Get user camera and microphone
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        console.log('Camera access granted');

      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraError(true);
      }
    };

    // For remote video (interviewer) - use local MP4 file
    const initializeRemoteVideo = () => {
      if (remoteVideoRef.current) {
        // Using a dummy interview video
        remoteVideoRef.current.src = '/videos/vc-dummy.mp4';
        remoteVideoRef.current.loop = true;
        remoteVideoRef.current.play().catch(error => {
          console.error('Error playing remote video:', error);
        });
      }
    };

    initializeMedia();
    
    // Simulate remote video connection after a short delay
    const remoteTimer = setTimeout(() => {
      initializeRemoteVideo();
    }, 1500);

    return () => {
      clearTimeout(remoteTimer);
      // Clean up media streams
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleAudio = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioMuted(!audioTracks[0]?.enabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!videoTracks[0]?.enabled);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In real app, you would start recording the interview
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In real app, you would stop recording and save
  };

  const handleEndCall = () => {
    if (isRecording) {
      stopRecording();
    }
    
    // Stop all media tracks
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    if (remoteVideoRef.current) {
      remoteVideoRef.current.pause();
      remoteVideoRef.current.src = '';
    }
    
    onEndCall();
  };

  const retryCamera = async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Failed to access camera:', error);
      setCameraError(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:block">Back</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="font-semibold">Simulasi Wawancara</p>
            <p className="text-sm text-gray-300">{formatTime(callTime)}</p>
          </div>
          
          {isRecording && (
            <div className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Recording</span>
            </div>
          )}
        </div>

        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative p-4">
        {/* Remote Video (Interviewer) */}
        <div className="absolute inset-4 bg-gray-800 rounded-2xl overflow-hidden">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            muted={false}
            className="w-full h-full object-cover"
          />
          
          {/* Remote user info */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
            <p className="font-semibold">Interviewer AI</p>
            <p className="text-sm text-gray-300">HR Specialist</p>
          </div>
        </div>

        {/* Local Video (User) */}
        <div className="absolute bottom-4 right-4 w-1/4 max-w-xs aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-600">
          {/* Camera feed - only show when camera is working and not turned off */}
          {!cameraError && !isVideoOff && (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Camera error state */}
          {cameraError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center text-white p-4">
                <VideoOff size={32} className="mx-auto mb-2" />
                <p className="text-sm mb-2">Camera tidak tersedia</p>
                <button 
                  onClick={retryCamera}
                  className="text-xs bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          )}

          {/* Manual video off state */}
          {!cameraError && isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center text-white">
                <VideoOff size={32} className="mx-auto mb-2" />
                <p className="text-sm">Camera Dimatikan</p>
              </div>
            </div>
          )}

          {/* User info */}
          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
            <p>Anda</p>
          </div>
        </div>

        {/* AI Feedback Panel (Right Side) */}
        <div className="absolute top-4 right-4 w-80 bg-black/50 backdrop-blur-sm rounded-2xl p-4 text-white hidden lg:block">
          <h3 className="font-semibold mb-3">AI Feedback</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-sm font-medium text-green-300">Kontak mata baik!</p>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-sm font-medium text-yellow-300">Bicarakan lebih jelas</p>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-300">Struktur jawaban bagus</p>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-sm font-medium text-green-300">Bahasa tubuh percaya diri</p>
            </div>
          </div>
        </div>

        {/* Questions Panel (Left Side) */}
        <div className="absolute top-4 left-4 w-80 bg-black/50 backdrop-blur-sm rounded-2xl p-4 text-white hidden lg:block">
          <h3 className="font-semibold mb-3">Pertanyaan Wawancara</h3>
          <div className="space-y-2">
            <div className="bg-white/10 rounded-lg p-3 border-l-4 border-cyan-400">
              <p className="text-sm font-medium">Sedang: Ceritakan tentang diri Anda</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm text-gray-300">Mengapa Anda ingin posisi ini?</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm text-gray-300">Apa kelebihan Anda?</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-sm text-gray-300">Di mana Anda melihat diri Anda dalam 5 tahun?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 p-6 bg-gray-800">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full ${
            isAudioMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
          } text-white transition-all`}
          title={isAudioMuted ? 'Nyalakan suara' : 'Matikan suara'}
        >
          {isAudioMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <button
          onClick={toggleVideo}
          disabled={cameraError}
          className={`p-4 rounded-full ${
            isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
          } ${cameraError ? 'opacity-50 cursor-not-allowed' : ''} text-white transition-all`}
          title={isVideoOff ? 'Nyalakan kamera' : 'Matikan kamera'}
        >
          {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
        </button>

        <button
          onClick={handleEndCall}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all"
          title="Akhiri panggilan"
        >
          <Phone size={24} />
        </button>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-4 rounded-full ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
          } text-white transition-all`}
          title={isRecording ? 'Stop rekaman' : 'Mulai rekaman'}
        >
          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-red-500'}`}></div>
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-gray-800 rounded-2xl p-4 text-white w-64 shadow-2xl">
          <h4 className="font-semibold mb-3">Pengaturan</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300">Kamera</label>
              <select className="w-full bg-gray-700 rounded-lg p-2 text-sm mt-1">
                <option>Kamera Default</option>
                <option>Kamera Depan</option>
                <option>Kamera Belakang</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300">Mikrofon</label>
              <select className="w-full bg-gray-700 rounded-lg p-2 text-sm mt-1">
                <option>Mikrofon Default</option>
                <option>Mikrofon Eksternal</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300">Speaker</label>
              <select className="w-full bg-gray-700 rounded-lg p-2 text-sm mt-1">
                <option>Speaker Default</option>
                <option>Headphone</option>
              </select>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition-colors">
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Feedback Bar */}
      <div className="lg:hidden bg-black/50 backdrop-blur-sm text-white p-3">
        <div className="flex items-center justify-between text-sm overflow-x-auto space-x-4">
          <span className="text-green-400 whitespace-nowrap">✓ Postur baik</span>
          <span className="text-yellow-400 whitespace-nowrap">⚠ Bicara lebih keras</span>
          <span className="text-blue-400 whitespace-nowrap">✓ Percaya diri</span>
        </div>
      </div>
    </div>
  );
}