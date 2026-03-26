"use client";

import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <motion.section
      id="contacto"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0F0F0F] border border-[#E8E8E8]/10 rounded-md p-6 sm:p-8 md:p-12 lg:p-16 hover:border-orange-500/30 transition-all duration-500">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#E8E8E8] mb-2 sm:mb-3 tracking-tight">
              Contacto
            </h2>
            <p className="text-[#E8E8E8]/40 text-xs sm:text-sm font-light tracking-wide px-4">
              ¡Estamos listos para atenderte! Haz tu pedido ahora
            </p>
            <div className="w-10 sm:w-12 h-px bg-orange-500/20 mx-auto mt-3 sm:mt-4 md:mt-5" />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button className="group relative overflow-hidden bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-md px-6 sm:px-8 py-4 sm:py-5 text-sm font-medium tracking-wide border border-orange-500/20 hover:border-orange-500/30 transition-all duration-300 w-full">
                <span className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Phone className="w-4 h-4 mr-2" />
                442 000 0000
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button className="group relative overflow-hidden bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-md px-6 sm:px-8 py-4 sm:py-5 text-sm font-medium tracking-wide border border-orange-500/20 hover:border-orange-500/30 transition-all duration-300 w-full">
                <span className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </motion.div>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 text-xs text-[#E8E8E8]/30 text-center">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400/40" />
              <span className="tracking-wide">Av. Principal 123, Centro</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5 text-orange-400/40" />
              <span className="tracking-wide">Lun-Dom: 11:00 - 00:00</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
