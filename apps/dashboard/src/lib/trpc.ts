import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../api/src/server/root';
import SuperJSON from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/trpc',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
});
