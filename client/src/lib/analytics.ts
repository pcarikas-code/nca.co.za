declare global {
  interface Window {
    dataLayer: any[];
    // gtag is already declared in DebtCounsellors.tsx, we need to match that signature or extend it compatibly
    // The previous declaration was: (command: string, action: string, params?: any) => void;
    // We will rely on the existing declaration or make this one compatible if it's the first one.
    // Since we are in a module, this is an augmentation.
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA_MEASUREMENT_ID is missing');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  // Load the script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Config
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
    search_category: 'FAQ'
  });
};
