"use client";

import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const smoothScroll = useSmoothScroll();

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-[#E8E8E8]/10 bg-[#0A0A0A]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8 md:py-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-orange-500/30 transition-colors duration-300 hover:border-orange-500/50 sm:h-9 sm:w-9">
            <span className="text-[10px] font-light tracking-widest text-[#E8E8E8] sm:text-xs">
              PH
            </span>
          </div>
          <h1 className="text-xs font-light uppercase tracking-[0.2em] text-[#E8E8E8] transition-all duration-300 hover:tracking-[0.25em] sm:text-sm sm:tracking-[0.3em] sm:hover:tracking-[0.35em]">
            PizzaHub
          </h1>
        </div>

        <div className="hidden gap-6 text-sm font-light tracking-wide md:flex lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                smoothScroll(link.href);
              }}
              className="text-[#E8E8E8]/50 transition-colors duration-200 hover:text-orange-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggleMenu}
          className="z-50 text-[#E8E8E8]/70 transition-colors hover:text-orange-400 md:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>

        <Button className="hidden rounded-md border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-medium tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/20 md:flex lg:px-5 lg:py-2.5">
          <ShoppingBag className="mr-2 h-3.5 w-3.5" />
          PEDIR AHORA
        </Button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-b border-[#E8E8E8]/10 bg-[#0A0A0A]/95 backdrop-blur-sm md:hidden"
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                smoothScroll(link.href, closeMenu);
              }}
              className="py-2 text-[#E8E8E8]/70 transition-colors hover:text-orange-400"
            >
              {link.label}
            </a>
          ))}
          <Button className="w-full rounded-md border border-orange-500/20 bg-orange-500/10 px-5 py-2.5 text-xs font-medium tracking-wider text-orange-400 transition-all duration-300 hover:bg-orange-500/20">
            <ShoppingBag className="mr-2 h-3.5 w-3.5" />
            PEDIR AHORA
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
