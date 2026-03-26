"use client";

import { Flame, Pizza, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pizzas } from "@/data/pizzas";

export function MenuSection() {
  return (
    <section
      id="menu"
      className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 bg-[#0A0A0A] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-12 md:mb-16 text-center md:text-left">
          <span className="text-orange-400/60 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase block mb-2 sm:mb-3">
            Sabores que enamoran
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#E8E8E8] mb-3 sm:mb-4">
            Nuestro <span className="font-normal text-orange-400">Menú</span>
          </h2>
          <div className="w-10 sm:w-12 h-px bg-orange-500/20 mt-3 sm:mt-4 mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {pizzas.map((pizza) => (
            <div key={pizza.name} className="h-full">
              <Card className="bg-[#0F0F0F] border border-[#E8E8E8]/10 rounded-md shadow-2xl hover:border-orange-500/30 transition-all duration-500 group overflow-hidden h-full flex flex-col">
                <div className="h-40 sm:h-44 md:h-48 lg:h-52 bg-gradient-to-br from-[#141414] to-[#1A1A1A] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-all duration-500" />
                  <Pizza className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-orange-400/20 group-hover:text-orange-400/30 transition-all duration-300" />
                  {pizza.popular ? (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400 fill-orange-400" />
                    </div>
                  ) : null}
                </div>

                <CardContent className="p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <div className="flex-1 w-full">
                      <h3 className="text-[#E8E8E8] font-light text-lg sm:text-xl tracking-wide mb-1 sm:mb-2">
                        {pizza.name}
                      </h3>
                      <p className="text-[#E8E8E8]/40 text-xs sm:text-sm font-light leading-relaxed">
                        {pizza.desc}
                      </p>
                    </div>
                    <span className="text-orange-400 font-medium text-lg sm:text-xl whitespace-nowrap">
                      {pizza.price}
                    </span>
                  </div>

                  <div className="mt-auto pt-3 sm:pt-4">
                    {pizza.popular && pizza.badge ? (
                      <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-orange-400/70 uppercase tracking-wider font-medium bg-orange-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                        <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="text-[9px] sm:text-[10px]">
                          {pizza.badge}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Button
            variant="ghost"
            className="text-[#E8E8E8]/40 hover:text-orange-400 rounded-none border-b border-[#E8E8E8]/20 hover:border-orange-400/30 text-xs sm:text-sm font-light tracking-wide py-2 transition-all duration-300"
          >
            VER MENÚ COMPLETO →
          </Button>
        </div>
      </div>
    </section>
  );
}
