"use client";

import { useCallback, useState } from "react";

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
  };
}
