import React, { useEffect } from 'react';

// This component injects the Google Analytics script and initializes it.
// It reads the measurement ID from environment variables.
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const Analytics: React.FC = () => {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics is not configured. Please set VITE_GA_MEASUREMENT_ID in your environment variables.');
      return;
    }

    // Prevent re-injection
    if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
        return;
    }

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]){ (window.dataLayer as any[]).push(args); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    return () => {
      // On component unmount, remove the script.
      // In a SPA, this might not be desired if you want it to persist across navigation.
      // For this app structure, it's fine.
      document.head.removeChild(script);
    }
  }, []);

  return null; // This component does not render anything
};

export default Analytics;