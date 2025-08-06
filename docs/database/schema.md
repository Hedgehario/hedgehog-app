# テーブル定義

## 概要

Hariny アプリケーションで使用するデータベースのテーブル定義です。

## スキーマ定義

### 1. users テーブル

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_users_email ON users(email);

-- トリガー（updated_at自動更新）
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 2. pets テーブル

```sql
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    birth_date DATE,
    adopt_date DATE,
    breed VARCHAR(100),
    color VARCHAR(100),
    photo_url TEXT,
    health_status JSONB DEFAULT '{}',
    insurance VARCHAR(200),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_pets_user_id ON pets(user_id);
CREATE INDEX idx_pets_is_active ON pets(is_active);

-- トリガー
CREATE TRIGGER update_pets_updated_at
    BEFORE UPDATE ON pets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 3. health_records テーブル

```sql
CREATE TABLE health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('checkup', 'food', 'water', 'activity', 'medication', 'vet_visit')),
    data JSONB NOT NULL DEFAULT '{}',
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_health_records_pet_id ON health_records(pet_id);
CREATE INDEX idx_health_records_type ON health_records(type);
CREATE INDEX idx_health_records_recorded_at ON health_records(recorded_at);
CREATE INDEX idx_health_records_pet_type ON health_records(pet_id, type);

-- トリガー
CREATE TRIGGER update_health_records_updated_at
    BEFORE UPDATE ON health_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 4. weight_records テーブル

```sql
CREATE TABLE weight_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    weight DECIMAL(5,2) NOT NULL CHECK (weight > 0),
    unit VARCHAR(10) DEFAULT 'g' CHECK (unit IN ('g', 'kg')),
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_weight_records_pet_id ON weight_records(pet_id);
CREATE INDEX idx_weight_records_recorded_at ON weight_records(recorded_at);
CREATE INDEX idx_weight_records_pet_date ON weight_records(pet_id, recorded_at);
```

### 5. medication_records テーブル

```sql
CREATE TABLE medication_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    medication_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'discontinued')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_medication_records_pet_id ON medication_records(pet_id);
CREATE INDEX idx_medication_records_status ON medication_records(status);
CREATE INDEX idx_medication_records_started_at ON medication_records(started_at);
CREATE INDEX idx_medication_records_pet_status ON medication_records(pet_id, status);

-- トリガー
CREATE TRIGGER update_medication_records_updated_at
    BEFORE UPDATE ON medication_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 6. photos テーブル

```sql
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]',
    taken_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_photos_pet_id ON photos(pet_id);
CREATE INDEX idx_photos_taken_at ON photos(taken_at);
CREATE INDEX idx_photos_tags ON photos USING GIN (tags);
```

### 6. events テーブル

```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('health', 'vet', 'grooming', 'cleaning', 'reminder')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'pending', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_pet_id ON events(pet_id);
CREATE INDEX idx_events_scheduled_at ON events(scheduled_at);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_user_status ON events(user_id, status);

-- トリガー
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## ビュー定義

### 1. pet_summary ビュー

ペットの基本情報と最新の健康状態を表示するビュー

```sql
CREATE VIEW pet_summary AS
SELECT
    p.id,
    p.user_id,
    p.name,
    p.gender,
    p.birth_date,
    p.adopt_date,
    p.breed,
    p.color,
    p.photo_url,
    p.health_status,
    p.insurance,
    p.is_active,
    p.created_at,
    p.updated_at,
    -- 最新の体重
    (SELECT weight FROM weight_records wr
     WHERE wr.pet_id = p.id
     ORDER BY recorded_at DESC LIMIT 1) as latest_weight,
    -- 最新の体重記録日
    (SELECT recorded_at FROM weight_records wr
     WHERE wr.pet_id = p.id
     ORDER BY recorded_at DESC LIMIT 1) as latest_weight_date,
    -- 最新の健康記録日
    (SELECT recorded_at FROM health_records hr
     WHERE hr.pet_id = p.id
     ORDER BY recorded_at DESC LIMIT 1) as latest_health_record_date,
    -- アクティブな投薬記録数
    (SELECT COUNT(*) FROM medication_records mr
     WHERE mr.pet_id = p.id AND mr.status = 'active') as active_medications,
    -- 最新の投薬記録日
    (SELECT started_at FROM medication_records mr
     WHERE mr.pet_id = p.id
     ORDER BY started_at DESC LIMIT 1) as latest_medication_date
FROM pets p
WHERE p.is_active = true;
```

### 2. health_records_summary ビュー

健康記録のサマリーを表示するビュー

```sql
CREATE VIEW health_records_summary AS
SELECT
    hr.id,
    hr.pet_id,
    p.name as pet_name,
    hr.type,
    hr.data,
    hr.recorded_at,
    hr.created_at,
    -- 記録タイプの日本語名
    CASE hr.type
        WHEN 'checkup' THEN '健康チェック'
        WHEN 'food' THEN '食事記録'
        WHEN 'water' THEN '飲水記録'
        WHEN 'activity' THEN '活動記録'
        WHEN 'medication' THEN '投薬記録'
        WHEN 'vet_visit' THEN '通院記録'
        ELSE hr.type
    END as type_name
FROM health_records hr
JOIN pets p ON hr.pet_id = p.id
ORDER BY hr.recorded_at DESC;
```

### 3. upcoming_events ビュー

今後の予定を表示するビュー

