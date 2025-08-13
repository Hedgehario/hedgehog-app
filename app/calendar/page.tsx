'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Filter, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPet, setSelectedPet] = useState('all');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [viewMode, setViewMode] = useState('month');

  const pets = [
    { id: 'all', name: 'すべて' },
    { id: 'momo', name: 'モモ' },
    { id: 'coco', name: 'ココ' }
  ];

  const eventTypes = [
    { id: 'all', name: 'すべて' },
    { id: 'health', name: '健康記録' },
    { id: 'vet', name: '通院' },
    { id: 'grooming', name: 'グルーミング' },
    { id: 'cleaning', name: '掃除' },
    { id: 'reminder', name: 'リマインダー' },
    { id: 'birthday', name: '誕生日' }
  ];

  // ペットの誕生日データ
  const petBirthdays = [
    { id: 'momo', name: 'モモ', birthDate: '2023-03-15' },
    { id: 'coco', name: 'ココ', birthDate: '2022-12-10' },
    { id: 'hana', name: 'ハナ', birthDate: '2023-07-22' },
    { id: 'sora', name: 'ソラ', birthDate: '2022-09-05' },
    { id: 'yuki', name: 'ユキ', birthDate: '2023-01-18' }
  ];

  // 毎年の誕生日イベントを生成する関数
  const generateBirthdayEvents = () => {
    const birthdayEvents = [];
    const currentYear = new Date().getFullYear();
    
    // 現在年から5年先まで誕生日イベントを生成
    for (let year = currentYear - 2; year <= currentYear + 5; year++) {
      petBirthdays.forEach(pet => {
        const birthDate = new Date(pet.birthDate);
        const birthYear = birthDate.getFullYear();
        const age = year - birthYear;
        if (age >= 0) { // 生まれた年以降のみ
          const birthdayThisYear = `${year}-${String(birthDate.getMonth() + 1).padStart(2, '0')}-${String(birthDate.getDate()).padStart(2, '0')}`;
          
          birthdayEvents.push({
            id: `birthday-${pet.id}-${year}`,
            date: birthdayThisYear,
            pet: pet.id,
            petName: pet.name,
            type: 'birthday',
            title: `${pet.name}の誕生日🎂`,
            time: '終日',
            status: 'scheduled',
            priority: 'high',
            description: `${age}歳の誕生日おめでとう！`
          });
        }
      });
    }
    
    return birthdayEvents;
  };

  const events = [
    // 毎年の誕生日イベントを動的に生成
    ...generateBirthdayEvents(),

    // 今日の予定
    { id: 1, date: formatDate(new Date()), pet: 'momo', petName: 'モモ', type: 'health', title: '体重測定', time: '14:00', status: 'pending', priority: 'medium', description: '週1回の定期体重測定' },
    { id: 2, date: formatDate(new Date()), pet: 'coco', petName: 'ココ', type: 'grooming', title: '爪切り', time: '16:00', status: 'pending', priority: 'high', description: '前回から2週間経過' },
    
    // 明日の予定
    { id: 3, date: formatDate(new Date(Date.now() + 86400000)), pet: 'momo', petName: 'モモ', type: 'vet', title: '定期健診', time: '10:00', status: 'scheduled', priority: 'high', description: 'かかりつけ動物病院での健康診断' },
    { id: 4, date: formatDate(new Date(Date.now() + 86400000)), pet: 'coco', petName: 'ココ', type: 'cleaning', title: 'ケージ掃除', time: '09:00', status: 'scheduled', priority: 'medium', description: '週2回の定期清掃' },
    
    // 過去の記録
    { id: 5, date: formatDate(new Date(Date.now() - 86400000)), pet: 'momo', petName: 'モモ', type: 'health', title: '食事記録', time: '08:00', status: 'completed', priority: 'low', description: '朝食完食、食欲良好' },
    { id: 6, date: formatDate(new Date(Date.now() - 86400000)), pet: 'coco', petName: 'ココ', type: 'health', title: '健康チェック', time: '19:00', status: 'completed', priority: 'medium', description: '全身チェック、異常なし' },
    
    // 来週の予定
    { id: 7, date: formatDate(new Date(Date.now() + 7 * 86400000)), pet: 'momo', petName: 'モモ', type: 'reminder', title: '薬の投与', time: '12:00', status: 'scheduled', priority: 'high', description: '皮膚薬の塗布（5日間継続）' },
    { id: 8, date: formatDate(new Date(Date.now() + 10 * 86400000)), pet: 'coco', petName: 'ココ', type: 'vet', title: 'ワクチン接種', time: '14:30', status: 'scheduled', priority: 'high', description: '年1回のワクチン接種' }
  ];

  function formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    let filteredEvents = events.filter(event => {
      console.log('Checking event:', event.date, 'against:', dateStr);
      return event.date === dateStr;
    });
    
    if (selectedPet !== 'all') {
      filteredEvents = filteredEvents.filter(event => 
        event.pet === selectedPet || event.type === 'birthday'
      );
    }
    
    if (selectedEventType !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === selectedEventType);
    }
    
    console.log('Filtered events for', dateStr, ':', filteredEvents);
    return filteredEvents;
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'health': return 'bg-green-100 text-green-800';
      case 'vet': return 'bg-red-100 text-red-800';
      case 'grooming': return 'bg-blue-100 text-blue-800';
      case 'cleaning': return 'bg-yellow-100 text-yellow-800';
      case 'reminder': return 'bg-purple-100 text-purple-800';
      case 'birthday': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'health': return '健康';
      case 'vet': return '通院';
      case 'grooming': return 'グルーミング';
      case 'cleaning': return '掃除';
      case 'reminder': return 'リマインダー';
      case 'birthday': return '誕生日';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '重要';
      case 'medium': return '普通';
      case 'low': return '低';
      default: return '';
    }
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isSelectedMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = getEventsForDate(selectedDate);

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek && event.status !== 'completed';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getTodayEvents = () => {
    const today = formatDate(new Date());
    return events.filter(event => event.date === today);
  };

  const formatDateJapanese = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateStr === formatDate(today)) {
      return '今日';
    } else if (dateStr === formatDate(tomorrow)) {
      return '明日';
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">カレンダー</h1>
            <Link href="/events/new">
              <Button className="hedgehog-button">
                <Plus className="w-4 h-4 mr-2" />
                予定追加
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedPet} onValueChange={setSelectedPet}>
            <SelectTrigger className="border-amber-200">
              <SelectValue placeholder="ペットを選択" />
            </SelectTrigger>
            <SelectContent>
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id}>
                  {pet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedEventType} onValueChange={setSelectedEventType}>
            <SelectTrigger className="border-amber-200">
              <SelectValue placeholder="種類を選択" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="month">月表示</TabsTrigger>
            <TabsTrigger value="week">週表示</TabsTrigger>
            <TabsTrigger value="list">リスト</TabsTrigger>
          </TabsList>

          <TabsContent value="month" className="space-y-6">
            {/* Calendar Header */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              {/* Calendar Grid */}
              <CardContent className="p-4 pt-0">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const isSelected = formatDate(day) === formatDate(selectedDate);
                    const hasBirthday = dayEvents.some(event => event.type === 'birthday');
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          relative p-2 text-sm rounded-lg transition-all duration-200 min-h-[40px] flex flex-col items-center justify-center
                          ${isToday(day) ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold' : ''}
                          ${isSelected && !isToday(day) ? 'bg-amber-100 border border-amber-300' : ''}
                          ${!isSelectedMonth(day) ? 'text-gray-300' : 'text-gray-700 hover:bg-amber-50'}
                          ${hasBirthday && !isToday(day) ? 'bg-pink-50 border border-pink-200' : ''}
                        `}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{day.getDate()}</span>
                          {hasBirthday && <span className="text-xs">🎂</span>}
                        </div>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {dayEvents.slice(0, 3).map((event, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  event.type === 'birthday' ? 'bg-pink-500' : getStatusColor(event.status)
                                }`}
                              />
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-amber-600" />
                  {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日の予定
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-white rounded-lg border border-amber-100">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)} mt-1`} />
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{event.title}</div>
                              <div className="text-xs text-gray-600 flex items-center mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {event.time} • {event.petName}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                            <Badge className={getEventTypeColor(event.type)}>
                              {getEventTypeText(event.type)}
                            </Badge>
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-xs text-gray-500 mt-2 ml-6">{event.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">この日の予定はありません</p>
                    <Link href="/events/new">
                      <Button variant="outline" className="mt-3 border-amber-200 hover:bg-amber-50">
                        <Plus className="w-4 h-4 mr-2" />
                        予定を追加
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            {/* Today's Events */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-green-600" />
                  今日の予定
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {getTodayEvents().length > 0 ? (
                  <div className="space-y-3">
                    {getTodayEvents().map((event) => (
                      <div key={event.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)} mt-1`} />
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{event.title}</div>
                              <div className="text-xs text-gray-600 flex items-center mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {event.time} • {event.petName}
                              </div>
                            </div>
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>
                            {getEventTypeText(event.type)}
                          </Badge>
                        </div>
                        {event.description && (
                          <p className="text-xs text-gray-500 mt-2 ml-6">{event.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">今日の予定はありません</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  今後の予定（1週間）
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {getUpcomingEvents().length > 0 ? (
                  <div className="space-y-3">
                    {getUpcomingEvents().map((event) => (
                      <div key={event.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)} mt-1`} />
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{event.title}</div>
                              <div className="text-xs text-gray-600 flex items-center mt-1">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                {formatDateJapanese(event.date)} {event.time} • {event.petName}
                              </div>
                            </div>
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>
                            {getEventTypeText(event.type)}
                          </Badge>
                        </div>
                        {event.description && (
                          <p className="text-xs text-gray-500 mt-2 ml-6">{event.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">今後1週間の予定はありません</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            {/* All Events List */}
            <Card className="hedgehog-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-purple-600" />
                  すべての予定
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {events
                    .filter(event => {
                      if (selectedPet !== 'all' && event.pet !== selectedPet) return false;
                      if (selectedEventType !== 'all' && event.type !== selectedEventType) return false;
                      return true;
                    })
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((event) => (
                      <div key={event.id} className="p-3 bg-white rounded-lg border border-amber-100">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)} mt-1`} />
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{event.title}</div>
                              <div className="text-xs text-gray-600 flex items-center mt-1">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                {formatDateJapanese(event.date)} {event.time} • {event.petName}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                            <Badge className={getEventTypeColor(event.type)}>
                              {getEventTypeText(event.type)}
                            </Badge>
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-xs text-gray-500 mt-2 ml-6">{event.description}</p>
                        )}
                      </div>
                    ))}
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