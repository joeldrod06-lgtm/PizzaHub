"use client";

import { useEffect, useRef, useState } from "react";

import type { AdminFeedback } from "@/components/admin/AdminFeedbackBanner";

export function useAdminFeedback() {
  const [feedback, setFeedback] = useState<AdminFeedback | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showFeedback = (nextFeedback: AdminFeedback) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setFeedback(nextFeedback);
    timeoutRef.current = setTimeout(() => {
      setFeedback(null);
    }, 3500);
  };

  return {
    feedback,
    showFeedback,
    clearFeedback: () => setFeedback(null),
  };
}
