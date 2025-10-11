"use client"

import AuthForm from "@/components/authForm"
import useAuth from "@/hooks/useAuth"
import type React from "react"

export default function RegisterPage() {
  const { register, loading, error } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 flex items-center justify-center p-4">
      <AuthForm onSubmit={register} loading={loading} error={error} isRegister={true} />
    </div>
  )
}
