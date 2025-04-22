import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ModelService } from '@/lib/chat/model-service'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const send = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await ModelService.generateResponse([
        ...messages,
        userMessage
      ].map(({ role, content }) => ({ role, content })))

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const regenerate = useCallback(async (message: Message) => {
    if (message.role !== 'assistant') return

    const messageIndex = messages.findIndex(m => m.id === message.id)
    if (messageIndex === -1) return

    setIsLoading(true)

    try {
      const response = await ModelService.generateResponse(
        messages.slice(0, messageIndex).map(({ role, content }) => ({ role, content }))
      )

      const newMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response
      }

      setMessages(prev => [...prev.slice(0, messageIndex), newMessage])
    } catch (error) {
      console.error('Error regenerating message:', error)
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const remove = useCallback((message: Message) => {
    setMessages(prev => prev.filter(m => m.id !== message.id))
  }, [])

  return {
    messages,
    isLoading,
    send,
    regenerate,
    remove
  }
}