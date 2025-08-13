'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Calendar, Plus, TrendingUp, Heart, Utensils, Droplets, Activity, Stethoscope, Weight, AlertTriangle, CheckCircle, Clock, BarChart3, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';

export default function HealthPage() {
  const [selectedPet, setSelectedPet] = useState('momo');
  const [openModal, setOpenModal] = useState('');
  
  // Modal form states
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
    quality: '',
    notes: ''
  });
  
  const [healthData, setHealthData] = useState({
    eyeCondition: '',
    earCondition: '',
    skinCondition: '',
    activityLevel: '',
    overallCondition: '',
    notes: ''
  });
  
  const pets = [
    { id: 'momo', name: 'モモ', status: 'healthy', avatar: 'モ' },
    { id: 'coco', name: 'ココ', status: 'attention', avatar: 'コ' }
  ];

  // 今日の記録データ
  const todayRecords = [
    { 
      id: 1, 
      type: 'food', 
      time: '8:00', 
      value: '完食', 
      icon: Utensils, 
      color: 'bg-green-100 text-green-600',
      status: 'completed',
      details: 'ペレット 大さじ1杯'
    },
    { 
      id: 2, 
      type: 'water', 
      time: '10:30', 
      value: '正常', 
      icon: Droplets, 
      color: 'bg-blue-100 text-blue-600',
      status: 'completed',
      details: '飲水量: 普通'
    },
    { 
      id: 3, 
      type: 'weight', 
      time: '14:00', 
      value: '320g', 
      icon: Weight, 
      color: 'bg-purple-100 text-purple-600',
      status: 'completed',
      details: '前回比: +2g'
    },
    { 
      id: 4, 
      type: 'activity', 
      time: '19:00', 
      value: '活発', 
      icon: Activity, 
      color: 'bg-orange-100 text-orange-600',
      status: 'completed',
      details: '回し車: 30分'
    }
  ];

  // 健康傾向データ（直近7日）
  const healthTrends = [
    { label: '体重', value: '320g', change: '+2g', trend: 'up', color: 'text-green-600', percentage: 85 },
    { label: '食欲', value: '良好', change: '安定', trend: 'stable', color: 'text-blue-600', percentage: 90 },
    { label: '活動量', value: '高', change: '↑5%', trend: 'up', color: 'text-green-600', percentage: 88 },
    { label: '睡眠', value: '正常', change: '安定', trend: 'stable', color: 'text-blue-600', percentage: 92 }
  ];

  // 今後のお世話予定
  const upcomingCare = [
    { 
      id: 1, 
      task: '爪切り', 
      dueDate: '明日', 
      priority: 'medium',
      type: 'grooming',
      daysUntil: 1,
      time: '16:00'
    },
    { 
      id: 2, 
      task: '定期健診', 
      dueDate: '3日後', 
      priority: 'high',
      type: 'vet',
      daysUntil: 3,
      time: '10:00'
    },
    { 
      id: 3, 
      task: 'ケージ掃除', 
      dueDate: '今日', 
      priority: 'low',
      type: 'cleaning',
      daysUntil: 0,
      time: '19:00'
    }
  ];

  // 週間統計
  const weeklyStats = {
    totalRecords: 42,
    healthChecks: 6,
    weightMeasurements: 4,
    foodRecords: 21,
    activityRecords: 11,
    completionRate: 87
  };

  // 健康スコア
  const healthScore = {
    overall: 85,
    nutrition: 90,
    activity: 82,
    weight: 88,
    behavior: 85
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'attention': return 'bg-yellow-100 text-yellow-800';
      case 'concern': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '緊急';
      case 'medium': return '重要';
      case 'low': return '通常';
      default: return '';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreText = (score: number) => {
    if (score >= 90) return '優秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '普通';
    return '要改善';
  };

  const handleSaveRecord = (type: string) => {
    const recordData = {
      petId: selectedPet,
      type: type,
      recordedAt: new Date().toISOString(),
      data: type === 'food' ? foodData :
            type === 'weight' ? weightData :
            type === 'water' ? waterData :
            healthData
    };
    
    console.log(`${type}記録データ:`, recordData);
    setOpenModal('');
    
    // Reset form data
    if (type === 'food') {
      setFoodData({ foodType: '', amount: '', appetite: '', completionRate: [100], notes: '' });
    } else if (type === 'weight') {
      setWeightData({ weight: '', unit: 'g', condition: '', notes: '' });
    } else if (type === 'water') {
      setWaterData({ amount: '', frequency: '', quality: '', notes: '' });
    } else if (type === 'health') {
      setHealthData({ eyeCondition: '', earCondition: '', skinCondition: '', activityLevel: '', overallCondition: '', notes: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">健康管理</h1>
            <Link href="/health-record/new">
              <Button className="hedgehog-button">
                <Plus className="w-4 h-4 mr-2" />
                記録追加
              </Button>
            </Link>
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
              className={`flex items-center space-x-2 ${selectedPet === pet.id ? "hedgehog-button" : "border-amber-200 hover:bg-amber-50"}`}
            >
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-amber-600">
                {pet.avatar}
              </div>
              <span>{pet.name}</span>
              <Badge className={`ml-2 ${getStatusColor(pet.status)}`}>
                {pet.status === 'healthy' ? '健康' : '要注意'}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-24">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="today">今日</TabsTrigger>
            <TabsTrigger value="trends">傾向</TabsTrigger>
            <TabsTrigger value="care">お世話</TabsTrigger>
            <TabsTrigger value="stats">統計</TabsTrigger>
          </TabsList>

          {/* 今日タブ */}
          <TabsContent value="today" className="space-y-4">
            {/* 健康スコア */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  今日の健康スコア
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-center mb-4">
                  <div className={`text-4xl font-bold ${getHealthScoreColor(healthScore.overall)} mb-2`}>
                    {healthScore.overall}
                  </div>
                  <div className="text-sm text-gray-600">
                    {getHealthScoreText(healthScore.overall)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{healthScore.nutrition}</div>
                    <div className="text-xs text-gray-600">栄養</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{healthScore.activity}</div>
                    <div className="text-xs text-gray-600">活動</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{healthScore.weight}</div>
                    <div className="text-xs text-gray-600">体重</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{healthScore.behavior}</div>
                    <div className="text-xs text-gray-600">行動</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 今日の記録 */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-amber-600" />
                  今日の記録
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {todayRecords.map((record) => {
                    const Icon = record.icon;
                    return (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${record.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm">
                              {record.type === 'food' && '食事'}
                              {record.type === 'water' && '飲水'}
                              {record.type === 'weight' && '体重'}
                              {record.type === 'activity' && '活動'}
                            </div>
                            <div className="text-xs text-gray-600">{record.time} • {record.details}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-amber-50 text-amber-700">
                            {record.value}
                          </Badge>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* クイック記録 */}
            <Card className="hedgehog-card">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3">クイック記録</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/health-record/food">
                    <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 border-green-200 hover:bg-green-50">
                      <Utensils className="w-5 h-5 text-green-600" />
                      <span className="text-xs text-green-700">食事記録</span>
                    </Button>
                  </Link>

                  <Link href="/health-record/weight">
                    <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 border-purple-200 hover:bg-purple-50">
                      <Weight className="w-5 h-5 text-purple-600" />
                      <span className="text-xs text-purple-700">体重測定</span>
                    </Button>
                  </Link>

                  <Link href="/health-record/water">
                    <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 border-blue-200 hover:bg-blue-50">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <span className="text-xs text-blue-700">飲水記録</span>
                    </Button>
                  </Link>

                  <Link href="/health-record/checkup">
                    <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 border-red-200 hover:bg-red-50">
                      <Stethoscope className="w-5 h-5 text-red-600" />
                      <span className="text-xs text-red-700">健康チェック</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 傾向タブ */}
          <TabsContent value="trends" className="space-y-4">
            {/* 健康傾向 */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
                  健康傾向（直近7日）
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {healthTrends.map((trend, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-amber-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-gray-700">{trend.label}</div>
                        <div className={`text-sm font-bold ${trend.color}`}>{trend.value}</div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Progress value={trend.percentage} className="flex-1 mr-3 h-2" />
                        <div className={`text-xs ${trend.color}`}>{trend.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 体重グラフプレースホルダー */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                  体重推移グラフ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-48 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center border border-purple-100">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">体重データのグラフを表示</p>
                    <p className="text-gray-500 text-xs mt-1">直近30日間の推移</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* お世話タブ */}
          <TabsContent value="care" className="space-y-4">
            {/* お世話スケジュール */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-amber-600" />
                  お世話スケジュール
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {upcomingCare.map((care) => (
                    <div key={care.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          {care.daysUntil === 0 ? (
                            <AlertTriangle className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{care.task}</div>
                          <div className="text-xs text-gray-600">{care.dueDate} {care.time}</div>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(care.priority)}>
                        {getPriorityText(care.priority)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* リマインダー追加 */}
            <Link href="/reminders/new">
              <Button className="hedgehog-button w-full">
                <Plus className="w-4 h-4 mr-2" />
                リマインダーを追加
              </Button>
            </Link>
          </TabsContent>

          {/* 統計タブ */}
          <TabsContent value="stats" className="space-y-4">
            {/* 週間統計 */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  週間統計
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalRecords}</div>
                    <div className="text-xs text-gray-600">総記録数</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{weeklyStats.completionRate}%</div>
                    <div className="text-xs text-gray-600">完了率</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">健康チェック</span>
                    </div>
                    <span className="font-bold text-red-600">{weeklyStats.healthChecks}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Weight className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-700">体重測定</span>
                    </div>
                    <span className="font-bold text-purple-600">{weeklyStats.weightMeasurements}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Utensils className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">食事記録</span>
                    </div>
                    <span className="font-bold text-green-600">{weeklyStats.foodRecords}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700">活動記録</span>
                    </div>
                    <span className="font-bold text-orange-600">{weeklyStats.activityRecords}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 目標設定 */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  今週の目標
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800 text-sm">毎日の健康記録</div>
                      <div className="text-xs text-gray-600">5/7日 完了</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={71} className="w-16 h-2" />
                      <Zap className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800 text-sm">週2回の体重測定</div>
                      <div className="text-xs text-gray-600">2/2回 完了</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={100} className="w-16 h-2" />
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Navigation />
    </div>
  );
}