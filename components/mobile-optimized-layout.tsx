"use client";

import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MobileOptimizedLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MobileOptimizedLayout({ 
  children, 
  className 
}: MobileOptimizedLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Only run on client to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const checkMobile = () => window.innerWidth < 768;
      const checkTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(checkMobile());
      setIsTouch(checkTouch());

      const handleResize = () => {
        setIsMobile(checkMobile());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    // Set viewport height custom property
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    // Add mobile classes
    document.documentElement.classList.toggle('mobile', isMobile);
    document.documentElement.classList.toggle('touch-device', isTouch);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, [isClient, isMobile, isTouch]);

  useEffect(() => {
    if (!isClient || !isMobile || typeof window === 'undefined') return;

    // Mobile-specific optimizations
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      const lastTouch = (window as any).lastTouchTime || 0;
      if (now - lastTouch < 300) {
        e.preventDefault();
      }
      (window as any).lastTouchTime = now;
    };

    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });

    // Skip viewport meta manipulation - handled by Next.js layout
    // This prevents hydration mismatch issues

    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, [isClient, isMobile]);

  // Render with stable SSR/client structure
  return (
    <div 
      className={cn(
        'min-h-screen',
        isClient && isMobile && [
          'mobile-optimized',
          'scroll-smooth',
          isTouch && 'touch-device',
        ],
        className
      )}
      style={{
        minHeight: isClient && isMobile ? 'calc(var(--vh, 100vh) * 100)' : '100vh',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}