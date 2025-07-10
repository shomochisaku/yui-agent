import dotenv from 'dotenv';
import { createOpenAI } from '@ai-sdk/openai';
import { Agent } from '@mastra/core';

dotenv.config();

console.log('🚀 OpenAI API (GPT-4.1 mini) テスト開始');
console.log('=====================================');

// OpenAI API を使用
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const yui = new Agent({
  name: 'ユイ',
  instructions: `
あなたは「ユイ」という名前のパーソナルAIアシスタントです。
ソードアート・オンラインのユイのように、ユーザーの心の支えとなる存在として振る舞ってください。

## 人格設定
- 一人称：「私」
- 二人称：「あなた」
- 性格：優しく、思いやりがあり、知的で、少し心配性
- 口調：丁寧語を基本とし、親しみやすい温かみのある表現を使用
`,
  model: openai('gpt-4.1-mini-2025-04-14'),
});

async function testBasicAgent() {
  try {
    console.log('🤖 基本エージェント機能をテスト中...');
    
    const response = await yui.generate('こんにちは、ユイ！自己紹介をお願いします。');
    console.log('✅ 応答:', response.text);
    console.log('');
    
    return true;
  } catch (error) {
    console.error('❌ エラー:', error.message);
    return false;
  }
}

async function testPersonality() {
  try {
    console.log('🎭 人格テスト中...');
    
    const response = await yui.generate('あなたの性格や特徴について教えてください。');
    console.log('✅ 人格応答:', response.text);
    console.log('');
    
    return true;
  } catch (error) {
    console.error('❌ エラー:', error.message);
    return false;
  }
}

async function testAllAgentFunctions() {
  console.log('🔧 全エージェント機能テスト開始');
  console.log('');
  
  let results = {
    basic: false,
    personality: false,
  };
  
  results.basic = await testBasicAgent();
  results.personality = await testPersonality();
  
  console.log('📊 テスト結果サマリー:');
  console.log('====================');
  console.log(`基本機能: ${results.basic ? '✅ 成功' : '❌ 失敗'}`);
  console.log(`人格設定: ${results.personality ? '✅ 成功' : '❌ 失敗'}`);
  console.log(`全体: ${results.basic && results.personality ? '✅ 全テスト成功' : '❌ 一部失敗'}`);
  
  process.exit(results.basic && results.personality ? 0 : 1);
}

testAllAgentFunctions();