'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Camera, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewPetPage() {
  const router = useRouter();
  const [petData, setPetData] = useState({
    name: '',
    gender: '',
    birthDate: '',
    adoptDate: '',
    breed: '',
    color: '',
    photoUrl: '',
    insurance: '',
    adoptionStore: '',
    storeLocation: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setPetData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // ここでSupabaseに保存する処理を実装
    console.log('ペットデータ:', petData);
    router.push('/pets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/pets">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-800">新しい子を登録</h1>
            </div>
            <Button onClick={handleSave} className="hedgehog-button">
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 写真アップロード */}
          <Card className="hedgehog-card">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-dashed border-amber-300">
                  <Camera className="w-12 h-12 text-amber-600" />
                </div>
                <Button variant="outline" className="border-amber-200 hover:bg-amber-50">
                  <Camera className="w-4 h-4 mr-2" />
                  写真を追加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 基本情報 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  名前 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="ペットの名前を入力"
                  value={petData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2 block">
                  性別 <span className="text-red-500">*</span>
                </Label>
                <Select value={petData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="性別を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">オス</SelectItem>
                    <SelectItem value="female">メス</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700 mb-2 block">
                    誕生日
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={petData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="border-amber-200 focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label htmlFor="adoptDate" className="text-sm font-medium text-gray-700 mb-2 block">
                    お迎え日
                  </Label>
                  <Input
                    id="adoptDate"
                    type="date"
                    value={petData.adoptDate}
                    onChange={(e) => handleInputChange('adoptDate', e.target.value)}
                    className="border-amber-200 focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="breed" className="text-sm font-medium text-gray-700 mb-2 block">
                  品種
                </Label>
                <Select value={petData.breed} onValueChange={(value) => handleInputChange('breed', value)}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="品種を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="african-pygmy">アフリカンピグミー</SelectItem>
                    <SelectItem value="european">ヨーロピアン</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="color" className="text-sm font-medium text-gray-700 mb-2 block">
                  カラー
                </Label>
                <Select value={petData.color} onValueChange={(value) => handleInputChange('color', value)}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="カラーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salt-pepper">ソルト&ペッパー</SelectItem>
                    <SelectItem value="cinnamon">シナモン</SelectItem>
                    <SelectItem value="chocolate">チョコレート</SelectItem>
                    <SelectItem value="cream">クリーム</SelectItem>
                    <SelectItem value="albino">アルビノ</SelectItem>
                    <SelectItem value="pinto">パイント</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* お迎え情報 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                お迎え情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adoptionStore" className="text-sm font-medium text-gray-700 mb-2 block">
                  お迎え店舗名
                </Label>
                <Input
                  id="adoptionStore"
                  placeholder="ペットショップ名やブリーダー名"
                  value={petData.adoptionStore}
                  onChange={(e) => handleInputChange('adoptionStore', e.target.value)}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label htmlFor="storeLocation" className="text-sm font-medium text-gray-700 mb-2 block">
                  店舗所在地
                </Label>
                <Input
                  id="storeLocation"
                  placeholder="都道府県・市区町村"
                  value={petData.storeLocation}
                  onChange={(e) => handleInputChange('storeLocation', e.target.value)}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* その他の情報 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">その他の情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="insurance" className="text-sm font-medium text-gray-700 mb-2 block">
                  ペット保険
                </Label>
                <Input
                  id="insurance"
                  placeholder="保険会社名・プラン名"
                  value={petData.insurance}
                  onChange={(e) => handleInputChange('insurance', e.target.value)}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
                  メモ
                </Label>
                <Textarea
                  id="notes"
                  placeholder="特徴や性格、注意事項など"
                  value={petData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="border-amber-200 focus:border-amber-400 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="pt-4">
            <Button onClick={handleSave} className="hedgehog-button w-full h-12">
              <Save className="w-5 h-5 mr-2" />
              新しい子を登録
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}