'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

export function useNProgress() {
  const router = useRouter();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false,
      speed: 500,
      minimum: 0.1,
      trickleSpeed: 200,
    });

    // Store the original push method
    const originalPush = router.push;
    const originalReplace = router.replace;
    const originalBack = router.back;
    const originalForward = router.forward;

    // Override router methods to show progress
    router.push = (href: string, options?: any) => {
      NProgress.start();
      return originalPush.call(router, href, options);
    };

    router.replace = (href: string, options?: any) => {
      NProgress.start();
      return originalReplace.call(router, href, options);
    };

    router.back = () => {
      NProgress.start();
      return originalBack.call(router);
    };

    router.forward = () => {
      NProgress.start();
      return originalForward.call(router);
    };

    // Clean up
    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
      router.back = originalBack;
      router.forward = originalForward;
    };
  }, [router]);
}
