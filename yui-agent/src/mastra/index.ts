import { Mastra } from '@mastra/core';
import { yui } from './agents/yui.js';
import { memoryConfig } from './config/memory.js';

export const mastra = new Mastra({
  agents: { yui },
  memory: memoryConfig,
});