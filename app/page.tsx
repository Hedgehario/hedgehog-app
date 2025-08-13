"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Plus,
  Calendar,
  Camera,
  BarChart3,
  Settings,
  Bell,
  MapPin,
  TrendingUp,
  Activity,
  Utensils,
  Weight,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Stethoscope,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import HedgehogIcon from "@/components/icons/HedgehogIcon";
import Image from "next/image";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAllPets, setShowAllPets] = useState(false);
  const [todayStats, setTodayStats] = useState({
    totalPets: 2,
    completedTasks: 5,
    pendingTasks: 3,
    totalRecords: 127,
    healthRecords: 89,
    photoCount: 34,
    lastWeighing: "3日前",
    activeUsers: 1,
  });

  // ペットデータ（実際のデータに置き換え）
  const allPets = [
    {
      id: 'momo',
      name: 'モモ',
      photo: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'healthy',
      weight: '320g'
    },
    {
      id: 'coco',
      name: 'ココ',
      photo: 'https://images.pexels.com/photos/1865713/pexels-photo-1865713.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'attention',
      weight: '380g'
    },
    {
      id: 'hana',
      name: 'ハナ',
      photo: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'healthy',
      weight: '295g'
    },
    {
      id: 'sora',
      name: 'ソラ',
      photo: 'https://images.pexels.com/photos/1865713/pexels-photo-1865713.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'concern',
      weight: '410g'
    },
    {
      id: 'yuki',
      name: 'ユキ',
      photo: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'healthy',
      weight: '335g'
    }
  ];

  const displayedPets = showAllPets ? allPets : allPets.slice(0, 2);
  const hasMorePets = allPets.length > 2;

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      pet: "モモ",
      petId: "momo",
      activity: "体重測定",
      type: "weight",
      time: "2時間前",
      value: "320g",
      status: "completed",
      icon: Weight,
      color: "text-purple-600",
    },
    {
      id: 2,
      pet: "ココ",
      petId: "coco",
      activity: "食事記録",
      type: "food",
      time: "4時間前",
      value: "完食",
      status: "completed",
      icon: Utensils,
      color: "text-green-600",
    },
    {
      id: 3,
      pet: "モモ",
      petId: "momo",
      activity: "健康チェック",
      type: "checkup",
      time: "1日前",
      value: "良好",
      status: "completed",
      icon: Stethoscope,
      color: "text-red-600",
    },
    {
      id: 4,
      pet: "ココ",
      petId: "coco",
      activity: "爪切り",
      type: "grooming",
      time: "2日前",
      value: "完了",
      status: "completed",
      icon: Heart,
      color: "text-pink-600",
    },
  ]);

  const [upcomingReminders, setUpcomingReminders] = useState([
    {
      id: 1,
      pet: "モモ",
      petId: "momo",
      task: "定期健診",
      date: "明日",
      time: "10:00",
      priority: "high",
      type: "vet",
      daysUntil: 1,
    },
    {
      id: 2,
      pet: "ココ",
      petId: "coco",
      task: "爪切り",
      date: "3日後",
      time: "16:00",
      priority: "medium",
      type: "grooming",
      daysUntil: 3,
    },
    {
      id: 3,
      pet: "モモ",
      petId: "momo",
      task: "ケージ掃除",
      date: "今日",
      time: "19:00",
      priority: "low",
      type: "cleaning",
      daysUntil: 0,
    },
  ]);

  const [healthTrends, setHealthTrends] = useState([
    {
      pet: "モモ",
      weight: "320g",
      trend: "stable",
      change: "+2g",
      status: "healthy",
    },
    {
      pet: "ココ",
      weight: "380g",
      trend: "up",
      change: "+5g",
      status: "attention",
    },
  ]);

  const [weeklyProgress, setWeeklyProgress] = useState({
    healthRecords: { current: 15, target: 20, percentage: 75 },
    weightMeasurements: { current: 4, target: 6, percentage: 67 },
    photos: { current: 8, target: 10, percentage: 80 },
  });

  // 現在時刻の更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1分ごとに更新

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "緊急";
      case "medium":
        return "重要";
      case "low":
        return "通常";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "attention":
        return "text-yellow-600";
      case "concern":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      case "stable":
        return "→";
      default:
        return "→";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <HedgehogIcon
                  className="w-full h-full"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Hariness</h1>
                <p className="text-sm text-gray-600">
                  {formatDate(currentTime)} {formatTime(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  {upcomingReminders.filter((r) => r.daysUntil <= 1).length}
                </Badge>
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Welcome Message */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">おはようございます！</h2>
                <p className="text-sm opacity-90">
                  今日も{todayStats.totalPets}匹の子たちが元気です
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {todayStats.completedTasks}
                </div>
                <div className="text-xs opacity-90">今日の完了</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {/* Our Pets */}
        <Card className="hedgehog-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-amber-600" />
                うちの子たち
              </div>
              {hasMorePets && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllPets(!showAllPets)}
                  className="text-amber-600 hover:bg-amber-50"
                >
                  {showAllPets ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      閉じる
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      すべて表示 ({allPets.length})
                    </>
                  )}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3">
              {displayedPets.map((pet) => (
                <Link key={pet.id} href={`/pets/${pet.id}`}>
                  <div className="hedgehog-card cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={pet.photo}
                        alt={pet.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-white font-bold text-sm mb-1">{pet.name}</div>
                        <div className="flex items-center justify-between">
                          <Badge className={pet.status === 'healthy' ? "bg-green-100 text-green-800 text-xs" : "bg-yellow-100 text-yellow-800 text-xs"}>
                            {pet.status === 'healthy' ? '健康' : '要注意'}
                          </Badge>
                          <div className="text-white/80 text-xs">{pet.weight}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3 text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">
                {todayStats.healthRecords}
              </div>
              <div className="text-sm text-gray-600">今月の健康記録</div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card className="hedgehog-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
              今週の進捗
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    健康記録
                  </span>
                  <span className="text-sm text-gray-600">
                    {weeklyProgress.healthRecords.current}/
                    {weeklyProgress.healthRecords.target}
                  </span>
                </div>
                <Progress
                  value={weeklyProgress.healthRecords.percentage}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    体重測定
                  </span>
                  <span className="text-sm text-gray-600">
                    {weeklyProgress.weightMeasurements.current}/
                    {weeklyProgress.weightMeasurements.target}
                  </span>
                </div>
                <Progress
                  value={weeklyProgress.weightMeasurements.percentage}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    写真記録
                  </span>
                  <span className="text-sm text-gray-600">
                    {weeklyProgress.photos.current}/{weeklyProgress.photos.target}
                  </span>
                </div>
                <Progress value={weeklyProgress.photos.percentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Trends */}
        <Card className="hedgehog-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              健康傾向
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {healthTrends.map((trend, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {trend.pet[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">
                        {trend.pet}
                      </div>
                      <div className="text-xs text-gray-600">
                        体重: {trend.weight}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">
                        {getTrendIcon(trend.trend)}
                      </span>
                      <span className={`text-sm ${getStatusColor(trend.status)}`}>
                        {trend.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="hedgehog-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800">
              クイックアクション
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/health-record/new">
                <Button className="hedgehog-button w-full h-16 flex flex-col items-center justify-center space-y-1">
                  <Heart className="w-5 h-5" />
                  <span className="text-xs">健康記録</span>
                </Button>
              </Link>
              <Link href="/pets/new">
                <Button
                  variant="outline"
                  className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 border-amber-200 hover:bg-amber-50"
                >
                  <Plus className="w-5 h-5 text-amber-600" />
                  <span className="text-xs text-amber-700">新しい子</span>
                </Button>
              </Link>
              <Link href="/album">
                <Button
                  variant="outline"
                  className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 border-amber-200 hover:bg-amber-50"
                >
                  <Camera className="w-5 h-5 text-amber-600" />
                  <span className="text-xs text-amber-700">アルバム</span>
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 border-amber-200 hover:bg-amber-50"
                >
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                  <span className="text-xs text-amber-700">統計</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="hedgehog-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              最近の記録
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">
                          {activity.activity}
                        </div>
                        <div className="text-xs text-gray-600">
                          {activity.pet} • {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-white text-amber-700"
                      >
                        {activity.value}
                      </Badge>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card className="hedgehog-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              今後の予定
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {reminder.daysUntil === 0 ? (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      ) : (
                        <Calendar className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">
                        {reminder.task}
                      </div>
                      <div className="text-xs text-gray-600">
                        {reminder.pet} • {reminder.date}{" "}
                        {reminder.time && `${reminder.time}`}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={`text-xs ${getPriorityColor(reminder.priority)}`}
                  >
                    {getPriorityText(reminder.priority)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}