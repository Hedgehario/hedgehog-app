# 開発環境セットアップ

## 概要

Hariny（ハリネズミ健康管理アプリ）の開発環境セットアップガイドです。

## 前提条件

### 必要なソフトウェア

- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上
- **Git**: 2.30.0 以上
- **VS Code**: 推奨エディタ

### 推奨環境

- **OS**: macOS, Windows 10/11, Ubuntu 20.04+
- **メモリ**: 8GB 以上
- **ストレージ**: 10GB 以上の空き容量

## セットアップ手順

### 1. リポジトリのクローン

```bash
# リポジトリをクローン
git clone https://github.com/your-username/hedgehog-app.git

# プロジェクトディレクトリに移動
cd hedgehog-app
```

### 2. Node.js のインストール

#### macOS (Homebrew)

```bash
# Homebrewがインストールされていない場合
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.jsをインストール
brew install node

# バージョン確認
node --version
npm --version
```

#### Windows

1. [Node.js 公式サイト](https://nodejs.org/)から LTS 版をダウンロード
2. インストーラーを実行
3. コマンドプロンプトでバージョン確認

```bash
node --version
npm --version
```

#### Ubuntu

```bash
# NodeSourceリポジトリを追加
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Node.jsをインストール
sudo apt-get install -y nodejs

# バージョン確認
node --version
npm --version
```

### 3. 依存関係のインストール

```bash
# 依存関係をインストール
npm install

# または、yarnを使用する場合
yarn install
```

### 4. 環境変数の設定

#### 環境変数ファイルの作成

```bash
# .env.localファイルを作成
cp .env.example .env.local
```

#### 必要な環境変数

```bash
# .env.local
# データベース設定
DATABASE_URL="postgresql://username:password@localhost:5432/hariny"

# Supabase設定
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# 認証設定
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# 画像アップロード設定
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### 5. データベースのセットアップ

#### Supabase を使用する場合

1. [Supabase](https://supabase.com/)でアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの設定から URL と API キーを取得
4. SQL エディタでスキーマを実行

```sql
-- スキーマファイルを実行
-- docs/database/schema.md の内容を実行
```

#### ローカル PostgreSQL を使用する場合

```bash
# PostgreSQLをインストール（macOS）
brew install postgresql

# PostgreSQLを起動
brew services start postgresql

# データベースを作成
createdb hariny

# スキーマを実行
psql -d hariny -f docs/database/schema.sql
```

### 6. 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev

# または
yarn dev
```

開発サーバーが起動すると、`http://localhost:3000` でアプリケーションにアクセスできます。

## 開発ツール

### VS Code 拡張機能

推奨する VS Code 拡張機能をインストールしてください：

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml",
    "ms-vscode.vscode-eslint"
  ]
}
```

### ESLint 設定

```bash
# ESLintをインストール
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# ESLint設定ファイルを作成
npx eslint --init
```

### Prettier 設定

```bash
# Prettierをインストール
npm install -D prettier

# Prettier設定ファイルを作成
echo '{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}' > .prettierrc
```

## 開発ワークフロー

### 1. ブランチ戦略

```bash
# メインブランチから新しいブランチを作成
git checkout -b feature/your-feature-name

# または
git checkout -b fix/your-fix-name
```

### 2. コミットメッセージの規約

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントの更新
style: コードスタイルの修正
refactor: リファクタリング
test: テストの追加・修正
chore: その他の変更
```

### 3. プルリクエスト

1. 機能開発が完了したら、プルリクエストを作成
2. レビューを受ける
3. 承認されたらマージ

## テスト

### テストの実行

```bash
# ユニットテストを実行
npm run test

# テストを監視モードで実行
npm run test:watch

# カバレッジ付きでテストを実行
npm run test:coverage
```

### E2E テスト

```bash
# Playwrightをインストール
npm install -D @playwright/test

# E2Eテストを実行
npx playwright test
```

## デバッグ

### VS Code でのデバッグ

`.vscode/launch.json` を作成：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### ログ出力

```typescript
// 開発環境でのログ出力
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
```

## パフォーマンス最適化

### バンドルサイズの分析

```bash
# バンドルサイズを分析
npm run build
npx @next/bundle-analyzer
```

### 画像最適化

```typescript
// Next.js Imageコンポーネントを使用
import Image from "next/image";

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority
/>;
```

## デプロイメント

### Vercel へのデプロイ

1. [Vercel](https://vercel.com/)でアカウントを作成
2. GitHub リポジトリを連携
3. 環境変数を設定
4. デプロイを実行

### 環境変数の設定

Vercel のダッシュボードで以下の環境変数を設定：

- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXTAUTH_SECRET`

## トラブルシューティング

### よくある問題

#### 1. 依存関係のエラー

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

#### 2. TypeScript エラー

```bash
# TypeScriptの型チェック
npx tsc --noEmit
```

#### 3. ポートが使用中

```bash
# ポート3000が使用中の場合
lsof -ti:3000 | xargs kill -9
```

#### 4. データベース接続エラー

- データベースが起動しているか確認
- 環境変数が正しく設定されているか確認
- ファイアウォールの設定を確認

## 参考資料

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/docs)
- [Tailwind CSS 公式ドキュメント](https://tailwindcss.com/docs)
- [Supabase 公式ドキュメント](https://supabase.com/docs)
