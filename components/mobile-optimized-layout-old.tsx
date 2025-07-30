"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useMobileOptimizations, useViewportScroll } from '@/hooks/use-mobile-optimizations';
import { cn } from '@/lib/utils';

interface MobileOptimizedLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MobileOptimizedLayout({ 
  children, 
  className 
}: MobileOptimizedLayoutProps) {
  const { isMobile, isTouch, orientation, viewportHeight, safeAreaInsets } = useMobileOptimizations();
  const { scrollDirection, isScrolling, isNearTop } = useViewportScroll();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent hydration mismatch by waiting for client-side to be ready
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Add mobile-specific CSS custom properties
    document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
    document.documentElement.style.setProperty('--safe-area-inset-top', `${safeAreaInsets.top}px`);
    document.documentElement.style.setProperty('--safe-area-inset-bottom', `${safeAreaInsets.bottom}px`);
    document.documentElement.style.setProperty('--safe-area-inset-left', `${safeAreaInsets.left}px`);
    document.documentElement.style.setProperty('--safe-area-inset-right', `${safeAreaInsets.right}px`);

    // Add mobile classes to document
    document.documentElement.classList.toggle('mobile', isMobile);
    document.documentElement.classList.toggle('touch-device', isTouch);
    document.documentElement.classList.toggle('portrait', orientation === 'portrait');
    document.documentElement.classList.toggle('landscape', orientation === 'landscape');
  }, [isMobile, isTouch, orientation, viewportHeight, safeAreaInsets]);

  useEffect(() => {
    if (!isMobile) return;

    // Improved touch handling for mobile
    const preventDefault = (e: TouchEvent) => {
      // Allow scrolling but prevent bounce on iOS
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom on iOS
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

    // Add viewport meta tag optimization for mobile
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute(
      'content', 
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
    );

    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, [isMobile]);

  // Don't render until client-side is ready to prevent hydration issues
  if (!isReady) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={cn(
        'min-h-screen',
        // Mobile-specific optimizations
        isMobile && [
          'mobile-optimized',
          // Adjust for safe areas on notched devices
          safeAreaInsets.top > 0 && 'pt-safe',
          safeAreaInsets.bottom > 0 && 'pb-safe',
          // Smooth scrolling behavior
          'scroll-smooth',
          // Touch-friendly interactions
          isTouch && 'touch-device',
        ],
        // Scroll-based optimizations
        isScrolling && 'scrolling',
        scrollDirection === 'down' && !isNearTop && 'scroll-down',
        className
      )}
      style={{
        // Use CSS custom properties for dynamic values
        '--dynamic-vh': `${viewportHeight}px`,
        minHeight: isMobile ? 'calc(var(--dynamic-vh, 100vh))' : '100vh',
        paddingTop: isMobile ? `max(var(--safe-area-inset-top), 0px)` : undefined,
        paddingBottom: isMobile ? `max(var(--safe-area-inset-bottom), 0px)` : undefined,
        paddingLeft: isMobile ? `var(--safe-area-inset-left)` : undefined,
        paddingRight: isMobile ? `var(--safe-area-inset-right)` : undefined,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}