"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import Image from "next/image";

import { staggerContainer, staggerItem } from "@/animations/stagger";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { createWhatsAppUrl } from "@/lib/contact";
import type { ContactContent, HeroContent } from "@/types/cms";

type HeroProps = {
  content: HeroContent;
  contact?: ContactContent | null;
};

export function Hero({ content, contact }: HeroProps) {
  const smoothScroll = useSmoothScroll();
  const titleParts = content.title.split(" ");
  const titlePrefix = titleParts.slice(0, -1).join(" ");
  const titleAccent = titleParts.at(-1) ?? content.title;
  const whatsappHref = contact
    ? createWhatsAppUrl(
        contact.phone,
        "Hola PizzaHub, quiero hacer un pedido. ¿Podrían ayudarme por favor?"
      )
    : null;
  const shouldUseWhatsApp =
    content.secondary_button_href === "#contacto" && Boolean(whatsappHref);

  const handleNavigate = (href: string) => {
    if (href.startsWith("#")) {
      smoothScroll(href);
      return;
    }

    window.location.href = href;
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 text-center scroll-mt-24"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/pizza-hero.png"
          alt="Pizza artesanal"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-[#0A0A0A]" />

      <motion.div
        variants={staggerContainer}
        initial={false}
        animate="show"
        className="relative z-10 max-w-5xl px-4 text-[#E8E8E8] sm:px-6 md:px-8"
      >
        <motion.div variants={staggerItem} className="mb-6 sm:mb-8">
          <span className="text-[10px] font-light uppercase tracking-[0.3em] text-orange-400/60 sm:text-[11px] sm:tracking-[0.4em]">
            APERTURA 2026
          </span>
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="mb-6 text-4xl font-light leading-[1.1] tracking-tight sm:mb-8 sm:text-5xl sm:leading-[1.05] md:text-7xl lg:text-8xl"
        >
          {titleParts.length > 1 ? (
            <>
              <span className="block">{titlePrefix}</span>
              <span className="block font-semibold text-orange-400">{titleAccent}</span>
            </>
          ) : (
            <span className="block font-semibold text-orange-400">{content.title}</span>
          )}
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mx-auto mb-8 max-w-2xl px-4 text-base font-light leading-relaxed tracking-wide text-[#E8E8E8]/50 sm:mb-12 sm:px-0 sm:text-lg md:text-xl"
        >
          {content.description}
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-5 sm:px-0"
        >
          <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              onClick={() => handleNavigate(content.primary_button_href)}
              className="group relative w-full overflow-hidden rounded-md bg-orange-500 px-6 py-4 text-sm font-medium tracking-wide text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-orange-600 sm:w-auto sm:px-8 sm:py-5 sm:hover:scale-[1.03] md:px-10 md:py-6"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {content.primary_button_text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              onClick={() =>
                handleNavigate(
                  shouldUseWhatsApp && whatsappHref ? whatsappHref : content.secondary_button_href
                )
              }
              className="group relative w-full overflow-hidden rounded-md border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium tracking-wide text-white backdrop-blur transition-all duration-300 hover:border-orange-400/30 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-5 md:px-10 md:py-6"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {shouldUseWhatsApp ? (
                <WhatsAppIcon className="mr-2 h-4 w-4" />
              ) : (
                <PhoneCall className="mr-2 h-4 w-4" />
              )}
              {content.secondary_button_text}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transform sm:bottom-12"
      >
        <div className="h-12 w-px bg-orange-500/20 sm:h-16" />
      </motion.div>
    </section>
  );
}
