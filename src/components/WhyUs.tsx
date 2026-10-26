"use client";

import {
  Cpu,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Clock,
  FileCheck,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

const iconMap = {
  Cpu: Cpu,
  GraduationCap: GraduationCap,
  HeartHandshake: HeartHandshake,
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  FileCheck: FileCheck,
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-transparent relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-teal-light bg-[#0B2545]/85 border border-teal/30 backdrop-blur-md shadow-md">
            Clinical Excellence & Ethics
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            Why Patients Trust Netram Eye Care
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            We prioritize clinical accuracy, ethical medical counsel, and genuine empathy over everything else.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CLINIC_INFO.whyChoosePoints.map((point) => {
            const IconComponent = iconMap[point.icon as keyof typeof iconMap] || ShieldCheck;

            return (
              <div
                key={point.title}
                className="bg-[#0B2545]/85 sm:bg-[#0B2545]/75 hover:bg-[#0B2545]/90 sm:backdrop-blur-md p-7 sm:p-8 rounded-luxury shadow-xl hover:shadow-[0_20px_40px_rgba(19,163,168,0.2)] border border-white/12 hover:border-teal/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/20 text-teal-light flex items-center justify-center mb-5 shrink-0 transition-transform group-hover:scale-105 border border-teal/20">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2.5 group-hover:text-teal-light transition-colors">
                  {point.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
