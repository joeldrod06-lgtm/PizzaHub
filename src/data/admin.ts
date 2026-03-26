import type { LucideIcon } from "lucide-react";
import {
  BookOpenText,
  LayoutGrid,
  MessageSquareQuote,
  Phone,
  Pizza,
} from "lucide-react";

import type { AdminViewKey } from "@/components/admin/AdminNavigationProvider";

export type AdminNavItem = {
  key: AdminViewKey;
  label: string;
  icon: LucideIcon;
  description: string;
};

export type AdminSectionSummary = {
  key: Exclude<AdminViewKey, "resumen">;
  title: string;
  description: string;
};

export const adminNavItems: AdminNavItem[] = [
  {
    key: "resumen",
    label: "Resumen",
    icon: LayoutGrid,
    description: "Vista general del contenido editable.",
  },
  {
    key: "inicio",
    label: "Inicio",
    icon: BookOpenText,
    description: "Hero principal y CTAs.",
  },
  {
    key: "menu",
    label: "Menú",
    icon: Pizza,
    description: "Pizzas, precios y estado.",
  },
  {
    key: "nosotros",
    label: "Nosotros",
    icon: MessageSquareQuote,
    description: "Historia, imagen y descripción.",
  },
  {
    key: "contacto",
    label: "Contacto",
    icon: Phone,
    description: "Teléfono, ubicación, horario y link.",
  },
];

export const adminSections: AdminSectionSummary[] = [
  {
    key: "inicio",
    title: "Inicio",
    description: "Título, subtítulo y botones del hero.",
  },
  {
    key: "menu",
    title: "Menú",
    description: "Listado de pizzas visibles en la landing.",
  },
  {
    key: "nosotros",
    title: "Nosotros",
    description: "Sección única con título, imagen y descripción.",
  },
  {
    key: "contacto",
    title: "Contacto",
    description: "Datos operativos y link de mapa.",
  },
];
