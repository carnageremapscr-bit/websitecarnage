
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
  title: "Carnage Remaps - Professional ECU Remapping & Performance Tuning",
  description: "Leading ECU remapping specialists in Canterbury, Kent. Professional performance tuning, DPF deletes, EGR solutions, and custom dyno mapping. Same car, only better.",
  keywords: "ECU remapping, performance tuning, dyno mapping, DPF delete, EGR removal, Canterbury, Kent, car tuning, diesel tuning, petrol tuning, stage 1, stage 2, stage 3",
  authors: [{ name: "Carnage Remaps" }],
  creator: "Carnage Remaps",
  publisher: "Carnage Remaps",
  metadataBase: new URL("https://carnageremaps.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Carnage Remaps - Professional ECU Remapping & Performance Tuning",
    description: "Leading ECU remapping specialists in Canterbury, Kent. Same car, only better.",
    url: "https://carnageremaps.co.uk",
    siteName: "Carnage Remaps",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carnage Remaps - ECU Remapping Specialists",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carnage Remaps - Professional ECU Remapping & Performance Tuning",
    description: "Leading ECU remapping specialists in Canterbury, Kent. Same car, only better.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};




export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <NavBar />
        {children}
      </body>
    </html>
  );
}
