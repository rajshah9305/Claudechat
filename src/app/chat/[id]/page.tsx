import { notFound } from "next/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"
import { prisma } from "@/server/db"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chat = await prisma.chat.findUnique({
    where: { id: params.id },
  })

  if (!chat) {
    notFound()
  }

  return (
    <div className="container flex h-[calc(100vh-3.5rem)] flex-col gap-4 py-4">
      <h1 className="text-2xl font-bold">{chat.title}</h1>
      <ChatInterface chatId={chat.id} />
    </div>
  )
}