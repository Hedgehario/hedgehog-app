'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Save, Utensils, Camera, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FoodRecordPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState('');
  const [recordTime, setRecordTime] = useState(new Date().toISOString().slice(0, 16));
  
  const [foodData, setFoodData] = useState({
    foodType: '',
    brand: '',
    amount: '',
    appetite: '',
    completionRate: [100],
    mealTime: '',
    temperature: '',
    freshness: '',
    notes: ''
  });

  const pets = [
    { id: 'momo', name: 'モモ' },
    { id: 'coco', name: 'ココ' }
  ];

  const foodTypes = [
    { id: 'pellets', name: 'ペレット（主食）' },
    { id: 'insects', name: '昆虫（ミルワーム・コオロギ）' },
    { id: 'vegetables', name: '野菜' },
    { id: 'fruits', name: '果物' },
    { id: 'treats', name: 'おやつ' },
    { id: 'supplements', name: 'サプリメント' }
  ];

  const mealTimes = [
    { id: 'morning', name: '朝食' },
    { id: 'afternoon', name: '昼食' },
    { id: 'evening', name: '夕食' },
    { id: 'night', name: '夜食' },
    { id: 'snack', name: 'おやつ' }
  ];

  const handleSave = () => {
    const recordData = {
      petId: selectedPet,
      type: 'food',
      recordedAt: recordTime,
      data: foodData
    };
    
    console.log('食事記録データ:', recordData);
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
                <Utensils className="w-5 h-5 mr-2 text-green-600" />
                食事記録
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

          {/* 食事の詳細 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">食事の詳細</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">食事の種類</Label>
                <Select value={foodData.foodType} onValueChange={(value) => setFoodData({...foodData, foodType: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="食事の種類を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {foodTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">食事の時間帯</Label>
                <Select value={foodData.mealTime} onValueChange={(value) => setFoodData({...foodData, mealTime: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="食事の時間帯を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTimes.map((time) => (
                      <SelectItem key={time.id} value={time.id}>
                        {time.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">ブランド・商品名</Label>
                <Input
                  placeholder="例：○○ペレット、△△ミルワーム"
                  value={foodData.brand}
                  onChange={(e) => setFoodData({...foodData, brand: e.target.value})}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">給餌量</Label>
                <Input
                  placeholder="例：大さじ1杯、10g、5匹"
                  value={foodData.amount}
                  onChange={(e) => setFoodData({...foodData, amount: e.target.value})}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">食欲</Label>
                <RadioGroup value={foodData.appetite} onValueChange={(value) => setFoodData({...foodData, appetite: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="appetite-excellent" />
                    <Label htmlFor="appetite-excellent" className="text-sm">とても良い</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="appetite-good" />
                    <Label htmlFor="appetite-good" className="text-sm">良い</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="appetite-fair" />
                    <Label htmlFor="appetite-fair" className="text-sm">普通</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="appetite-poor" />
                    <Label htmlFor="appetite-poor" className="text-sm">食欲がない</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  完食率: {foodData.completionRate[0]}%
                </Label>
                <Slider
                  value={foodData.completionRate}
                  onValueChange={(value) => setFoodData({...foodData, completionRate: value})}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">食べ物の温度</Label>
                <RadioGroup value={foodData.temperature} onValueChange={(value) => setFoodData({...foodData, temperature: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="room-temp" id="temp-room" />
                    <Label htmlFor="temp-room" className="text-sm">常温</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="warm" id="temp-warm" />
                    <Label htmlFor="temp-warm" className="text-sm">温かい</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cold" id="temp-cold" />
                    <Label htmlFor="temp-cold" className="text-sm">冷たい</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">食べ物の新鮮さ</Label>
                <RadioGroup value={foodData.freshness} onValueChange={(value) => setFoodData({...foodData, freshness: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fresh" id="fresh-fresh" />
                    <Label htmlFor="fresh-fresh" className="text-sm">新鮮</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="fresh-normal" />
                    <Label htmlFor="fresh-normal" className="text-sm">普通</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="old" id="fresh-old" />
                    <Label htmlFor="fresh-old" className="text-sm">古い</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  placeholder="食事の様子、好き嫌い、気になることなどを記録"
                  value={foodData.notes}
                  onChange={(e) => setFoodData({...foodData, notes: e.target.value})}
                  className="border-amber-200 focus:border-amber-400 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 写真追加 */}
          <Card className="hedgehog-card">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full h-16 border-2 border-dashed border-green-300 hover:bg-green-50">
                <Camera className="w-6 h-6 mr-2 text-green-600" />
                <span className="text-green-700">食事の写真を追加（任意）</span>
              </Button>
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="pt-4">
            <Button onClick={handleSave} className="hedgehog-button w-full h-12">
              <Save className="w-5 h-5 mr-2" />
              食事記録を保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}