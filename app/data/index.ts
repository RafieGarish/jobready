import { TrainingModule, Schedule, Progress, Message, Video } from '../types';

export const trainingModules: TrainingModule[] = [
  { id: 1, name: 'Copywriter', icon: '📝', color: 'bg-cyan-500' },
  { id: 2, name: 'Microsoft Office', icon: '📊', color: 'bg-blue-500' },
  { id: 3, name: 'Legal Officer', icon: '⚖️', color: 'bg-amber-500' },
  { id: 4, name: 'Desain Canva', icon: '🎨', color: 'bg-purple-500' },
  { id: 5, name: 'Sales & Marketing', icon: '📈', color: 'bg-pink-500' }
];

export const schedule: Schedule[] = [
  { date: '20', month: 'Agustus', year: '2025', title: 'Copywriter', color: 'bg-cyan-500' },
  { date: '12', month: 'September', year: '2025', title: 'Desain Canva', color: 'bg-purple-500' }
];

export const progress: Progress[] = [
  { title: 'Pembuatan CV', score: 80, total: 100, icon: '📄', color: 'bg-cyan-500' },
  { title: 'Pelatihan Copywriter', score: 55, total: 100, icon: '✍️', color: 'bg-teal-500' },
  { title: 'Simulasi Wawancara', score: 78, total: 100, icon: '💼', color: 'bg-blue-500' }
];

export const messages: Message[] = [
  { 
    name: 'Ayunia Latifa', 
    time: '58 Minute Ago', 
    message: 'Udah lamar pekerjaan di link yang aku kirim kemarin?',
    avatar: '👩'
  }
];

export const videos: Video[] = [
  {
    src: "https://ik.imagekit.io/iz7xcurfw/github/jobready/Cara-Membuat-Portofolio-Copywriter.mp4",
    poster: "/thumbnail-video/Cara-Membuat-Portofolio-Copywriter.png",
    title: "Cara Membuat Portofolio Copywriter",
    description: "Disini saya akan menunjukkan bagaimana cara membuat portfolio copywritter dengan baik"
  },
  {
    src: "https://ik.imagekit.io/iz7xcurfw/github/jobready/Cara-Menjadi-Copywriter.mp4?tr=orig",
    poster: "/thumbnail-video/Cara-Menjadi-Copywriter.png",
    title: "Cara Menjadi Copywriter",
    description: "Disini saya akan memberi tutorial bagaimana cara menjadi seorang copywritter yang baik"
  }
];