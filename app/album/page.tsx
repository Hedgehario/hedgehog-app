'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Plus, Grid, Calendar, Search, Filter } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AlbumPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPet, setSelectedPet] = useState('all');

  const [pets, setPets] = useState([
    { id: 'all', name: 'すべて' },
    { id: 'momo', name: 'モモ' },
    { id: 'coco', name: 'ココ' }
  ]);

  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      pet: 'momo',
      petName: 'モモ',
      date: '2024-01-15',
      time: '14:30',
      tags: ['体重測定', '健康チェック'],
      description: '今日の体重測定。320gで安定しています。'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1865713/pexels-photo-1865713.jpeg?auto=compress&cs=tinysrgb&w=400',
      pet: 'coco',
      petName: 'ココ',
      date: '2024-01-15',
      time: '09:15',
      tags: ['食事', '日常'],
      description: 'おいしそうにごはんを食べているココちゃん。'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      pet: 'momo',
      petName: 'モモ',
      date: '2024-01-14',
      time: '18:45',
      tags: ['遊び', '運動'],
      description: '回し車で元気に運動中のモモちゃん。'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1865713/pexels-photo-1865713.jpeg?auto=compress&cs=tinysrgb&w=400',
      pet: 'coco',
      petName: 'ココ',
      date: '2024-01-14',
      time: '16:20',
      tags: ['睡眠', '日常'],
      description: '気持ちよさそうに眠っているココちゃん。'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      pet: 'momo',
      petName: 'モモ',
      date: '2024-01-13',
      time: '12:10',
      tags: ['グルーミング', 'ケア'],
      description: '爪切り後のモモちゃん。おりこうさんでした。'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1865713/pexels-photo-1865713.jpeg?auto=compress&cs=tinysrgb&w=400',
      pet: 'coco',
      petName: 'ココ',
      date: '2024-01-13',
      time: '08:30',
      tags: ['朝', '日常'],
      description: '朝の様子。今日も元気です。'
    }
  ]);

  const filteredPhotos = selectedPet === 'all' 
    ? photos 
    : photos.filter(photo => photo.pet === selectedPet);

  const groupPhotosByDate = (photos: typeof filteredPhotos) => {
    const grouped = photos.reduce((acc, photo) => {
      const date = photo.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(photo);
      return acc;
    }, {} as Record<string, typeof photos>);

    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime());
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) {
      return '今日';
    } else if (dateStr === yesterday.toISOString().split('T')[0]) {
      return '昨日';
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  };

  const groupedPhotos = groupPhotosByDate(filteredPhotos);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">アルバム</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
              <Link href="/album/new">
                <Button className="hedgehog-button">
                  <Camera className="w-4 h-4 mr-2" />
                  撮影
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pet Filter */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto">
          {pets.map((pet) => (
            <Button
              key={pet.id}
              variant={selectedPet === pet.id ? "default" : "outline"}
              onClick={() => setSelectedPet(pet.id)}
              className={`whitespace-nowrap ${selectedPet === pet.id ? "hedgehog-button" : "border-amber-200 hover:bg-amber-50"}`}
            >
              {pet.name}
            </Button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="max-w-md mx-auto px-4 mb-6">
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid" className="flex items-center">
              <Grid className="w-4 h-4 mr-2" />
              グリッド
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              タイムライン
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-24">
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-2 gap-4">
            {filteredPhotos.map((photo) => (
              <Link key={photo.id} href={`/album/${photo.id}`}>
                <Card className="hedgehog-card overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
                  <div className="aspect-square relative">
                    <Image
                      src={photo.url}
                      alt={`${photo.petName}の写真`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-white text-xs font-medium mb-1">{photo.petName}</div>
                      <div className="text-white/80 text-xs">{formatDate(photo.date)}</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* Timeline View */
          <div className="space-y-6">
            {groupedPhotos.map(([date, dayPhotos]) => (
              <div key={date}>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {formatDate(date)}
                  </div>
                  <div className="flex-1 h-px bg-amber-200 ml-3" />
                </div>
                
                <div className="space-y-4">
                  {dayPhotos.map((photo) => (
                    <Link key={photo.id} href={`/album/${photo.id}`}>
                      <Card className="hedgehog-card cursor-pointer hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-0">
                          <div className="flex">
                            <div className="w-24 h-24 relative flex-shrink-0">
                              <Image
                                src={photo.url}
                                alt={`${photo.petName}の写真`}
                                fill
                                className="object-cover rounded-l-2xl"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-gray-800 text-sm">{photo.petName}</h3>
                                <span className="text-xs text-gray-500">{photo.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {photo.tags.slice(0, 2).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {photo.tags.length > 2 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{photo.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">まだ写真がありません</h3>
            <p className="text-gray-600 mb-6">最初の写真を撮影して思い出を記録しましょう</p>
            <Link href="/album/new">
              <Button className="hedgehog-button">
                <Camera className="w-4 h-4 mr-2" />
                写真を撮影
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}