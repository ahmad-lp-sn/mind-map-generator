import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import { CreatRequest } from "./common";

// OpenAI
export type OpenAIServiceConfig = Omit<
  ChatCompletionCreateParamsNonStreaming,
  "messages"
>;

export type OutputFormat = "JSON";

// MindMap
export type GeneratedMindMap = {
  name: string;
  branches?: GeneratedMindMap[];
};

export type GenerateMindMapReq = CreatRequest<{
  subject: string;
  topic: string;
}>;

export type MindMapFilter = {
  subject?: string;
  topic?: string;
  ids?: string[];
};
