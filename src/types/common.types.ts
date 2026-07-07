export type UserRole = "USER" | "ADMIN";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export type ChatRole =
  | "user"
  | "assistant"
  | "system";

export interface AIMessage {
  role: ChatRole;
  content: string;
}
