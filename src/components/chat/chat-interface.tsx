"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { trpc } from '@/utils/trpc'
import { Message } from '@/types'
import { useChat } from '@/hooks/use-chat'
import { MessageItem } from './message-item'
import { ModelSelector } from './model-selector'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Loader2 } from 'lucide-react'

export function ChatInterface({ chatId }: { chatId: string }) {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    isLoading,
    sendMessage,
    error
  } = useChat(chatId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && selectedModel) {
      try {
        await sendMessage({
          content: input.trim(),
          modelId: selectedModel,
        })
        setInput("")
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-full flex-col">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <MessageItem 
              key={message.id}
              message={message}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t p-4">
        <ModelSelector
          value={selectedModel}
          onChange={setSelectedModel}
        />
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="min-h-[80px]"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim() || !selectedModel}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}