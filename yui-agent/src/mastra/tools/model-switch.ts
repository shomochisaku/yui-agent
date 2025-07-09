import { createTool } from '@mastra/core';
import { z } from 'zod';
import { MODEL_CONFIG, ModelType } from '../config/models.js';

export const modelSwitchTool = createTool({
  id: 'model_switch',
  description: 'Switch between different AI models for different tasks',
  inputSchema: z.object({
    modelType: z.enum(['primary', 'advanced', 'efficient', 'reasoning']).describe('Model type to switch to'),
    reason: z.string().optional().describe('Reason for switching models'),
  }),
  outputSchema: z.object({
    currentModel: z.string(),
    switched: z.boolean(),
    reason: z.string().optional(),
  }),
  execute: async ({ modelType, reason }) => {
    const selectedModel = MODEL_CONFIG[modelType as ModelType];
    
    return {
      currentModel: selectedModel.name,
      switched: true,
      reason: reason || `Switched to ${modelType} model for better performance`,
    };
  },
});