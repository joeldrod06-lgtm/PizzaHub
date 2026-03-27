import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/Menu";
import { getPublicSiteContent } from "@/lib/cms";

export default async function Page() {
  const content = await getPublicSiteContent();
  const isContactVisible = content.sections.contacto?.is_active !== false;
  const visibleContact = isContactVisible ? content.contact : null;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E8E8E8] font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] antialiased selection:bg-orange-500/30 selection:text-[#E8E8E8] overflow-x-hidden">
      <Navbar />
      {content.sections.inicio?.is_active !== false && content.hero ? (
        <Hero content={content.hero} contact={visibleContact} />
      ) : null}
      <Features />
      <MenuSection items={content.menu} />
      {content.sections.nosotros?.is_active !== false && content.about ? (
        <About content={content.about} />
      ) : null}
      {isContactVisible && visibleContact ? (
        <Contact content={visibleContact} />
      ) : null}
      <Footer contact={visibleContact} />
    </main>
  );
}
