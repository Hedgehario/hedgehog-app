'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Save, Droplets, Camera, Clock, Thermometer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WaterRecordPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState('');
  const [recordTime, setRecordTime] = useState(new Date().toISOString().slice(0, 16));
  
  const [waterData, setWaterData] = useState({
    amount: '',
    unit: 'ml',
    frequency: '',
    waterType: '',
    temperature: '',
    quality: '',
    containerType: '',
    location: '',
    behavior: '',
    notes: ''
  });

  const pets = [
    { id: 'momo', name: 'モモ' },
    { id: 'coco', name: 'ココ' }
  ];

  const waterTypes = [
    { id: 'tap', name: '水道水' },
    { id: 'filtered', name: 'ろ過水' },
    { id: 'bottled', name: 'ペットボトルの水' },
    { id: 'well', name: '井戸水' }
  ];

  const containerTypes = [
    { id: 'bottle', name: '給水ボトル' },
    { id: 'bowl', name: '水入れ皿' },
    { id: 'fountain', name: '自動給水器' },
    { id: 'other', name: 'その他' }
  ];

  const handleSave = () => {
    const recordData = {
      petId: selectedPet,
      type: 'water',
      recordedAt: recordTime,
      data: waterData
    };
    
    console.log('飲水記録データ:', recordData);
    router.push('/health');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/health">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-800 flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                飲水記録
              </h1>
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
          {/* ペット選択 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">ペット選択</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedPet} onValueChange={setSelectedPet}>
                <SelectTrigger className="border-amber-200">
                  <SelectValue placeholder="記録するペットを選択" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* 記録時刻 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                記録時刻
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="datetime-local"
                value={recordTime}
                onChange={(e) => setRecordTime(e.target.value)}
                className="border-amber-200 focus:border-amber-400"
              />
            </CardContent>
          </Card>

          {/* 飲水の詳細 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">飲水の詳細</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">飲水量</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="50"
                    value={waterData.amount}
                    onChange={(e) => setWaterData({...waterData, amount: e.target.value})}
                    className="border-amber-200 focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">単位</Label>
                  <Select value={waterData.unit} onValueChange={(value) => setWaterData({...waterData, unit: value})}>
                    <SelectTrigger className="border-amber-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="cc">cc</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">飲水頻度</Label>
                <RadioGroup value={waterData.frequency} onValueChange={(value) => setWaterData({...waterData, frequency: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="frequency-frequent" />
                    <Label htmlFor="frequency-frequent" className="text-sm">頻繁（1時間に数回）</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="frequency-normal" />
                    <Label htmlFor="frequency-normal" className="text-sm">普通（数時間に1回）</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rare" id="frequency-rare" />
                    <Label htmlFor="frequency-rare" className="text-sm">少ない（半日に1回以下）</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">水の種類</Label>
                <Select value={waterData.waterType} onValueChange={(value) => setWaterData({...waterData, waterType: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="水の種類を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {waterTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">水温</Label>
                <RadioGroup value={waterData.temperature} onValueChange={(value) => setWaterData({...waterData, temperature: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cold" id="temp-cold" />
                    <Label htmlFor="temp-cold" className="text-sm">冷たい</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="room-temp" id="temp-room" />
                    <Label htmlFor="temp-room" className="text-sm">常温</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="warm" id="temp-warm" />
                    <Label htmlFor="temp-warm" className="text-sm">ぬるい</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">水の品質</Label>
                <RadioGroup value={waterData.quality} onValueChange={(value) => setWaterData({...waterData, quality: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fresh" id="quality-fresh" />
                    <Label htmlFor="quality-fresh" className="text-sm">新鮮</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="quality-normal" />
                    <Label htmlFor="quality-normal" className="text-sm">普通</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dirty" id="quality-dirty" />
                    <Label htmlFor="quality-dirty" className="text-sm">汚れている</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">給水容器</Label>
                <Select value={waterData.containerType} onValueChange={(value) => setWaterData({...waterData, containerType: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="給水容器を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerTypes.map((container) => (
                      <SelectItem key={container.id} value={container.id}>
                        {container.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">設置場所</Label>
                <Input
                  placeholder="例：ケージ左側、隠れ家の近く"
                  value={waterData.location}
                  onChange={(e) => setWaterData({...waterData, location: e.target.value})}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">飲水時の行動</Label>
                <RadioGroup value={waterData.behavior} onValueChange={(value) => setWaterData({...waterData, behavior: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="behavior-normal" />
                    <Label htmlFor="behavior-normal" className="text-sm">普通に飲む</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eager" id="behavior-eager" />
                    <Label htmlFor="behavior-eager" className="text-sm">がぶがぶ飲む</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hesitant" id="behavior-hesitant" />
                    <Label htmlFor="behavior-hesitant" className="text-sm">恐る恐る飲む</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reluctant" id="behavior-reluctant" />
                    <Label htmlFor="behavior-reluctant" className="text-sm">あまり飲みたがらない</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  placeholder="飲水の様子、気になることなどを記録"
                  value={waterData.notes}
                  onChange={(e) => setWaterData({...waterData, notes: e.target.value})}
                  className="border-amber-200 focus:border-amber-400 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 写真追加 */}
          <Card className="hedgehog-card">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full h-16 border-2 border-dashed border-blue-300 hover:bg-blue-50">
                <Camera className="w-6 h-6 mr-2 text-blue-600" />
                <span className="text-blue-700">飲水の写真を追加（任意）</span>
              </Button>
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="pt-4">
            <Button onClick={handleSave} className="hedgehog-button w-full h-12">
              <Save className="w-5 h-5 mr-2" />
              飲水記録を保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}