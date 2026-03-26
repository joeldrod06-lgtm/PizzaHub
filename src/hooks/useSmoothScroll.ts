"use client";

import { animate } from "framer-motion";
import { useCallback } from "react";

const HEADER_OFFSET = 96;

export function useSmoothScroll() {
  return useCallback((href: string, onComplete?: () => void) => {
    if (typeof window === "undefined" || !href.startsWith("#")) {
      onComplete?.();
      return;
    }

    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      onComplete?.();
      return;
    }

    const currentY = window.scrollY;
    const targetY = Math.max(
      target.getBoundingClientRect().top + currentY - HEADER_OFFSET,
      0
    );
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    animate(currentY, targetY, {
      duration: isMobile ? 0.35 : 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => window.scrollTo(0, value),
      onComplete: () => {
        window.history.replaceState(null, "", href);
        onComplete?.();
      },
    });
  }, []);
}
