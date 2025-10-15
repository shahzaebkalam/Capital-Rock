'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Complete progress when route changes
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false,
      speed: 500,
      minimum: 0.1,
    });

    // Handle link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Only show progress for internal navigation
        if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
          NProgress.start();
        }
      }
    };

    // Handle form submissions
    const handleFormSubmit = () => {
      NProgress.start();
    };

    // Add event listeners
    document.addEventListener('click', handleLinkClick);
    document.addEventListener('submit', handleFormSubmit);

    // Clean up
    return () => {
      document.removeEventListener('click', handleLinkClick);
      document.removeEventListener('submit', handleFormSubmit);
      NProgress.done();
    };
  }, []);

  return null;
}
