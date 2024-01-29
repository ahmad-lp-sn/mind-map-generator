import * as dotenv from "dotenv";
import { StorageType } from "../types";

const checkEnvVariable = (key: string, err?: string) => {
  const value = process.env[key];
  if (value === undefined || value === null)
    throw new Error(err || `missing environment variable (${key})`);
  return value;
};

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  console.warn("⚠️  Couldn't find .env file  ⚠️");
}

export const config = {
  // openai
  openai: {
    key: checkEnvVariable("OPENAI_API_KEY"),
    modelId: checkEnvVariable("OPENAI_MODEL_ID"),
    temperature: +(process.env.OPENAI_MODEL_TEMPERATURE || 1),
    maxTokens: +process.env.OPENAI_MAX_TOKENS,
    topP: +(process.env.OPENAI_TOP_P || 1),
    frequencyPenalty: +(process.env.OPENAI_FREQUENCY_PENALTY || 0),
    presencePenalty: +(process.env.OPENAI_PRESENCE_PENALTY || 0),
  },

  // Server
  port: parseInt(process.env.PORT) || 3000,
  defaultPatchSize: +(process.env.DEFAULT_PATCH_SIZE || 10),
  // API
  defaultPageSize: parseInt(process.env.PAGE_SIZE) || 20,
  maxNumberOfFilesPerReq: +(process.env.MAX_NUM_OF_FILES || 1),
  maxFileSize: +(process.env.MAX_FILE_SIZE || 20000000),
  // Storage
  storage: {
    type: process.env.STORAGE_TYPE as StorageType,
    folders: {
      uploads: "uploads/",
      temps: "temp/",
      files: "filesStore/",
    },
    GCP: {
      bucketName: checkEnvVariable("GCP_STORAGE_BUCKET"),
    },
  },
};
