"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Pizza,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { MenuItem } from "@/types/cms";

type MenuSectionProps = {
  items: MenuItem[];
};

function getSlidesPerView(width: number) {
  if (width >= 1024) {
    return 3;
  }

  if (width >= 768) {
    return 2;
  }

  return 1;
}

export function MenuSection({ items }: MenuSectionProps) {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const shouldUseCarousel = items.length > 3;
  const totalPages = Math.max(1, Math.ceil(items.length / slidesPerView));
  const safeCurrentPage = shouldUseCarousel
    ? Math.min(currentPage, totalPages - 1)
    : 0;

  const visibleItems = useMemo(() => {
    if (!shouldUseCarousel) {
      return items;
    }

    const start = safeCurrentPage * slidesPerView;
    return items.slice(start, start + slidesPerView);
  }, [items, safeCurrentPage, shouldUseCarousel, slidesPerView]);

  const goToPrevious = () => {
    setCurrentPage((current) => (current === 0 ? totalPages - 1 : current - 1));
  };

  const goToNext = () => {
    setCurrentPage((current) => (current === totalPages - 1 ? 0 : current + 1));
  };

  return (
    <section
      id="menu"
      className="bg-[#0A0A0A] px-4 py-16 scroll-mt-24 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-orange-400/60 sm:mb-3 sm:text-[11px] sm:tracking-[0.3em]">
              Sabores que enamoran
            </span>
            <h2 className="mb-3 text-3xl font-light tracking-tight text-[#E8E8E8] sm:text-4xl md:mb-4 md:text-5xl">
              Nuestro <span className="font-normal text-orange-400">Menu</span>
            </h2>
            <div className="mx-auto mt-3 h-px w-10 bg-orange-500/20 sm:mt-4 sm:w-12 md:mx-0" />
          </div>

          {shouldUseCarousel ? (
            <div className="flex items-center justify-center gap-2 md:justify-end">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={goToPrevious}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Ir al grupo ${index + 1} del menu`}
                    className={`h-2 rounded-full transition-all ${
                      index === safeCurrentPage
                        ? "w-8 bg-orange-400"
                        : "w-2 bg-white/20 hover:bg-white/35"
                    }`}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={goToNext}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((pizza, index) => {
            const badgeIndex = shouldUseCarousel
              ? safeCurrentPage * slidesPerView + index
              : index;

            return (
              <motion.div
                key={pizza.id}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="group flex h-full flex-col overflow-hidden rounded-md border border-[#E8E8E8]/10 bg-[#0F0F0F] shadow-2xl transition-all duration-500 hover:border-orange-500/30">
                  <div className="relative flex h-40 flex-shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[#141414] to-[#1A1A1A] sm:h-44 md:h-48 lg:h-52">
                    <div className="absolute inset-0 bg-orange-500/5 transition-all duration-500 group-hover:bg-orange-500/10" />
                    {pizza.image_url ? (
                      <Image
                        src={pizza.image_url}
                        alt={pizza.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <Pizza className="h-10 w-10 text-orange-400/20 transition-all duration-300 group-hover:text-orange-400/30 sm:h-12 sm:w-12 md:h-14 md:w-14" />
                    )}
                    {badgeIndex === 0 ? (
                      <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
                        <Star className="h-3 w-3 fill-orange-400 text-orange-400 sm:h-3.5 sm:w-3.5" />
                      </div>
                    ) : null}
                  </div>

                  <CardContent className="flex flex-grow flex-col p-4 sm:p-5 md:p-6 lg:p-7">
                    <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:mb-4 sm:flex-row sm:items-center sm:gap-0">
                      <div className="w-full flex-1">
                        <h3 className="mb-1 text-lg font-light tracking-wide text-[#E8E8E8] sm:mb-2 sm:text-xl">
                          {pizza.name}
                        </h3>
                        <p className="text-xs font-light leading-relaxed text-[#E8E8E8]/40 sm:text-sm">
                          {pizza.description}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-lg font-medium text-orange-400 sm:text-xl">
                        ${Number(pizza.price).toFixed(0)}
                      </span>
                    </div>

                    <div className="mt-auto pt-3 sm:pt-4">
                      {badgeIndex === 0 ? (
                        <div className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-orange-400/70 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[10px]">
                          <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          <span className="text-[9px] sm:text-[10px]">Mas pedida</span>
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {shouldUseCarousel ? (
          <div className="mt-8 text-center sm:mt-10 md:mt-12">
            <p className="text-xs tracking-wide text-[#E8E8E8]/35 sm:text-sm">
              Mostrando {visibleItems.length} de {items.length} pizzas
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
