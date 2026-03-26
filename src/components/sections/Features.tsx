"use client";

import { features } from "@/data/features";

export function Features() {
  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 border-t border-[#E8E8E8]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group">
              <div className="mb-4 sm:mb-5 flex justify-center">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400/30 group-hover:text-orange-400/50 transition-colors duration-300" />
              </div>
              <h3 className="font-light text-xs sm:text-sm mb-2 tracking-wider text-[#E8E8E8]/70">
                {feature.title}
              </h3>
              <p className="text-[#E8E8E8]/20 text-[10px] sm:text-xs font-light mb-1">
                {feature.desc}
              </p>
              <p className="text-orange-400/20 text-[9px] sm:text-[10px] font-light">
                {feature.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
