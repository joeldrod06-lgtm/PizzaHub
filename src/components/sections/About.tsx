"use client";

import { Heart } from "lucide-react";

export function About() {
  return (
    <section
      id="nosotros"
      className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 border-t border-[#E8E8E8]/5 border-b border-[#E8E8E8]/5 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-orange-400/60 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase block mb-3 sm:mb-4">
              Nuestra historia
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-tight text-[#E8E8E8]">
              Pasión <span className="font-normal text-orange-400">por la pizza</span>
            </h2>
            <p className="text-[#E8E8E8]/40 text-sm sm:text-base font-light leading-relaxed mb-4 sm:mb-6">
              PizzaHub nace con una misión clara: llevar la auténtica pizza
              artesanal a cada rincón de la ciudad. Combinamos técnicas
              tradicionales con ingredientes de la más alta calidad.
            </p>
            <p className="text-[#E8E8E8]/30 text-xs sm:text-sm font-light leading-relaxed mb-6 sm:mb-8">
              Nuestra masa madre se prepara diariamente con 48 horas de
              fermentación, logrando una textura crujiente por fuera y suave por
              dentro. Cada ingrediente es seleccionado cuidadosamente para
              garantizar una experiencia única en cada bocado.
            </p>
            <div className="flex gap-6 sm:gap-8">
              <div>
                <div className="text-xl sm:text-2xl font-light text-orange-400/80">
                  2026
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#E8E8E8]/30 tracking-wide">
                  Año de apertura
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-light text-orange-400/80">
                  100%
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#E8E8E8]/30 tracking-wide">
                  Ingredientes frescos
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-light text-orange-400/80">
                  24/7
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#E8E8E8]/30 tracking-wide">
                  Atención continua
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-[#0F0F0F] to-[#141414] border border-[#E8E8E8]/10 rounded-md flex items-center justify-center group hover:border-orange-500/30 transition-all duration-500">
            <div className="text-center px-4">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400/20 mx-auto mb-2 sm:mb-3 group-hover:text-orange-400/30 transition-colors duration-300" />
              <p className="text-[#E8E8E8]/20 text-xs sm:text-sm font-light tracking-wide">
                Hecho con pasión · Frescura · Sabor único
              </p>
              <div className="mt-3 sm:mt-4 w-10 sm:w-12 h-px bg-orange-500/20 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
