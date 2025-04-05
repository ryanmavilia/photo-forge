"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Photo Picker", path: "/photo-picker" },
    { label: "Caption Generator", path: "/caption-generator" },
    { label: "Watermarking Tool", path: "/watermarking-tool" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-400"
            >
              <path d="M15 8h.01" />
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
              <path d="M4 22h16" />
              <path d="M2 17l5-5 5 5" />
              <path d="M18 12l-5-5-5 5" />
            </svg>
            <span>Photo Assistant</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-50 focus:outline-none md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="animate-fade-in md:hidden">
          <div className="border-t border-gray-800 px-4 pt-4 pb-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
