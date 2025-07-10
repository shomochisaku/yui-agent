import dotenv from 'dotenv';
import { yui } from './src/mastra/agents/yui.js';

dotenv.config();

async function testAgent() {
  console.log('🤖 ユイエージェントをテスト中...');
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? '設定済み' : '未設定');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEYが設定されていません。');
    console.log('環境変数を設定してから再度お試しください。');
    return;
  }
  
  try {
    // 基本的な応答テスト
    console.log('\n📝 基本応答テスト...');
    const response = await yui.generate('こんにちは、ユイ！');
    console.log('✅ 応答:', response.text);
    
    // 人格テスト
    console.log('\n👤 人格設定テスト...');
    const personalityResponse = await yui.generate('あなたは誰ですか？自己紹介してください。');
    console.log('✅ 自己紹介:', personalityResponse.text);
    
    // 検索機能テスト
    console.log('\n🔍 検索機能テスト...');
    const searchResponse = await yui.generate('今日の天気について教えてください。');
    console.log('✅ 検索応答:', searchResponse.text);
    
    console.log('\n🎉 全てのテストが完了しました！');
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
    console.log('\n🔧 トラブルシューティング:');
    console.log('- OPENAI_API_KEYが正しく設定されているか確認してください');
    console.log('- インターネット接続を確認してください');
    console.log('- OpenAI APIの制限に達していないか確認してください');
  }
}

testAgent();