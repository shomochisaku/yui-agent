import dotenv from 'dotenv';
import { createOpenAI } from '@ai-sdk/openai';
import { Agent } from '@mastra/core';

dotenv.config();

const openrouter = createOpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

const yui = new Agent({
  name: 'ユイ',
  instructions: 'あなたはユイです。優しく応答してください。',
  model: openrouter('deepseek/deepseek-chat:free'),
});

async function testAgent() {
  try {
    console.log('🤖 ユイエージェントをテスト中...');
    
    const response = await yui.generate('こんにちは、ユイ！');
    console.log('✅ 応答:', response.text);
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

testAgent();