```sql
CREATE VIEW upcoming_events AS
SELECT
    e.id,
    e.user_id,
    e.pet_id,
    p.name as pet_name,
    e.title,
    e.description,
    e.type,
    e.priority,
    e.scheduled_at,
    e.status,
    e.created_at,
    -- 予定までの日数
    EXTRACT(DAY FROM (e.scheduled_at - NOW())) as days_until,
    -- イベントタイプの日本語名
    CASE e.type
        WHEN 'health' THEN '健康記録'
        WHEN 'vet' THEN '通院'
        WHEN 'grooming' THEN 'グルーミング'
        WHEN 'cleaning' THEN '掃除'
        WHEN 'reminder' THEN 'リマインダー'
        ELSE e.type
    END as type_name
FROM events e
LEFT JOIN pets p ON e.pet_id = p.id
WHERE e.scheduled_at >= NOW()
  AND e.status IN ('scheduled', 'pending')
ORDER BY e.scheduled_at ASC;
```

## 関数定義

### 1. ペットの年齢計算関数

```sql
CREATE OR REPLACE FUNCTION calculate_pet_age(birth_date DATE)
RETURNS TEXT AS $$
DECLARE
    age_months INTEGER;
    age_days INTEGER;
    result TEXT;
BEGIN
    IF birth_date IS NULL THEN
        RETURN '不明';
    END IF;

    age_months := EXTRACT(YEAR FROM AGE(NOW(), birth_date)) * 12 +
                   EXTRACT(MONTH FROM AGE(NOW(), birth_date));
    age_days := EXTRACT(DAY FROM AGE(NOW(), birth_date));

    IF age_months > 0 THEN
        result := age_months || 'ヶ月';
        IF age_days > 0 THEN
            result := result || age_days || '日';
        END IF;
    ELSE
        result := age_days || '日';
    END IF;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
```

### 2. 健康記録の統計関数

```sql
CREATE OR REPLACE FUNCTION get_health_stats(pet_uuid UUID, days_back INTEGER DEFAULT 30)
RETURNS TABLE(
    record_count BIGINT,
    last_record_date TIMESTAMP WITH TIME ZONE,
    avg_weight DECIMAL,
    weight_trend TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(hr.id) as record_count,
        MAX(hr.recorded_at) as last_record_date,
        AVG(wr.weight) as avg_weight,
        CASE
            WHEN COUNT(wr.id) >= 2 THEN
                CASE
                    WHEN MAX(wr.weight) - MIN(wr.weight) > 0 THEN '増加'
                    WHEN MAX(wr.weight) - MIN(wr.weight) < 0 THEN '減少'
                    ELSE '安定'
                END
            ELSE 'データ不足'
        END as weight_trend
    FROM pets p
    LEFT JOIN health_records hr ON p.id = hr.pet_id
        AND hr.recorded_at >= NOW() - INTERVAL '1 day' * days_back
    LEFT JOIN weight_records wr ON p.id = wr.pet_id
        AND wr.recorded_at >= NOW() - INTERVAL '1 day' * days_back
    WHERE p.id = pet_uuid
    GROUP BY p.id;
END;
$$ LANGUAGE plpgsql;
```

## 制約・ルール

### チェック制約

```sql
-- 体重の妥当性チェック
ALTER TABLE weight_records ADD CONSTRAINT chk_weight_positive
CHECK (weight > 0 AND weight < 10000);

-- 日付の妥当性チェック
ALTER TABLE pets ADD CONSTRAINT chk_birth_date_valid
CHECK (birth_date IS NULL OR birth_date <= CURRENT_DATE);

ALTER TABLE pets ADD CONSTRAINT chk_adopt_date_valid
CHECK (adopt_date IS NULL OR adopt_date <= CURRENT_DATE);

-- スケジュール日時の妥当性チェック
ALTER TABLE events ADD CONSTRAINT chk_scheduled_at_future
CHECK (scheduled_at >= created_at);
```

### トリガー

```sql
-- 健康記録作成時のペット健康状態更新
CREATE OR REPLACE FUNCTION update_pet_health_status()
RETURNS TRIGGER AS $$
BEGIN
    -- 最新の健康記録に基づいてペットの健康状態を更新
    UPDATE pets
    SET health_status = jsonb_set(
        COALESCE(health_status, '{}'),
        '{lastCheckup}',
        to_jsonb(NEW.recorded_at)
    )
    WHERE id = NEW.pet_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_pet_health_status
    AFTER INSERT OR UPDATE ON health_records
    FOR EACH ROW
    EXECUTE FUNCTION update_pet_health_status();
```

## パフォーマンス最適化

### パーティショニング戦略

```sql
-- 健康記録テーブルのパーティショニング（月別）
CREATE TABLE health_records_2024_01 PARTITION OF health_records
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE health_records_2024_02 PARTITION OF health_records
FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- 同様に他の月も作成
```

### 統計情報の更新

```sql
-- 定期的な統計情報更新
ANALYZE users;
ANALYZE pets;
ANALYZE health_records;
ANALYZE weight_records;
ANALYZE photos;
ANALYZE events;
```

## セキュリティ設定

### Row Level Security (RLS)

```sql
-- ユーザー別データアクセス制御
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- ポリシー定義
CREATE POLICY "Users can view own pets" ON pets
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own pets" ON pets
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own pets" ON pets
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own pets" ON pets
    FOR DELETE USING (user_id = auth.uid());

-- 同様に他のテーブルにもポリシーを設定
```
