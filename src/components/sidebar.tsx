"use client"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Moon, Sun, MessageSquare, Settings, History } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { theme, toggleTheme } = useTheme()

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
          <Button variant="ghost" className="w-full justify-start gap-2">
            <MessageSquare className="h-4 w-4" />
            New Chat
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <History className="h-4 w-4" />
            Chat History
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>

      <div className="p-4 border-t border-border">
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
