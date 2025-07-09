import dotenv from 'dotenv';
import { webSearchTool } from './src/mastra/tools/web-search.ts';

dotenv.config();

async function testSearch() {
  console.log('🔍 Web検索ツールのテストを開始...');
  
  try {
    const result = await webSearchTool.execute({
      query: '今日のニュース 最新',
      maxResults: 5
    });
    
    console.log('\n✅ 検索結果:');
    console.log('検索クエリ:', result.query);
    console.log('結果数:', result.results.length);
    
    result.results.forEach((item, index) => {
      console.log(`\n[${index + 1}] ${item.title}`);
      console.log(`URL: ${item.url}`);
      console.log(`概要: ${item.snippet}`);
    });
    
  } catch (error) {
    console.error('❌ テストエラー:', error);
  }
}

testSearch();