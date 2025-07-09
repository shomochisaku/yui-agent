export const MODEL_CONFIG = {
  // メインモデル（日常会話用 - Function Calling対応）
  primary: {
    provider: 'OPENAI',
    name: 'gpt-4.1-mini-2025-04-14',
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: undefined, // OpenAI直接使用
  },
  
  // 高性能モデル（複雑なタスク用 - Function Calling対応）
  advanced: {
    provider: 'OPENAI',
    name: 'gpt-4.1-mini-2025-04-14',
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: undefined, // OpenAI直接使用
  },
  
  // コスト効率モデル（軽いタスク用 - Function Calling対応）
  efficient: {
    provider: 'OPENAI',
    name: 'gpt-4.1-mini-2025-04-14',
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: undefined, // OpenAI直接使用
  },
  
  // 思考力重視モデル（複雑な推論用 - Function Calling対応）
  reasoning: {
    provider: 'OPENAI',
    name: 'gpt-4.1-mini-2025-04-14',
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: undefined, // OpenAI直接使用
  },
} as const;

export type ModelType = keyof typeof MODEL_CONFIG;