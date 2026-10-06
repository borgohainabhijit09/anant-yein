import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/BottomNav';
import { CartProvider } from '@/context/CartContext';
import { PWAPrompt } from '@/components/PWAPrompt';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crave - Premium Fast Food',
  description: 'Order your favorite fast food online.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-900 text-stone-900`}>
        <CartProvider>
          <div className="mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-stone-50 shadow-2xl sm:border-x sm:border-stone-800">
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </main>
            <PWAPrompt />
            <BottomNav />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
