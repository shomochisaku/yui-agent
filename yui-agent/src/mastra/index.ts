import { Mastra } from '@mastra/core';
import { yui } from './agents/yui.js';

export const mastra = new Mastra({
  agents: { yui },
});