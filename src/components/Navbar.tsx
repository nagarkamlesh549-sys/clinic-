"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Menu, X, Phone, Clock } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const isPast = window.scrollY > 20;
      if (isPast !== lastScrolled) {
        lastScrolled = isPast;
        setIsScrolled(isPast);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Why Us", href: "#why-us" },
    { name: "Patient Journey", href: "#how-it-works" },
    { name: "Visit Us", href: "#visit-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B2545]/95 backdrop-blur-md shadow-lg py-3.5 border-b border-teal/15"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-teal rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal to-teal-light flex items-center justify-center text-white shadow-md shadow-teal/30 group-hover:scale-105 transition-transform shrink-0">
              <span className="font-serif font-bold text-lg text-white">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
                Netram <span className="text-teal-light font-normal text-lg sm:text-xl">Eye Care</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse ml-0.5"></span>
              </span>
              <span className="text-[10px] text-teal-soft/75 uppercase tracking-wider font-medium -mt-1 hidden sm:block">
                Advanced Ophthalmic Centre · Bhopal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (lg and up) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-200 hover:text-white relative py-1 transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Button Desktop (lg and up) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={CLINIC_INFO.contact.phoneTel}
              className="text-slate-200 hover:text-teal-light text-xs sm:text-sm font-medium flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 hover:border-teal/40 transition-all whitespace-nowrap"
              title="Call Clinic"
            >
              <Phone className="w-3.5 h-3.5 text-teal" />
              <span>{CLINIC_INFO.contact.phone}</span>
            </a>
            <a
              href={CLINIC_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal text-white text-sm font-semibold hover:bg-teal-hover transition-all duration-300 shadow-md shadow-teal/25 hover:shadow-teal/40 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Book on WhatsApp</span>
            </a>
          </div>

          {/* Tablet & Mobile Hamburger Button (below lg) */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <a
              href={CLINIC_INFO.contact.phoneTel}
              className="text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/20 sm:hidden"
            >
              <Phone className="w-3 h-3 text-teal" />
              <span>Call</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B2545]/98 border-b border-teal/20 backdrop-blur-xl px-4 pt-3 pb-6 transition-all duration-300 shadow-2xl">
          <nav className="flex flex-col gap-2.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-100 hover:text-white hover:bg-teal/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={CLINIC_INFO.contact.phoneTel}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/5"
              >
                <Phone className="w-4 h-4 text-teal" />
                <span>Call: {CLINIC_INFO.contact.phone}</span>
              </a>
              <a
                href={CLINIC_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-teal text-white font-semibold text-sm shadow-md shadow-teal/30"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Book on WhatsApp</span>
              </a>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-300 pt-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>Mon - Sat: 10 AM - 9 PM · Sun CLOSED</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
