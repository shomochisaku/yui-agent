# ユイエージェント (Yui Agent)

SAOのユイのようなパーソナルAIエージェント

## 概要

Sword Art Online（SAO）のユイのような人格を持つパーソナルAIアシスタントです。Mastraフレームワークを使用し、OpenAI GPT-4.1 miniとWeb検索機能を統合したインテリジェントエージェントです。

## 主な機能

- 🤖 **AIエージェント**: SAOのユイらしい人格と応答
- 🧠 **長期記憶**: 会話履歴の自動保存と検索
- 🔍 **Web検索**: Brave Search APIによる最新情報検索
- ⚡ **Function Calling**: 自然な検索タイミングの判断
- 💬 **CLI チャット**: コマンドラインでの対話インターフェース
- 🎯 **セマンティック検索**: 過去の会話から関連情報を検索

## 技術仕様

- **フレームワーク**: Mastra
- **LLM**: OpenAI GPT-4.1 mini (2025-04-14)
- **検索API**: Brave Search API
- **メモリ**: @mastra/memory + LibSQL (SQLite)
- **言語**: TypeScript, JavaScript
- **実行環境**: Node.js 20+

## セットアップ

### 必要な環境

- Node.js 20+
- PNPM
- OpenAI API Key
- Brave Search API Key（オプション）

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/shomochisaku/yui-agent.git
cd yui-agent

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env
# .envファイルにAPIキーを設定

# ビルド
pnpm run build
```

### 使用方法

```bash
# CLIチャットの起動
pnpm chat

# または
node cli-chat.js
```

## メモリ機能

### 自動会話履歴保存

全ての会話は自動的にSQLiteデータベースに保存されます：

- **データベース**: `./data/yui-memory.db`
- **セッション管理**: resourceId/threadIdによる管理
- **永続化**: 会話の自動保存と復元
- **検索**: セマンティック検索による関連会話の検索

### メモリツール

エージェントは以下のメモリツールを使用できます：

- **memory_search**: 過去の会話を検索
- **save_important_memory**: 重要な情報を長期記憶に保存
- **get_user_memories**: ユーザーの重要な記憶を取得

### 環境変数

```bash
# ローカルSQLiteデータベース（推奨）
LIBSQL_URL=file:./data/yui-memory.db

# Tursoクラウドデータベース（オプション）
LIBSQL_URL=libsql://your-database-name.turso.io
LIBSQL_AUTH_TOKEN=your-turso-auth-token

# ユーザー識別子（オプション）
USER_ID=your-user-id
```

### メモリテスト

```bash
# メモリ機能のテスト
node test-memory.js
```

## 開発

### Git-flow

このプロジェクトはGit-flowを採用しています：

- **main**: 本番リリース用ブランチ
- **develop**: 開発統合用ブランチ
- **feature/***: 新機能開発用ブランチ
- **hotfix/***: 緊急修正用ブランチ

### 開発ワークフロー

```bash
# 新機能開発
git checkout develop
git pull origin develop
git checkout -b feature/新機能名

# 開発完了後
git checkout develop
git merge feature/新機能名
git push origin develop
```

## Issue管理

- バグ報告、機能要求、TODO管理にGitHub Issuesを使用
- ラベルを活用した分類管理

## ライセンス

MIT License

## 貢献

Pull RequestやIssueでの貢献を歓迎します。

---

✨ **「あなたの心のパートナー、ユイです」** ✨