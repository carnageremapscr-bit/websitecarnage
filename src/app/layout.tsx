
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "../components/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carnage Remaps | Professional ECU Remapping & Performance Tuning Canterbury Kent",
  description: "Professional ECU remapping, diagnostics & performance tuning services in Canterbury, Kent. Mobile service across Kent with 10+ years experience, custom remaps, DPF/EGR solutions & proven results. Book your free consultation today!",
  keywords: "ECU remapping, performance tuning, diagnostics, Canterbury, Kent, mobile service, DPF solutions, EGR, car remapping, vehicle tuning",
  authors: [{ name: "Carnage Remaps" }],
  robots: "index, follow",
  openGraph: {
    title: "Carnage Remaps | Professional ECU Remapping Canterbury Kent",
    description: "Professional ECU remapping & performance tuning services in Canterbury, Kent. Mobile service, custom remaps, proven results with 10+ years experience.",
    type: "website",
    locale: "en_GB",
    siteName: "Carnage Remaps",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carnage Remaps | Professional ECU Remapping Canterbury Kent",
    description: "Professional ECU remapping & performance tuning services in Canterbury, Kent. Mobile service, custom remaps, proven results.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", rel: "android-chrome", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", rel: "android-chrome", sizes: "512x512" },
    ],
  },
};




export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#facc15", // yellow-400
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "Carnage Remaps",
    "description": "Professional ECU remapping, diagnostics & performance tuning services in Canterbury, Kent",
    "url": "https://carnage-remaps.com",
    "telephone": "+44 7546 371963",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Canterbury",
      "addressRegion": "Kent",
      "addressCountry": "GB"
    },
    "areaServed": ["Canterbury", "Kent", "Ashford", "Maidstone", "Dover", "Folkestone"],
    "serviceType": ["ECU Remapping", "Performance Tuning", "Vehicle Diagnostics", "DPF Solutions", "EGR Solutions"],
    "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-16:00",
    "priceRange": "££",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "200+"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#facc15" />
        <meta name="theme-color" content="#facc15" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
