# デザインシステム

## 概要

Hariny（ハリネズミ健康管理アプリ）のデザインシステムです。一貫性のあるユーザー体験を提供するためのデザインガイドラインを定義しています。

## デザイン原則

### 1. ユーザー中心設計

- ハリネズミの飼育者にとって使いやすいインターフェース
- 直感的な操作と分かりやすい情報表示
- アクセシビリティを重視したデザイン

### 2. 温かみのあるデザイン

- ハリネズミをモチーフにした温かみのあるカラーパレット
- 丸みを帯びたデザイン要素
- 親しみやすいアイコンとイラスト

### 3. モバイルファースト

- スマートフォンでの使用を最優先
- タッチ操作に最適化された UI
- レスポンシブデザイン

## カラーパレット

### プライマリカラー

```css
/* メインカラー - ハリネズミの茶色 */
--hedgehog-brown: #8b4513;
--hedgehog-orange: #d2691e;

/* グラデーション */
--primary-gradient: linear-gradient(135deg, #d2691e 0%, #8b4513 100%);
```

### セカンダリカラー

```css
/* アクセントカラー */
--hedgehog-beige: #f5deb3;
--hedgehog-cream: #fff8dc;
--hedgehog-light: #faebd7;

/* 背景色 */
--background-primary: #fff8dc;
--background-secondary: #faebd7;
--background-tertiary: #f5deb3;
```

### 機能カラー

```css
/* 成功・健康 */
--success-primary: #10b981;
--success-light: #d1fae5;

/* 警告・注意 */
--warning-primary: #f59e0b;
--warning-light: #fef3c7;

/* エラー・危険 */
--error-primary: #ef4444;
--error-light: #fee2e2;

/* 情報 */
--info-primary: #3b82f6;
--info-light: #dbeafe;
```

### グレースケール

```css
/* テキストカラー */
--text-primary: #1f2937;
--text-secondary: #6b7280;
--text-tertiary: #9ca3af;

/* ボーダーカラー */
--border-primary: #e5e7eb;
--border-secondary: #d1d5db;
```

## タイポグラフィ

### フォントファミリー

```css
/* 日本語フォント */
font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  sans-serif;

/* 英語フォント */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### フォントサイズ

```css
/* 見出し */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
```

### フォントウェイト

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## スペーシング

### スケール

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

## ボーダーラジウス

```css
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem; /* 8px */
--radius-xl: 0.75rem; /* 12px */
--radius-2xl: 1rem; /* 16px */
--radius-3xl: 1.5rem; /* 24px */
--radius-full: 9999px;
```

## シャドウ

```css
/* 基本シャドウ */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* カスタムシャドウ */
--shadow-hedgehog: 0 4px 12px rgba(139, 69, 19, 0.15);
--shadow-card: 0 8px 25px rgba(0, 0, 0, 0.1);
```

## コンポーネント

### ボタン

#### プライマリボタン

```css
.hedgehog-button {
  @apply bg-gradient-to-r from-amber-500 to-orange-500 
         hover:from-amber-600 hover:to-orange-600 
         text-white font-medium py-3 px-6 
         rounded-xl transition-all duration-200 
         shadow-md hover:shadow-lg;
}
```

#### セカンダリボタン

```css
.button-secondary {
  @apply bg-white border-2 border-amber-200 
         text-amber-700 font-medium py-3 px-6 
         rounded-xl transition-all duration-200 
         hover:bg-amber-50 hover:border-amber-300;
}
```

#### アウトラインボタン

```css
.button-outline {
  @apply border-2 border-amber-200 
         text-amber-700 font-medium py-3 px-6 
         rounded-xl transition-all duration-200 
         hover:bg-amber-50;
}
```

### カード

#### 基本カード

```css
.hedgehog-card {
  @apply bg-white rounded-2xl shadow-lg 
         border border-amber-100 
         hover:shadow-xl transition-all duration-300;
}
```

#### インタラクティブカード

```css
.card-interactive {
  @apply hedgehog-card cursor-pointer 
         hover:scale-105 transition-transform duration-200;
}
```

### フォーム

#### 入力フィールド

```css
.input-field {
  @apply w-full px-4 py-3 border-2 border-amber-200 
         rounded-xl focus:border-amber-400 
         focus:ring-2 focus:ring-amber-200 
         transition-all duration-200;
}
```

#### ラベル

```css
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}
```

### ナビゲーション

#### ボトムナビゲーション

```css
.bottom-nav {
  @apply fixed bottom-0 left-0 right-0 
         bg-white/95 backdrop-blur-sm 
         border-t border-amber-100 z-50;
}
```

#### ナビゲーションアイテム

```css
.nav-item {
  @apply flex flex-col items-center justify-center 
         py-2 px-3 rounded-lg transition-all duration-200;
}

.nav-item-active {
  @apply bg-gradient-to-br from-amber-400 to-orange-500 
         text-white shadow-lg;
}

