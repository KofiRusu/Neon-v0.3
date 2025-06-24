import { router } from '../trpc/trpc';
import { contentRouter } from './content';
import { seoRouter } from './seo';
import { brandVoiceRouter } from './brand-voice';

export const appRouter = router({
  content: contentRouter,
  seo: seoRouter,
  brandVoice: brandVoiceRouter,
});

export type AppRouter = typeof appRouter;