import Link from "next/link"
import { Button } from "@/components/ui/button"
import { prisma } from "@/server/db"

export default async function HomePage() {
  const chats = await prisma.chat.findMany({
    orderBy: { updatedAt: "desc" },
    take: 10,
  })

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Claude Chat</h1>
        <Link href="/chat/new">
          <Button>New Chat</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="block p-4 rounded-lg border hover:border-primary transition-colors"
          >
            <h2 className="font-semibold">{chat.title}</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(chat.updatedAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}