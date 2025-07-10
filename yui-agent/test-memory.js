import dotenv from 'dotenv';
import { memoryService } from './src/mastra/services/memory.js';

dotenv.config();

async function testMemoryService() {
  console.log('🧠 Testing Memory Service...\n');
  
  const testResourceId = 'test-user';
  const testThreadId = 'test-thread-1';
  
  try {
    // 1. Test saving conversation
    console.log('1. Testing conversation saving...');
    await memoryService.saveConversation(testResourceId, testThreadId, 'Hello, Yui!', 'user');
    await memoryService.saveConversation(testResourceId, testThreadId, 'こんにちは！お久しぶりです。', 'assistant');
    console.log('✅ Conversation saved successfully\n');
    
    // 2. Test retrieving conversation history
    console.log('2. Testing conversation history retrieval...');
    const history = await memoryService.getConversationHistory(testResourceId, testThreadId, 5);
    console.log('📚 Conversation history:', history);
    console.log('✅ History retrieved successfully\n');
    
    // 3. Test saving important memory
    console.log('3. Testing important memory saving...');
    await memoryService.saveImportantMemory(
      testResourceId,
      testThreadId,
      'User prefers programming in JavaScript and TypeScript',
      ['programming', 'preferences']
    );
    console.log('✅ Important memory saved successfully\n');
    
    // 4. Test retrieving user memories
    console.log('4. Testing user memories retrieval...');
    const userMemories = await memoryService.getUserMemories(testResourceId, 10);
    console.log('🎯 User memories:', userMemories);
    console.log('✅ User memories retrieved successfully\n');
    
    // 5. Test semantic search
    console.log('5. Testing semantic search...');
    const searchResults = await memoryService.searchRelatedConversations(
      testResourceId,
      'JavaScript programming',
      3
    );
    console.log('🔍 Search results:', searchResults);
    console.log('✅ Semantic search completed successfully\n');
    
    console.log('🎉 All memory tests passed!');
    
  } catch (error) {
    console.error('❌ Memory test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

testMemoryService().catch(console.error);