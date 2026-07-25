import { AiNative } from "@/components/sections/home/ai-native";
import { Architecture } from "@/components/sections/home/architecture";
import { BlogPreview } from "@/components/sections/home/blog-preview";
import { CliExperience } from "@/components/sections/home/cli-experience";
import { DashboardPreview } from "@/components/sections/home/dashboard-preview";
import { Documentation } from "@/components/sections/home/documentation";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { PricingPreview } from "@/components/sections/home/pricing-preview";
import { Problem } from "@/components/sections/home/problem";
import { Solution } from "@/components/sections/home/solution";
import { getSiteUrl, siteDescription, siteName } from "@/lib/seo";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": getSiteUrl("/#organization"),
    name: siteName,
    url: getSiteUrl("/"),
    description: siteDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": getSiteUrl("/#website"),
    name: siteName,
    url: getSiteUrl("/"),
    description: siteDescription,
    publisher: {
      "@id": getSiteUrl("/#organization"),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": getSiteUrl("/#software-application"),
    name: siteName,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: getSiteUrl("/"),
    description: siteDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@id": getSiteUrl("/#organization"),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": getSiteUrl("/#breadcrumb"),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getSiteUrl("/"),
      },
    ],
  },
] as const;

export default function Page() {
  return (
    <>
      {structuredData.map((entry) => (
        <script key={entry["@id"]} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Architecture />
      <CliExperience />
      <DashboardPreview />
      <Documentation />
      <BlogPreview />
      <AiNative />
      <PricingPreview />
      <FinalCta />
    </>
  );
}
