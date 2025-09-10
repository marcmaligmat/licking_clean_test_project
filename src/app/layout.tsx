import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Licking Clean - Top-Rated Cleaning Services",
  description: "Professional house cleaning services with 5-star reviews. Book trusted, top-rated cleaners for your home. Mobile-friendly scheduling and reliable service.",
  keywords: "cleaning services, house cleaning, professional cleaners, home cleaning, maid service",
  robots: "index, follow",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lato.variable} font-lato antialiased bg-crisp-white text-slate-gray`}
      >
        {children}
      </body>
    </html>
  );
}
