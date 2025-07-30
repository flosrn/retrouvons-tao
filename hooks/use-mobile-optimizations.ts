"use client";

import { useEffect, useState, useCallback } from 'react';

export interface MobileOptimizations {
  isMobile: boolean;
  isTouch: boolean;
  orientation: 'portrait' | 'landscape';
  viewportHeight: number;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export function useMobileOptimizations(): MobileOptimizations {
  const [optimizations, setOptimizations] = useState<MobileOptimizations>({
    isMobile: false,
    isTouch: false,
    orientation: 'portrait',
    viewportHeight: 0,
    safeAreaInsets: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  const updateOptimizations = useCallback(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    const viewportHeight = window.visualViewport?.height || window.innerHeight;

    // Detect safe area insets (for notched devices)
    const computedStyle = getComputedStyle(document.documentElement);
    const safeAreaInsets = {
      top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0', 10),
      bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0', 10),
      left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0', 10),
      right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0', 10),
    };

    setOptimizations({
      isMobile,
      isTouch,
      orientation,
      viewportHeight,
      safeAreaInsets,
    });
  }, []);

  useEffect(() => {
    updateOptimizations();

    const handleResize = () => updateOptimizations();
    const handleOrientationChange = () => {
      // Delay to allow for viewport adjustment
      setTimeout(updateOptimizations, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Listen for visual viewport changes (mobile keyboard, etc.)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateOptimizations);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateOptimizations);
      }
    };
  }, [updateOptimizations]);

  return optimizations;
}

// Hook for touch-friendly interactions
export function useTouchInteractions() {
  const [touchState, setTouchState] = useState({
    isLongPress: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  const startTouch = useCallback((e: TouchEvent | React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));
  }, []);

  const moveTouch = useCallback((e: TouchEvent | React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));
  }, []);

  const endTouch = useCallback(() => {
    setTouchState(prev => ({
      ...prev,
      isLongPress: false,
    }));
  }, []);

  const getSwipeDirection = useCallback(() => {
    const deltaX = touchState.currentX - touchState.startX;
    const deltaY = touchState.currentY - touchState.startY;
    const threshold = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return Math.abs(deltaX) > threshold ? (deltaX > 0 ? 'right' : 'left') : null;
    } else {
      return Math.abs(deltaY) > threshold ? (deltaY > 0 ? 'down' : 'up') : null;
    }
  }, [touchState]);

  return {
    touchState,
    startTouch,
    moveTouch,
    endTouch,
    getSwipeDirection,
  };
}

// Hook for viewport-aware scrolling
export function useViewportScroll() {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollDirection: 'up' as 'up' | 'down',
    isScrolling: false,
    isNearTop: true,
    isNearBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
      const isNearTop = scrollY < 100;
      const isNearBottom = scrollY > document.documentElement.scrollHeight - window.innerHeight - 100;

      setScrollState({
        scrollY,
        scrollDirection,
        isScrolling: true,
        isNearTop,
        isNearBottom,
      });

      lastScrollY = scrollY;
      ticking = false;

      // Reset scrolling state after scroll ends
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollState(prev => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return scrollState;
}