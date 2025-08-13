'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Save, Weight, Camera, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WeightRecordPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState('');
  const [recordTime, setRecordTime] = useState(new Date().toISOString().slice(0, 16));
  
  const [weightData, setWeightData] = useState({
    weight: '',
    unit: 'g',
    previousWeight: '',
    condition: '',
    measurementMethod: '',
    environment: '',
    timeOfDay: '',
    beforeAfterMeal: '',
    notes: ''
  });

  const pets = [
    { id: 'momo', name: 'モモ', lastWeight: '320g' },
    { id: 'coco', name: 'ココ', lastWeight: '380g' }
  ];

  const measurementMethods = [
    { id: 'digital-scale', name: 'デジタル体重計' },
    { id: 'kitchen-scale', name: 'キッチンスケール' },
    { id: 'pet-scale', name: 'ペット用体重計' },
    { id: 'other', name: 'その他' }
  ];

  const timeOfDayOptions = [
    { id: 'morning', name: '朝' },
    { id: 'afternoon', name: '昼' },
    { id: 'evening', name: '夕方' },
    { id: 'night', name: '夜' }
  ];

  const beforeAfterMealOptions = [
    { id: 'before-meal', name: '食事前' },
    { id: 'after-meal', name: '食事後' },
    { id: 'between-meals', name: '食間' }
  ];

  const calculateWeightChange = () => {
    if (!weightData.weight || !weightData.previousWeight) return null;
    
    const current = parseFloat(weightData.weight);
    const previous = parseFloat(weightData.previousWeight);
    const change = current - previous;
    
    return {
      change: change,
      percentage: ((change / previous) * 100).toFixed(1)
    };
  };

  const weightChange = calculateWeightChange();

  const handleSave = () => {
    const recordData = {
      petId: selectedPet,
      type: 'weight',
      recordedAt: recordTime,
      data: {
        ...weightData,
        weightChange: weightChange
      }
    };
    
    console.log('体重記録データ:', recordData);
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
                <Weight className="w-5 h-5 mr-2 text-purple-600" />
                体重測定
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
              <Select value={selectedPet} onValueChange={(value) => {
                setSelectedPet(value);
                const pet = pets.find(p => p.id === value);
                if (pet) {
                  setWeightData({...weightData, previousWeight: pet.lastWeight.replace('g', '')});
                }
              }}>
                <SelectTrigger className="border-amber-200">
                  <SelectValue placeholder="記録するペットを選択" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} (前回: {pet.lastWeight})
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

          {/* 体重測定 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">体重測定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">現在の体重</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="320.5"
                    value={weightData.weight}
                    onChange={(e) => setWeightData({...weightData, weight: e.target.value})}
                    className="border-amber-200 focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">単位</Label>
                  <Select value={weightData.unit} onValueChange={(value) => setWeightData({...weightData, unit: value})}>
                    <SelectTrigger className="border-amber-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {weightChange && (
                <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">前回からの変化</span>
                    <div className="flex items-center space-x-2">
                      {weightChange.change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : weightChange.change < 0 ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-600" />
                      )}
                      <span className={`font-bold ${
                        weightChange.change > 0 ? 'text-green-600' : 
                        weightChange.change < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {weightChange.change > 0 ? '+' : ''}{weightChange.change.toFixed(1)}{weightData.unit}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({weightChange.change > 0 ? '+' : ''}{weightChange.percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">測定方法</Label>
                <Select value={weightData.measurementMethod} onValueChange={(value) => setWeightData({...weightData, measurementMethod: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="測定方法を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {measurementMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">測定時間帯</Label>
                <Select value={weightData.timeOfDay} onValueChange={(value) => setWeightData({...weightData, timeOfDay: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="測定時間帯を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOfDayOptions.map((time) => (
                      <SelectItem key={time.id} value={time.id}>
                        {time.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">食事との関係</Label>
                <Select value={weightData.beforeAfterMeal} onValueChange={(value) => setWeightData({...weightData, beforeAfterMeal: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="食事との関係を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {beforeAfterMealOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">体調</Label>
                <RadioGroup value={weightData.condition} onValueChange={(value) => setWeightData({...weightData, condition: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="condition-excellent" />
                    <Label htmlFor="condition-excellent" className="text-sm">とても良い</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="condition-good" />
                    <Label htmlFor="condition-good" className="text-sm">良い</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="condition-fair" />
                    <Label htmlFor="condition-fair" className="text-sm">普通</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="concern" id="condition-concern" />
                    <Label htmlFor="condition-concern" className="text-sm">心配</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">測定環境</Label>
                <Input
                  placeholder="例：室温25℃、湿度60%"
                  value={weightData.environment}
                  onChange={(e) => setWeightData({...weightData, environment: e.target.value})}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  placeholder="体重測定時の様子、気になることなどを記録"
                  value={weightData.notes}
                  onChange={(e) => setWeightData({...weightData, notes: e.target.value})}
                  className="border-amber-200 focus:border-amber-400 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 写真追加 */}
          <Card className="hedgehog-card">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full h-16 border-2 border-dashed border-purple-300 hover:bg-purple-50">
                <Camera className="w-6 h-6 mr-2 text-purple-600" />
                <span className="text-purple-700">体重計の写真を追加（任意）</span>
              </Button>
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="pt-4">
            <Button onClick={handleSave} className="hedgehog-button w-full h-12">
              <Save className="w-5 h-5 mr-2" />
              体重記録を保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}