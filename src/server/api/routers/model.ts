import { z } from 'zod'
import { router, publicProcedure } from '../../trpc'
import { prisma } from '@/server/db'

export const modelRouter = router({
  getAll: publicProcedure.query(async () => {
    return prisma.modelConfig.findMany({
      where: { isEnabled: true },
      orderBy: { name: 'asc' },
    })
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.modelConfig.findUnique({
        where: { id: input.id },
      })
    }),
})