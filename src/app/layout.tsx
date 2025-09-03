import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Align — Find Your Realtor',
  description: 'Match with the right realtor based on your needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh flex flex-col">
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-[var(--border)]">
            <nav className="container flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="gradient-text">Align</span>
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/quiz" className="btn btn-outline">Take the Quiz</Link>
                <a href="#contact" className="btn btn-primary">Get Started</a>
                <ThemeToggle />
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-[var(--border)] mt-10">
            <div className="container py-8 text-sm muted flex items-center justify-between">
              <p>© {new Date().getFullYear()} Align</p>
              <div className="flex items-center gap-4">
                <Link href="/quiz" className="hover:text-white">Find My Realtor</Link>
                <Link href="/admin/login" className="hover:text-white">Admin</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
