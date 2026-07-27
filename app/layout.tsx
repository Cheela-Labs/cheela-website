import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import JsonLd from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/metadata";

const ranade = localFont({
  src: "./fonts/Ranade-Variable.ttf",
  variable: "--font-ranade",
  weight: "100 900",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    ""
  )
    .split(",")[0]
    .trim();
  const protocol = (requestHeaders.get("x-forwarded-proto") ?? "https")
    .split(",")[0]
    .trim();
  const requestOrigin = host ? `${protocol}://${host}` : undefined;

  return createMetadata(
    "Infrastructure for AI Agents",
    "Build production-ready AI agents with provider-agnostic runtimes, SDKs, and developer infrastructure.",
    { path: "/", origin: requestOrigin },
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ranade.variable} ${jetbrainsMono.variable} bg-bg-page text-fg-primary antialiased`}
      >
        {children}
        <JsonLd />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
