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
}