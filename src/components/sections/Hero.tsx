"use client";

import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { staggerContainer, staggerItem } from "@/animations/stagger";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function Hero() {
  const smoothScroll = useSmoothScroll();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20 scroll-mt-24"
    >
      <div className="absolute inset-0">
        <Image
          src="/pizza-hero.png"
          alt="Pizza artesanal"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-[#0A0A0A]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 text-[#E8E8E8] px-4 sm:px-6 md:px-8 max-w-5xl"
      >
        <motion.div variants={staggerItem} className="mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-[11px] font-light tracking-[0.3em] sm:tracking-[0.4em] text-orange-400/60 uppercase">
            APERTURA 2026
          </span>
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] sm:leading-[1.05] tracking-tight mb-6 sm:mb-8"
        >
          <span className="block">Pizza</span>
          <span className="block text-orange-400 font-semibold">Artesanal</span>
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-base sm:text-lg md:text-xl text-[#E8E8E8]/50 mb-8 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide px-4 sm:px-0"
        >
          La nueva experiencia de pizza artesanal en la ciudad. Masa madre
          fresca, ingredientes premium y pasión por el buen sabor.
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center px-4 sm:px-0"
        >
          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              onClick={() => smoothScroll("#menu")}
              className="group relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] shadow-lg shadow-orange-500/20 w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              CONOCE NUESTRO MENÚ
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button className="group relative overflow-hidden bg-white/5 hover:bg-white/10 text-white rounded-md px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-sm font-medium tracking-wide border border-white/10 hover:border-orange-400/30 backdrop-blur transition-all duration-300 w-full sm:w-auto">
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Phone className="w-4 h-4 mr-2" />
              HAZ TU PEDIDO
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 sm:bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-12 sm:h-16 bg-orange-500/20" />
      </div>
    </section>
  );
}
