import type { MetadataRoute } from "next";
import { siteSettings } from "@/content/siteSettings";

const routes = [
  "",
  "/chi-siamo",
  "/servizi",
  "/eventi",
  "/eventi/last-call-2026",
  "/partner",
  "/contatti",
  "/preventivo",
  "/privacy-policy",
  "/cookie-policy",
  "/termini",
  "/regolamento-torneo",
  "/condizioni-spiedo",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteSettings.siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
