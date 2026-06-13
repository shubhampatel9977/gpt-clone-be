import { z } from "zod";

export const createConversationSchema =
  z.object({
    modelId: z.string().min(1),
    projectId: z.string().optional(),
    isTemporary: z.boolean().optional(),
  });
