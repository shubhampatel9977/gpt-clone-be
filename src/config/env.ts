import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 8080,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || "",
};

if (!env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing in .env");
}
