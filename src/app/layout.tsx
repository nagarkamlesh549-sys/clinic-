import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Netram Eye Care | Eye Hospital in Kolar Road, Bhopal",
  description:
    "Netram Eye Care is a premier ophthalmic centre in Bhopal led by Dr. Siddharth Malaiya. Specialized in advanced laser eye surgery, micro-incision cataract procedures, and cornea transplants.",
  keywords: [
    "Netram Eye Care",
    "Eye Hospital Bhopal",
    "Dr Siddharth Malaiya",
    "Cataract Surgery Bhopal",
    "Laser Eye Treatment Kolar Road",
    "Cornea Transplant Centre Bhopal",
    "Ophthalmologist Kolar Road Bhopal",
  ],
  authors: [{ name: "Dr. Siddharth Malaiya" }],
  openGraph: {
    title: "Netram Eye Care | Premier Eye Hospital in Kolar Road, Bhopal",
    description:
      "Advanced laser, cataract and cornea care in Bhopal. Trustworthy, calm, and modern ophthalmic surgical excellence.",
    url: "https://netrameyecare.com",
    siteName: "Netram Eye Care",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netram Eye Care | Advanced Eye Clinic Bhopal",
    description:
      "Clear Vision. Trusted Care. Advanced laser, cataract, and cornea treatments in Kolar Road, Bhopal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "name": "Netram Eye Care",
    "description": "Advanced laser, cataract, and cornea transplant eye care hospital in Bhopal.",
    "telephone": "+91-79771-92955",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot no. 335, 80 Feet Rd, near Central Bank of India, Mandakini Society, Mandakini Colony, Kolar Rd",
      "addressLocality": "Bhopal",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "462042",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.1815,
      "longitude": 77.4262
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "21:00"
      }
    ],
    "medicalSpecialty": "Ophthalmology",
    "physician": {
      "@type": "Physician",
      "name": "Dr. Siddharth Malaiya",
      "medicalSpecialty": "Ophthalmologist & Cornea Specialist",
      "jobTitle": "Eye Surgeon at Netram Eye Care",
      "alumniOf": "L V Prasad Eye Institute (LVPEI)"
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#0B2545" />
      </head>
      <body className="bg-[#040D18] text-white min-h-screen selection:bg-teal selection:text-white">
        {children}
      </body>
    </html>
  );
}
