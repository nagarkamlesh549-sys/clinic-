"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function VisitUs() {
  const schedule = [
    { day: "Monday", hours: "10:00 AM – 9:00 PM", status: "Open" },
    { day: "Tuesday", hours: "10:00 AM – 9:00 PM", status: "Open" },
    { day: "Wednesday", hours: "10:00 AM – 9:00 PM", status: "Open" },
    { day: "Thursday", hours: "10:00 AM – 9:00 PM", status: "Open" },
    { day: "Friday", hours: "10:00 AM – 9:00 PM", status: "Open" },
    { day: "Saturday", hours: "10:00 AM – 9:00 PM", status: "Open" },
    { day: "Sunday", hours: "CLOSED", status: "Closed", isClosed: true },
  ];

  return (
    <section id="visit-us" className="py-20 lg:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-teal-light bg-[#0B2545]/85 border border-teal/30 backdrop-blur-md shadow-md">
            Clinic Location & Timings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            Visit Netram Eye Care
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            Conveniently situated on 80 Feet Road in Mandakini Colony, Kolar Road, Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Contact, & Timings Table */}
          <div className="lg:col-span-6 space-y-6">
            {/* Address Card */}
            <div className="bg-[#0B2545]/80 backdrop-blur-md rounded-luxury p-7 sm:p-8 shadow-xl border border-white/12 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal/20 text-teal-light flex items-center justify-center shrink-0 border border-teal/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-white">
                    Clinic Address
                  </h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {CLINIC_INFO.contact.address}
                  </p>
                  <div className="pt-2">
                    <a
                      href={CLINIC_INFO.contact.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal text-white hover:bg-teal-hover font-semibold text-xs sm:text-sm transition-all shadow-md shadow-teal/30"
                    >
                      <Navigation className="w-4 h-4 text-white" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact direct link */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal/20 text-teal-light flex items-center justify-center shrink-0 border border-teal/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Direct Call</p>
                  <a
                    href={CLINIC_INFO.contact.phoneTel}
                    className="text-base sm:text-lg font-bold text-white hover:text-teal-light transition-colors"
                  >
                    {CLINIC_INFO.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Timings Table */}
            <div className="bg-[#0B2545]/80 backdrop-blur-md rounded-luxury p-7 sm:p-8 shadow-xl border border-white/12 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-light" />
                  <h3 className="font-serif text-xl font-bold text-white">
                    Consultation Hours
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-teal/20 text-teal-light font-semibold border border-teal/30">
                  Mon – Sat
                </span>
              </div>

              <div className="divide-y divide-white/10 text-sm">
                {schedule.map((item) => (
                  <div
                    key={item.day}
                    className={`py-2.5 flex items-center justify-between ${
                      item.isClosed
                        ? "bg-rose-950/40 -mx-4 px-4 rounded-lg font-medium text-rose-200 border border-rose-500/30"
                        : "text-slate-200"
                    }`}
                  >
                    <span className="font-medium">{item.day}</span>
                    <div className="flex items-center gap-2">
                      <span>{item.hours}</span>
                      {item.isClosed && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/30 text-rose-200 border border-rose-500/40">
                          Closed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-6 bg-[#0B2545]/80 backdrop-blur-md rounded-luxury p-3 shadow-xl border border-white/12 overflow-hidden h-full min-h-[460px] flex flex-col">
            <div className="relative w-full h-[380px] sm:h-[420px] lg:h-full rounded-[18px] overflow-hidden bg-slate-900 border border-white/10">
              <iframe
                title="Netram Eye Care Location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.4984577544093!2d77.42152862483863!3d23.18844837905872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43001889c095%3A0xe9fb56184a441e88!2sNetram%20Eye%20Care!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px]"
              />
            </div>
            <div className="p-3 text-center">
              <p className="text-xs text-slate-300">
                Landmark: Near Central Bank of India, 80 Feet Road, Mandakini Colony, Kolar Road
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
