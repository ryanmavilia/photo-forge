import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photo Forge: Photography Assistant",
  description: "Photo selection and caption generation for photographers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-white`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="py-6 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Photo Forge. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
