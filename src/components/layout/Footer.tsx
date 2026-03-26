"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const footerLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  const smoothScroll = useSmoothScroll();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#E8E8E8]/5 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10">
          <div>
            <div className="mb-3">
              <span className="text-orange-400/60 text-xs tracking-[0.2em] sm:tracking-[0.3em] font-light">
                PIZZAHUB
              </span>
            </div>
            <p className="text-[#E8E8E8]/20 text-xs font-light leading-relaxed">
              La nueva experiencia de pizza artesanal,{" "}
              <br className="hidden sm:block" />
              hecha con pasión desde 2026.
            </p>
          </div>
          <div>
            <h5 className="text-[#E8E8E8]/50 text-xs font-light mb-3 sm:mb-4 tracking-wider">
              ENLACES
            </h5>
            <ul className="space-y-2 text-[#E8E8E8]/20 text-xs">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      smoothScroll(link.href);
                    }}
                    className="hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[#E8E8E8]/50 text-xs font-light mb-3 sm:mb-4 tracking-wider">
              HORARIO
            </h5>
            <ul className="space-y-2 text-[#E8E8E8]/20 text-xs">
              <li>Lunes - Viernes: 11:00 - 00:00</li>
              <li>Sábado - Domingo: 12:00 - 01:00</li>
              <li className="text-orange-400/20">Delivery hasta 00:30</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[#E8E8E8]/50 text-xs font-light mb-3 sm:mb-4 tracking-wider">
              SOCIAL
            </h5>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[#E8E8E8]/20 hover:text-orange-400 text-xs transition-colors duration-200"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-[#E8E8E8]/20 hover:text-orange-400 text-xs transition-colors duration-200"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-[#E8E8E8]/20 hover:text-orange-400 text-xs transition-colors duration-200"
              >
                X
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E8E8E8]/5 pt-6 sm:pt-8 text-center text-[#E8E8E8]/20 text-[9px] sm:text-[10px] font-light tracking-wide">
          © 2026 PizzaHub. Todos los derechos reservados. | Hecho con pasión
          desde cero
        </div>
      </div>
    </footer>
  );
}
