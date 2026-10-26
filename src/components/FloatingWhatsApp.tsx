"use client";

import { MessageSquare } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function FloatingWhatsApp() {
  return (
    // Only show floating button on desktop/tablet (md and up); mobile uses MobileStickyBar
    <aside
      aria-label="Desktop WhatsApp Contact"
      className="hidden md:flex fixed bottom-8 right-7 z-40 items-center group"
    >
      {/* Tooltip on hover */}
      <span className="mr-3 px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-medium shadow-md border border-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Book Appointment on WhatsApp
      </span>

      {/* Pulsing button */}
      <a
        href={CLINIC_INFO.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Netram Eye Care"
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Subtle Pulse Animation Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        <MessageSquare className="w-7 h-7 fill-white relative z-10" />
      </a>
    </aside>
  );
}
