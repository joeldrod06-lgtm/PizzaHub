"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

import type { AboutContent } from "@/types/cms";

type AboutProps = {
  content: AboutContent;
};

export function About({ content }: AboutProps) {
  const titleParts = content.title.split(" ");
  const titlePrefix = titleParts.slice(0, -1).join(" ");
  const titleAccent = titleParts.at(-1) ?? content.title;

  return (
    <section
      id="nosotros"
      className="scroll-mt-24 border-b border-t border-[#E8E8E8]/5 px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 sm:gap-12 md:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-orange-400/60 sm:mb-4 sm:text-[11px] sm:tracking-[0.3em]">
              Nuestra historia
            </span>
            <h2 className="mb-4 text-3xl font-light tracking-tight text-[#E8E8E8] sm:text-4xl md:mb-6 md:text-5xl">
              {titleParts.length > 1 ? (
                <>
                  {titlePrefix}{" "}
                  <span className="font-normal text-orange-400">{titleAccent}</span>
                </>
              ) : (
                content.title
              )}
            </h2>
            <p className="mb-4 text-sm font-light leading-relaxed text-[#E8E8E8]/40 sm:mb-6 sm:text-base">
              {content.description}
            </p>
            <div className="flex gap-6 sm:gap-8">
              <div>
                <div className="text-xl font-light text-orange-400/80 sm:text-2xl">
                  2026
                </div>
                <div className="text-[10px] tracking-wide text-[#E8E8E8]/30 sm:text-[11px]">
                  Año de apertura
                </div>
              </div>
              <div>
                <div className="text-xl font-light text-orange-400/80 sm:text-2xl">
                  100%
                </div>
                <div className="text-[10px] tracking-wide text-[#E8E8E8]/30 sm:text-[11px]">
                  Ingredientes frescos
                </div>
              </div>
              <div>
                <div className="text-xl font-light text-orange-400/80 sm:text-2xl">
                  24/7
                </div>
                <div className="text-[10px] tracking-wide text-[#E8E8E8]/30 sm:text-[11px]">
                  Atención continua
                </div>
              </div>
            </div>
          </div>

          <div className="group relative flex h-64 items-center justify-center overflow-hidden rounded-md border border-[#E8E8E8]/10 bg-gradient-to-br from-[#0F0F0F] to-[#141414] transition-all duration-500 hover:border-orange-500/30 sm:h-80 md:h-96">
            {content.image_url ? (
              <Image
                src={content.image_url}
                alt={content.title}
                fill
                className="object-cover opacity-80"
              />
            ) : (
              <div className="px-4 text-center">
                <Heart className="mx-auto mb-2 h-10 w-10 text-orange-400/20 transition-colors duration-300 group-hover:text-orange-400/30 sm:mb-3 sm:h-12 sm:w-12" />
                <p className="text-xs font-light tracking-wide text-[#E8E8E8]/20 sm:text-sm">
                  Hecho con pasión · Frescura · Sabor único
                </p>
                <div className="mx-auto mt-3 h-px w-10 bg-orange-500/20 sm:mt-4 sm:w-12" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
