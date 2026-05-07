import { z } from "zod";

export const upsertCartBody = z.object({
  productId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(99)
});

export const removeCartParams = z.object({
  productId: z.string().uuid()
});

