'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-3">
          <Link 
            href="/home"
            className={`flex flex-col items-center ${pathname === '/home' ? 'text-red-600' : 'text-gray-600'}`}
          >
            <span>Home</span>
          </Link>
          <Link 
            href="/matches"
            className={`flex flex-col items-center ${pathname === '/matches' ? 'text-red-600' : 'text-gray-600'}`}
          >
            <span>Matches</span>
          </Link>
          <Link 
            href="/profile"
            className={`flex flex-col items-center ${pathname === '/profile' ? 'text-red-600' : 'text-gray-600'}`}
          >
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 