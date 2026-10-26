"use client";

import { useEffect, useRef, useState } from "react";

export default function NavigationFeedback() {
  const [pending, setPending] = useState(false);
  const startingUrl = useRef("");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;
      const destination = new URL(link.href);
      if (destination.origin === location.origin && destination.href !== location.href &&
          (destination.pathname !== location.pathname || destination.search !== location.search)) {
        startingUrl.current = location.href;
        setPending(true);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!pending) return;
    let done: number | undefined;
    const check = window.setInterval(() => {
      if (location.href !== startingUrl.current) {
        window.clearInterval(check);
        done = window.setTimeout(() => setPending(false), 700);
      }
    }, 150);
    const limit = window.setTimeout(() => setPending(false), 30000);
    return () => { window.clearInterval(check); window.clearTimeout(limit); window.clearTimeout(done); };
  }, [pending]);

  return pending ? <div className="navigation-feedback" role="status" aria-live="polite">Abrindo página…</div> : null;
}
