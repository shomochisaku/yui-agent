import dotenv from 'dotenv';
import { yui } from './src/mastra/agents/yui.js';

dotenv.config();

console.log('🔬 ユイエージェント統合テスト実行');
console.log('================================');

async function testEnvironmentVariables() {
  console.log('🔍 環境変数チェック...');
  
  const openaiSet = !!process.env.OPENAI_API_KEY;
  const braveSet = !!process.env.BRAVE_API_KEY;
  
  console.log(`OpenAI API: ${openaiSet ? '✅ 設定済み' : '❌ 未設定'}`);
  console.log(`Brave Search API: ${braveSet ? '✅ 設定済み' : '❌ 未設定'}`);
  console.log('');
  
  return { openaiSet, braveSet };
}

async function testBasicResponse() {
  console.log('🤖 基本応答テスト...');
  
  try {
    const response = await yui.generate('こんにちは、ユイ！簡単な自己紹介をお願いします。');
    console.log('✅ 基本応答成功:', response.text.substring(0, 100) + '...');
    console.log('');
    return true;
  } catch (error) {
    console.error('❌ 基本応答エラー:', error.message);
    console.log('');
    return false;
  }
}

async function testWebSearch() {
  console.log('🔍 Web検索機能テスト...');
  
  try {
    // Test with a query that should trigger web search
    const response = await yui.generate('最新のAIニュースを教えて');
    console.log('✅ Web検索応答成功');
    console.log('応答内容:', response.text);
    console.log('');
    
    // Check if the response contains search-related content
    const hasSearchContent = response.text.includes('検索') || 
                            response.text.includes('記事') || 
                            response.text.includes('ニュース') ||
                            response.text.includes('情報');
    
    console.log(`検索結果の妥当性: ${hasSearchContent ? '✅ 検索結果を含む' : '⚠️ 検索結果が不明'}`);
    console.log('');
    
    return true;
  } catch (error) {
    console.error('❌ Web検索エラー:', error.message);
    console.log('');
    return false;
  }
}

async function testSpecificQuery() {
  console.log('🎯 特定クエリテスト（技術情報）...');
  
  try {
    const response = await yui.generate('2024年のAI技術のトレンドについて教えて');
    console.log('✅ 特定クエリ応答成功');
    console.log('応答内容:', response.text);
    console.log('');
    return true;
  } catch (error) {
    console.error('❌ 特定クエリエラー:', error.message);
    console.log('');
    return false;
  }
}

async function testConversationalFlow() {
  console.log('💬 会話フローテスト...');
  
  try {
    // First message
    const response1 = await yui.generate('こんにちは、ユイ！');
    console.log('✅ 会話開始:', response1.text.substring(0, 50) + '...');
    
    // Follow-up message
    const response2 = await yui.generate('あなたはどんなことができますか？');
    console.log('✅ 機能説明:', response2.text.substring(0, 50) + '...');
    
    console.log('');
    return true;
  } catch (error) {
    console.error('❌ 会話フローエラー:', error.message);
    console.log('');
    return false;
  }
}

async function runIntegrationTests() {
  console.log('🚀 統合テスト開始');
  console.log('==================');
  console.log('');
  
  const results = {
    environment: false,
    basic: false,
    webSearch: false,
    specificQuery: false,
    conversational: false,
  };
  
  // Environment check
  const envResult = await testEnvironmentVariables();
  results.environment = envResult.openaiSet && envResult.braveSet;
  
  // Basic response test
  results.basic = await testBasicResponse();
  
  // Web search test
  results.webSearch = await testWebSearch();
  
  // Specific query test
  results.specificQuery = await testSpecificQuery();
  
  // Conversational flow test
  results.conversational = await testConversationalFlow();
  
  // Results summary
  console.log('📊 統合テスト結果サマリー');
  console.log('========================');
  console.log(`環境変数: ${results.environment ? '✅ 正常' : '❌ 問題あり'}`);
  console.log(`基本応答: ${results.basic ? '✅ 正常' : '❌ 問題あり'}`);
  console.log(`Web検索: ${results.webSearch ? '✅ 正常' : '❌ 問題あり'}`);
  console.log(`特定クエリ: ${results.specificQuery ? '✅ 正常' : '❌ 問題あり'}`);
  console.log(`会話フロー: ${results.conversational ? '✅ 正常' : '❌ 問題あり'}`);
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log(`全体評価: ${allPassed ? '✅ 全テスト合格' : '⚠️ 一部テスト不合格'}`);
  
  if (!allPassed) {
    console.log('');
    console.log('🔧 推奨アクション:');
    if (!results.environment) console.log('- 環境変数（API キー）の設定を確認');
    if (!results.basic) console.log('- OpenAI API の接続を確認');
    if (!results.webSearch) console.log('- Web検索機能の設定を確認');
    if (!results.specificQuery) console.log('- 特定クエリの処理を確認');
    if (!results.conversational) console.log('- 会話フロー機能を確認');
  }
  
  process.exit(allPassed ? 0 : 1);
}

// Run the tests
runIntegrationTests().catch(error => {
  console.error('💥 統合テスト実行エラー:', error);
  process.exit(1);
});