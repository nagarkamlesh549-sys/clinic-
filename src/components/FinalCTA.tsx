"use client";

import Image from "next/image";
import { MessageSquare, Phone } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-[#061527]/85 via-[#0B2545]/80 to-[#0E2F56]/85 backdrop-blur-md text-white py-16 lg:py-20 relative overflow-hidden border-t border-teal/20">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Doctor Micro Avatar with Line */}
        <div className="inline-flex items-center gap-3.5 px-4 py-2 rounded-full bg-white/10 border border-gold/40 backdrop-blur-md shadow-md">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold shrink-0">
            <Image
              src={CLINIC_INFO.doctor.imagePath}
              alt="Dr. Siddharth Malaiya"
              fill
              className="object-cover object-top"
            />
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-100">
            Book your visit with <strong className="text-white font-bold">{CLINIC_INFO.doctor.name}</strong>
          </span>
        </div>

        {/* Main Title */}
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Your Eyes Deserve the Best Care
          </h2>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Experience thorough diagnostic evaluations, transparent medical counsel, and advanced surgical care in Bhopal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={CLINIC_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-teal text-white font-semibold text-base sm:text-lg hover:bg-teal-hover transition-all duration-300 shadow-xl shadow-teal/30 hover:shadow-teal/50 hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5 fill-white/20" />
            <span>Book Appointment on WhatsApp</span>
          </a>

          <a
            href={CLINIC_INFO.contact.phoneTel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4 text-teal" />
            <span>Call: {CLINIC_INFO.contact.phone}</span>
          </a>
        </div>

        {/* Micro reassurance */}
        <p className="text-xs text-teal-light/80">
          Monday to Saturday, 10:00 AM to 9:00 PM · Mandakini Colony, Kolar Road, Bhopal
        </p>
      </div>
    </section>
  );
}
