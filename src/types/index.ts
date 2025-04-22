export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  modelId: string
  chatId: string
  createdAt: Date
  metadata?: Record<string, any>
}

export interface Chat {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messages: Message[]
}

export interface ModelConfig {
  id: string
  name: string
  provider: 'puter' | 'github'
  apiConfig: {
    modelName: string
    [key: string]: any
  }
  isEnabled: boolean
}