import { z } from 'zod'
import { router, publicProcedure } from '../../trpc'
import { ModelService } from '@/lib/model-service'
import { prisma } from '@/server/db'

export const chatRouter = router({
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.chat.create({
        data: {
          title: input.title,
        },
      })
    }),

  getAll: publicProcedure.query(async () => {
    return prisma.chat.findMany({
      orderBy: { updatedAt: 'desc' },
    })
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.chat.findUnique({
        where: { id: input.id },
        include: { messages: true },
      })
    }),

  sendMessage: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        content: z.string(),
        modelId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const userMessage = await prisma.message.create({
        data: {
          content: input.content,
          role: 'user',
          modelId: input.modelId,
          chatId: input.chatId,
        },
      })

      const modelResponse = await ModelService.generateResponse({
        messages: [{ role: 'user', content: input.content }],
        modelId: input.modelId,
      })

      const assistantMessage = await prisma.message.create({
        data: {
          content: modelResponse,
          role: 'assistant',
          modelId: input.modelId,
          chatId: input.chatId,
        },
      })

      return { userMessage, assistantMessage }
    }),
})