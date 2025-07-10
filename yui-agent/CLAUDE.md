# ユイエージェント開発プロジェクト

## プロジェクト概要
SAOのユイのような人格を持つパーソナルAIエージェントの開発
- **フレームワーク**: Mastra
- **LLMプロバイダー**: OpenAI（直接）
- **モデル**: GPT-4.1 mini（Function Calling対応）
- **検索API**: Brave Search API
- **インターフェース**: CLI → 将来的にWebUI/VRM対応

## 完了済み機能 ✅

### 1. 基本環境構築
- Node.js 20+, PNPM, VSCode拡張（Claude Code）
- Mastraプロジェクト初期化
- Git管理開始
- 環境変数設定（OpenRouter, Brave Search API）

### 2. エージェント基盤
- ユイエージェント人格設定（SAO風）
- OpenRouter + DeepSeek統合
- 基本的なチャット機能

### 3. CLI インターフェース
- カラフルなCLI チャット
- 会話履歴保持（10ターン）
- 優雅な終了処理
- 進行状況ログ表示

### 4. Web検索機能
- Brave Search API統合
- 模擬検索モード（API未設定時）
- 検索結果の構造化
- エラーハンドリング

## 最近の改善 ✅

### 1. OpenAI API統合完了 (2025-01-09)
**解決**: Function Calling対応モデルへの移行
**変更点**:
- OpenAI直接API統合（OpenRouterから移行）
- GPT-4.1 mini（2025-04-14）モデルに変更
- 検索ツールのFunction Calling対応
- 自然な検索判定の実現

### 2. 検索機能の改善
**解決**: LLMによる自然な検索判定
**改善点**:
- 複雑なキーワードベース判定の廃止
- エージェントが自動的に検索タイミングを判断
- より自然な会話フローの実現

### 3. GitHub Actions統合 (2025-07-10)
**実装**: Claude GitHub App による自律的開発
**機能**:
- Issue/PR での `@claude` メンション対応
- 自動コード生成とPR作成
- テスト実行とレビュー
- Claude MAXサブスクリプションで利用可能

### 4. プロジェクト管理の改善
**実装**: Git-flowとPublicリポジトリ化
**変更点**:
- mainとdevelopブランチの分離
- GitHub Issue管理の導入
- セキュリティ強化（Secrets管理）
- README.mdの作成

## 技術仕様

### ファイル構造
```
yui-agent/
├── src/mastra/
│   ├── agents/yui.ts          # メインエージェント
│   ├── tools/web-search.ts    # Web検索ツール
│   ├── config/models.ts       # モデル設定
│   └── index.ts              # Mastra設定
├── cli-chat.js               # CLIインターフェース
├── .env                      # 環境変数
└── package.json             # 依存関係
```

### 環境変数
```bash
# OpenAI API（メイン）
OPENAI_API_KEY=sk-proj-...

# OpenRouter API（バックアップ）
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# 検索API
BRAVE_API_KEY=BSA...
```

### 依存関係
```json
{
  "@mastra/core": "^0.10.10",
  "@ai-sdk/openai": "^1.3.23",
  "dotenv": "^17.1.0",
  "zod": "^3.25.76"
}
```

## 次の実装候補

### 高優先度
1. **機能テストと検証**
   - OpenAI APIとFunction Callingの動作確認
   - 検索機能の精度向上
   - エラーハンドリングの改善

2. **プロジェクト管理の改善**
   - GitHubリポジトリのセットアップ
   - Issue管理の導入
   - 継続的な開発プロセスの確立

### 中優先度
3. **追加ツール**
   - タスク管理機能
   - カレンダー連携
   - コード実行機能

4. **UI改善**
   - WebUIの実装
   - VRMアバター表示
   - 音声入出力（TTS/STT）

### 低優先度
5. **システム機能**
   - 長期記憶の改善
   - パフォーマンス最適化
   - デプロイメント対応

## 開発コマンド
```bash
# CLI チャット起動
pnpm chat

# 検索ツール単体テスト
node test-search.js

# エージェント単体テスト
node test-agent.js

# 開発サーバー（未解決）
pnpm dev
```

## トラブルシューティング

### 1. OpenAI API関連
- `OPENAI_API_KEY`が正しく設定されているか確認
- GPT-4.1 miniモデルへのアクセス権限確認
- Function Callingの動作確認

### 2. 検索API制限
- Brave Search API: 月2,000回まで無料
- API制限に達した場合は模擬検索モードで動作

### 3. 環境変数
- `.env`ファイルが正しく読み込まれているか確認
- APIキーの有効性確認
- 必要な環境変数の設定漏れチェック

### 4. Git/GitHub管理
- リモートリポジトリの設定確認
- Issue管理の活用
- 定期的なcommit・pushの実行

## 設計思想
- **非エンジニア向け**: 設定ファイルベースの簡単設定
- **拡張性**: ツール追加が容易な設計
- **プライバシー**: ローカル実行優先
- **コスト効率**: 無料APIの活用
- **人格重視**: SAOのユイらしい応答