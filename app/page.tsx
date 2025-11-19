// app/page.tsx
'use client';

import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import JobReadyDashboard from './components/JobReadyDashboard';

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <JobReadyDashboard />;
}