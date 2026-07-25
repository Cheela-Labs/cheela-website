import { NavBar } from "@/components/chrome/nav-bar";
import { SiteFooter } from "@/components/chrome/site-footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
