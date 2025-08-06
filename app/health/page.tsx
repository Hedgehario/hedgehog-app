'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Plus, TrendingUp, Heart, Utensils, Droplets, Activity, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';

export default function HealthPage() {
  const [selectedPet, setSelectedPet] = useState('momo');
  
  const pets = [
    { id: 'momo', name: 'モモ', status: 'healthy' },
    { id: 'coco', name: 'ココ', status: 'attention' }
  ];

  const todayRecords = [
    { id: 1, type: 'food', time: '8:00', value: '完食', icon: Utensils, color: 'bg-green-100 text-green-600' },
    { id: 2, type: 'water', time: '10:30', value: '正常', icon: Droplets, color: 'bg-blue-100 text-blue-600' },
    { id: 3, type: 'weight', time: '14:00', value: '320g', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
    { id: 4, type: 'activity', time: '19:00', value: '活発', icon: Activity, color: 'bg-orange-100 text-orange-600' }
  ];

  const recentTrends = [
    { label: '体重', value: '320g', change: '+2g', trend: 'up', color: 'text-green-600' },
    { label: '食欲', value: '良好', change: '安定', trend: 'stable', color: 'text-blue-600' },
    { label: '活動量', value: '高', change: '↑5%', trend: 'up', color: 'text-green-600' },
    { label: '睡眠', value: '正常', change: '安定', trend: 'stable', color: 'text-blue-600' }
  ];

  const upcomingCare = [
    { id: 1, task: '爪切り', dueDate: '明日', priority: 'medium' },
    { id: 2, task: '定期健診', dueDate: '3日後', priority: 'high' },
    { id: 3, task: 'ケージ掃除', dueDate: '今日', priority: 'low' }
  ];

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
              className={selectedPet === pet.id ? "hedgehog-button" : "border-amber-200 hover:bg-amber-50"}
            >
              {pet.name}
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
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="today">今日</TabsTrigger>
            <TabsTrigger value="trends">傾向</TabsTrigger>
            <TabsTrigger value="care">お世話</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {/* Today's Records */}
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
                      <div key={record.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100">
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
                            <div className="text-xs text-gray-600">{record.time}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-amber-50 text-amber-700">
                          {record.value}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Add */}
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
                      <TrendingUp className="w-5 h-5 text-purple-600" />
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

          <TabsContent value="trends" className="space-y-4">
            {/* Health Trends */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
                  健康傾向（直近7日）
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  {recentTrends.map((trend, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-amber-100">
                      <div className="text-xs text-gray-500 mb-1">{trend.label}</div>
                      <div className="font-semibold text-gray-800 mb-1">{trend.value}</div>
                      <div className={`text-xs ${trend.color}`}>{trend.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weight Chart Placeholder */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800">体重グラフ</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-48 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg flex items-center justify-center border border-amber-100">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">体重データのグラフを表示</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care" className="space-y-4">
            {/* Upcoming Care */}
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
                    <div key={care.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100">
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{care.task}</div>
                        <div className="text-xs text-gray-600">{care.dueDate}</div>
                      </div>
                      <Badge className={getPriorityColor(care.priority)}>
                        {care.priority === 'high' ? '緊急' : care.priority === 'medium' ? '重要' : '通常'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Reminder */}
            <Link href="/reminders/new">
              <Button className="hedgehog-button w-full">
                <Plus className="w-4 h-4 mr-2" />
                リマインダーを追加
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </main>

      <Navigation />
    </div>
  );
}