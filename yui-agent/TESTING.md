# テストガイド

## 概要
ユイエージェントの動作確認とテストを行うためのガイドです。

## 前提条件

### 必須環境変数
```bash
# OpenAI API キー（必須）
OPENAI_API_KEY=sk-proj-...

# Brave Search API キー（推奨）
BRAVE_API_KEY=BSA...
```

### 環境変数の設定
1. `.env.example`を`.env`にコピー
2. 実際のAPIキーを設定

## テストコマンド

### 基本テスト
```bash
# 環境変数チェック
npm run test:env

# エージェント基本機能テスト
npm run test:agent

# Web検索機能テスト
npm run test:search

# OpenAI API統合テスト
npm run test

# 包括的統合テスト
npm run test:integration

# 全テスト実行
npm run test:all
```

### 個別ファイル実行
```bash
# 個別実行も可能
node test-env.js
node test-agent.js
node test-search.js
node test-yui.js
node test-integration.js
```

## テスト内容

### 1. 環境変数チェック (`test-env.js`)
- OpenAI API キーの設定確認
- Brave Search API キーの設定確認
- システム環境変数の確認

### 2. エージェント基本機能 (`test-agent.js`)
- 基本応答テスト
- 人格設定テスト
- 検索機能テスト

### 3. Web検索機能 (`test-search.js`)
- Web検索ツールの単体テスト
- 検索結果の構造確認

### 4. OpenAI API統合 (`test-yui.js`)
- OpenAI API接続テスト
- Function Calling機能テスト
- 統合動作確認

### 5. 包括的統合テスト (`test-integration.js`)
- 全機能の統合テスト
- エラーハンドリングテスト
- 複数ターン会話テスト
- 詳細なテストレポート生成

## テスト結果の見方

### 成功例
```
✅ OpenAI API接続成功
✅ Web検索テスト成功
✅ Function Callingテスト成功
```

### 失敗例
```
❌ OpenAI API接続エラー: Invalid API key
❌ Web検索テストエラー: Network timeout
```

## トラブルシューティング

### よくある問題

1. **OpenAI APIキーエラー**
   - APIキーが正しく設定されているか確認
   - APIキーの有効期限を確認
   - 使用制限に達していないか確認

2. **Web検索エラー**
   - Brave Search APIキーの設定を確認
   - インターネット接続を確認
   - 未設定の場合は模擬検索モードで動作

3. **Function Callingエラー**
   - OpenAI APIキーでFunction Callingが有効か確認
   - モデル設定(GPT-4.1 mini)を確認

### 推奨アクション
1. 環境変数の設定確認
2. インターネット接続の確認
3. APIキーの有効性確認
4. APIの制限状況確認

## 継続的テスト

### 開発時
```bash
# 開発中は基本テストを実行
npm run test:agent

# 機能追加時は統合テストを実行
npm run test:integration
```

### リリース前
```bash
# 全テストの実行
npm run test:all
```

### CI/CD統合
```yaml
# GitHub Actions例
- name: Run tests
  run: npm run test:all
```

## テストファイルの追加

新しいテストファイルを追加する場合：
1. `test-*.js`の形式で作成
2. `package.json`の`scripts`に追加
3. `test:all`スクリプトに含める

## 関連ファイル
- `.env.example`: 環境変数のテンプレート
- `CLAUDE.md`: プロジェクト全体の仕様
- `package.json`: テストスクリプトの定義