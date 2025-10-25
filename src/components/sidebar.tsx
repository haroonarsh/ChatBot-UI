"use client"

import { useChats } from "@/hooks/useChats"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Moon, Sun, MessageSquare, Settings, History, Trash2, DoorOpen, LogOut } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import useChat from "@/hooks/useChat"
import useAuth from "@/hooks/useAuth"

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { sessions, createNewSession, setCurrentSession } = useChats();
  const { clearChat } = useChat();
  const [showHistory, setShowHistory] = useState(false);
  const { logout } = useAuth();

  const handleNewChat = () => {
    createNewSession()
    setShowHistory(false)
    clearChat()
    toast.success('New chat started')
  }

  const handleLoadSession = (id: string) => {
    setCurrentSession(id)
    setShowHistory(false)
    toast.success('Chat loaded')
  }

  const handleClearHistory = () => {
    if (sessions.length > 0) {
      // Backend clear or local clear - add endpoint if needed
      toast.success('History cleared (client side)')
      clearChat();
    }
  };

  return (
    <div
      className={`${isOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden h-screen bg-card border-r border-border fixed z-50 md:static md:flex flex-col`}
    >
      <div className="p-6 z-60 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Grok AI</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleNewChat}>
            <MessageSquare className="h-4 w-4" />
            New Chat
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setShowHistory(!showHistory)}>
            <History className="h-4 w-4" />
            Chat History {showHistory ? '▼' : '▶'}
          </Button>
          {showHistory && (
            <div className="space-y-1 ml-4">
              {sessions.length === 0 ? (
                <p className="text-sm text-gray-500">No chats yet</p>
              ) : (
                sessions.map((session) => (
                  <Button
                    key={session.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left"
                    onClick={() => handleLoadSession(session.id)}
                  >
                    {session.title}
                  </Button>
                ))
              )}
              <Button variant="ghost" size="sm" className="w-full justify-start text-left text-red-500" onClick={handleClearHistory}>
                <Trash2 className="h-3 w-3 mr-2" />
                Clear All
              </Button>
            </div>
          )}
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        {/* logout button */}
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 mb-2" onClick={logout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start gap-2">
          {theme === "light" ? (
            <>
              <Moon className="h-4 w-4" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              Light Mode
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
