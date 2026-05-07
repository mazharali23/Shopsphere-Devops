import { z } from "zod";

export const createOrderBody = z.object({
  shippingAddress: z
    .object({
      line1: z.string().min(2).max(120),
      line2: z.string().max(120).optional().default(""),
      city: z.string().min(2).max(80),
      state: z.string().min(2).max(80),
      postalCode: z.string().min(2).max(20),
      country: z.string().min(2).max(80)
    })
    .strict()
});

