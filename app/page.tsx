"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Plus,
  Calendar,
  Camera,
  BarChart3,
  Settings,
  Bell,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import HedgehogIcon from "@/components/icons/HedgehogIcon";

export default function HomePage() {
  const [todayStats, setTodayStats] = useState({
    totalPets: 2,
    completedTasks: 5,
    pendingTasks: 3,
    lastWeighing: "3日前",
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      pet: "モモ",
      activity: "体重測定",
      time: "2時間前",
      value: "320g",
    },
    {
      id: 2,
      pet: "ココ",
      activity: "食事記録",
      time: "4時間前",
      value: "完食",
    },
    {
      id: 3,
      pet: "モモ",
      activity: "通院記録",
      time: "1日前",
      value: "健康診断",
    },
    { id: 4, pet: "ココ", activity: "爪切り", time: "2日前", value: "完了" },
  ]);

  const [upcomingReminders, setUpcomingReminders] = useState([
    { id: 1, pet: "モモ", task: "定期健診", date: "明日", priority: "high" },
    { id: 2, pet: "ココ", task: "爪切り", date: "3日後", priority: "medium" },
    { id: 3, pet: "モモ", task: "ケージ掃除", date: "今日", priority: "low" },
  ]);

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
                <p className="text-sm text-gray-600">今日も元気だね！</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  3
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
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="hedgehog-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">
                {todayStats.totalPets}
              </div>
              <div className="text-sm text-gray-600">登録中の子</div>
            </CardContent>
          </Card>
          <Card className="hedgehog-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {todayStats.completedTasks}
              </div>
              <div className="text-sm text-gray-600">今日の完了</div>
            </CardContent>
          </Card>
        </div>

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
              <Link href="/statistics">
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
            <CardTitle className="text-lg font-semibold text-gray-800">
              最近の記録
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {activity.pet[0]}
                      </span>
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
                  <Badge
                    variant="secondary"
                    className="bg-white text-amber-700"
                  >
                    {activity.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card className="hedgehog-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800">
              今後の予定
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-800 text-sm">
                        {reminder.task}
                      </div>
                      <div className="text-xs text-gray-600">
                        {reminder.pet} • {reminder.date}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      reminder.priority === "high"
                        ? "destructive"
                        : reminder.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {reminder.priority === "high"
                      ? "緊急"
                      : reminder.priority === "medium"
                      ? "重要"
                      : "通常"}
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
