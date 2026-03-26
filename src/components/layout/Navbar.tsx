"use client";

import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useMobileMenu } from "@/hooks/useMobileMenu";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#E8E8E8]/10 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 md:py-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 border border-orange-500/30 flex items-center justify-center hover:border-orange-500/50 transition-colors duration-300">
            <span className="text-[#E8E8E8] text-[10px] sm:text-xs font-light tracking-widest">
              PH
            </span>
          </div>
          <h1 className="font-light text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-[#E8E8E8] uppercase hover:tracking-[0.25em] sm:hover:tracking-[0.35em] transition-all duration-300">
            PizzaHub
          </h1>
        </div>

        <div className="hidden md:flex gap-6 lg:gap-10 text-sm font-light tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#E8E8E8]/50 hover:text-orange-400 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-[#E8E8E8]/70 hover:text-orange-400 transition-colors z-50"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>

        <Button className="hidden md:flex bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-md px-4 lg:px-5 py-2 lg:py-2.5 text-xs font-medium tracking-wider transition-all duration-300 border border-orange-500/20 hover:border-orange-500/30">
          <ShoppingBag className="w-3.5 h-3.5 mr-2" />
          PEDIR AHORA
        </Button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#E8E8E8]/10"
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-[#E8E8E8]/70 hover:text-orange-400 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <Button className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-md px-5 py-2.5 text-xs font-medium tracking-wider transition-all duration-300 border border-orange-500/20 w-full">
            <ShoppingBag className="w-3.5 h-3.5 mr-2" />
            PEDIR AHORA
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
