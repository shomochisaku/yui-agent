import { f as createTool, z } from '../mastra.mjs';
import 'crypto';

const MODEL_CONFIG = {
  // メインモデル（日常会話用 - Function Calling対応）
  primary: {
    provider: "OPENAI",
    name: "gpt-4.1-mini-2025-04-14",
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: void 0
    // OpenAI直接使用
  },
  // 高性能モデル（複雑なタスク用 - Function Calling対応）
  advanced: {
    provider: "OPENAI",
    name: "gpt-4.1-mini-2025-04-14",
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: void 0
    // OpenAI直接使用
  },
  // コスト効率モデル（軽いタスク用 - Function Calling対応）
  efficient: {
    provider: "OPENAI",
    name: "gpt-4.1-mini-2025-04-14",
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: void 0
    // OpenAI直接使用
  },
  // 思考力重視モデル（複雑な推論用 - Function Calling対応）
  reasoning: {
    provider: "OPENAI",
    name: "gpt-4.1-mini-2025-04-14",
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: void 0
    // OpenAI直接使用
  }
};

const modelSwitchTool = createTool({
  id: "model_switch",
  description: "Switch between different AI models for different tasks",
  inputSchema: z.object({
    modelType: z.enum(["primary", "advanced", "efficient", "reasoning"]).describe("Model type to switch to"),
    reason: z.string().optional().describe("Reason for switching models")
  }),
  outputSchema: z.object({
    currentModel: z.string(),
    switched: z.boolean(),
    reason: z.string().optional()
  }),
  execute: async ({ modelType, reason }) => {
    const selectedModel = MODEL_CONFIG[modelType];
    return {
      currentModel: selectedModel.name,
      switched: true,
      reason: reason || `Switched to ${modelType} model for better performance`
    };
  }
});

export { modelSwitchTool };
