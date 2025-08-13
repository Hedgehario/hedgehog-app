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
import { ArrowLeft, Save, Utensils, Weight, Droplets, Activity, Stethoscope, Camera } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewHealthRecordPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState('');
  const [recordType, setRecordType] = useState('food');
  const [recordTime, setRecordTime] = useState(new Date().toISOString().slice(0, 16));
  
  const [foodData, setFoodData] = useState({
    foodType: '',
    amount: '',
    appetite: '',
    completionRate: [100],
    notes: ''
  });

  const [weightData, setWeightData] = useState({
    weight: '',
    unit: 'g',
    condition: '',
    notes: ''
  });

  const [waterData, setWaterData] = useState({
    amount: '',
    frequency: '',
    waterCondition: '',
    notes: ''
  });

  const [activityData, setActivityData] = useState({
    wheelTime: '',
    playTime: '',
    activityLevel: '',
    notes: ''
  });

  const [healthData, setHealthData] = useState({
    temperature: '',
    eyeCondition: '',
    earCondition: '',
    skinCondition: '',
    overallCondition: '',
    notes: ''
  });

  const pets = [
    { id: 'momo', name: 'モモ' },
    { id: 'coco', name: 'ココ' }
  ];

  const recordTypes = [
    { id: 'food', name: '食事記録', icon: Utensils, color: 'text-green-600' },
    { id: 'weight', name: '体重測定', icon: Weight, color: 'text-purple-600' },
    { id: 'water', name: '飲水記録', icon: Droplets, color: 'text-blue-600' },
    { id: 'activity', name: '活動記録', icon: Activity, color: 'text-orange-600' },
    { id: 'health', name: '健康チェック', icon: Stethoscope, color: 'text-red-600' }
  ];

  const handleSave = () => {
    const recordData = {
      petId: selectedPet,
      type: recordType,
      recordedAt: recordTime,
      data: recordType === 'food' ? foodData :
            recordType === 'weight' ? weightData :
            recordType === 'water' ? waterData :
            recordType === 'activity' ? activityData :
            healthData
    };
    
    console.log('健康記録データ:', recordData);
    router.push('/health');
  };

  const renderRecordForm = () => {
    switch (recordType) {
      case 'food':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">食事の種類</Label>
              <Select value={foodData.foodType} onValueChange={(value) => setFoodData({...foodData, foodType: value})}>
                <SelectTrigger className="border-amber-200">
                  <SelectValue placeholder="食事の種類を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pellets">ペレット</SelectItem>
                  <SelectItem value="insects">昆虫</SelectItem>
                  <SelectItem value="vegetables">野菜</SelectItem>
                  <SelectItem value="fruits">果物</SelectItem>
                  <SelectItem value="treats">おやつ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">給餌量</Label>
              <Input
                placeholder="例：大さじ1杯、10g"
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
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
              <Textarea
                placeholder="食事の様子や気になることを記録"
                value={foodData.notes}
                onChange={(e) => setFoodData({...foodData, notes: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>
        );

      case 'weight':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">体重</Label>
                <Input
                  type="number"
                  placeholder="320"
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
              <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
              <Textarea
                placeholder="体重測定時の様子や気になることを記録"
                value={weightData.notes}
                onChange={(e) => setWeightData({...weightData, notes: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>
        );

      case 'water':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">飲水量</Label>
              <Input
                placeholder="例：50ml、普通"
                value={waterData.amount}
                onChange={(e) => setWaterData({...waterData, amount: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">飲水頻度</Label>
              <RadioGroup value={waterData.frequency} onValueChange={(value) => setWaterData({...waterData, frequency: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="frequent" id="frequency-frequent" />
                  <Label htmlFor="frequency-frequent" className="text-sm">頻繁</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="frequency-normal" />
                  <Label htmlFor="frequency-normal" className="text-sm">普通</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rare" id="frequency-rare" />
                  <Label htmlFor="frequency-rare" className="text-sm">少ない</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">水の状態</Label>
              <RadioGroup value={waterData.waterCondition} onValueChange={(value) => setWaterData({...waterData, waterCondition: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fresh" id="water-fresh" />
                  <Label htmlFor="water-fresh" className="text-sm">新鮮</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="water-normal" />
                  <Label htmlFor="water-normal" className="text-sm">普通</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dirty" id="water-dirty" />
                  <Label htmlFor="water-dirty" className="text-sm">汚れている</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
              <Textarea
                placeholder="飲水の様子や気になることを記録"
                value={waterData.notes}
                onChange={(e) => setWaterData({...waterData, notes: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">回し車使用時間</Label>
              <Input
                placeholder="例：30分、1時間"
                value={activityData.wheelTime}
                onChange={(e) => setActivityData({...activityData, wheelTime: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">遊び時間</Label>
              <Input
                placeholder="例：15分、30分"
                value={activityData.playTime}
                onChange={(e) => setActivityData({...activityData, playTime: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">活動レベル</Label>
              <RadioGroup value={activityData.activityLevel} onValueChange={(value) => setActivityData({...activityData, activityLevel: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-active" id="activity-very-active" />
                  <Label htmlFor="activity-very-active" className="text-sm">とても活発</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="activity-active" />
                  <Label htmlFor="activity-active" className="text-sm">活発</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="activity-normal" />
                  <Label htmlFor="activity-normal" className="text-sm">普通</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="activity-low" />
                  <Label htmlFor="activity-low" className="text-sm">あまり動かない</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
              <Textarea
                placeholder="活動の様子や気になることを記録"
                value={activityData.notes}
                onChange={(e) => setActivityData({...activityData, notes: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">体温</Label>
              <Input
                placeholder="例：36.5℃"
                value={healthData.temperature}
                onChange={(e) => setHealthData({...healthData, temperature: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">目の状態</Label>
              <RadioGroup value={healthData.eyeCondition} onValueChange={(value) => setHealthData({...healthData, eyeCondition: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clear" id="eye-clear" />
                  <Label htmlFor="eye-clear" className="text-sm">澄んでいる</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slightly-cloudy" id="eye-cloudy" />
                  <Label htmlFor="eye-cloudy" className="text-sm">少し濁っている</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="discharge" id="eye-discharge" />
                  <Label htmlFor="eye-discharge" className="text-sm">目やにがある</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">耳の状態</Label>
              <RadioGroup value={healthData.earCondition} onValueChange={(value) => setHealthData({...healthData, earCondition: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clean" id="ear-clean" />
                  <Label htmlFor="ear-clean" className="text-sm">きれい</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dirty" id="ear-dirty" />
                  <Label htmlFor="ear-dirty" className="text-sm">汚れている</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="odor" id="ear-odor" />
                  <Label htmlFor="ear-odor" className="text-sm">臭いがある</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">皮膚の状態</Label>
              <RadioGroup value={healthData.skinCondition} onValueChange={(value) => setHealthData({...healthData, skinCondition: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="healthy" id="skin-healthy" />
                  <Label htmlFor="skin-healthy" className="text-sm">健康</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dry" id="skin-dry" />
                  <Label htmlFor="skin-dry" className="text-sm">乾燥している</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="irritated" id="skin-irritated" />
                  <Label htmlFor="skin-irritated" className="text-sm">荒れている</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">全体的な健康状態</Label>
              <RadioGroup value={healthData.overallCondition} onValueChange={(value) => setHealthData({...healthData, overallCondition: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="overall-excellent" />
                  <Label htmlFor="overall-excellent" className="text-sm">とても良い</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="overall-good" />
                  <Label htmlFor="overall-good" className="text-sm">良い</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="overall-fair" />
                  <Label htmlFor="overall-fair" className="text-sm">普通</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="concern" id="overall-concern" />
                  <Label htmlFor="overall-concern" className="text-sm">心配</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
              <Textarea
                placeholder="健康状態で気になることを記録"
                value={healthData.notes}
                onChange={(e) => setHealthData({...healthData, notes: e.target.value})}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
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
              <h1 className="text-xl font-bold text-gray-800">健康記録</h1>
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

          {/* 記録タイプ選択 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">記録タイプ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {recordTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Button
                      key={type.id}
                      variant={recordType === type.id ? "default" : "outline"}
                      onClick={() => setRecordType(type.id)}
                      className={`h-16 flex flex-col items-center justify-center space-y-1 ${
                        recordType === type.id 
                          ? "hedgehog-button" 
                          : "border-2 border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${recordType === type.id ? "text-white" : type.color}`} />
                      <span className={`text-xs ${recordType === type.id ? "text-white" : "text-gray-700"}`}>
                        {type.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 記録時刻 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">記録時刻</CardTitle>
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

          {/* 記録フォーム */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {recordTypes.find(type => type.id === recordType)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderRecordForm()}
            </CardContent>
          </Card>

          {/* 写真追加 */}
          <Card className="hedgehog-card">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full h-16 border-2 border-dashed border-amber-300 hover:bg-amber-50">
                <Camera className="w-6 h-6 mr-2 text-amber-600" />
                <span className="text-amber-700">写真を追加（任意）</span>
              </Button>
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="pt-4">
            <Button onClick={handleSave} className="hedgehog-button w-full h-12">
              <Save className="w-5 h-5 mr-2" />
              記録を保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}