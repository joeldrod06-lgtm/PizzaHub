"use client";

import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ContactContent } from "@/types/cms";

type ContactProps = {
  content: ContactContent;
};

export function Contact({ content }: ContactProps) {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-md border border-[#E8E8E8]/10 bg-[#0F0F0F] p-6 transition-all duration-500 hover:border-orange-500/30 sm:p-8 md:p-12 lg:p-16">
          <div className="mb-6 text-center sm:mb-8 md:mb-10">
            <h2 className="mb-2 text-2xl font-light tracking-tight text-[#E8E8E8] sm:mb-3 sm:text-3xl md:text-4xl">
              Contacto
            </h2>
            <p className="px-4 text-xs font-light tracking-wide text-[#E8E8E8]/40 sm:text-sm">
              ¡Estamos listos para atenderte! Haz tu pedido ahora
            </p>
            <div className="mx-auto mt-3 h-px w-10 bg-orange-500/20 sm:mt-4 sm:w-12 md:mt-5" />
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <div className="w-full sm:w-auto">
              <Button
                asChild
                className="group relative w-full overflow-hidden rounded-md border border-orange-500/20 bg-orange-500/10 px-6 py-4 text-sm font-medium tracking-wide text-orange-400 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/20 sm:px-8 sm:py-5"
              >
                <a href={`tel:${content.phone.replace(/\s+/g, "")}`}>
                  <span className="absolute inset-0 bg-orange-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Phone className="mr-2 h-4 w-4" />
                  {content.phone}
                </a>
              </Button>
            </div>
            <div className="w-full sm:w-auto">
              <Button className="group relative w-full overflow-hidden rounded-md border border-orange-500/20 bg-orange-500/10 px-6 py-4 text-sm font-medium tracking-wide text-orange-400 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/20 sm:px-8 sm:py-5">
                <span className="absolute inset-0 bg-orange-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-center gap-3 text-center text-xs text-[#E8E8E8]/30 sm:mt-8 sm:flex-row sm:gap-8">
            <a
              href={content.map_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 transition-colors hover:text-orange-300"
            >
              <MapPin className="h-3.5 w-3.5 text-orange-400/40" />
              <span className="tracking-wide">{content.address}</span>
            </a>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-3.5 w-3.5 text-orange-400/40" />
              <span className="tracking-wide">{content.schedule}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
