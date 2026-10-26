"use client";

import { Zap, Eye, ShieldCheck, ArrowRight, MessageSquare, Check } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

const iconMap = {
  Laser: Zap,
  Eye: Eye,
  ShieldCheck: ShieldCheck,
};

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-teal-light bg-[#0B2545]/85 border border-teal/30 backdrop-blur-md shadow-md">
            Specialised Ophthalmic Services
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            Comprehensive Care for Your Vision
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            Focused, patient-centered ophthalmic solutions delivered with state-of-the-art diagnostic precision and evidence-based surgical methods.
          </p>
        </div>

        {/* 3 Animated Frosted Glass Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {CLINIC_INFO.services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Eye;
            const whatsappServiceUrl = `https://wa.me/917977192955?text=Hello%20Netram%20Eye%20Care%2C%20I%20would%20like%20to%20book%20a%20consultation%20for%20${encodeURIComponent(
              service.title
            )}.`;

            return (
              <div
                key={service.id}
                className="group relative bg-[#0B2545]/85 sm:bg-[#0B2545]/75 hover:bg-[#0B2545]/95 rounded-luxury-lg p-8 sm:p-9 shadow-2xl hover:shadow-[0_20px_40px_rgba(19,163,168,0.2)] border border-white/12 hover:border-teal/50 sm:backdrop-blur-md transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Subtle top gold accent bar on hover */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-teal/20 text-teal-light flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm border border-teal/20">
                    <IconComponent className="w-7 h-7 transition-colors" />
                  </div>

                  {/* Service Badge & Title */}
                  <span className="text-xs font-semibold text-gold tracking-wide uppercase">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1 mb-3 group-hover:text-teal-light transition-colors">
                    {service.title}
                  </h3>

                  {/* Patient-friendly description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-8 border-t border-white/10 pt-5">
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-teal/20 text-teal-light flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={whatsappServiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-teal text-white hover:bg-teal-hover font-semibold text-sm transition-all duration-300 shadow-lg shadow-teal/30 group/btn"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-white/90 group-hover/btn:text-white transition-colors" />
                      Book Consultation
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
