"use client";

import { Phone, MessageSquare } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function MobileStickyBar() {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B2545]/95 backdrop-blur-lg border-t border-teal/20 px-4 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.2)] safe-area-pb"
    >
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {/* Call button */}
        <a
          href={CLINIC_INFO.contact.phoneTel}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 text-white font-semibold text-sm border border-white/20 active:bg-white/20 transition-colors"
        >
          <Phone className="w-4 h-4 text-teal" />
          <span>Call Clinic</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={CLINIC_INFO.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal text-white font-semibold text-sm shadow-md shadow-teal/30 active:bg-teal-hover transition-colors"
        >
          <MessageSquare className="w-4 h-4 fill-white/20" />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
