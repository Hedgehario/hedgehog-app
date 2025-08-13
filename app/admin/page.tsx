"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Activity, TrendingUp } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">
            管理者ダッシュボード
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="hedgehog-card">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-600">2</div>
                <div className="text-sm text-gray-600">登録ペット</div>
              </CardContent>
            </Card>
            <Card className="hedgehog-card">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-600">今日の記録</div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                統計データ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      総記録数
                    </div>
                    <div className="text-xs text-gray-600">今月</div>
                  </div>
                  <div className="text-lg font-bold text-amber-600">127</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      健康記録
                    </div>
                    <div className="text-xs text-gray-600">今月</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">89</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      写真数
                    </div>
                    <div className="text-xs text-gray-600">今月</div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">34</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hedgehog-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
                最近の活動
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-amber-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">モ</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      モモの体重測定
                    </div>
                    <div className="text-xs text-gray-600">2時間前</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-amber-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">コ</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      ココの食事記録
                    </div>
                    <div className="text-xs text-gray-600">4時間前</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-amber-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">モ</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      モモの健康チェック
                    </div>
                    <div className="text-xs text-gray-600">1日前</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
