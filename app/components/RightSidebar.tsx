import React from 'react';
import { ChevronRight } from 'lucide-react';
import { schedule, progress, messages } from '../data';

export default function RightSidebar() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Schedule */}
      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-800">Jadwal</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-center gap-3 lg:gap-4">
              <div className={`${item.color} rounded-xl p-3 text-white text-center min-w-[60px] lg:min-w-[70px]`}>
                <div className="text-xs">{item.year}</div>
                <div className="text-xs font-medium">{item.month}</div>
                <div className="text-xl lg:text-2xl font-bold">{item.date}</div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm lg:text-base">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-800">Riwayat</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="space-y-3 lg:space-y-4">
          {progress.map((item, index) => (
            <div key={index} className={`${item.color} rounded-xl p-3 lg:p-4 text-white`}>
              <div className="flex items-center gap-2 lg:gap-3 mb-2">
                <span className="text-xl lg:text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-xs lg:text-sm">{item.title}</p>
                  <p className="text-xs opacity-90">Poin: {item.score}/{item.total}</p>
                </div>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${(item.score / item.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-800">Pesan</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        
        {messages.map((msg, index) => (
          <div key={index} className="bg-linear-to-br from-cyan-400 to-teal-500 rounded-xl p-3 lg:p-4 text-white">
            <div className="flex items-start gap-2 lg:gap-3 mb-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center text-xl lg:text-2xl">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm lg:text-base">{msg.name}</p>
                <p className="text-xs opacity-80">🕐 {msg.time}</p>
              </div>
            </div>
            <p className="text-xs lg:text-sm">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}