import { z } from "zod";

export const sendMessageSchema =
  z.object({
    conversationId: z.string().min(1),
    message: z.string().trim().min(1),
  });
