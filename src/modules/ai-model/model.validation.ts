import { z } from "zod";

export const createModelSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  provider: z.string().min(1),

  description: z.string().optional(),

  isDefault: z.boolean().optional(),
});

export const updateModelSchema =
  createModelSchema.partial();
  