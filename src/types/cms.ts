export type SiteSectionKey = "inicio" | "nosotros" | "contacto";

export type SiteSection = {
  id: string;
  key: SiteSectionKey;
  name: string;
  is_active: boolean;
  updated_at: string;
};

export type HeroContent = {
  id: string;
  section_id: string;
  title: string;
  description: string;
  primary_button_text: string;
  primary_button_href: string;
  secondary_button_text: string;
  secondary_button_href: string;
  updated_at: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  image_path: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type AboutContent = {
  id: string;
  section_id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_path: string | null;
  updated_at: string;
};

export type ContactContent = {
  id: string;
  section_id: string;
  phone: string;
  address: string;
  schedule: string;
  map_url: string;
  updated_at: string;
};

export type AdminProfile = {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "editor";
  is_active: boolean;
};

export type PublicSiteContent = {
  sections: Partial<Record<SiteSectionKey, SiteSection>>;
  hero: HeroContent | null;
  menu: MenuItem[];
  about: AboutContent | null;
  contact: ContactContent | null;
};
