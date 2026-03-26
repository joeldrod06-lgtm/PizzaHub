"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import type { ContactContent } from "@/types/cms";

const footerLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

type FooterProps = {
  contact: ContactContent | null;
};

export function Footer({ contact }: FooterProps) {
  const smoothScroll = useSmoothScroll();

  return (
    <footer className="border-t border-[#E8E8E8]/5 bg-[#0A0A0A] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 sm:mb-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          <div>
            <div className="mb-3">
              <span className="text-xs font-light tracking-[0.2em] text-orange-400/60 sm:tracking-[0.3em]">
                PIZZAHUB
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed text-[#E8E8E8]/20">
              La nueva experiencia de pizza artesanal,{" "}
              <br className="hidden sm:block" />
              hecha con pasión desde 2026.
            </p>
          </div>
          <div>
            <h5 className="mb-3 text-xs font-light tracking-wider text-[#E8E8E8]/50 sm:mb-4">
              ENLACES
            </h5>
            <ul className="space-y-2 text-xs text-[#E8E8E8]/20">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      smoothScroll(link.href);
                    }}
                    className="transition-colors duration-200 hover:text-orange-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-xs font-light tracking-wider text-[#E8E8E8]/50 sm:mb-4">
              HORARIO
            </h5>
            <ul className="space-y-2 text-xs text-[#E8E8E8]/20">
              {contact?.schedule ? <li>{contact.schedule}</li> : null}
              <li className="text-orange-400/20">Delivery hasta 00:30</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-xs font-light tracking-wider text-[#E8E8E8]/50 sm:mb-4">
              SOCIAL
            </h5>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-xs text-[#E8E8E8]/20 transition-colors duration-200 hover:text-orange-400"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-xs text-[#E8E8E8]/20 transition-colors duration-200 hover:text-orange-400"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-xs text-[#E8E8E8]/20 transition-colors duration-200 hover:text-orange-400"
              >
                X
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E8E8E8]/5 pt-6 text-center text-[9px] font-light tracking-wide text-[#E8E8E8]/20 sm:pt-8 sm:text-[10px]">
          © 2026 PizzaHub. Todos los derechos reservados. | Hecho con pasión
          desde cero
        </div>
      </div>
    </footer>
  );
}
