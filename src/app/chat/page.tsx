"use client"

import { useEffect, useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { Sidebar } from "@/components/sidebar"
import { MenuButton } from "@/components/menu-button"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import useChat from "@/hooks/useChat"
import { useChats } from "@/hooks/useChats"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentSessionId, createNewSession } = useChats();
  const { messages, sendMessage, loading } = useChat();

  useEffect(() => {
    if (!currentSessionId) {
      createNewSession();
    }
  }, [currentSessionId, createNewSession]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <main className="min-h-screen bg-background flex">
      <MenuButton onClick={toggleSidebar} />

      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-[90vh] max-h-[800px]">
          <ChatInterface messages={messages.map((message, index) => ({ id: index, content: message.content, role: message.role }))} sendMessage={sendMessage} loading={loading} />
        </div>
      </div>
    </main>
  )
}
