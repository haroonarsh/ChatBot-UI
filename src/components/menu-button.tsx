"use client"

import { Button } from "./ui/button"
import { Menu } from "lucide-react"

interface MenuButtonProps {
  onClick: () => void
}

export function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="fixed top-4 left-4 z-60 p-2 h-10 w-10 rounded-lg hover:bg-muted/80 transition-colors"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )
}
