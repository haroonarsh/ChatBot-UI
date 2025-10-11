"use client"

import LoginForm from "@/components/loginForm"
import useAuth from "@/hooks/useAuth"
import type React from "react"

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 flex items-center justify-center p-4">
      <LoginForm onSubmit={login} loading={loading} error={error} isRegister={false} />
    </div>
  )
}
