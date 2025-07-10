import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 環境変数チェック');
console.log('================');

// メイン環境変数
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ 設定済み' : '❌ 未設定');
console.log('BRAVE_API_KEY:', process.env.BRAVE_API_KEY ? '✅ 設定済み' : '❌ 未設定');

// システム環境変数
console.log('\n📊 システム環境変数:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('PORT:', process.env.PORT || 'undefined');

// バックアップ設定（使用されていない）
console.log('\n🔧 バックアップ設定（現在未使用）:');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? '設定済み' : '未設定');
console.log('OPENROUTER_BASE_URL:', process.env.OPENROUTER_BASE_URL || 'undefined');

// 推奨設定
console.log('\n💡 推奨設定:');
if (!process.env.OPENAI_API_KEY) {
  console.log('❌ OPENAI_API_KEYの設定が必要です（メイン機能）');
}
if (!process.env.BRAVE_API_KEY) {
  console.log('⚠️  BRAVE_API_KEYの設定を推奨します（Web検索機能）');
  console.log('   未設定の場合は模擬検索モードで動作します');
}

// 設定状態のまとめ
const hasOpenAI = !!process.env.OPENAI_API_KEY;
const hasBrave = !!process.env.BRAVE_API_KEY;

console.log('\n🎯 設定状態まとめ:');
console.log('基本機能:', hasOpenAI ? '✅ 利用可能' : '❌ 設定必要');
console.log('Web検索:', hasBrave ? '✅ 完全機能' : '⚠️ 模擬モード');
console.log('総合評価:', hasOpenAI && hasBrave ? '✅ 完全設定' : hasOpenAI ? '⚠️ 部分設定' : '❌ 設定不完全');