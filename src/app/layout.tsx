import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/BottomNav';
import { CartProvider } from '@/context/CartContext';
import { PWAPrompt } from '@/components/PWAPrompt';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#1c1917', // stone-900
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Crave | Premium Indian-Chinese',
  description: 'Experience authentic Indian-Chinese flavors, fire-tossed to perfection. Order fresh Hakka Noodles, Manchurian, and Signature Fried Rice directly from our kitchen.',
  keywords: ['Indian Chinese', 'Restaurant', 'Food Delivery', 'Bangalore', 'Hakka Noodles', 'Manchurian', 'Indiranagar'],
  authors: [{ name: 'Crave Restaurant' }],
  openGraph: {
    title: 'Crave | Premium Indian-Chinese',
    description: 'Experience authentic Indian-Chinese flavors, fire-tossed to perfection. Order directly from our kitchen in Indiranagar.',
    url: 'https://crave.example.com',
    siteName: 'Crave',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Wok-tossed Chicken Fried Rice at Crave',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crave | Premium Indian-Chinese',
    description: 'Experience authentic Indian-Chinese flavors, fire-tossed to perfection.',
    images: ['https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=1200&h=630'],
  },
  appleWebApp: {
    title: 'Crave',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
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
