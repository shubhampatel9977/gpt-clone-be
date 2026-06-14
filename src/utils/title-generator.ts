import { openrouter } from "@config/openrouter";
import { OPENROUTER_VALUES } from "./commonConstants";

export const generateConversationTitle = async (
    firstMessage: string
  ): Promise<string> => {
    const completion =
      await openrouter.chat.completions.create({
        model: OPENROUTER_VALUES.GENERATE_TITLE_MODAL,
        max_tokens: OPENROUTER_VALUES.TITLE_MAX_TOKEN,
        messages: [
          {
            role: "user",
            content: `
Generate a short chat title.

Rules:
- Maximum 5 words
- No quotes
- No punctuation
- Return only title

Message:
${firstMessage}
            `,
          },
        ],
      });

    return (
      completion.choices[0]
        ?.message?.content
        ?.trim() || OPENROUTER_VALUES.CONVERSATION_DEFAULT_TITLE
    );
  };
