export type Role = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: Role
  content: string
  createdAt?: Date
}

export interface ModelConfig {
  model: string
  temperature: number
  maxTokens: number
}

export interface ChatSettings {
  modelConfig: ModelConfig
  theme: 'light' | 'dark' | 'system'
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  settings: ChatSettings
}