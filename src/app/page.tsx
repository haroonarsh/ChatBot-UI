'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
}