'use client';

import { Home, Heart, Calendar, Camera, User, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'ホーム' },
    { href: '/health', icon: Heart, label: '健康' },
    { href: '/calendar', icon: Calendar, label: 'カレンダー' },
    { href: '/album', icon: Camera, label: 'アルバム' },
    { href: '/pets', icon: User, label: 'プロフィール' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-amber-100 z-50">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg" 
                    : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                )}
              >
                <Icon className={cn("w-5 h-5 mb-1", isActive ? "text-white" : "")} />
                <span className={cn("text-xs font-medium", isActive ? "text-white" : "")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}