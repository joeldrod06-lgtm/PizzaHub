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
  href: string;
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
    href: "/admin",
    icon: LayoutGrid,
    description: "Vista general del contenido editable.",
  },
  {
    key: "inicio",
    label: "Inicio",
    href: "/admin/inicio",
    icon: BookOpenText,
    description: "Hero principal y CTAs.",
  },
  {
    key: "menu",
    label: "Menu",
    href: "/admin/menu",
    icon: Pizza,
    description: "Pizzas, precios y estado.",
  },
  {
    key: "nosotros",
    label: "Nosotros",
    href: "/admin/nosotros",
    icon: MessageSquareQuote,
    description: "Historia, imagen y descripcion.",
  },
  {
    key: "contacto",
    label: "Contacto",
    href: "/admin/contacto",
    icon: Phone,
    description: "Telefono, ubicacion, horario y link.",
  },
];

export const adminSections: AdminSectionSummary[] = [
  {
    key: "inicio",
    title: "Inicio",
    description: "Titulo, subtitulo y botones del hero.",
  },
  {
    key: "menu",
    title: "Menu",
    description: "Listado de pizzas visibles en la landing.",
  },
  {
    key: "nosotros",
    title: "Nosotros",
    description: "Seccion unica con titulo, imagen y descripcion.",
  },
  {
    key: "contacto",
    title: "Contacto",
    description: "Datos operativos y link de mapa.",
  },
];
