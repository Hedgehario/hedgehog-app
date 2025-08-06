# デプロイメントガイド

## 概要

Hariny（ハリネズミ健康管理アプリ）のデプロイメントガイドです。本番環境への安全なデプロイ手順を説明します。

## デプロイメント戦略

### 推奨プラットフォーム

- **Vercel**: メインプラットフォーム（Next.js 最適化）
- **Netlify**: 代替プラットフォーム
- **AWS Amplify**: エンタープライズ向け

### 環境構成

```
開発環境 (Development)
├── ローカル開発環境
└── ステージング環境

本番環境 (Production)
├── 本番環境
└── バックアップ環境
```

## Vercel デプロイメント

### 1. Vercel アカウントの準備

1. [Vercel](https://vercel.com/)でアカウントを作成
2. GitHub アカウントと連携
3. 新しいプロジェクトを作成

### 2. リポジトリの連携

```bash
# Vercel CLIをインストール
npm install -g vercel

# プロジェクトディレクトリでログイン
vercel login

# プロジェクトをリンク
vercel link
```

### 3. 環境変数の設定

Vercel ダッシュボードで以下の環境変数を設定：

```bash
# データベース設定
DATABASE_URL=postgresql://username:password@host:port/database

# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 認証設定
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key

# 画像アップロード設定
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# その他の設定
NODE_ENV=production
```

### 4. デプロイ設定

#### `vercel.json` の設定

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### `next.config.js` の設定

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化設定
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com"],
    formats: ["image/webp", "image/avif"],
  },

  // PWA設定
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // 環境変数の設定
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;
```

### 5. デプロイの実行

#### 自動デプロイ（推奨）

1. GitHub リポジトリにプッシュ
2. Vercel が自動的にデプロイを実行
3. デプロイ状況をダッシュボードで確認

#### 手動デプロイ

```bash
# 本番環境にデプロイ
vercel --prod

# プレビューデプロイ
vercel
```

### 6. ドメイン設定

1. Vercel ダッシュボードで「Domains」を選択
2. カスタムドメインを追加
3. DNS 設定を更新

```bash
# DNSレコード例
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.36
```

## データベースデプロイメント

### Supabase 設定

#### 1. プロジェクト作成

1. [Supabase](https://supabase.com/)でプロジェクトを作成
2. データベース URL と API キーを取得
3. 環境変数に設定

#### 2. スキーマデプロイ

```bash
# Supabase CLIをインストール
npm install -g supabase

# プロジェクトにログイン
supabase login

# プロジェクトをリンク
supabase link --project-ref your-project-ref

# マイグレーションを実行
supabase db push
```

#### 3. 初期データの投入

```sql
-- 初期データの投入
INSERT INTO users (email, name) VALUES
('admin@hariny.com', '管理者');

-- 設定データの投入
INSERT INTO app_settings (key, value) VALUES
('app_version', '1.0.0'),
('maintenance_mode', 'false');
```

## CI/CD パイプライン

### GitHub Actions 設定

#### `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Build application
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### 環境別デプロイ

#### ステージング環境

```yaml
# ステージング環境へのデプロイ
- name: Deploy to Staging
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_STAGING_PROJECT_ID }}
    vercel-args: "--target staging"
```

#### 本番環境

```yaml
# 本番環境へのデプロイ
- name: Deploy to Production
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    vercel-args: "--prod"
```

## セキュリティ設定

### 1. 環境変数の管理

```bash
# 機密情報は環境変数として管理
# .env.local ファイルはGitにコミットしない
echo ".env.local" >> .gitignore
```

### 2. HTTPS 設定

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};
```

### 3. CSP 設定

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

## パフォーマンス最適化

### 1. 画像最適化

```typescript
// next.config.js
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 2. バンドル最適化

```typescript
// next.config.js
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      };
    }
    return config;
  },
};
```

### 3. キャッシュ設定

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};
```

## 監視・ログ

### 1. エラー監視

#### Sentry 設定

```bash
# Sentryをインストール
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. パフォーマンス監視

#### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 3. ログ管理

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

## バックアップ・復旧

### 1. データベースバックアップ

```bash
# Supabaseバックアップ
supabase db dump --data-only > backup.sql

# 自動バックアップスクリプト
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
supabase db dump --data-only > backup_$DATE.sql
```

### 2. ファイルバックアップ

```bash
# 静的ファイルのバックアップ
aws s3 sync ./public s3://your-bucket/backups/$(date +%Y%m%d)/
```

### 3. 復旧手順

```bash
# データベース復旧
supabase db reset
psql -d your-database -f backup.sql

# ファイル復旧
aws s3 sync s3://your-bucket/backups/20240115/ ./public/
```

## トラブルシューティング

### よくある問題

#### 1. ビルドエラー

```bash
# 依存関係の確認
npm ci

# キャッシュのクリア
rm -rf .next
npm run build
```

#### 2. 環境変数エラー

```bash
# 環境変数の確認
vercel env ls

# 環境変数の追加
vercel env add DATABASE_URL
```

#### 3. データベース接続エラー

- データベース URL の確認
- ファイアウォール設定の確認
- SSL 設定の確認

#### 4. パフォーマンス問題

```bash
# バンドルサイズの分析
npm run build
npx @next/bundle-analyzer
```

## メンテナンス

### 1. 定期メンテナンス

```bash
# 依存関係の更新
npm update

# セキュリティチェック
npm audit

# 不要なファイルの削除
npm run clean
```

### 2. 監視ダッシュボード

- Vercel Analytics
- Sentry Error Tracking
- Supabase Dashboard
- Uptime Robot

### 3. アラート設定

```yaml
# GitHub Actions アラート
- name: Notify on failure
  if: failure()
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"Deployment failed!"}' \
    ${{ secrets.SLACK_WEBHOOK_URL }}
```

## 参考資料

- [Vercel 公式ドキュメント](https://vercel.com/docs)
- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Supabase 公式ドキュメント](https://supabase.com/docs)
- [GitHub Actions 公式ドキュメント](https://docs.github.com/en/actions)
