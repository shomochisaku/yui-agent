import dotenv from 'dotenv';
import { createOpenAI } from '@ai-sdk/openai';
import { Agent } from '@mastra/core';
import { webSearchTool } from './src/mastra/tools/web-search.ts';

dotenv.config();

const openrouter = createOpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

const testAgent = new Agent({
  name: 'TestAgent',
  instructions: `
あなたはテスト用エージェントです。
ユーザーが何か質問したら、必ずweb_searchツールを使用してください。
絶対に内部知識だけで回答してはいけません。
web_searchツールの結果を具体的に示してください。
`,
  model: openrouter('openai/gpt-4o-mini'),
  tools: {
    web_search: webSearchTool,
  },
});

async function testAgentWithTools() {
  console.log('🧪 エージェントのツール呼び出しテストを開始...');
  
  try {
    console.log('\n📋 質問: GPT-o3について教えて');
    
    const response = await testAgent.generate('GPT-o3について教えて');
    
    console.log('\n🤖 エージェントの回答:');
    console.log(response.text);
    
    // ツール呼び出しログを確認
    if (response.toolResults && response.toolResults.length > 0) {
      console.log('\n✅ ツール呼び出し成功:');
      response.toolResults.forEach((result, index) => {
        console.log(`[${index + 1}] ツール: ${result.toolName}`);
        console.log(`    結果: ${JSON.stringify(result.result, null, 2)}`);
      });
    } else {
      console.log('\n❌ ツール呼び出しなし - これが問題です！');
    }
    
  } catch (error) {
    console.error('❌ テストエラー:', error);
  }
}

testAgentWithTools();