"use client";

import { MessageSquare, Phone, MapPin } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";
import EyeGraphic from "./EyeGraphic";
import StatusBadge from "./StatusBadge";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-2 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5">
            
            {/* Status & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <StatusBadge />
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#0B2545]/85 text-slate-200 border border-white/20 backdrop-blur-md shadow-md">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>Kolar Rd, Bhopal</span>
              </div>
            </div>

            {/* Headline with Drop Shadow */}
            <div className="space-y-2.5">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
                Clear Vision. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-[#7EE7E9] to-white">
                  Trusted Care.
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-slate-100 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {CLINIC_INFO.subtext}
              </p>
            </div>

            {/* Credibility Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-teal-soft/95 bg-[#0B2545]/90 border border-white/25 backdrop-blur-md shadow-md max-w-full">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
              <span>
                Led by <strong className="text-white font-medium">{CLINIC_INFO.doctor.name}</strong>{" "}
                <span className="text-slate-300 text-[11px] sm:text-xs">[{CLINIC_INFO.doctor.qualifications}]</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-1">
              <a
                href={CLINIC_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-teal text-white font-semibold text-sm sm:text-base hover:bg-teal-hover transition-all duration-300 shadow-xl shadow-teal/40 hover:shadow-teal/60 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>Book Appointment on WhatsApp</span>
              </a>

              <a
                href={CLINIC_INFO.contact.phoneTel}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-full bg-[#0B2545]/85 sm:bg-[#0B2545]/80 hover:bg-[#0B2545] text-white font-semibold text-sm sm:text-base border border-white/25 hover:border-white/40 sm:backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-teal" />
                <span>Call Now: {CLINIC_INFO.contact.phone}</span>
              </a>
            </div>

            {/* Trust Anchors */}
            <div className="pt-4 sm:pt-5 border-t border-white/15 w-full grid grid-cols-3 gap-2 sm:gap-4 text-center bg-[#0B2545]/85 sm:bg-[#0B2545]/70 sm:backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/10 shadow-md">
              <div className="px-1 py-1">
                <p className="text-xs sm:text-sm font-semibold text-white">Laser Precision</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300">Modern diagnostic care</p>
              </div>
              <div className="px-1 py-1 border-x border-white/15">
                <p className="text-xs sm:text-sm font-semibold text-white">Cataract Specialist</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300">Micro-incision surgery</p>
              </div>
              <div className="px-1 py-1">
                <p className="text-xs sm:text-sm font-semibold text-white">Cornea Centre</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300">Advanced restoration</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Optical Reticle Overlay (Desktop) */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative w-full pt-2 lg:pt-0">
            <EyeGraphic />
          </div>
        </div>
      </div>

      {/* Interactive Scroll Cue at Bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 opacity-80 pointer-events-none z-20">
        <span className="text-[10px] uppercase tracking-widest text-teal-light font-medium flex items-center gap-1.5 bg-[#0B2545]/85 px-3.5 py-1 rounded-full border border-teal/30 backdrop-blur-sm shadow-md">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-ping"></span>
          Scroll to explore care & open vision
        </span>
      </div>
    </section>
  );
}
