'use client';

import useAuth from '@/hooks/useAuth';
import { useChats } from '@/hooks/useChats';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { fetchSessions } = useChats();

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions().then(() => {
        router.push('/chat');
      });
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, fetchSessions, router]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
}