.nav-item-inactive {
  @apply text-gray-600 hover:text-amber-600 hover:bg-amber-50;
}
```

## アイコン

### アイコンライブラリ

- **Lucide React**: メインアイコンライブラリ
- **カスタムアイコン**: ハリネズミ専用アイコン

### アイコンサイズ

```css
--icon-xs: 0.75rem; /* 12px */
--icon-sm: 1rem; /* 16px */
--icon-md: 1.25rem; /* 20px */
--icon-lg: 1.5rem; /* 24px */
--icon-xl: 2rem; /* 32px */
--icon-2xl: 3rem; /* 48px */
```

### カスタムアイコン

#### ハリネズミアイコン

```tsx
export default function HedgehogIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5.5 3 1.5 4L6 14c-.5.5-.5 1.5 0 2s1.5.5 2 0l1.5-1.5c1 .5 2.5.5 3.5.5s2.5 0 3.5-.5L18 16c.5.5 1.5.5 2 0s.5-1.5 0-2l-1.5-2c1-1 1.5-2.5 1.5-4 0-3.5-2.5-6-6-6z" />
      <circle cx="10" cy="8" r="1" fill="currentColor" />
      <circle cx="14" cy="8" r="1" fill="currentColor" />
      <path d="M8 5c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2c.5.5 1.5.5 2 0s.5-1.5 0-2z" />
      <path d="M18 5c.5-.5.5-1.5 0-2s-1.5-.5-2 0-.5 1.5 0 2 1.5.5 2 0z" />
      <path d="M5 9c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2c.5.5 1.5.5 2 0s.5-1.5 0-2z" />
      <path d="M21 9c.5-.5.5-1.5 0-2s-1.5-.5-2 0-.5 1.5 0 2 1.5.5 2 0z" />
    </svg>
  );
}
```

## アニメーション

### トランジション

```css
/* 基本トランジション */
--transition-fast: 150ms ease-in-out;
--transition-normal: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;

/* カスタムトランジション */
.transition-hedgehog {
  @apply transition-all duration-200 ease-in-out;
}
```

### キーフレーム

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

## レスポンシブデザイン

### ブレークポイント

```css
/* モバイルファースト */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### レスポンシブユーティリティ

```css
/* コンテナ */
.container-responsive {
  @apply max-w-md mx-auto px-4;
}

/* グリッド */
.grid-responsive {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4;
}
```

## アクセシビリティ

### WCAG 2.1 AA 準拠

Hariny アプリケーションは、Web Content Accessibility Guidelines (WCAG) 2.1 AA レベルに準拠しています。

#### 1. 視覚的アクセシビリティ

##### コントラスト比

- **通常テキスト**: 4.5:1 以上
- **大きなテキスト**: 3:1 以上
- **UI 要素**: 3:1 以上

##### 色の使用

- 色のみで情報を伝えない
- 重要な情報は色以外の方法でも表現
- カラーユーザーにも配慮

#### 2. キーボードナビゲーション

##### フォーカス管理

```css
.focus-visible {
  @apply focus:outline-none focus:ring-2 
         focus:ring-amber-400 focus:ring-offset-2;
}
```

##### タブ順序

- 論理的なタブ順序
- スキップリンクの提供
- フォーカストラップの回避

#### 3. スクリーンリーダー対応

##### セマンティック HTML

```html
<!-- 適切な見出し構造 -->
<h1>メインページタイトル</h1>
<h2>セクションタイトル</h2>
<h3>サブセクションタイトル</h3>

<!-- 適切なラベル付け -->
<label for="pet-name">ペット名</label>
<input id="pet-name" type="text" aria-describedby="pet-name-help" />
<div id="pet-name-help">ペットの名前を入力してください</div>
```

##### ARIA 属性

```html
<!-- ボタンの状態 -->
<button aria-expanded="false" aria-controls="dropdown-menu">
  メニューを開く
</button>

<!-- 進捗状況 -->
<div
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
>
  75%
</div>
```

#### 4. モバイルアクセシビリティ

##### タッチターゲット

- 最小サイズ: 44x44px
- 適切な間隔: 8px 以上
- 誤タップ防止

##### ジェスチャー対応

- スワイプ、ピンチ、ズーム対応
- 代替操作手段の提供
- ホバー状態の代替

#### 5. 音声・動画コンテンツ

##### 代替テキスト

- 画像の alt 属性
- 動画の字幕・音声解説
- 音声コンテンツの文字起こし

#### 6. フォームアクセシビリティ

##### エラー処理

```html
<input type="email" aria-invalid="true" aria-describedby="email-error" />
<div id="email-error" role="alert">有効なメールアドレスを入力してください</div>
```

##### 必須フィールド

```html
<label for="required-field"> 必須項目 <span aria-label="必須">*</span> </label>
<input id="required-field" required aria-required="true" />
```

### スクリーンリーダー対応

```css
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden 
         whitespace-nowrap border-0;
}
```

### アクセシビリティテスト

#### 自動テスト

- axe-core を使用した自動テスト
- Lighthouse アクセシビリティ監査
- ESLint プラグインによる静的解析

#### 手動テスト

- キーボードナビゲーションテスト
- スクリーンリーダーテスト
- コントラスト比テスト
- モバイルアクセシビリティテスト

## ダークモード

### ダークモードカラー

```css
.dark {
  --background-primary: #1f2937;
  --background-secondary: #374151;
  --background-tertiary: #4b5563;

  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;

  --border-primary: #374151;
  --border-secondary: #4b5563;
}
```

## 実装ガイドライン

### CSS クラス命名規則

- **BEM 方式**: Block\_\_Element--Modifier
- **コンポーネント**: `hedgehog-` プレフィックス
- **ユーティリティ**: Tailwind CSS 準拠

### コンポーネント実装

```tsx
// 例：カードコンポーネント
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "hedgehog-card",
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
```

## デザイントークン

### 設計システムファイル

```typescript
// design-tokens.ts
export const designTokens = {
  colors: {
    primary: {
      brown: "#8B4513",
      orange: "#D2691E",
      beige: "#F5DEB3",
      cream: "#FFF8DC",
      light: "#FAEBD7",
    },
    // ... その他のカラー
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  // ... その他のトークン
};
```

## 品質保証

### デザインレビュー

- デザインシステム準拠の確認
- アクセシビリティチェック
- レスポンシブデザインテスト
- ブラウザ互換性テスト

### パフォーマンス

- CSS 最適化
- 画像最適化
- アニメーション最適化
- バンドルサイズ最適化
