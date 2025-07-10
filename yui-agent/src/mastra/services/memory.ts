import { Memory } from '@mastra/memory';
import { memoryConfig } from '../config/memory.js';

export class MemoryService {
  private memory: Memory;

  constructor() {
    this.memory = new Memory(memoryConfig);
  }

  async saveConversation(
    resourceId: string,
    threadId: string,
    message: string,
    role: 'user' | 'assistant',
    metadata?: Record<string, any>
  ) {
    try {
      await this.memory.create({
        resourceId,
        threadId,
        text: message,
        metadata: {
          role,
          timestamp: new Date().toISOString(),
          ...metadata,
        },
      });
    } catch (error) {
      console.error('Memory save error:', error);
    }
  }

  async getConversationHistory(
    resourceId: string,
    threadId: string,
    limit: number = 10
  ) {
    try {
      const memories = await this.memory.search({
        resourceId,
        threadId,
        limit,
        orderBy: 'createdAt',
        order: 'desc',
      });

      return memories.map(memory => ({
        role: memory.metadata?.role || 'user',
        content: memory.text,
        timestamp: memory.metadata?.timestamp,
      }));
    } catch (error) {
      console.error('Memory retrieval error:', error);
      return [];
    }
  }

  async searchRelatedConversations(
    resourceId: string,
    query: string,
    limit: number = 5
  ) {
    try {
      const memories = await this.memory.search({
        resourceId,
        text: query,
        limit,
        similarity: 0.7,
      });

      return memories.map(memory => ({
        threadId: memory.threadId,
        content: memory.text,
        role: memory.metadata?.role || 'user',
        timestamp: memory.metadata?.timestamp,
        similarity: memory.similarity,
      }));
    } catch (error) {
      console.error('Memory search error:', error);
      return [];
    }
  }

  async saveImportantMemory(
    resourceId: string,
    threadId: string,
    memory: string,
    tags: string[] = []
  ) {
    try {
      await this.memory.create({
        resourceId,
        threadId,
        text: memory,
        metadata: {
          important: true,
          tags,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Important memory save error:', error);
    }
  }

  async getUserMemories(resourceId: string, limit: number = 20) {
    try {
      const memories = await this.memory.search({
        resourceId,
        limit,
        orderBy: 'createdAt',
        order: 'desc',
        filter: {
          'metadata.important': true,
        },
      });

      return memories.map(memory => ({
        content: memory.text,
        tags: memory.metadata?.tags || [],
        timestamp: memory.metadata?.timestamp,
        threadId: memory.threadId,
      }));
    } catch (error) {
      console.error('User memories retrieval error:', error);
      return [];
    }
  }

  async clearMemories(resourceId: string, threadId?: string) {
    try {
      await this.memory.delete({
        resourceId,
        threadId,
      });
    } catch (error) {
      console.error('Memory clearing error:', error);
    }
  }
}

export const memoryService = new MemoryService();