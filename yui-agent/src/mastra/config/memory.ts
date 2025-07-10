import { LibSQL } from '@mastra/libsql';
import { config } from 'dotenv';

config();

const LIBSQL_URL = process.env.LIBSQL_URL || 'file:./data/yui-memory.db';
const LIBSQL_AUTH_TOKEN = process.env.LIBSQL_AUTH_TOKEN;

export const memoryConfig = {
  provider: new LibSQL({
    url: LIBSQL_URL,
    authToken: LIBSQL_AUTH_TOKEN,
  }),
  defaultSettings: {
    maxTokens: 8000,
    maxEntries: 50,
    ttl: 86400000, // 24 hours in ms
    enableSemanticSearch: true,
  },
};