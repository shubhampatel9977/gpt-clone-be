export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type UserRole = "USER" | "ADMIN";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
