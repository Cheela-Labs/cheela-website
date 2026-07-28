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

export default function Page() {
  return (
    <>
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
