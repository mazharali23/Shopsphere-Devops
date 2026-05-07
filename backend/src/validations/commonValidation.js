import { z } from "zod";

export const uuidParam = z.object({
  id: z.string().uuid()
});

export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12)
});

