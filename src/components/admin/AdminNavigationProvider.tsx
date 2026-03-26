"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AdminViewKey =
  | "resumen"
  | "inicio"
  | "menu"
  | "nosotros"
  | "contacto";

type AdminNavigationContextValue = {
  selectedView: AdminViewKey;
  setSelectedView: (view: AdminViewKey) => void;
};

const STORAGE_KEY = "pizzahub-admin-view";

const AdminNavigationContext = createContext<AdminNavigationContextValue | null>(
  null
);

export function AdminNavigationProvider({ children }: { children: ReactNode }) {
  const [selectedView, setSelectedView] = useState<AdminViewKey>("resumen");

  useEffect(() => {
    const savedView = window.localStorage.getItem(STORAGE_KEY) as AdminViewKey | null;

    if (savedView) {
      setSelectedView(savedView);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, selectedView);
  }, [selectedView]);

  const value = useMemo(
    () => ({
      selectedView,
      setSelectedView,
    }),
    [selectedView]
  );

  return (
    <AdminNavigationContext.Provider value={value}>
      {children}
    </AdminNavigationContext.Provider>
  );
}

export function useAdminNavigation() {
  const context = useContext(AdminNavigationContext);

  if (!context) {
    throw new Error("useAdminNavigation must be used inside AdminNavigationProvider");
  }

  return context;
}
