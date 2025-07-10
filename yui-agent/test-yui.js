import dotenv from 'dotenv';
import { yui } from './src/mastra/agents/yui.js';

dotenv.config();

console.log('🔍 ユイエージェント統合テスト');
console.log('============================');

// Environment check
console.log('📋 環境変数チェック:');
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? '✅ 設定済み' : '❌ 未設定');
console.log('Brave API Key:', process.env.BRAVE_API_KEY ? '✅ 設定済み' : '❌ 未設定');
console.log('');

// Test queries as requested by user
const testQueries = [
  '最新のAIニュースを教えて',
  'こんにちは、ユイ！自己紹介をお願いします',
  '2024年の技術トレンドについて教えてください'
];

async function runTestQuery(query, index) {
  console.log(`🔍 テストクエリ ${index + 1}: "${query}"`);
  console.log('─'.repeat(50));
  
  try {
    const startTime = Date.now();
    const response = await yui.generate(query);
    const endTime = Date.now();
    
    console.log('✅ 応答成功');
    console.log(`応答時間: ${endTime - startTime}ms`);
    console.log('応答内容:');
    console.log(response.text);
    console.log('');
    
    return true;
  } catch (error) {
    console.error('❌ エラー:', error.message);
    console.log('');
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 ユイエージェントテスト開始');
  console.log('');
  
  let successCount = 0;
  const totalTests = testQueries.length;
  
  for (let i = 0; i < testQueries.length; i++) {
    const success = await runTestQuery(testQueries[i], i);
    if (success) {
      successCount++;
    }
    
    // Add delay between tests to avoid rate limiting
    if (i < testQueries.length - 1) {
      console.log('⏳ 次のテストまで少し待機...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('');
    }
  }
  
  console.log('📊 テスト結果サマリー');
  console.log('====================');
  console.log(`成功: ${successCount}/${totalTests} テスト`);
  console.log(`成功率: ${Math.round((successCount / totalTests) * 100)}%`);
  console.log(`全体評価: ${successCount === totalTests ? '✅ 全テスト合格' : '⚠️ 一部テスト不合格'}`);
  
  if (successCount < totalTests) {
    console.log('');
    console.log('🔧 推奨アクション:');
    console.log('- API キーの設定を確認してください');
    console.log('- ネットワーク接続を確認してください');
    console.log('- OpenAI API の利用制限を確認してください');
  }
  
  process.exit(successCount === totalTests ? 0 : 1);
}

// Run the tests
runAllTests().catch(error => {
  console.error('💥 テスト実行エラー:', error);
  process.exit(1);
});