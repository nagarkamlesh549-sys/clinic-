"use client";

import { MessageSquare, ScanEye, CheckCircle2, ArrowRight } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

const iconMap = {
  MessageSquare: MessageSquare,
  ScanEye: ScanEye,
  CheckCircle2: CheckCircle2,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-teal-light bg-[#0B2545]/85 border border-teal/30 backdrop-blur-md shadow-md">
            Simple & Transparent Process
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            How Your Care Journey Works
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            From your first message to post-treatment recovery, we ensure a smooth, transparent, and comfortable patient experience.
          </p>
        </div>

        {/* 3 Step Timeline */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-teal/20 via-gold/40 to-teal/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {CLINIC_INFO.journeySteps.map((step) => {
              const IconComponent = iconMap[step.icon as keyof typeof iconMap] || CheckCircle2;

              return (
                <div
                  key={step.step}
                  className="bg-[#0B2545]/85 sm:bg-[#0B2545]/75 hover:bg-[#0B2545]/90 rounded-luxury p-8 shadow-xl hover:shadow-[0_20px_40px_rgba(19,163,168,0.2)] border border-white/12 hover:border-teal/40 sm:backdrop-blur-md transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1.5"
                >
                  {/* Step Number Badge */}
                  <div className="w-16 h-16 rounded-full bg-[#07172C] text-white flex items-center justify-center font-serif font-bold text-xl mb-6 relative group-hover:scale-105 transition-transform shadow-md shadow-navy/20 border-2 border-gold/50">
                    <span className="text-gold">{step.step}</span>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shadow-sm">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-teal-light transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Action below steps */}
        <div className="mt-12 text-center">
          <a
            href={CLINIC_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-light hover:text-white group underline underline-offset-4 transition-colors"
          >
            <span>Have questions? Chat directly with clinic coordinator on WhatsApp</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
