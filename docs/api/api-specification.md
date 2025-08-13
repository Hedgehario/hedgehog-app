# API 仕様書

## 概要

Hariny（ハリネズミ健康管理アプリ）の API 仕様書です。

## 基本情報

- **ベース URL**: `https://api.hariny.app/v1`
- **認証方式**: Bearer Token (JWT)
- **データ形式**: JSON
- **文字エンコーディング**: UTF-8

## 認証

### 認証ヘッダー

```http
Authorization: Bearer <jwt_token>
```

### JWT トークンの構造

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "iat": 1642234567,
  "exp": 1642320967
}
```

## エラーレスポンス

### エラーレスポンス形式

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": {
      "field": "エラーが発生したフィールド",
      "value": "問題のある値"
    }
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### エラーコード一覧

| コード             | HTTP ステータス | 説明                   |
| ------------------ | --------------- | ---------------------- |
| `UNAUTHORIZED`     | 401             | 認証が必要             |
| `FORBIDDEN`        | 403             | アクセス権限なし       |
| `NOT_FOUND`        | 404             | リソースが見つからない |
| `VALIDATION_ERROR` | 422             | バリデーションエラー   |
| `INTERNAL_ERROR`   | 500             | 内部サーバーエラー     |

## エンドポイント一覧

### ユーザー管理

#### 1. ユーザー登録

```http
POST /auth/register
```

**リクエスト**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "ユーザー名"
}
```

**レスポンス**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "ユーザー名",
    "created_at": "2024-01-15T10:00:00Z"
  },
  "token": "jwt_token"
}
```

#### 2. ユーザーログイン

```http
POST /auth/login
```

**リクエスト**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**レスポンス**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "ユーザー名",
    "created_at": "2024-01-15T10:00:00Z"
  },
  "token": "jwt_token"
}
```

#### 3. ユーザー情報取得

```http
GET /users/me
```

**レスポンス**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "ユーザー名",
    "avatar_url": "https://example.com/avatar.jpg",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

### ペット管理

#### 1. ペット一覧取得

```http
GET /pets
```

**クエリパラメータ**

- `limit` (optional): 取得件数 (default: 20, max: 100)
- `offset` (optional): オフセット (default: 0)
- `active` (optional): アクティブなペットのみ (true/false)

**レスポンス**

