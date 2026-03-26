import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
  title: "PizzaHub",
  description: "Pizza artesanal hecha con pasión.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#0A0A0A] antialiased overflow-x-clip`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#E8E8E8] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
