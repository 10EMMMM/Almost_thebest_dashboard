
"use client";

import Image from 'next/image';
import { LoginForm } from '@/components/login-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

export default function Home() {
  const pageBackground = PlaceHolderImages.find(
    (img) => img.id === 'login-background'
  );
  const [animationClass, setAnimationClass] = useState('animate-tada');
  const [isSwapped, setIsSwapped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('animate-pulse-no-fade');
    }, 1000); // Switch to pulse after 1s (tada animation duration)

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-full flex-col items-center justify-center p-4">
      {pageBackground && (
        <Image
          src={pageBackground.imageUrl}
          alt={pageBackground.description}
          fill
          className={cn(
            'object-cover -z-10 brightness-50 transition-all duration-300'
          )}
          data-ai-hint={pageBackground.imageHint}
          priority
        />
      )}
      <Card
        className={cn(
          'w-[65vw] h-[60vh] overflow-hidden shadow-2xl bg-card border-0 transition-all duration-300 relative'
        )}
      >
        <div
          className={cn(
            'absolute top-0 h-full w-[60%] bg-card transition-all duration-700 ease-in-out',
            isSwapped ? 'left-[40%]' : 'left-0'
          )}
        >
          <div className="hidden md:flex items-end h-full px-24 py-32">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-8 left-8 rounded-full h-12 w-12 z-20"
              onClick={() => setIsSwapped(!isSwapped)}
            >
              {isSwapped ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              <span className="sr-only">Swap Layout</span>
            </Button>
            <div className="relative -left-24 transform md:scale-50 lg:scale-100">
              <div
                className={`text-8xl font-black leading-none transform rotate-4 relative z-10 ${animationClass}`}
              >
                <span
                  style={{
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    padding: '0 0.25rem',
                  }}
                  className="transform scale-x-75 scale-y-75 inline-block"
                >
                  ALMOST
                </span>
                <span
                  style={{ color: 'hsl(var(--primary))' }}
                  className="absolute right-5 -top-6 text-6xl"
                >
                  *
                </span>
              </div>
              <div
                className={`text-8xl font-black leading-none transform absolute top-12 left-0`}
              >
                <span
                  style={{ color: 'hsl(var(--primary))', padding: '0 0.25rem' }}
                  className="transform scale-x-75 scale-y-75 inline-block whitespace-nowrap"
                >
                  THE BEST
                </span>
              </div>
              <div
                className={`text-8xl font-black leading-none transform absolute top-[104px] -left-2`}
              >
                <span
                  style={{ color: 'hsl(var(--primary))', padding: '0 0.25rem' }}
                  className="transform scale-x-75 scale-y-75 inline-block whitespace-nowrap uppercase"
                >
                  dashboard
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            'absolute top-0 h-full w-[40%] bg-background/80 transition-all duration-700 ease-in-out',
            isSwapped ? 'left-0' : 'left-[60%]'
          )}
        >
          <div className="p-8 md:p-12 h-full">
            <LoginForm mode={isSwapped ? 'signin' : 'signup'} />
          </div>
        </div>
      </Card>
    </main>
  );
}
