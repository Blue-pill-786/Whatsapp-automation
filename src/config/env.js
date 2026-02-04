import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
};
