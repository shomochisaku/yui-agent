import dotenv from 'dotenv';
import { yui } from './src/mastra/agents/yui.js';
import { webSearchTool } from './src/mastra/tools/web-search.js';

dotenv.config();

// 環境変数のチェック
console.log('🔍 ユイエージェントテスト開始...');
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? '設定済み' : '未設定');
console.log('Brave API Key:', process.env.BRAVE_API_KEY ? '設定済み' : '未設定');

// OpenAI APIの接続テスト
async function testOpenAIConnection() {
  console.log('\n🤖 OpenAI API接続テスト...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OPENAI_API_KEYが設定されていません。');
    return false;
  }
  
  try {
    const response = await yui.generate('簡単な挨拶をしてください。');
    console.log('✅ OpenAI API接続成功');
    console.log('応答:', response.text);
    return true;
  } catch (error) {
    console.log('❌ OpenAI API接続エラー:', error.message);
    return false;
  }
}

// Web検索機能のテスト
async function testWebSearch() {
  console.log('\n🔍 Web検索機能テスト...');
  
  try {
    const result = await webSearchTool.execute({
      query: 'OpenAI GPT-4 最新情報',
      maxResults: 3
    });
    
    console.log('✅ Web検索テスト成功');
    console.log('検索クエリ:', result.query);
    console.log('結果数:', result.results.length);
    
    result.results.forEach((item, index) => {
      console.log(`\n[${index + 1}] ${item.title}`);
      console.log(`URL: ${item.url}`);
      console.log(`概要: ${item.snippet.substring(0, 100)}...`);
    });
    
    return true;
  } catch (error) {
    console.log('❌ Web検索テストエラー:', error.message);
    return false;
  }
}

// Function Callingのテスト
async function testFunctionCalling() {
  console.log('\n🔧 Function Callingテスト...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ OPENAI_API_KEYが設定されていません。');
    return false;
  }
  
  try {
    const response = await yui.generate('最新のAI技術について検索して教えてください。');
    console.log('✅ Function Callingテスト成功');
    console.log('応答:', response.text);
    return true;
  } catch (error) {
    console.log('❌ Function Callingテストエラー:', error.message);
    return false;
  }
}

// 統合テストの実行
async function runIntegrationTests() {
  console.log('\n🧪 統合テスト実行...');
  
  const results = {
    openai: await testOpenAIConnection(),
    webSearch: await testWebSearch(),
    functionCalling: await testFunctionCalling()
  };
  
  console.log('\n📊 テスト結果まとめ:');
  console.log('OpenAI API:', results.openai ? '✅ 正常' : '❌ エラー');
  console.log('Web検索:', results.webSearch ? '✅ 正常' : '❌ エラー');
  console.log('Function Calling:', results.functionCalling ? '✅ 正常' : '❌ エラー');
  
  const allPassed = Object.values(results).every(result => result);
  console.log('\n全体結果:', allPassed ? '✅ 全テスト成功' : '❌ 一部テスト失敗');
  
  if (!allPassed) {
    console.log('\n🔧 修正提案:');
    if (!results.openai) {
      console.log('- OPENAI_API_KEY環境変数を設定してください');
    }
    if (!results.webSearch) {
      console.log('- BRAVE_API_KEY環境変数を設定してください（オプション）');
    }
    if (!results.functionCalling) {
      console.log('- OpenAI APIキーとFunction Callingの設定を確認してください');
    }
  }
  
  return allPassed;
}

// メイン実行
runIntegrationTests().catch(error => {
  console.error('❌ テスト実行エラー:', error);
  process.exit(1);
});