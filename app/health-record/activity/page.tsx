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
import { ArrowLeft, Save, Activity, Camera, Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ActivityRecordPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState('');
  const [recordTime, setRecordTime] = useState(new Date().toISOString().slice(0, 16));
  
  const [activityData, setActivityData] = useState({
    wheelTime: '',
    wheelDistance: '',
    playTime: '',
    explorationTime: '',
    activityLevel: '',
    energyLevel: [50],
    socialInteraction: '',
    environment: '',
    temperature: '',
    timeOfDay: '',
    mood: '',
    notes: ''
  });

  const pets = [
    { id: 'momo', name: 'モモ' },
    { id: 'coco', name: 'ココ' }
  ];

  const timeOfDayOptions = [
    { id: 'early-morning', name: '早朝（5-7時）' },
    { id: 'morning', name: '朝（7-12時）' },
    { id: 'afternoon', name: '昼（12-17時）' },
    { id: 'evening', name: '夕方（17-20時）' },
    { id: 'night', name: '夜（20-24時）' },
    { id: 'late-night', name: '深夜（0-5時）' }
  ];

  const handleSave = () => {
    const recordData = {
      petId: selectedPet,
      type: 'activity',
      recordedAt: recordTime,
      data: activityData
    };
    
    console.log('活動記録データ:', recordData);
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
                <Activity className="w-5 h-5 mr-2 text-orange-600" />
                活動記録
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

          {/* 活動の詳細 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">活動の詳細</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">推定走行距離</Label>
                <Input
                  placeholder="例：500m、1km"
                  value={activityData.wheelDistance}
                  onChange={(e) => setActivityData({...activityData, wheelDistance: e.target.value})}
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">探索時間</Label>
                <Input
                  placeholder="例：10分、20分"
                  value={activityData.explorationTime}
                  onChange={(e) => setActivityData({...activityData, explorationTime: e.target.value})}
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
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="activity-inactive" />
                    <Label htmlFor="activity-inactive" className="text-sm">ほとんど動かない</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  エネルギーレベル: {activityData.energyLevel[0]}%
                </Label>
                <Slider
                  value={activityData.energyLevel}
                  onValueChange={(value) => setActivityData({...activityData, energyLevel: value})}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>低い</span>
                  <span>普通</span>
                  <span>高い</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">活動時間帯</Label>
                <Select value={activityData.timeOfDay} onValueChange={(value) => setActivityData({...activityData, timeOfDay: value})}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="活動時間帯を選択" />
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">社会的交流</Label>
                <RadioGroup value={activityData.socialInteraction} onValueChange={(value) => setActivityData({...activityData, socialInteraction: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friendly" id="social-friendly" />
                    <Label htmlFor="social-friendly" className="text-sm">人懐っこい</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="social-normal" />
                    <Label htmlFor="social-normal" className="text-sm">普通</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shy" id="social-shy" />
                    <Label htmlFor="social-shy" className="text-sm">恥ずかしがり</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="defensive" id="social-defensive" />
                    <Label htmlFor="social-defensive" className="text-sm">警戒している</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">気分・様子</Label>
                <RadioGroup value={activityData.mood} onValueChange={(value) => setActivityData({...activityData, mood: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="happy" id="mood-happy" />
                    <Label htmlFor="mood-happy" className="text-sm">元気で楽しそう</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="calm" id="mood-calm" />
                    <Label htmlFor="mood-calm" className="text-sm">落ち着いている</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="curious" id="mood-curious" />
                    <Label htmlFor="mood-curious" className="text-sm">好奇心旺盛</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tired" id="mood-tired" />
                    <Label htmlFor="mood-tired" className="text-sm">疲れている</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stressed" id="mood-stressed" />
                    <Label htmlFor="mood-stressed" className="text-sm">ストレスを感じている</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">環境温度</Label>
                <Input
                  placeholder="例：25℃、室温"
                  value={activityData.temperature}
                  onChange={(e) => setActivityData({...activityData, temperature: e.target.value})}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">環境の様子</Label>
                <Input
                  placeholder="例：静か、音楽あり、他のペットがいる"
                  value={activityData.environment}
                  onChange={(e) => setActivityData({...activityData, environment: e.target.value})}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  placeholder="活動の様子、新しい行動、気になることなどを記録"
                  value={activityData.notes}
                  onChange={(e) => setActivityData({...activityData, notes: e.target.value})}
                  className="border-amber-200 focus:border-amber-400 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 写真追加 */}
          <Card className="hedgehog-card">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full h-16 border-2 border-dashed border-orange-300 hover:bg-orange-50">
                <Camera className="w-6 h-6 mr-2 text-orange-600" />
                <span className="text-orange-700">活動の写真を追加（任意）</span>
              </Button>
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="pt-4">
            <Button onClick={handleSave} className="hedgehog-button w-full h-12">
              <Save className="w-5 h-5 mr-2" />
              活動記録を保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}