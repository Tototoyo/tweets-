import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// Use environment variables for deployment. Users will set these on Vercel.
const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT_ID; 
const AD_SLOT = import.meta.env.VITE_ADSENSE_SLOT_ID;

type AdStatus = 'idle' | 'loading' | 'pushed' | 'error';

export const AdSenseUnit: React.FC = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<AdStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const isConfigured = React.useMemo(() => !!AD_CLIENT && !!AD_SLOT, []);

  useEffect(() => {
    if (!isConfigured) {
      setStatus('error');
      setErrorMessage('AdSense is not configured. Please set VITE_ADSENSE_CLIENT_ID and VITE_ADSENSE_SLOT_ID in your environment variables on Vercel.');
      return;
    }
    
    // Dynamically load AdSense script if not already present
    const scriptId = 'adsense-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    if (status !== 'idle') {
      return;
    }

    const container = adContainerRef.current;
    if (!container) return;

    const pushAd = () => {
      if (adContainerRef.current && adContainerRef.current.querySelector('iframe')) {
        return;
      }
      try {
        console.log('Pushing AdSense ad...');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setStatus('pushed');
      } catch (e: any) {
        console.error('AdSense push error:', e);
        setStatus('error');
        setErrorMessage(`AdSense failed to load. Error: ${e.message}. Check browser console and ad blockers.`);
      }
    };

    setStatus('loading');

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          pushAd();
          observer.disconnect();
          return;
        }
      }
    });

    observer.observe(container);

    const fallbackTimer = setTimeout(() => {
        // FIX: Removed `&& status !== 'pushed'` check. The `status` variable in this closure is stale,
        // which caused a TypeScript error because the type was narrowed to 'idle'.
        // The check is also redundant as `pushAd` has an internal guard.
        if (container.clientWidth > 0) {
            console.log('Pushing AdSense ad via fallback timer.');
            pushAd();
            observer.disconnect();
        }
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [isConfigured, status]);

  const renderContent = () => {
    switch (status) {
      case 'error':
        return <p className="text-sm text-red-400 p-4 text-center">{errorMessage}</p>;
      case 'loading':
         return <p className="text-sm text-zinc-500">Loading ad...</p>;
      case 'pushed':
      case 'idle':
      default:
        if (isConfigured) {
          return (
            <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={AD_SLOT}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
          );
        }
        return null;
    }
  };


  return (
    <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
                ref={adContainerRef}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg flex items-center justify-center min-h-[100px] text-zinc-500 w-full"
            >
              {renderContent()}
            </div>
        </div>
    </section>
  );
};
