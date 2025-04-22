import Puter from 'puter.js'

const puter = new Puter()

export type ModelConfig = {
  model: string
  temperature?: number
  maxTokens?: number
}

export class ModelService {
  private static defaultConfig: ModelConfig = {
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000
  }

  static async generateResponse(
    messages: { role: string; content: string }[],
    config: Partial<ModelConfig> = {}
  ) {
    const finalConfig = { ...this.defaultConfig, ...config }

    try {
      const response = await puter.ai.chat({
        model: finalConfig.model,
        messages: messages,
        temperature: finalConfig.temperature,
        max_tokens: finalConfig.maxTokens
      })

      return response.choices[0].message.content
    } catch (error) {
      console.error('Error generating response:', error)
      throw new Error('Failed to generate response')
    }
  }
}