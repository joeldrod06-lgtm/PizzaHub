import type { LucideIcon } from "lucide-react";
import {
  BookOpenText,
  LayoutGrid,
  MessageSquareQuote,
  Phone,
  Pizza,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export type AdminSectionSummary = {
  title: string;
  description: string;
  route: string;
};

export const adminNavItems: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Resumen",
    icon: LayoutGrid,
    description: "Vista general del contenido editable.",
  },
  {
    href: "/admin/inicio",
    label: "Inicio",
    icon: BookOpenText,
    description: "Hero principal y CTAs.",
  },
  {
    href: "/admin/menu",
    label: "Menú",
    icon: Pizza,
    description: "Pizzas, precios y estado.",
  },
  {
    href: "/admin/nosotros",
    label: "Nosotros",
    icon: MessageSquareQuote,
    description: "Historia, imagen y descripción.",
  },
  {
    href: "/admin/contacto",
    label: "Contacto",
    icon: Phone,
    description: "Teléfono, ubicación, horario y link.",
  },
];

export const adminSections: AdminSectionSummary[] = [
  {
    title: "Inicio",
    description: "Título, subtítulo y botones del hero.",
    route: "/admin/inicio",
  },
  {
    title: "Menú",
    description: "Listado de pizzas visibles en la landing.",
    route: "/admin/menu",
  },
  {
    title: "Nosotros",
    description: "Sección única con título, imagen y descripción.",
    route: "/admin/nosotros",
  },
  {
    title: "Contacto",
    description: "Datos operativos y link de mapa.",
    route: "/admin/contacto",
  },
];
