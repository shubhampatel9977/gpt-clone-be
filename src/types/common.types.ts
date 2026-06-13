export type ChatRole =
  | "user"
  | "assistant"
  | "system";

export interface AIMessage {
  role: ChatRole;
  content: string;
}
