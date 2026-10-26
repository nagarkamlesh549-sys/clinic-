"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, MessageSquare, ShieldAlert } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#061527]/90 backdrop-blur-md text-slate-300 pt-16 pb-24 md:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white shadow-md">
                <span className="font-serif font-bold text-base">N</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Netram <span className="text-teal-light font-normal text-xl">Eye Care</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Advanced ophthalmic surgical centre led by Dr. Siddharth Malaiya [MS (Ophth.), FLVPEI (Hyd.)], providing specialized laser, cataract, and corneal eye care in Bhopal.
            </p>
            <div className="pt-1">
              <a
                href={CLINIC_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/20 text-teal-light border border-teal/40 text-xs font-semibold hover:bg-teal hover:text-white transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Meet the Doctor</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Netram</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">Patient Journey</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Common Questions</a>
              </li>
              <li>
                <a href="#visit-us" className="hover:text-white transition-colors">Visit & Timings</a>
              </li>
            </ul>
          </div>

          {/* Specialized Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider">
              Clinical Specialities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Advanced Laser Eye Treatment</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Cataract Surgery (Phacoemulsification)</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Cornea Transplant Centre</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Comprehensive Eye Diagnostics</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Corneal Topography & Slit-lamp Care</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-gold uppercase tracking-wider">
              Clinic Contact & Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {CLINIC_INFO.contact.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <a href={CLINIC_INFO.contact.phoneTel} className="font-semibold text-white hover:text-teal-light">
                  {CLINIC_INFO.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p>Mon – Sat: 10:00 AM – 9:00 PM</p>
                  <p className="text-amber-400 font-semibold">Sunday: CLOSED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Awareness Disclaimer */}
        <div className="py-6 border-b border-white/10 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">Medical Awareness Notice:</strong> Information on this website is for general awareness and is not a substitute for medical advice. Eye conditions require in-person clinical examination and individualized medical diagnosis. No guarantees or specific clinical outcomes are implied.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {currentYear} Netram Eye Care. All rights reserved.</p>
          <p>Dr. Siddharth Malaiya [MS (Ophth.), FLVPEI (Hyd.)] · Kolar Road, Bhopal</p>
        </div>
      </div>
    </footer>
  );
}
