"use client";

import { useAdminNavigation } from "@/components/admin/AdminNavigationProvider";
import { AdminAboutView } from "@/components/admin/views/AdminAboutView";
import { AdminContactView } from "@/components/admin/views/AdminContactView";
import { AdminHeroView } from "@/components/admin/views/AdminHeroView";
import { AdminMenuView } from "@/components/admin/views/AdminMenuView";
import { AdminSummaryView } from "@/components/admin/views/AdminSummaryView";

export default function AdminDashboardPage() {
  const { selectedView } = useAdminNavigation();

  if (selectedView === "inicio") {
    return <AdminHeroView />;
  }

  if (selectedView === "menu") {
    return <AdminMenuView />;
  }

  if (selectedView === "nosotros") {
    return <AdminAboutView />;
  }

  if (selectedView === "contacto") {
    return <AdminContactView />;
  }

  return <AdminSummaryView />;
}
