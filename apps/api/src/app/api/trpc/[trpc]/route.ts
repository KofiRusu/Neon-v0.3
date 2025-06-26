import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { appRouter } from '~/server/root';
import { logger } from '@neon/utils';
import { db } from '@neon/data-model';

const handler = (req: NextRequest): Promise<Response> =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({
      db,
      req: {} as NextApiRequest,
      res: {} as NextApiResponse,
    }),
    onError: ({ path, error }): void => {
      if (process.env.NODE_ENV === 'development') {
        logger.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
      }
    },
  });

export { handler as GET, handler as POST };
