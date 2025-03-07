import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Portfolio Builder | Create Amazing Portfolios",
  description: "Build and customize professional portfolios with our easy-to-use platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tight glow-text">
              Portfolio<span className="text-blue-500">Builder</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/templates" className="hover:text-blue-400 transition-colors">
                Templates
              </Link>
              <Link href="/portfolio/1" className="hover:text-blue-400 transition-colors">
                Preview
              </Link>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button would go here */}
              <button className="text-foreground">
                Menu
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="mt-auto border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-3">Portfolio Builder</h3>
                <p className="text-sm opacity-70">
                  Create impressive portfolios in minutes with our customizable templates.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/templates" className="hover:text-blue-400 transition-colors">Browse Templates</Link></li>
                  <li><Link href="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                  <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Connect</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Discord
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm opacity-70">
              © {new Date().getFullYear()} Portfolio Builder. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}