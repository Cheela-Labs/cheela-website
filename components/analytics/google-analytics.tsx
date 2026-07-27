import Script from "next/script";
import { CONSENT_STORAGE_KEY } from "./consent";
import { ConsentBanner } from "./consent-banner";

/**
 * Public measurement ID — it ships in the page source by design, so there is
 * nothing to protect here. The env var exists so a fork or a staging property
 * can point somewhere else without a code change.
 */
const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-J7246R6PZX";

/**
 * Server-only: reads VERCEL_ENV, which is not exposed to the browser. Render
 * this from a server component (the root layout), never from a client one.
 *
 * Local development and preview deployments are excluded so that `pnpm dev` and
 * every PR preview do not land in the same property as real traffic — sessions
 * from a developer reloading a page are indistinguishable from real ones once
 * they are in, and they cannot be retroactively filtered out.
 *
 * Unknown environments fall through to enabled. Failing the other way would
 * mean a self-hosted or non-Vercel deploy silently never reports, which is a
 * much harder problem to notice than a few extra events.
 */
function isEnabled(): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  if (process.env.VERCEL_ENV === "preview") return false;
  return true;
}

/**
 * Consent Mode v2 defaults, plus the usual gtag bootstrap.
 *
 * This is a plain inline script rather than next/script because ordering is
 * load-bearing: the defaults have to be in the dataLayer *before* gtag.js
 * processes it, or the library has already decided it may write cookies. An
 * inline script runs during HTML parse, which is the only way to guarantee that
 * against an async library load. `config` queued here is picked up when the
 * library arrives — the same way Google's own snippet works.
 *
 * Denied-by-default means no analytics cookie and no client identifier until
 * the visitor opts in; GA still receives cookieless pings so the traffic is not
 * simply invisible.
 */
function bootstrap(): string {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var stored = null;
try { stored = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}); } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: stored === 'granted' ? 'granted' : 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', ${JSON.stringify(MEASUREMENT_ID)});
`.trim();
}

export function GoogleAnalytics() {
  if (!isEnabled()) return null;

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: must run synchronously, before gtag.js */}
      <script dangerouslySetInnerHTML={{ __html: bootstrap() }} />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* Gated by the same check — no point asking for consent where nothing
          is measuring. */}
      <ConsentBanner />
    </>
  );
}
