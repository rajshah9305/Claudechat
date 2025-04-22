import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import type { Message } from '@/types'

export function useChat(chatId: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const utils = trpc.useContext()
  const { data: messages = [] } = trpc.chat.getById.useQuery(
    { id: chatId },
    {
      select: (data) => data?.messages ?? [],
    }
  )

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      utils.chat.getById.invalidate({ id: chatId })
    },
  })

  const sendMessage = async ({
    content,
    modelId,
  }: {
    content: string
    modelId: string
  }) => {
    setIsLoading(true)
    setError(null)
    try {
      await sendMessageMutation.mutateAsync({
        chatId,
        content,
        modelId,
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send message'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  }
}