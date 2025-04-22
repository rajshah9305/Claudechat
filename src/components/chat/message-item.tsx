import { motion } from "framer-motion"
import { Message } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Copy, RefreshCw, Trash } from "lucide-react"
import { useState } from "react"
import { toast } from "../ui/use-toast"

interface MessageItemProps {
  message: Message
  onRegenerate?: () => void
  onDelete?: () => void
}

export function MessageItem({
  message,
  onRegenerate,
  onDelete,
}: MessageItemProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setIsCopied(true)
      toast({
        title: "Copied to clipboard",
        duration: 1000,
      })
      setTimeout(() => setIsCopied(false), 1000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group relative rounded-lg p-4",
        message.role === "user"
          ? "bg-primary/10"
          : "bg-muted"
      )}
    >
      <div className="prose dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap text-sm">
          {message.content}
        </pre>
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className={cn(isCopied && "text-green-500")}
        >
          <Copy className="h-4 w-4" />
        </Button>
        {message.role === "assistant" && onRegenerate && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onRegenerate}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  )
}