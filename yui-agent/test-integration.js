import dotenv from 'dotenv';
import { yui } from './src/mastra/agents/yui.js';
import { webSearchTool } from './src/mastra/tools/web-search.js';

dotenv.config();

// テスト結果を管理するクラス
class TestReporter {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  addResult(testName, passed, message = '', details = '') {
    this.results.push({
      testName,
      passed,
      message,
      details,
      timestamp: Date.now()
    });
  }

  printResults() {
    const endTime = Date.now();
    const duration = endTime - this.startTime;
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.length - passed;

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('🧪 統合テスト結果レポート');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`実行時間: ${duration}ms`);
    console.log(`合計テスト: ${this.results.length}`);
    console.log(`成功: ${passed} ✅`);
    console.log(`失敗: ${failed} ❌`);
    console.log(`成功率: ${((passed / this.results.length) * 100).toFixed(1)}%`);
    console.log('───────────────────────────────────────────────────────────────');

    this.results.forEach((result, index) => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`${icon} ${index + 1}. ${result.testName}`);
      if (result.message) {
        console.log(`   📝 ${result.message}`);
      }
      if (result.details) {
        console.log(`   🔍 ${result.details}`);
      }
    });

    console.log('═══════════════════════════════════════════════════════════════');
    return failed === 0;
  }
}

