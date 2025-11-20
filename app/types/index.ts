export interface TrainingModule {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface Schedule {
  date: string;
  month: string;
  year: string;
  title: string;
  color: string;
}

export interface Progress {
  title: string;
  score: number;
  total: number;
  icon: string;
  color: string;
}

export interface Message {
  name: string;
  time: string;
  message: string;
  avatar: string;
}

export interface Video {
  src: string;
  poster: string;
  title: string;
  description: string;
}

// File: types/index.ts (add these interfaces)
export interface DashboardContentProps {
  searchQuery: string;
  filteredTrainingModules: TrainingModule[];
  filteredVideos?: Video[];
}

export interface VideoPelatihanContentProps {
  searchQuery: string;
  filteredTrainingModules: TrainingModule[];
}

export interface SimulasiWawancaraContentProps {
  onVideoClick: (index: number) => void;
  onStartPractice: () => void;
  searchQuery: string;
  filteredVideos: Video[];
}

export interface PembuatanCVContentProps {
  searchQuery: string;
}

export interface MyAccountContentProps {
  searchQuery: string;
}