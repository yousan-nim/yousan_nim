import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/NavBar";
import BackgroundVideo from "@/components/layout/BackgroundVideo";
import Preloader from "@/components/common/Preloader";
import NextTopLoader from "nextjs-toploader";
import FloatingAction from "@/components/common/FloatingAction";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yousan Nim – Full‑Stack Developer",
    template: "%s | Yousan Nim",
  },
  description:
    "I’m a full‑stack developer building high‑quality web applications and websites. Hire me to plan, design, and develop performant, scalable products.",
  keywords: [
    "Yousan Nim",
    "Full‑Stack Developer",
    "Web Developer",
    "Frontend",
    "Backend",
    "Next.js",
    "React",
    "Node.js",
    "Hire developer",
    "Web application",
    "Website development",
  ],
  authors: [{ name: "Yousan Nim" }],
  creator: "Yousan Nim",
  publisher: "Yousan Nim",
  category: "Technology",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yousan Nim – Full‑Stack Developer",
    description:
      "Full‑stack developer for hire. I build applications and websites with modern stacks (Next.js, React, Node.js).",
    siteName: "Yousan Nim",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/globe.svg",
        width: 1200,
        height: 630,
        alt: "Yousan Nim – Full‑Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yousan Nim – Full‑Stack Developer",
    description:
      "Full‑stack developer for hire. I build applications and websites with modern stacks (Next.js, React, Node.js).",
    images: ["/globe.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] w-screen min-h-screen relative`}
      >
        <I18nProvider>
          <NextTopLoader color="#a855f7" showSpinner={false} />
          <Preloader />
          <BackgroundVideo defaultSrc="/bg/238264.mp4" />
          <FloatingAction />
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
