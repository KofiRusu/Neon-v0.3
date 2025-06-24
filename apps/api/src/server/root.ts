import { createTRPCRouter } from './trpc';
import { userRouter } from './routers/user';
import { campaignRouter } from './routers/campaign';
import { metricsRouter } from './routers/metrics';
import { agentRouter } from './routers/agent';
import { contentRouter } from './routers/content';
import { seoRouter } from './routers/seo';
import { emailRouter } from './routers/email';
import { socialRouter } from './routers/social';
import { supportRouter } from './routers/support';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  campaign: campaignRouter,
  metrics: metricsRouter,
  agent: agentRouter,
  content: contentRouter,
  seo: seoRouter,
  email: emailRouter,
  social: socialRouter,
  support: supportRouter,
}) as any;

// export type definition of API
export type AppRouter = typeof appRouter;