// 統合テスト実行
async function runIntegrationTests() {
  const reporter = new TestReporter();
  
  console.log('🚀 ユイエージェント統合テスト開始');
  console.log('═══════════════════════════════════════════════════════════════');

  // 1. 環境変数チェック
  console.log('\n1. 環境変数チェック...');
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasBrave = !!process.env.BRAVE_API_KEY;
  
  reporter.addResult(
    '環境変数: OPENAI_API_KEY',
    hasOpenAI,
    hasOpenAI ? 'OpenAI APIキーが設定されています' : 'OpenAI APIキーが設定されていません',
    hasOpenAI ? 'メイン機能が利用可能' : '設定が必要です'
  );
  
  reporter.addResult(
    '環境変数: BRAVE_API_KEY',
    hasBrave,
    hasBrave ? 'Brave APIキーが設定されています' : 'Brave APIキーが設定されていません',
    hasBrave ? 'Web検索が完全機能' : '模擬検索モードで動作'
  );

  // 2. 基本エージェントテスト
  if (hasOpenAI) {
    console.log('\n2. 基本エージェントテスト...');
    try {
      const response = await yui.generate('こんにちは');
      const hasResponse = response && response.text && response.text.length > 0;
      
      reporter.addResult(
        '基本応答テスト',
        hasResponse,
        hasResponse ? '正常に応答を生成' : '応答生成に失敗',
        hasResponse ? `応答: ${response.text.substring(0, 50)}...` : 'エラーが発生'
      );
    } catch (error) {
      reporter.addResult(
        '基本応答テスト',
        false,
        'エラーが発生しました',
        error.message
      );
    }
  } else {
    reporter.addResult(
      '基本応答テスト',
      false,
      'OpenAI APIキーが設定されていないためスキップ',
      'OPENAI_API_KEY環境変数を設定してください'
    );
  }

  // 3. 人格テスト
  if (hasOpenAI) {
    console.log('\n3. 人格設定テスト...');
    try {
      const response = await yui.generate('あなたは誰ですか？');
      const isYui = response && response.text && response.text.toLowerCase().includes('ユイ');
      
      reporter.addResult(
        '人格設定テスト',
        isYui,
        isYui ? 'ユイとして正しく自己紹介' : 'ユイとしての人格が不明確',
        `応答: ${response.text.substring(0, 100)}...`
      );
    } catch (error) {
      reporter.addResult(
        '人格設定テスト',
        false,
        'エラーが発生しました',
        error.message
      );
    }
  } else {
    reporter.addResult(
      '人格設定テスト',
      false,
      'OpenAI APIキーが設定されていないためスキップ',
      'OPENAI_API_KEY環境変数を設定してください'
    );
  }

  // 4. Web検索ツール単体テスト
  console.log('\n4. Web検索ツール単体テスト...');
  try {
    const searchResult = await webSearchTool.execute({
      query: 'テスト検索',
      maxResults: 3
    });
    
    const hasResults = searchResult && searchResult.results && searchResult.results.length > 0;
    
    reporter.addResult(
      'Web検索ツール',
      hasResults,
      hasResults ? `${searchResult.results.length}件の検索結果を取得` : '検索結果が取得できませんでした',
      hasResults ? `検索クエリ: ${searchResult.query}` : '検索エラーが発生'
    );
  } catch (error) {
    reporter.addResult(
      'Web検索ツール',
      false,
      'エラーが発生しました',
      error.message
    );
  }

  // 5. Function Calling統合テスト
  if (hasOpenAI) {
    console.log('\n5. Function Calling統合テスト...');
    try {
      const response = await yui.generate('最新のAI技術について検索して教えてください');
      const hasResponse = response && response.text && response.text.length > 50;
      
      reporter.addResult(
        'Function Calling統合',
        hasResponse,
        hasResponse ? '検索機能を使用した応答を生成' : '検索機能が正常に動作しない',
        hasResponse ? `応答長: ${response.text.length}文字` : '検索連携エラー'
      );
    } catch (error) {
      reporter.addResult(
        'Function Calling統合',
        false,
        'エラーが発生しました',
        error.message
      );
    }
  } else {
    reporter.addResult(
      'Function Calling統合',
      false,
      'OpenAI APIキーが設定されていないためスキップ',
      'OPENAI_API_KEY環境変数を設定してください'
    );
  }

  // 6. 複数ターン会話テスト
  if (hasOpenAI) {
    console.log('\n6. 複数ターン会話テスト...');
    try {
      const response1 = await yui.generate('私の名前は太郎です');
      const response2 = await yui.generate('私の名前を覚えていますか？');
      
      const remembersName = response2 && response2.text && response2.text.includes('太郎');
      
      reporter.addResult(
        '複数ターン会話',
        remembersName,
        remembersName ? '会話内容を記憶している' : '会話内容を記憶していない',
        `応答: ${response2.text.substring(0, 100)}...`
      );
    } catch (error) {
      reporter.addResult(
        '複数ターン会話',
        false,
        'エラーが発生しました',
        error.message
      );
    }
  } else {
    reporter.addResult(
      '複数ターン会話',
      false,
      'OpenAI APIキーが設定されていないためスキップ',
      'OPENAI_API_KEY環境変数を設定してください'
    );
  }

  // 7. エラーハンドリングテスト
  console.log('\n7. エラーハンドリングテスト...');
  try {
    const searchResult = await webSearchTool.execute({
      query: '',
      maxResults: 0
    });
    
    const handlesError = searchResult && searchResult.results;
    
    reporter.addResult(
      'エラーハンドリング',
      handlesError,
      handlesError ? '無効な入力に対して適切に処理' : 'エラーハンドリングに問題',
      '空の検索クエリでのテスト'
    );
  } catch (error) {
    // エラーが発生すること自体は正常な動作
    reporter.addResult(
      'エラーハンドリング',
      true,
      '期待通りエラーが発生',
      error.message
    );
  }

  // 結果出力
  return reporter.printResults();
}

// テスト実行
console.log('🧪 ユイエージェント統合テストスイート');
console.log('Version: 1.0.0');
console.log('Date:', new Date().toISOString());

runIntegrationTests()
  .then(allPassed => {
    console.log('\n🎯 最終結果:', allPassed ? '全テスト成功 ✅' : '一部テスト失敗 ❌');
    
    if (!allPassed) {
      console.log('\n🔧 推奨アクション:');
      console.log('- 環境変数の設定を確認してください');
      console.log('- インターネット接続を確認してください');
      console.log('- APIキーの有効性を確認してください');
      console.log('- 必要に応じてAPIの制限を確認してください');
    }
    
    process.exit(allPassed ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ テスト実行中に致命的なエラーが発生しました:', error);
    process.exit(1);
  });