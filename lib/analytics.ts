"use client";
// Eventos para GA4/GTM quando instalados. Sem analytics configurado, nao envia dados.
export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string,string>[];
  };
  if (analyticsWindow.gtag) analyticsWindow.gtag("event", event, params);
  else analyticsWindow.dataLayer?.push({ event, ...params });
}
