import dotenv from 'dotenv';

dotenv.config();

// CLIで直接コンソールに出力するテスト
console.log('🔍 ユイエージェントテスト開始...');
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? '設定済み' : '未設定');
console.log('Brave API Key:', process.env.BRAVE_API_KEY ? '設定済み' : '未設定');

// 簡単なテストケース
const testQueries = [
  '最新のAIニュースを教えて',
  '今日の天気は？',
  '2024年の技術トレンドは？'
];

console.log('\n📝 テストクエリ:');
testQueries.forEach((query, index) => {
  console.log(`${index + 1}. ${query}`);
});

console.log('\n📢 実際のテストは手動で以下のコマンドで実行してください:');
console.log('pnpm chat');
console.log('\nまたは:');
console.log('node cli-chat.js');