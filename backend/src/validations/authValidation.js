import { z } from "zod";

export const registerBody = z.object({
  email: z.string().email().transform((s) => s.toLowerCase().trim()),
  password: z.string().min(8).max(100),
  fullName: z.string().min(2).max(80)
});

export const loginBody = z.object({
  email: z.string().email().transform((s) => s.toLowerCase().trim()),
  password: z.string().min(1).max(100)
});

