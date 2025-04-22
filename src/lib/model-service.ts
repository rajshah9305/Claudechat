import Puter from 'puter.js'
import { ChatCompletionsClient } from 'azure-ai-inference'
import { AzureKeyCredential } from 'azure-core-auth'

export class ModelService {
  private static puter = new Puter()
  private static githubClient = new ChatCompletionsClient(
    'https://models.github.ai/inference',
    new AzureKeyCredential(process.env.GITHUB_TOKEN!)
  )

  static async generateResponse({
    messages,
    modelId,
    temperature = 0.7,
    maxTokens = 1000,
  }: {
    messages: { role: string; content: string }[]
    modelId: string
    temperature?: number
    maxTokens?: number
  }) {
    const modelConfig = await prisma.modelConfig.findFirst({
      where: { id: modelId },
    })

    if (!modelConfig) {
      throw new Error('Model configuration not found')
    }

    try {
      if (modelConfig.provider === 'puter') {
        const response = await this.puter.ai.chat({
          model: modelConfig.apiConfig.modelName,
          messages,
          temperature,
          max_tokens: maxTokens,
        })
        return response.choices[0].message.content
      } else if (modelConfig.provider === 'github') {
        const response = await this.githubClient.complete({
          messages,
          temperature,
          max_tokens: maxTokens,
          model: modelConfig.apiConfig.modelName,
        })
        return response.choices[0].message.content
      }
      throw new Error('Unsupported model provider')
    } catch (error) {
      console.error('Error generating response:', error)
      throw new Error('Failed to generate response')
    }
  }
}