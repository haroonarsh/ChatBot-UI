"use client"

import type React from "react"

// import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2, Paperclip, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  messages: {
    id: number;
    content: string;
    role: "user" | "assistant";
  }[];
  sendMessage: (message: string) => Promise<void>;
  loading: boolean;
}

export function ChatInterface({ messages, sendMessage, loading }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // const { messages, sendMessage, status } = useChat<UIMessage>({
  //   transport: new DefaultChatTransport({ api: "/api/chat" }),
  // })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input)
    setInput("")
  }

  // const isLoading = status === "in_progress"

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 p-2 md:p-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-3">
              <Bot className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Grok</h1>
          </div>

          <div className="w-full max-w-3xl space-y-4">
            <form 
            onSubmit={handleSubmit} 
            className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What do you want to know?"
                disabled={loading}
                className="w-full h-12 md:h-14 pl-1 md:pl-4 pr-20 text-sm md:text-base bg-background border-border rounded-xl shadow-sm"
                autoFocus
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0 md:gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 md:h-8 md:w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Paperclip className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-2 md:h-8 md:px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Zap className="h-2 w-2 md:h-3 md:w-3 mr-1" />
                  Fast
                </Button>
                <Button
                  type="submit"
                  disabled={!input.trim() || loading}
                  size="sm"
                  className="h-7 w-7 md:h-8 md:w-8 p-0 bg-primary hover:bg-primary/90 rounded-full"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </form>

            <p className="text-sm text-muted-foreground">
              By messaging Grok, you agree to our <button className="underline hover:no-underline">Terms</button> and{" "}
              <button className="underline hover:no-underline">Privacy Policy</button>.
            </p>
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <>
          {/* <header className="border-b bg-background/50 backdrop-blur-sm p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">Grok</h1>
                <p className="text-sm text-muted-foreground">{isLoading ? "Thinking..." : "Ready to help"}</p>
              </div>
            </div>
          </header> */}

          <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 md:px-16 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-4 max-w-4xl", message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto")}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    className={cn(
                      message.role === "user"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    "p-4 rounded-2xl max-w-[85%]",
                    message.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-background border",
                  )}
                >
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {message.content.split("\n").map((line, index) => {
                      if (line.startsWith("http")) {
                        return (<p key={index}><a href={line} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{line}</a></p>)
                      } else if (line.trim() !== "") {
                        return <p key={index}>{line}</p>
                    }
                      return null
                    })}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-4 max-w-4xl mr-auto">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="p-4 rounded-2xl bg-background border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className=" bg-background/50 backdrop-blur-sm p-4">
            <form 
            onSubmit={handleSubmit} 
            className="relative max-w-3xl mx-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Grok..."
                disabled={loading}
                className="w-full h-12 pl-4 pr-16 bg-background border-border rounded-xl"
                autoFocus
              />
              <Button
                type="submit"
                disabled={!input.trim() || loading}
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-primary hover:bg-primary/90 rounded-full"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
