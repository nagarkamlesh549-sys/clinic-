"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, AlertCircle } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function PatientStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CLINIC_INFO.testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === CLINIC_INFO.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = CLINIC_INFO.testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-transparent relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-teal-light bg-[#0B2545]/85 border border-teal/30 backdrop-blur-md shadow-md">
            Patient Feedback
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            Patient Stories & Experiences
          </h2>
          <p className="text-sm sm:text-base text-slate-200 font-normal">
            Real feedback from individuals and families who received care at Netram Eye Care.
          </p>
        </div>

        {/* Compliance / Placeholder Transparency Alert */}
        <div className="mb-8 p-3.5 rounded-xl bg-[#0B2545]/80 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-center gap-2 text-center max-w-2xl mx-auto backdrop-blur-md shadow-md">
          <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            <strong>Transparency Notice:</strong> Review cards below contain clearly marked <em>editable placeholders</em>. Never use synthetic reviews as real. Replace with authentic Google / Practo feedback.
          </span>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-[#0B2545]/80 backdrop-blur-md rounded-luxury-lg p-8 sm:p-12 shadow-2xl border border-white/12 max-w-3xl mx-auto">
          <Quote className="w-12 h-12 text-teal/20 absolute top-6 left-6 -z-0" />

          <div className="min-h-[220px] flex flex-col justify-between relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Star rating */}
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                  <span className="text-xs text-slate-300 ml-2 font-medium">5.0 Star Feedback</span>
                </div>

                {/* Quote */}
                <p className="text-base sm:text-xl text-slate-100 font-serif italic leading-relaxed">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>

                {/* Patient details & placeholder marker */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">
                      {currentTestimonial.author}
                    </p>
                    <p className="text-xs text-teal-light font-medium">
                      {currentTestimonial.treatment} · {currentTestimonial.city}
                    </p>
                  </div>

                  <span className="inline-block text-[11px] font-mono px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    {currentTestimonial.note}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {CLINIC_INFO.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-teal"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border border-white/15 text-slate-200 hover:bg-white/10 hover:border-teal/50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border border-white/15 text-slate-200 hover:bg-white/10 hover:border-teal/50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
