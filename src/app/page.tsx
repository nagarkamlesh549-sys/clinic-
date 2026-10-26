import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import MeetDoctor from "@/components/MeetDoctor";
import HowItWorks from "@/components/HowItWorks";
import PatientStories from "@/components/PatientStories";
import FAQ from "@/components/FAQ";
import VisitUs from "@/components/VisitUs";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import GlobalEyeBackground from "@/components/GlobalEyeBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-teal selection:text-white">
      {/* 0. Full-site Scroll-Synchronized Animated Eye Background Canvas */}
      <GlobalEyeBackground />

      {/* 1. Sticky Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        {/* Top Hero Section */}
        <Hero />

        {/* Subsequent Sections Floating Over The Animated Eye Canvas */}
        <div className="relative z-10">
          {/* 3. Core Specialities */}
          <Services />

          {/* 4. Why Choose Netram */}
          <WhyUs />

          {/* 5. Meet the Doctor (Dr. Siddharth Malaiya) */}
          <MeetDoctor />

          {/* 6. How It Works (Patient Journey) */}
          <HowItWorks />

          {/* 7. Patient Stories & Testimonial Carousel */}
          <PatientStories />

          {/* 8. Frequently Asked Questions */}
          <FAQ />

          {/* 9. Visit Us & Timings */}
          <VisitUs />

          {/* 10. Final Conversion Band */}
          <FinalCTA />
        </div>
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Persistent Conversion Utilities */}
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
}
