import { getStoragePublicUrl, getSupabaseServerClient } from "@/lib/supabase";
import type {
  AboutContent,
  ContactContent,
  HeroContent,
  MenuItem,
  PublicSiteContent,
  SiteSection,
  SiteSectionKey,
} from "@/types/cms";

export async function getPublicSiteContent(): Promise<PublicSiteContent> {
  const supabase = getSupabaseServerClient();

  const [sectionsResult, heroResult, menuResult, aboutResult, contactResult] =
    await Promise.all([
      supabase.from("site_sections").select("id,key,name,is_active,updated_at"),
      supabase.from("hero_content").select("*").maybeSingle(),
      supabase
        .from("menu_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
      supabase.from("about_content").select("*").maybeSingle(),
      supabase.from("contact_content").select("*").maybeSingle(),
    ]);

  const sections = (sectionsResult.data ?? []).reduce<
    Partial<Record<SiteSectionKey, SiteSection>>
  >((acc, section) => {
    acc[section.key as SiteSectionKey] = section as SiteSection;
    return acc;
  }, {});

  const hero = heroResult.data as HeroContent | null;
  const about = aboutResult.data as AboutContent | null;
  const contact = contactResult.data as ContactContent | null;

  const menu = ((menuResult.data ?? []) as MenuItem[]).map((item) => ({
    ...item,
    image_url: item.image_url ?? getStoragePublicUrl(item.image_path),
  }));

  const normalizedAbout = about
    ? {
        ...about,
        image_url: about.image_url ?? getStoragePublicUrl(about.image_path),
      }
    : null;

  return {
    sections,
    hero,
    menu,
    about: normalizedAbout,
    contact,
  };
}
