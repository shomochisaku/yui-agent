import { createTool } from '@mastra/core';
import { z } from 'zod';

export const webSearchTool = createTool({
  id: 'web_search',
  description: 'Search the web for information',
  inputSchema: z.object({
    query: z.string().describe('Search query'),
    maxResults: z.number().optional().default(5).describe('Maximum number of results to return'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      url: z.string(),
      snippet: z.string(),
    })),
    query: z.string(),
  }),
  execute: async ({ query, maxResults = 5 }) => {
    try {
      console.log(`🔍 Web検索を実行: "${query}"`);
      
      // Brave Search API の無料プランを使用（要登録）
      // 環境変数がない場合は模擬結果を返す
      if (!process.env.BRAVE_API_KEY) {
        console.log('⚠️  BRAVE_API_KEY が設定されていません。模擬結果を返します。');
        return {
          results: [
            {
              title: `検索結果: ${query}`,
              url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
              snippet: `「${query}」についての検索結果です。実際の検索を行うには、BRAVE_API_KEY を設定してください。`,
            },
            {
              title: 'Wikipedia（参考）',
              url: `https://ja.wikipedia.org/wiki/${encodeURIComponent(query)}`,
              snippet: `${query}に関するWikipediaの記事です。詳細な情報を確認できます。`,
            },
          ],
          query,
        };
      }
      
      // Brave Search API を使用した実際の検索
      const searchUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${maxResults}`;
      
      const response = await fetch(searchUrl, {
        headers: {
          'X-Subscription-Token': process.env.BRAVE_API_KEY,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 結果を整形
      const results = [];
      
      if (data.web && data.web.results && data.web.results.length > 0) {
        data.web.results.slice(0, maxResults).forEach((item: any) => {
          results.push({
            title: item.title || 'タイトルなし',
            url: item.url || '#',
            snippet: item.description || '説明なし',
          });
        });
      }
      
      // 結果がない場合のフォールバック
      if (results.length === 0) {
        results.push({
          title: '検索結果が見つかりませんでした',
          url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          snippet: `「${query}」の検索結果が見つかりませんでした。Googleで直接検索してみてください。`,
        });
      }
      
      console.log(`✅ 検索完了: ${results.length}件の結果`);
      return {
        results,
        query,
      };
    } catch (error) {
      console.error('Web search error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        results: [{
          title: '検索エラー',
          url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          snippet: `検索中にエラーが発生しました: ${errorMessage}`,
        }],
        query,
      };
    }
  },
});