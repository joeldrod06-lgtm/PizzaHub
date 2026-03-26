import type { LucideIcon } from "lucide-react";
import { Award, Pizza, Truck, Users } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  detail: string;
};

export const features: Feature[] = [
  {
    icon: Truck,
    title: "Entrega Express",
    desc: "30 minutos o gratis",
    detail: "Tiempo garantizado",
  },
  {
    icon: Pizza,
    title: "Ingredientes Frescos",
    desc: "Selección diaria",
    detail: "Productos locales",
  },
  {
    icon: Award,
    title: "Receta Única",
    desc: "Masa madre artesanal",
    detail: "Fermentación 48h",
  },
  {
    icon: Users,
    title: "Atención 24/7",
    desc: "Siempre disponibles",
    detail: "Soporte inmediato",
  },
];
