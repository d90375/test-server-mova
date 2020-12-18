import { config } from "dotenv";

const { parsed } = config();

export const {
  PORT,
  MODE,
  MONGO_CONNECTION_URL = "mongodb+srv://d90375:eastzeast@cluster0.96q44.mongodb.net/movaDB?retryWrites=true&w=majority",
  IN_PROD = MODE !== "prod"
} = parsed;
