import dotenv from "dotenv";
dotenv.config();

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || fallback!;
}

export const env = {
  PORT: getEnvVar("PORT", "3000"),
  BASIC_API_URL: getEnvVar("BASIC_API_URL", "/api/v1"),
};
