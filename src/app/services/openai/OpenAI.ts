import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { config } from "../../config";
import { OpenAIServiceConfig, OutputFormat } from "../../types";
import { systemPrompts } from "../prompts";

const outputFormatPrompts: Record<OutputFormat, string> = {
  JSON: systemPrompts.jsonOutputFormat,
};

export class OpenAIService {
  private static _instance: OpenAIService;
  private readonly _openai: OpenAI;
  private readonly _config: OpenAIServiceConfig;
  outputFormat: OutputFormat = "JSON";

  private constructor() {
    this._openai = new OpenAI({
      apiKey: config.openai.key,
    });

    this._config = {
      model: config.openai.modelId,
      temperature: config.openai.temperature,
      max_tokens: config.openai.maxTokens,
      top_p: config.openai.topP,
      frequency_penalty: config.openai.frequencyPenalty,
      presence_penalty: config.openai.presencePenalty,
    };
  }

  static get instance() {
    if (!OpenAIService._instance) {
      OpenAIService._instance = new OpenAIService();
    }
    return OpenAIService._instance;
  }

  async exec(messages: Array<ChatCompletionMessageParam>) {
    return await this._openai.chat.completions.create({
      messages: [
        ...messages,
        { role: "system", content: outputFormatPrompts[this.outputFormat] },
      ],
      ...this._config,
    });
  }
}
