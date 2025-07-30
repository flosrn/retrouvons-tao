"use client";

import { useEffect } from 'react';

export default function AccessibilityImprovements() {
  useEffect(() => {
    // Skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Aller au contenu principal';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:underline';
    skipLink.setAttribute('accesskey', 's');
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Improve focus management
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to close modals
      if (e.key === 'Escape') {
        const dialogs = document.querySelectorAll('[role="dialog"]');
        dialogs.forEach(dialog => {
          const closeButton = dialog.querySelector('[aria-label*="Close"], [aria-label*="Fermer"]');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'page-announcer';
    document.body.appendChild(announcer);

    // High contrast mode detection
    const handleHighContrast = () => {
      const hasHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      document.documentElement.classList.toggle('high-contrast', hasHighContrast);
    };

    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    contrastQuery.addEventListener('change', handleHighContrast);
    handleHighContrast();

    // Reduced motion handling
    const handleReducedMotion = () => {
      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.documentElement.classList.toggle('reduce-motion', hasReducedMotion);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', handleReducedMotion);
    handleReducedMotion();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      contrastQuery.removeEventListener('change', handleHighContrast);
      motionQuery.removeEventListener('change', handleReducedMotion);
      
      // Cleanup elements
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
      if (announcer.parentNode) {
        announcer.parentNode.removeChild(announcer);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}