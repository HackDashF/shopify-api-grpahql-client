import dotenv from "dotenv";

dotenv.config();

const isNotDefinedInEnv = (envVar: string) =>
  new Error(`${envVar} is not defined in environment variables`);

export function getConfig() {
  if (!process.env.SHOP_URL) {
    throw isNotDefinedInEnv("SHOP_URL");
  }
  if (!process.env.ACCESS_TOKEN) {
    throw isNotDefinedInEnv("ACCESS_TOKEN");
  }
  if (!process.env.API_KEY) {
    throw isNotDefinedInEnv("API_KEY");
  }
  if (!process.env.API_SECRET_KEY) {
    throw isNotDefinedInEnv("API_SECRET_KEY");
  }
  if (!process.env.OUTPUT_DIR) {
    throw isNotDefinedInEnv("OUTPUT_DIR");
  }

  return {
    shopUrl: process.env.SHOP_URL,
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: process.env.API_KEY,
    apiSecretKey: process.env.API_SECRET_KEY,
    outputDir: process.env.OUTPUT_DIR,
  };
}

export const config = getConfig();
