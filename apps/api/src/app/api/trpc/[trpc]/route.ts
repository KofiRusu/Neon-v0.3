import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { db } from '@neon/data-model';

import { appRouter } from '~/server/root';
import { logger } from '@neon/utils';

const handler = (req: NextRequest): Promise<Response> =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({ 
      db, 
      req: undefined as any, 
      res: undefined as any 
    }),
    onError: ({ path, error }): void => {
      if (process.env.NODE_ENV === 'development') {
        logger.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
      }
    },
  });

export { handler as GET, handler as POST };
