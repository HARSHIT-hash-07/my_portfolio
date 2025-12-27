import { z } from 'zod';
import { insertMessageSchema, projects, insights } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id',
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  insights: {
    list: {
      method: 'GET' as const,
      path: '/api/insights',
      responses: {
        200: z.array(z.custom<typeof insights.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/insights/:slug',
      responses: {
        200: z.custom<typeof insights.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  messages: {
    create: {
      method: 'POST' as const,
      path: '/api/messages',
      input: insertMessageSchema,
      responses: {
        201: z.object({ success: z.boolean() }),
        400: errorSchemas.validation,
      },
    },
  },
};
