import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/Menu";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E8E8E8] font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] antialiased selection:bg-orange-500/30 selection:text-[#E8E8E8] overflow-x-clip">
      <Navbar />
      <Hero />
      <Features />
      <MenuSection />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
