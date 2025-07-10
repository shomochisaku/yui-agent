# ユイエージェント (Yui Agent)

SAOのユイのようなパーソナルAIエージェント

## 概要

Sword Art Online（SAO）のユイのような人格を持つパーソナルAIアシスタントです。Mastraフレームワークを使用し、OpenAI GPT-4.1 miniとWeb検索機能を統合したインテリジェントエージェントです。

## 主な機能

- 🤖 **AIエージェント**: SAOのユイらしい人格と応答
- 🔍 **Web検索**: Brave Search APIによる最新情報検索
- ⚡ **Function Calling**: 自然な検索タイミングの判断
- 💬 **CLI チャット**: コマンドラインでの対話インターフェース

## 技術仕様

- **フレームワーク**: Mastra
- **LLM**: OpenAI GPT-4.1 mini (2025-04-14)
- **検索API**: Brave Search API
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