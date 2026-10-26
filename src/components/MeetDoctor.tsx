"use client";

import Image from "next/image";
import { GraduationCap, Award, Stethoscope, MessageSquare } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function MeetDoctor() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Doctor Portrait Column */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Soft Teal Ambient Glow Behind Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-teal/25 via-teal-soft/30 to-gold/20 rounded-[32px] blur-2xl opacity-70 pointer-events-none" />

              {/* Elegant Luxury Frame with Gold Border & Arch/Rounded Top */}
              <div className="relative rounded-[28px] overflow-hidden border-[2px] border-gold/70 bg-[#0B2545]/80 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md">
                {/* Image element keeping natural proportions and full visibility of face & folded arms */}
                <div className="relative aspect-[3/4] w-full bg-slate-900">
                  <Image
                    src={CLINIC_INFO.doctor.imagePath}
                    alt="Dr. Siddharth Malaiya - Eye Surgeon at Netram Eye Care, Bhopal"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Subtle inner gold vignette edge */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-gold/40 rounded-[28px] pointer-events-none" />
                </div>

                {/* Subtitle Badge below image */}
                <div className="bg-[#0B2545] text-white py-3.5 px-5 text-center border-t border-gold/40">
                  <p className="font-serif font-bold text-base tracking-wide text-white">
                    {CLINIC_INFO.doctor.name}
                  </p>
                  <p className="text-xs text-teal-light font-medium tracking-wider uppercase mt-0.5">
                    {CLINIC_INFO.doctor.qualifications}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Details & Intro Column */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-2 text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-teal-light bg-[#0B2545]/85 border border-teal/30 backdrop-blur-md shadow-md">
                Lead Ophthalmic Surgeon
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
                {CLINIC_INFO.doctor.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-sm sm:text-base font-medium">
                <span className="text-teal-light font-semibold">{CLINIC_INFO.doctor.qualifications}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">{CLINIC_INFO.doctor.title}</span>
              </div>
            </div>

            {/* Warm, simple 2-3 line patient-friendly intro */}
            <div className="space-y-3.5 text-slate-200 leading-relaxed text-base sm:text-lg font-light">
              <p>
                {CLINIC_INFO.doctor.bioParagraph1}
              </p>
              <p>
                {CLINIC_INFO.doctor.bioParagraph2}
              </p>
              <p>
                {CLINIC_INFO.doctor.bioParagraph3}
              </p>
            </div>

            {/* Key Clinical Credentials & Verified Background */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B2545]/75 border border-white/12 shadow-lg backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-teal/20 text-teal-light flex items-center justify-center shrink-0 border border-teal/30">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fellowship Training</h4>
                  <p className="text-xs text-slate-300 mt-0.5">L V Prasad Eye Institute (LVPEI, Hyderabad)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B2545]/75 border border-white/12 shadow-lg backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-teal/20 text-teal-light flex items-center justify-center shrink-0 border border-teal/30">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Specialisation</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Cataract, Laser Vision & Cornea Services</p>
                </div>
              </div>
            </div>

            {/* Clearly Marked Editable Placeholders for Doctor Details */}
            <div className="p-4 rounded-xl bg-[#0B2545]/60 border border-gold/40 text-xs text-slate-200 space-y-1.5 backdrop-blur-md">
              <div className="font-semibold flex items-center gap-1.5 text-gold">
                <Award className="w-3.5 h-3.5 text-gold" />
                <span>Customizable Credentials (Editable Placeholders):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                <li>[EDITABLE: Total years of ophthalmic practice]</li>
                <li>[EDITABLE: Specific surgical volume or specialized awards]</li>
                <li>[EDITABLE: Memberships (e.g., AIOS, MPSOS, DOS)]</li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href={CLINIC_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-teal text-white font-semibold text-sm hover:bg-teal-hover transition-all duration-300 shadow-xl shadow-teal/30 hover:shadow-teal/50 hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Book Consultation with Dr. Siddharth Malaiya</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
