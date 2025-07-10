import dotenv from 'dotenv';
import { webSearchTool } from './src/mastra/tools/web-search.js';

dotenv.config();

console.log('🔍 Web検索機能テスト');
console.log('===================');

async function testSearchTool() {
  console.log('🔧 Web検索ツール直接テスト...');
  
  try {
    // Test search with a current topic
    const result = await webSearchTool.execute({
      query: '最新のAIニュース 2024',
      maxResults: 3
    });
    
    console.log('✅ 検索ツール実行成功');
    console.log('検索クエリ:', result.query);
    console.log('検索結果数:', result.results.length);
    console.log('');
    
    result.results.forEach((item, index) => {
      console.log(`📰 結果 ${index + 1}:`);
      console.log(`  タイトル: ${item.title}`);
      console.log(`  URL: ${item.url}`);
      console.log(`  要約: ${item.snippet.substring(0, 100)}...`);
      console.log('');
    });
    
    return true;
  } catch (error) {
    console.error('❌ 検索ツールエラー:', error.message);
    return false;
  }
}

async function testSearchWithoutAPI() {
  console.log('🔧 API未設定時のフォールバック テスト...');
  
  try {
    // Temporarily remove the API key to test fallback
    const originalKey = process.env.BRAVE_API_KEY;
    delete process.env.BRAVE_API_KEY;
    
    const result = await webSearchTool.execute({
      query: 'GPT-4 新機能',
      maxResults: 2
    });
    
    // Restore the API key
    process.env.BRAVE_API_KEY = originalKey;
    
    console.log('✅ フォールバック機能成功');
    console.log('模擬検索結果:', result.results.length, '件');
    console.log('');
    
    return true;
  } catch (error) {
    console.error('❌ フォールバックエラー:', error.message);
    return false;
  }
}

async function testMultipleSearches() {
  console.log('🔧 複数検索テスト...');
  
  const queries = [
    'AI技術 トレンド 2024',
    'OpenAI GPT-4 新機能',
    '機械学習 最新研究'
  ];
  
  let successes = 0;
  
  for (const query of queries) {
    try {
      console.log(`🔍 検索中: "${query}"`);
      const result = await webSearchTool.execute({
        query: query,
        maxResults: 2
      });
      
      console.log(`✅ 成功: ${result.results.length}件の結果`);
      successes++;
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ 検索失敗: ${query} - ${error.message}`);
    }
  }
  
  console.log(`📊 複数検索結果: ${successes}/${queries.length} 成功`);
  console.log('');
  
  return successes === queries.length;
}

async function runSearchTests() {
  console.log('🚀 Web検索テスト開始');
  console.log('');
  
  const results = {
    basicSearch: false,
    fallbackSearch: false,
    multipleSearches: false,
  };
  
  // Basic search test
  results.basicSearch = await testSearchTool();
  
  // Fallback test
  results.fallbackSearch = await testSearchWithoutAPI();
  
  // Multiple searches test
  results.multipleSearches = await testMultipleSearches();
  
  // Results summary
  console.log('📊 Web検索テスト結果サマリー');
  console.log('==========================');
  console.log(`基本検索: ${results.basicSearch ? '✅ 成功' : '❌ 失敗'}`);
  console.log(`フォールバック: ${results.fallbackSearch ? '✅ 成功' : '❌ 失敗'}`);
  console.log(`複数検索: ${results.multipleSearches ? '✅ 成功' : '❌ 失敗'}`);
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log(`全体評価: ${allPassed ? '✅ 全テスト合格' : '⚠️ 一部テスト不合格'}`);
  
  if (!allPassed) {
    console.log('');
    console.log('🔧 推奨アクション:');
    if (!results.basicSearch) console.log('- Brave Search API キーの設定を確認');
    if (!results.fallbackSearch) console.log('- フォールバック機能の実装を確認');
    if (!results.multipleSearches) console.log('- API レート制限を確認');
  }
  
  process.exit(allPassed ? 0 : 1);
}

// Run the tests
runSearchTests().catch(error => {
  console.error('💥 Web検索テスト実行エラー:', error);
  process.exit(1);
});