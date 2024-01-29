import { ChatCompletionMessageParam } from "openai/resources";
import { OpenAIService } from "./OpenAI";
import { systemPrompts } from "../prompts";

export class ChatSession extends Array<ChatCompletionMessageParam> {
  private _isExecuted: boolean = false;
  private _error?: Error;

  get isExecuted() {
    return this._isExecuted;
  }
  get error() {
    return this._error;
  }

  async exec() {
    this.push({ role: "system", content: systemPrompts.jsonOutputFormat });
    try {
      const response = await OpenAIService.instance.exec(this);
      const responseMessage = response.choices[0]?.message;

      return responseMessage;
    } catch (err) {
      this._error = err;
    } finally {
      this._isExecuted = true;
    }
  }

  reset() {
    this.splice(0, this.length);
    this._error = undefined;
    this._isExecuted = false;
  }
}
