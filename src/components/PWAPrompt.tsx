'use client';
import { useEffect, useState } from 'react';
import { X, PlusSquare } from 'lucide-react';
import Image from 'next/image';

export function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (!showPrompt || isDismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none p-4 pb-20 sm:pb-4">
      <div className="bg-stone-900 border border-stone-700 p-5 rounded-2xl w-full max-w-md shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-300">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-[#d96c2c] rounded-xl flex items-center justify-center font-serif font-bold text-white text-xl">
              C
            </div>
            <div>
              <h4 className="text-stone-50 font-bold text-sm">Add CRAVE to Home Screen</h4>
              <p className="text-stone-400 text-xs mt-0.5">For a faster, seamless experience</p>
            </div>
          </div>
          <button 
            onClick={() => setIsDismissed(true)}
            className="text-stone-500 hover:text-stone-300 -mr-2 -mt-2 p-2"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex gap-3 mt-4">
          <button 
            onClick={() => setIsDismissed(true)}
            className="flex-1 bg-stone-800 text-stone-300 text-xs font-bold py-3 rounded-xl uppercase tracking-wider"
          >
            Not Now
          </button>
          <button 
            onClick={() => {
              // Usually you'd trigger the PWA beforeinstallprompt event here
              alert('On a real device, this would show the native install prompt!');
              setIsDismissed(true);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#c5a059] text-stone-900 text-xs font-bold py-3 rounded-xl uppercase tracking-wider shadow-lg"
          >
            <PlusSquare size={16} /> Install App
          </button>
        </div>
      </div>
    </div>
  );
}
