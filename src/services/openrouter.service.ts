import OpenAI from "openai";
import { env } from "../config/env";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: env.OPENROUTER_API_KEY,
});

export const generateResponse = async (
  message: string
): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return completion.choices[0]?.message?.content || "No response received";
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw new Error("Failed to generate AI response");
  }
};
