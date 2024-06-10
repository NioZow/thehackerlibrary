import { ZodError } from 'zod';

import ApiError from '@/class/ApiError';

type NextHandler = (req: Request) => Promise<void | Response>;

/**
 * Next.js API Error Handler wrapper
 * @param handler The Next.js route handler
 */
const withErrorHandler = (handler: NextHandler): NextHandler => {
  return async (req) => {
    try {
      return await handler(req);
    } catch (err) {
      if (err instanceof ApiError) return Response.json({ error: err.message }, { status: err.status });
      if (err instanceof ZodError) return Response.json({ error: err.message }, { status: 400 });

      return Response.json({ error: 'Server error.' }, { status: 500 });
    }
  };
};

export default withErrorHandler;
