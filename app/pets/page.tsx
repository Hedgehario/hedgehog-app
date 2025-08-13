'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Weight, Heart, Settings, Camera } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Image from 'next/image';

export default function PetsPage() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'モモ',
      photo: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      gender: 'メス',
      birthDate: '2023-03-15',
      adoptDate: '2023-04-01',
      breed: 'アフリカンピグミー',
      color: 'ソルト&ペッパー',
      lastWeight: '320g',
      lastWeightDate: '2024-01-15',
      healthStatus: 'healthy',
      insurance: 'アニコム ペット保険'
    },
    {
      id: 2,
      name: 'ココ',
      photo: 'https://images.pexels.com/photos/1865713/pexels-photo-1865713.jpeg?auto=compress&cs=tinysrgb&w=400',
      gender: 'オス',
      birthDate: '2022-12-10',
      adoptDate: '2023-01-05',
      breed: 'アフリカンピグミー',
      color: 'シナモン',
      lastWeight: '380g',
      lastWeightDate: '2024-01-14',
      healthStatus: 'attention',
      insurance: null,
      adoptionStore: 'ペットランド新宿店',
      storeLocation: '東京都新宿区'
    }
  ]);

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    
    if (months > 0) {
      return `${months}ヶ月${days > 0 ? days + '日' : ''}`;
    }
    return `${days}日`;
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'attention': return 'bg-yellow-100 text-yellow-800';
      case 'concern': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return '健康';
      case 'attention': return '要注意';
      case 'concern': return '要観察';
      default: return '不明';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">うちの子たち</h1>
            <Link href="/pets/new">
              <Button className="hedgehog-button">
                <Plus className="w-4 h-4 mr-2" />
                新しい子
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="space-y-4">
          {pets.map((pet) => (
            <Card key={pet.id} className="hedgehog-card overflow-hidden">
              <CardContent className="p-0">
                {/* Pet Photo and Basic Info */}
                <div className="relative">
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                    <Image
                      src={pet.photo}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={getHealthStatusColor(pet.healthStatus)}>
                        {getHealthStatusText(pet.healthStatus)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-bold text-gray-800">{pet.name}</h2>
                      <div className="flex space-x-2">
                        <Link href={`/pets/${pet.id}/album`}>
                          <Button variant="ghost" size="sm">
                            <Camera className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/pets/${pet.id}/settings`}>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">性別・品種</div>
                        <div className="text-sm font-medium text-gray-800">{pet.gender} • {pet.breed}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">カラー</div>
                        <div className="text-sm font-medium text-gray-800">{pet.color}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">年齢</div>
                        <div className="text-sm font-medium text-gray-800">{calculateAge(pet.birthDate)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">生年月日</div>
                        <div className="text-sm font-medium text-gray-800">
                          {new Date(pet.birthDate).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">最新体重</div>
                        <div className="text-sm font-medium text-gray-800">{pet.lastWeight}</div>
                      </div>
                    </div>

                    {/* お迎え情報 */}
                    {pet.adoptionStore && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-1">お迎え店舗</div>
                        <div className="text-sm font-medium text-gray-800">{pet.adoptionStore}</div>
                        {pet.storeLocation && (
                          <div className="text-xs text-gray-600">{pet.storeLocation}</div>
                        )}
                      </div>
                    )}

                    {/* Insurance Info */}
                    {pet.insurance && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-1">ペット保険</div>
                        <Badge variant="outline" className="text-xs">
                          {pet.insurance}
                        </Badge>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <Link href={`/health-record/new?pet=${pet.id}`}>
                        <Button variant="outline" className="w-full text-xs py-2">
                          <Heart className="w-3 h-3 mr-1" />
                          健康記録
                        </Button>
                      </Link>
                      <Link href={`/pets/${pet.id}/weight`}>
                        <Button variant="outline" className="w-full text-xs py-2">
                          <Weight className="w-3 h-3 mr-1" />
                          体重管理
                        </Button>
                      </Link>
                      <Link href={`/pets/${pet.id}/calendar`}>
                        <Button variant="outline" className="w-full text-xs py-2">
                          <Calendar className="w-3 h-3 mr-1" />
                          スケジュール
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {pets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">最初の子を登録しましょう</h3>
            <p className="text-gray-600 mb-6">ハリネズミの情報を登録して健康管理を始めましょう</p>
            <Link href="/pets/new">
              <Button className="hedgehog-button">
                <Plus className="w-4 h-4 mr-2" />
                新しい子を登録
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}