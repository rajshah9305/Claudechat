import { ChatInterface } from "@/components/chat/chat-interface"
import { ModelSelector } from "@/components/model-selector"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="chat-container flex min-h-screen flex-col">
      <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">Claude Chat</h1>
            <ModelSelector onSelect={(model) => console.log("Selected model:", model)} />
          </div>
          <ThemeToggle />
        </div>
      </header>
      <div className="container flex-1 pt-20">
        <ChatInterface />
      </div>
    </main>
  )
}