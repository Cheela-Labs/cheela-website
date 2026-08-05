import type { Metadata } from "next";
import { LegalPage, Section } from "@/components/legal/legal-page";
import { legal } from "@/lib/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Cookie Policy",
  "Every cookie the Cheela site and dashboard set, and how to refuse them.",
  { path: "/cookies" },
);

/**
 * Named individually rather than described in categories.
 *
 * A cookie policy that says "we use essential cookies" tells a reader nothing
 * they can check. These are the actual names, read off the code that sets them.
 */
const COOKIES = [
  {
    name: "sAccessToken",
    category: "Essential — authentication",
    purpose: "Keeps you signed in to the dashboard. Set by SuperTokens.",
    duration: "Short-lived; refreshed automatically while you are active",
  },
  {
    name: "sRefreshToken",
    category: "Essential — authentication",
    purpose:
      "Obtains a new access token so you are not signed out mid-session. Set by SuperTokens.",
    duration: "Until you sign out or it expires",
  },
  {
    name: "cheela.project",
    category: "Preference",
    purpose:
      "Records which project you selected, so the dashboard shows the same one on your next visit. HttpOnly.",
    duration: "1 year",
  },
  {
    name: "cheela.consent.analytics",
    category: "Preference",
    purpose:
      "Stores your answer to the cookie banner. Held in local storage rather than a cookie, and kept whether you accept or decline — otherwise we would ask again on every page.",
    duration: "Until you clear site data",
  },
  {
    name: "_ga, _ga_*",
    category: "Analytics — set only after you accept",
    purpose:
      "Google Analytics. Distinguishes visitors and sessions so we can see which pages are read.",
    duration: "Up to 2 years",
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      description="Every cookie the site and dashboard set, and how to refuse them."
      slug="cookies"
      title="Cookie Policy"
    >
      <Section id="what" title="What we set">
        <p>
          Cookies are small files a site stores in your browser. We use as few
          as the product can work with. Nothing here tracks you across other
          websites, and we do not run advertising cookies.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line-2 text-left">
                <th className="py-2 pr-4 font-semibold">Name</th>
                <th className="py-2 pr-4 font-semibold">Category</th>
                <th className="py-2 pr-4 font-semibold">Purpose</th>
                <th className="py-2 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((cookie) => (
                <tr className="border-b border-line-1" key={cookie.name}>
                  <td className="py-2 pr-4 align-top font-mono text-xs">
                    {cookie.name}
                  </td>
                  <td className="py-2 pr-4 align-top">{cookie.category}</td>
                  <td className="py-2 pr-4 align-top">{cookie.purpose}</td>
                  <td className="py-2 align-top">{cookie.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="essential" title="Essential cookies">
        <p>
          The two SuperTokens session cookies are required. Without them we
          cannot tell one signed-in request from another, and the dashboard
          cannot work at all. They are not used for analytics or advertising,
          and there is no way to refuse them and remain signed in.
        </p>
      </Section>

      <Section id="preference" title="Preference cookies">
        <p>
          <code>cheela.project</code> remembers which project you selected. It
          holds an identifier and nothing else. Refusing it costs you nothing
          beyond the dashboard defaulting to your first project each time.
        </p>
      </Section>

      <Section id="analytics" title="Analytics cookies">
        <p>
          Google Analytics runs on the public website only, and only after you
          accept. We use Google Consent Mode v2 with consent denied by default,
          so nothing is set before you answer the banner. Declining leaves the
          site fully functional — every page works the same either way.
        </p>
      </Section>

      <Section id="managing" title="Managing cookies">
        <p>
          Change your analytics choice at any time through the cookie banner, or
          by clearing this site&rsquo;s data in your browser, which resets the
          banner.
        </p>
        <p>
          Every major browser lets you block or delete cookies in its settings.
          Blocking the session cookies will sign you out and prevent you from
          signing back in.
        </p>
      </Section>

      <Section id="contact" title="Questions">
        <p>
          Write to{" "}
          <a href={`mailto:${legal.contact.privacy}`}>
            {legal.contact.privacy}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
