'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Ear, 
  Heart, 
  Activity,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Camera
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HealthCheckupPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState('momo');
  const [checkupData, setCheckupData] = useState({
    // 目の状態
    eyes: {
      condition: '',
      discharge: false,
      cloudiness: false,
      redness: false,
      notes: ''
    },
    // 耳の状態
    ears: {
      condition: '',
      discharge: false,
      odor: false,
      scratching: false,
      notes: ''
    },
    // 鼻の状態
    nose: {
      condition: '',
      discharge: false,
      dryness: false,
      breathing: '',
      notes: ''
    },
    // 口・歯の状態
    mouth: {
      condition: '',
      teethColor: '',
      gumColor: '',
      drooling: false,
      notes: ''
    },
    // 皮膚・毛の状態
    skin: {
      condition: '',
      dryness: false,
      redness: false,
      scratching: false,
      hairLoss: false,
      notes: ''
    },
    // 爪の状態
    nails: {
      condition: '',
      length: '',
      color: '',
      notes: ''
    },
    // 行動・活動
    behavior: {
      activity: '',
      appetite: '',
      sleep: '',
      interaction: '',
      wheelUsage: '',
      notes: ''
    },
    // 排泄
    excretion: {
      urineColor: '',
      urineAmount: '',
      stoolConsistency: '',
      stoolColor: '',
      frequency: '',
      notes: ''
    },
    // 体温・環境
    environment: {
      bodyTemperature: '',
      cageTemperature: '',
      humidity: '',
      notes: ''
    },
    // 全体的な印象
    overall: {
      healthStatus: '',
      concerns: '',
      notes: ''
    }
  });

  const pets = [
    { id: 'momo', name: 'モモ' },
    { id: 'coco', name: 'ココ' }
  ];

  const updateCheckupData = (category: string, field: string, value: any) => {
    setCheckupData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSave = () => {
    // ここでSupabaseに保存する処理を実装
    console.log('健康チェックデータ:', checkupData);
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
              <h1 className="text-xl font-bold text-gray-800">健康チェック</h1>
            </div>
            <Button onClick={handleSave} className="hedgehog-button">
              <Save className="w-4 h-4 mr-2" />
              保存
            </Button>
          </div>
        </div>
      </header>

      {/* Pet Selector */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex space-x-2">
          {pets.map((pet) => (
            <Button
              key={pet.id}
              variant={selectedPet === pet.id ? "default" : "outline"}
              onClick={() => setSelectedPet(pet.id)}
              className={selectedPet === pet.id ? "hedgehog-button" : "border-amber-200 hover:bg-amber-50"}
            >
              {pet.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-8">
        <div className="space-y-6">
          {/* 目の状態 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                目の状態
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">全体的な状態</Label>
                <RadioGroup 
                  value={checkupData.eyes.condition} 
                  onValueChange={(value) => updateCheckupData('eyes', 'condition', value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clear" id="eyes-clear" />
                    <Label htmlFor="eyes-clear" className="text-sm">澄んでいる</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="slightly-cloudy" id="eyes-cloudy" />
                    <Label htmlFor="eyes-cloudy" className="text-sm">少し濁っている</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-cloudy" id="eyes-very-cloudy" />
                    <Label htmlFor="eyes-very-cloudy" className="text-sm">とても濁っている</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">気になる症状</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="eyes-discharge"
                      checked={checkupData.eyes.discharge}
                      onCheckedChange={(checked) => updateCheckupData('eyes', 'discharge', checked)}
                    />
                    <Label htmlFor="eyes-discharge" className="text-sm">目やに</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="eyes-cloudiness"
                      checked={checkupData.eyes.cloudiness}
                      onCheckedChange={(checked) => updateCheckupData('eyes', 'cloudiness', checked)}
                    />
                    <Label htmlFor="eyes-cloudiness" className="text-sm">白濁</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="eyes-redness"
                      checked={checkupData.eyes.redness}
                      onCheckedChange={(checked) => updateCheckupData('eyes', 'redness', checked)}
                    />
                    <Label htmlFor="eyes-redness" className="text-sm">充血</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="eyes-notes" className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  id="eyes-notes"
                  placeholder="気になることがあれば記録してください"
                  value={checkupData.eyes.notes}
                  onChange={(e) => updateCheckupData('eyes', 'notes', e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 耳の状態 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Ear className="w-5 h-5 mr-2 text-purple-600" />
                耳の状態
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">全体的な状態</Label>
                <RadioGroup 
                  value={checkupData.ears.condition} 
                  onValueChange={(value) => updateCheckupData('ears', 'condition', value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clean" id="ears-clean" />
                    <Label htmlFor="ears-clean" className="text-sm">きれい</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="slightly-dirty" id="ears-dirty" />
                    <Label htmlFor="ears-dirty" className="text-sm">少し汚れている</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-dirty" id="ears-very-dirty" />
                    <Label htmlFor="ears-very-dirty" className="text-sm">とても汚れている</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">気になる症状</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ears-discharge"
                      checked={checkupData.ears.discharge}
                      onCheckedChange={(checked) => updateCheckupData('ears', 'discharge', checked)}
                    />
                    <Label htmlFor="ears-discharge" className="text-sm">耳だれ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ears-odor"
                      checked={checkupData.ears.odor}
                      onCheckedChange={(checked) => updateCheckupData('ears', 'odor', checked)}
                    />
                    <Label htmlFor="ears-odor" className="text-sm">臭い</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ears-scratching"
                      checked={checkupData.ears.scratching}
                      onCheckedChange={(checked) => updateCheckupData('ears', 'scratching', checked)}
                    />
                    <Label htmlFor="ears-scratching" className="text-sm">頻繁に掻く</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="ears-notes" className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  id="ears-notes"
                  placeholder="気になることがあれば記録してください"
                  value={checkupData.ears.notes}
                  onChange={(e) => updateCheckupData('ears', 'notes', e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 皮膚・毛の状態 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-600" />
                皮膚・毛の状態
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">全体的な状態</Label>
                <RadioGroup 
                  value={checkupData.skin.condition} 
                  onValueChange={(value) => updateCheckupData('skin', 'condition', value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="healthy" id="skin-healthy" />
                    <Label htmlFor="skin-healthy" className="text-sm">健康</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="slightly-dry" id="skin-dry" />
                    <Label htmlFor="skin-dry" className="text-sm">少し乾燥</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="irritated" id="skin-irritated" />
                    <Label htmlFor="skin-irritated" className="text-sm">荒れている</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">気になる症状</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="skin-dryness"
                      checked={checkupData.skin.dryness}
                      onCheckedChange={(checked) => updateCheckupData('skin', 'dryness', checked)}
                    />
                    <Label htmlFor="skin-dryness" className="text-sm">乾燥</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="skin-redness"
                      checked={checkupData.skin.redness}
                      onCheckedChange={(checked) => updateCheckupData('skin', 'redness', checked)}
                    />
                    <Label htmlFor="skin-redness" className="text-sm">赤み</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="skin-scratching"
                      checked={checkupData.skin.scratching}
                      onCheckedChange={(checked) => updateCheckupData('skin', 'scratching', checked)}
                    />
                    <Label htmlFor="skin-scratching" className="text-sm">頻繁に掻く</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="skin-hairloss"
                      checked={checkupData.skin.hairLoss}
                      onCheckedChange={(checked) => updateCheckupData('skin', 'hairLoss', checked)}
                    />
                    <Label htmlFor="skin-hairloss" className="text-sm">脱毛</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="skin-notes" className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  id="skin-notes"
                  placeholder="気になることがあれば記録してください"
                  value={checkupData.skin.notes}
                  onChange={(e) => updateCheckupData('skin', 'notes', e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 行動・活動 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                行動・活動
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">活動量</Label>
                <RadioGroup 
                  value={checkupData.behavior.activity} 
                  onValueChange={(value) => updateCheckupData('behavior', 'activity', value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-active" id="activity-high" />
                    <Label htmlFor="activity-high" className="text-sm">とても活発</Label>
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">食欲</Label>
                <RadioGroup 
                  value={checkupData.behavior.appetite} 
                  onValueChange={(value) => updateCheckupData('behavior', 'appetite', value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="appetite-excellent" />
                    <Label htmlFor="appetite-excellent" className="text-sm">とても良い</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="appetite-good" />
                    <Label htmlFor="appetite-good" className="text-sm">良い</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="appetite-poor" />
                    <Label htmlFor="appetite-poor" className="text-sm">食欲がない</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">回し車の使用</Label>
                <RadioGroup 
                  value={checkupData.behavior.wheelUsage} 
                  onValueChange={(value) => updateCheckupData('behavior', 'wheelUsage', value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="wheel-frequent" />
                    <Label htmlFor="wheel-frequent" className="text-sm">よく使う</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="wheel-sometimes" />
                    <Label htmlFor="wheel-sometimes" className="text-sm">時々使う</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rarely" id="wheel-rarely" />
                    <Label htmlFor="wheel-rarely" className="text-sm">ほとんど使わない</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="behavior-notes" className="text-sm font-medium text-gray-700 mb-2 block">メモ</Label>
                <Textarea
                  id="behavior-notes"
                  placeholder="普段と違う行動や気になることがあれば記録してください"
                  value={checkupData.behavior.notes}
                  onChange={(e) => updateCheckupData('behavior', 'notes', e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 全体的な健康状態 */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-amber-600" />
                全体的な健康状態
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">今日の健康状態</Label>
                <RadioGroup 
                  value={checkupData.overall.healthStatus} 
                  onValueChange={(value) => updateCheckupData('overall', 'healthStatus', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="health-excellent" />
                    <Label htmlFor="health-excellent" className="text-sm">
                      <Badge className={getHealthStatusColor('excellent')}>とても良い</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="health-good" />
                    <Label htmlFor="health-good" className="text-sm">
                      <Badge className={getHealthStatusColor('good')}>良い</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="health-fair" />
                    <Label htmlFor="health-fair" className="text-sm">
                      <Badge className={getHealthStatusColor('fair')}>普通</Badge>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="health-poor" />
                    <Label htmlFor="health-poor" className="text-sm">
                      <Badge className={getHealthStatusColor('poor')}>心配</Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="concerns" className="text-sm font-medium text-gray-700 mb-2 block">特に気になること</Label>
                <Textarea
                  id="concerns"
                  placeholder="病院に相談したいことや心配なことがあれば記録してください"
                  value={checkupData.overall.concerns}
                  onChange={(e) => updateCheckupData('overall', 'concerns', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="overall-notes" className="text-sm font-medium text-gray-700 mb-2 block">その他のメモ</Label>
                <Textarea
                  id="overall-notes"
                  placeholder="今日の様子で記録しておきたいことがあれば入力してください"
                  value={checkupData.overall.notes}
                  onChange={(e) => updateCheckupData('overall', 'notes', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
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
              健康チェックを保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}