```json
{
  "pets": [
    {
      "id": "uuid",
      "name": "モモ",
      "gender": "female",
      "birth_date": "2023-03-15",
      "adopt_date": "2023-04-01",
      "breed": "アフリカンピグミー",
      "color": "ソルト&ペッパー",
      "photo_url": "https://example.com/photo.jpg",
      "health_status": {
        "currentStatus": "healthy",
        "lastCheckup": "2024-01-15T10:00:00Z"
      },
      "insurance": "アニコム ペット保険",
      "is_active": true,
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

#### 2. ペット詳細取得

```http
GET /pets/{pet_id}
```

**レスポンス**

```json
{
  "pet": {
    "id": "uuid",
    "name": "モモ",
    "gender": "female",
    "birth_date": "2023-03-15",
    "adopt_date": "2023-04-01",
    "breed": "アフリカンピグミー",
    "color": "ソルト&ペッパー",
    "photo_url": "https://example.com/photo.jpg",
    "health_status": {
      "currentStatus": "healthy",
      "lastCheckup": "2024-01-15T10:00:00Z",
      "vaccinations": [
        {
          "name": "混合ワクチン",
          "date": "2024-01-10",
          "nextDue": "2025-01-10"
        }
      ]
    },
    "insurance": "アニコム ペット保険",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z",
    "latest_weight": 320.5,
    "latest_weight_date": "2024-01-15T10:00:00Z",
    "photo_count": 15
  }
}
```

#### 3. ペット作成

```http
POST /pets
```

**リクエスト**

```json
{
  "name": "モモ",
  "gender": "female",
  "birth_date": "2023-03-15",
  "adopt_date": "2023-04-01",
  "breed": "アフリカンピグミー",
  "color": "ソルト&ペッパー",
  "photo_url": "https://example.com/photo.jpg",
  "insurance": "アニコム ペット保険"
}
```

**レスポンス**

```json
{
  "pet": {
    "id": "uuid",
    "name": "モモ",
    "gender": "female",
    "birth_date": "2023-03-15",
    "adopt_date": "2023-04-01",
    "breed": "アフリカンピグミー",
    "color": "ソルト&ペッパー",
    "photo_url": "https://example.com/photo.jpg",
    "health_status": {},
    "insurance": "アニコム ペット保険",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

#### 4. ペット更新

```http
PUT /pets/{pet_id}
```

**リクエスト**

```json
{
  "name": "モモ",
  "gender": "female",
  "birth_date": "2023-03-15",
  "adopt_date": "2023-04-01",
  "breed": "アフリカンピグミー",
  "color": "ソルト&ペッパー",
  "photo_url": "https://example.com/photo.jpg",
  "insurance": "アニコム ペット保険"
}
```

**レスポンス**

```json
{
  "pet": {
    "id": "uuid",
    "name": "モモ",
    "gender": "female",
    "birth_date": "2023-03-15",
    "adopt_date": "2023-04-01",
    "breed": "アフリカンピグミー",
    "color": "ソルト&ペッパー",
    "photo_url": "https://example.com/photo.jpg",
    "health_status": {},
    "insurance": "アニコム ペット保険",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

#### 5. ペット削除

```http
DELETE /pets/{pet_id}
```

**レスポンス**

```json
{
  "message": "ペットが削除されました"
}
```

### 健康記録管理

#### 1. 健康記録一覧取得

```http
GET /pets/{pet_id}/health-records
```

**クエリパラメータ**

- `type` (optional): 記録タイプ (checkup, food, water, activity, medication, vet_visit)
- `limit` (optional): 取得件数 (default: 20, max: 100)
- `offset` (optional): オフセット (default: 0)
- `start_date` (optional): 開始日 (YYYY-MM-DD)
- `end_date` (optional): 終了日 (YYYY-MM-DD)

**レスポンス**

```json
{
  "health_records": [
    {
      "id": "uuid",
      "pet_id": "uuid",
      "type": "checkup",
      "data": {
        "eyes": {
          "condition": "clear",
          "discharge": false,
          "cloudiness": false,
          "redness": false,
          "notes": ""
        },
        "ears": {
          "condition": "clean",
          "discharge": false,
          "odor": false,
          "scratching": false,
          "notes": ""
        },
        "overall": {
          "healthStatus": "good",
          "concerns": "",
          "notes": ""
        }
      },
      "recorded_at": "2024-01-15T10:00:00Z",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

#### 2. 健康記録作成

```http
POST /pets/{pet_id}/health-records
```

**リクエスト**

```json
{
  "type": "checkup",
  "data": {
    "eyes": {
      "condition": "clear",
      "discharge": false,
      "cloudiness": false,
      "redness": false,
      "notes": ""
    },
    "ears": {
      "condition": "clean",
      "discharge": false,
      "odor": false,
      "scratching": false,
      "notes": ""
    },
    "overall": {
      "healthStatus": "good",
      "concerns": "",
      "notes": ""
    }
  },
  "recorded_at": "2024-01-15T10:00:00Z"
}
```

**レスポンス**

```json
{
  "health_record": {
    "id": "uuid",
    "pet_id": "uuid",
    "type": "checkup",
    "data": {
      "eyes": {
        "condition": "clear",
        "discharge": false,
        "cloudiness": false,
        "redness": false,
        "notes": ""
      },
      "ears": {
        "condition": "clean",
        "discharge": false,
        "odor": false,
        "scratching": false,
        "notes": ""
      },
      "overall": {
        "healthStatus": "good",
        "concerns": "",
        "notes": ""
      }
    },
    "recorded_at": "2024-01-15T10:00:00Z",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

### 体重記録管理

#### 1. 体重記録一覧取得

```http
GET /pets/{pet_id}/weight-records
```

**クエリパラメータ**

- `limit` (optional): 取得件数 (default: 20, max: 100)
- `offset` (optional): オフセット (default: 0)
- `start_date` (optional): 開始日 (YYYY-MM-DD)
- `end_date` (optional): 終了日 (YYYY-MM-DD)

**レスポンス**

```json
{
  "weight_records": [
    {
      "id": "uuid",
      "pet_id": "uuid",
      "weight": 320.5,
      "unit": "g",
      "recorded_at": "2024-01-15T10:00:00Z",
      "notes": "週1回の定期測定",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

#### 2. 体重記録作成

```http
POST /pets/{pet_id}/weight-records
```

**リクエスト**

```json
{
  "weight": 320.5,
  "unit": "g",
  "recorded_at": "2024-01-15T10:00:00Z",
  "notes": "週1回の定期測定"
}
```

**レスポンス**

```json
{
  "weight_record": {
    "id": "uuid",
    "pet_id": "uuid",
    "weight": 320.5,
    "unit": "g",
    "recorded_at": "2024-01-15T10:00:00Z",
    "notes": "週1回の定期測定",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

### 投薬記録管理

#### 1. 投薬記録一覧取得

```http
GET /pets/{pet_id}/medication-records
```

**クエリパラメータ**

- `limit` (optional): 取得件数 (default: 20, max: 100)
- `offset` (optional): オフセット (default: 0)
- `status` (optional): ステータス (active, completed, discontinued)
- `start_date` (optional): 開始日 (YYYY-MM-DD)
- `end_date` (optional): 終了日 (YYYY-MM-DD)

**レスポンス**

```json
{
  "medication_records": [
    {
      "id": "uuid",
      "pet_id": "uuid",
      "medication_name": "抗生物質",
      "dosage": "0.1ml",
      "frequency": "1日2回",
      "started_at": "2024-01-15T10:00:00Z",
      "ended_at": "2024-01-22T10:00:00Z",
      "status": "active",
      "notes": "食後に投与",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

#### 2. 投薬記録作成

```http
POST /pets/{pet_id}/medication-records
```

**リクエスト**

```json
{
  "medication_name": "抗生物質",
  "dosage": "0.1ml",
  "frequency": "1日2回",
  "started_at": "2024-01-15T10:00:00Z",
  "ended_at": "2024-01-22T10:00:00Z",
  "status": "active",
  "notes": "食後に投与"
}
```

**レスポンス**

```json
{
  "medication_record": {
    "id": "uuid",
    "pet_id": "uuid",
    "medication_name": "抗生物質",
    "dosage": "0.1ml",
    "frequency": "1日2回",
    "started_at": "2024-01-15T10:00:00Z",
    "ended_at": "2024-01-22T10:00:00Z",
    "status": "active",
    "notes": "食後に投与",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

#### 3. 投薬記録更新

```http
PUT /medication-records/{id}
```

**リクエスト**

```json
{
  "medication_name": "抗生物質",
  "dosage": "0.1ml",
  "frequency": "1日2回",
  "started_at": "2024-01-15T10:00:00Z",
  "ended_at": "2024-01-22T10:00:00Z",
  "status": "completed",
  "notes": "食後に投与、完了"
}
```

**レスポンス**

```json
{
  "medication_record": {
    "id": "uuid",
    "pet_id": "uuid",
    "medication_name": "抗生物質",
    "dosage": "0.1ml",
    "frequency": "1日2回",
    "started_at": "2024-01-15T10:00:00Z",
    "ended_at": "2024-01-22T10:00:00Z",
    "status": "completed",
    "notes": "食後に投与、完了",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

#### 4. 投薬記録削除

```http
DELETE /medication-records/{id}
```

**レスポンス**

```json
{
  "message": "投薬記録が削除されました"
}
```

### 写真管理

#### 1. 写真一覧取得

```http
GET /pets/{pet_id}/photos
```

**クエリパラメータ**

- `limit` (optional): 取得件数 (default: 20, max: 100)
- `offset` (optional): オフセット (default: 0)
- `tags` (optional): タグでフィルタ (カンマ区切り)

**レスポンス**

```json
{
  "photos": [
    {
      "id": "uuid",
      "pet_id": "uuid",
      "url": "https://example.com/photo.jpg",
      "description": "今日の体重測定。320gで安定しています。",
      "tags": ["体重測定", "健康チェック"],
      "taken_at": "2024-01-15T10:00:00Z",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

#### 2. 写真アップロード

```http
POST /pets/{pet_id}/photos
```

**リクエスト** (multipart/form-data)

```
photo: [ファイル]
description: "今日の体重測定。320gで安定しています。"
tags: "体重測定,健康チェック"
taken_at: "2024-01-15T10:00:00Z"
```

**レスポンス**

```json
{
  "photo": {
    "id": "uuid",
    "pet_id": "uuid",
    "url": "https://example.com/photo.jpg",
    "description": "今日の体重測定。320gで安定しています。",
    "tags": ["体重測定", "健康チェック"],
    "taken_at": "2024-01-15T10:00:00Z",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

### イベント管理

#### 1. イベント一覧取得

```http
GET /events
```

**クエリパラメータ**

- `pet_id` (optional): ペット ID でフィルタ
- `type` (optional): イベントタイプでフィルタ
- `status` (optional): ステータスでフィルタ
- `start_date` (optional): 開始日 (YYYY-MM-DD)
- `end_date` (optional): 終了日 (YYYY-MM-DD)
- `limit` (optional): 取得件数 (default: 20, max: 100)
- `offset` (optional): オフセット (default: 0)

**レスポンス**

```json
{
  "events": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "pet_id": "uuid",
      "pet_name": "モモ",
      "title": "定期健診",
      "description": "かかりつけ動物病院での健康診断",
      "type": "vet",
      "priority": "high",
      "scheduled_at": "2024-01-20T10:00:00Z",
      "status": "scheduled",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

#### 2. イベント作成

```http
POST /events
```

**リクエスト**

```json
{
  "pet_id": "uuid",
  "title": "定期健診",
  "description": "かかりつけ動物病院での健康診断",
  "type": "vet",
  "priority": "high",
  "scheduled_at": "2024-01-20T10:00:00Z"
}
```

**レスポンス**

```json
{
  "event": {
    "id": "uuid",
    "user_id": "uuid",
    "pet_id": "uuid",
    "title": "定期健診",
    "description": "かかりつけ動物病院での健康診断",
    "type": "vet",
    "priority": "high",
    "scheduled_at": "2024-01-20T10:00:00Z",
    "status": "scheduled",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

## レート制限

### 制限内容

- **認証なし**: 100 requests/hour
- **認証あり**: 1000 requests/hour
- **ファイルアップロード**: 10 requests/hour

### レスポンスヘッダー

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642320967
```

## Webhook

### Webhook 設定

```http
POST /webhooks
```

**リクエスト**

```json
{
  "url": "https://example.com/webhook",
  "events": [
    "health_record.created",
    "weight_record.created",
    "event.scheduled"
  ]
}
```

### Webhook ペイロード例

```json
{
  "event": "health_record.created",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "id": "uuid",
    "pet_id": "uuid",
    "type": "checkup",
    "recorded_at": "2024-01-15T10:00:00Z"
  }
}
```

## SDK・ライブラリ

### TypeScript/JavaScript

```bash
npm install @hariny/api-client
```

```typescript
import { HarinyClient } from "@hariny/api-client";

const client = new HarinyClient({
  baseUrl: "https://api.hariny.app/v1",
  token: "your-jwt-token",
});

// ペット一覧取得
const pets = await client.pets.list();

// 健康記録作成
const record = await client.healthRecords.create(petId, {
  type: "checkup",
  data: {
    /* ... */
  },
});
```

## 変更履歴

| バージョン | 日付       | 変更内容       |
| ---------- | ---------- | -------------- |
| 1.0.0      | 2024-01-15 | 初期版リリース |
