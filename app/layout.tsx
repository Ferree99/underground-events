import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { siteSettings } from "@/content/siteSettings";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.siteUrl),
  title: {
    default: siteSettings.defaultTitle,
    template: "%s — UNDERGROUND EVENTS",
  },
  description: siteSettings.defaultDescription,
  openGraph: {
    title: siteSettings.defaultTitle,
    description: siteSettings.defaultDescription,
    url: siteSettings.siteUrl,
    siteName: siteSettings.brandName,
    images: [siteSettings.ogImage],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.defaultTitle,
    description: siteSettings.defaultDescription,
    images: [siteSettings.ogImage],
  },
  icons: {
    icon: "/images/logo/favicon.ico",
    apple: "/images/logo/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteSettings.brandName,
  url: siteSettings.siteUrl,
  description: siteSettings.defaultDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ue-red focus:text-ue-white focus:px-4 focus:py-2"
        >
          Vai al contenuto principale
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
