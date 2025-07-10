export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface MemoryEntry {
  resourceId: string;
  threadId: string;
  text: string;
  metadata?: {
    role?: string;
    timestamp?: string;
    important?: boolean;
    tags?: string[];
    [key: string]: any;
  };
}

export interface RelatedMemory {
  threadId: string;
  content: string;
  role: string;
  timestamp?: string;
  similarity?: number;
}

export interface UserMemory {
  content: string;
  tags: string[];
  timestamp?: string;
  threadId: string;
}

export interface MemoryConfig {
  provider: any;
  defaultSettings: {
    maxTokens: number;
    maxEntries: number;
    ttl: number;
    enableSemanticSearch: boolean;
  };
}