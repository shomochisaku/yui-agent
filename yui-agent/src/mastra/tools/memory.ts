import { createTool } from '@mastra/core';
import { z } from 'zod';
import { memoryService } from '../services/memory.js';

export const memorySearchTool = createTool({
  id: 'memory_search',
  description: 'Search conversation history and memories for relevant information',
  schema: z.object({
    query: z.string().describe('Search query to find relevant memories'),
    resourceId: z.string().describe('User identifier for memory search'),
    limit: z.number().optional().default(5).describe('Maximum number of results to return'),
  }),
  execute: async ({ query, resourceId, limit }) => {
    const results = await memoryService.searchRelatedConversations(
      resourceId,
      query,
      limit
    );
    
    return {
      results,
      message: `Found ${results.length} related memories for query: "${query}"`,
    };
  },
});

export const saveImportantMemoryTool = createTool({
  id: 'save_important_memory',
  description: 'Save important information to long-term memory',
  schema: z.object({
    memory: z.string().describe('Important information to save'),
    resourceId: z.string().describe('User identifier'),
    threadId: z.string().describe('Current conversation thread ID'),
    tags: z.array(z.string()).optional().default([]).describe('Tags for categorizing the memory'),
  }),
  execute: async ({ memory, resourceId, threadId, tags }) => {
    await memoryService.saveImportantMemory(resourceId, threadId, memory, tags);
    
    return {
      success: true,
      message: `Important memory saved: "${memory.substring(0, 50)}..."`,
    };
  },
});

export const getUserMemoriesTool = createTool({
  id: 'get_user_memories',
  description: 'Retrieve user\'s important memories and past conversations',
  schema: z.object({
    resourceId: z.string().describe('User identifier'),
    limit: z.number().optional().default(10).describe('Maximum number of memories to retrieve'),
  }),
  execute: async ({ resourceId, limit }) => {
    const memories = await memoryService.getUserMemories(resourceId, limit);
    
    return {
      memories,
      message: `Retrieved ${memories.length} important memories for user`,
    };
  },
});

export const memoryTools = [
  memorySearchTool,
  saveImportantMemoryTool,
  getUserMemoriesTool,
];