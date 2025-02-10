import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type React from "react"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AquaFlow - Premium Water Bottles",
  description: "Stay hydrated with our sustainable and stylish water bottles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="bg-white antialiased">
        <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
          <nav className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="AquaFlow"
                width={32}
                height={32}
                className="w-8 h-8"
                priority
              />
              <span className="text-xl font-medium text-neutral-900">
                AquaFlow
              </span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link
                href="/products"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                About
              </Link>
            </div>
          </nav>
        </header>
        <main className="pt-16">{children}</main>
        <footer className="mt-32 border-t border-neutral-200">
          <div className="max-w-screen-xl mx-auto px-6 py-12">
            <p className="text-neutral-500 text-sm text-center">
              © {new Date().getFullYear()} AquaFlow. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}