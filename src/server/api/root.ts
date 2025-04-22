import { router } from '../trpc'
import { chatRouter } from './routers/chat'
import { modelRouter } from './routers/model'

export const appRouter = router({
  chat: chatRouter,
  model: modelRouter,
})

export type AppRouter = typeof appRouter