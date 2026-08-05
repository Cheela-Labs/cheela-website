import type { Metadata } from "next";
import { LegalPage, List, Section } from "@/components/legal/legal-page";
import { legal, SUBPROCESSORS } from "@/lib/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Privacy Policy",
  "What Cheela Labs collects, why, how long we keep it, and who else sees it.",
  { path: "/privacy" },
);

export default function PrivacyPage() {
  return (
    <LegalPage
      description="What we collect, why, how long we keep it, and who else sees it."
      slug="privacy"
      title="Privacy Policy"
    >
      <Section id="summary" title="In short">
        <p>
          <strong>We do not store the messages your users write.</strong> An
          execution&rsquo;s trace records the <em>shape</em> of the conversation
          — who spoke and what kind of parts their turn had — and nothing they
          said. The exception is capability inputs and outputs, which are stored
          so you can debug a capability, and which often contain user text
          rephrased. That distinction is the most important thing on this page,
          so it is stated first rather than buried.
        </p>
      </Section>

      <Section id="collected" title="1. Information we collect">
        <p>
          <strong>Account information.</strong> Your email address, a hashed
          password if you registered with one, and your plan and its expiry.
        </p>
        <p>
          <strong>Runtime metadata.</strong> Runtime identifiers, names,
          versions, capability manifests, your HTTPS endpoint, allowed origins,
          and your API keys — stored hashed for verification and encrypted at
          rest so they can be shown to you again.
        </p>
        <p>
          <strong>Execution records.</strong> For every execution we store the
          identifier, runtime, status, duration, token counts, finish reason,
          any error, and the turn structure of the conversation. We also store
          each capability call: its name, timing, and its input and output
          payloads, truncated at 64 KB.
        </p>
        <p>
          <strong>Usage counters.</strong> Per-hour and per-day counts of
          executions, errors, tokens and capability calls, per runtime and
          project.
        </p>
      </Section>

      <Section id="prompts" title="2. Prompt and message data">
        <p>
          Message content is <strong>not written to our database</strong>. While
          an execution runs, the conversation is held in memory and sent to the
          model provider; when it finishes, what persists is one entry per turn
          recording the role and the types of its parts.
        </p>
        <p>
          Capability inputs and outputs <em>are</em> stored, because they are
          how you debug a capability being called with the wrong arguments. Tool
          arguments are frequently a user&rsquo;s own words rephrased, so treat
          a capability signature as a decision about what gets retained.
        </p>
      </Section>

      <Section id="authentication" title="3. Authentication data">
        <p>
          Authentication is handled by SuperTokens. Registering with an email
          address stores that address and a hash of your password — never the
          password. Signing in with Google or GitHub stores the identifier they
          return and the email address on the account; we never receive your
          password for those services.
        </p>
      </Section>

      <Section id="cookies" title="4. Cookies">
        <p>
          We set session cookies to keep you signed in, one preference cookie
          recording which project you selected, and analytics cookies only after
          you consent. The Cookie Policy lists every one by name.
        </p>
      </Section>

      <Section id="analytics" title="5. Analytics">
        <p>
          The public website uses Google Analytics. It does not load until you
          accept analytics cookies in the banner, and consent defaults to denied
          under Google Consent Mode v2. Declining leaves the site fully
          functional.
        </p>
      </Section>

      <Section id="logs" title="6. Log files">
        <p>
          Our hosting providers record standard request logs — IP address,
          timestamp, path, status and user agent — for operating and securing
          the service. Our own application logs record request identifiers,
          routes, status codes and durations. We do not log message content, API
          keys or end-user credentials.
        </p>
      </Section>

      <Section id="payments" title="7. Payment information">
        <p>
          Payments are processed by Razorpay.{" "}
          <strong>
            Card and bank details are collected by Razorpay directly and never
            reach our servers.
          </strong>{" "}
          We store the order identifier, amount, currency, status and any coupon
          used, which is what lets us grant the plan you paid for and reconcile
          it later.
        </p>
      </Section>

      <Section id="retention" title="8. Data retention">
        <List
          items={[
            <>
              <strong>Execution traces</strong> — 7 days on Free, 90 days on
              Pro. Deleted automatically when the window passes, and immediately
              when you delete the runtime.
            </>,
            <>
              <strong>Usage counters</strong> — kept for the analytics window
              your plan includes, then deleted automatically.
            </>,
            <>
              <strong>Account and runtime records</strong> — for as long as the
              account exists.
            </>,
            <>
              <strong>Payment records</strong> — retained as long as tax and
              accounting law requires.
            </>,
          ]}
        />
        <p>
          Deleting a runtime deletes its execution traces immediately. Usage
          counters survive, because they are counts rather than content and are
          what billing reconciles against.
        </p>
      </Section>

      <Section id="security" title="9. Security">
        <List
          items={[
            "Traffic is served over HTTPS. Runtime endpoints must be HTTPS, except localhost in development.",
            "API keys are stored hashed for verification and encrypted at rest (AES-256-GCM) so they can be revealed to you again.",
            "Requests to your endpoint are HMAC-signed with a per-runtime secret, so your runtime can verify they came from us.",
            "The public key can be restricted to an allowed-origins list.",
            "Model access runs on our own provider credential — you never hand us a third-party API key.",
          ]}
        />
        <p>
          No system is perfectly secure. Report a vulnerability to{" "}
          <a href={`mailto:${legal.contact.security}`}>
            {legal.contact.security}
          </a>
          .
        </p>
      </Section>

      <Section id="sharing" title="10. Who else sees your data">
        <p>
          We do not sell personal data. We share it only with the processors
          below, and where the law requires it.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line-2 text-left">
                <th className="py-2 pr-4 font-semibold">Processor</th>
                <th className="py-2 pr-4 font-semibold">Purpose</th>
                <th className="py-2 font-semibold">Data</th>
              </tr>
            </thead>
            <tbody>
              {SUBPROCESSORS.map((processor) => (
                <tr className="border-b border-line-1" key={processor.name}>
                  <td className="py-2 pr-4 align-top font-medium">
                    {processor.name}
                  </td>
                  <td className="py-2 pr-4 align-top">{processor.purpose}</td>
                  <td className="py-2 align-top">{processor.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Some of these operate outside {legal.jurisdiction.country}, so
          operating the service involves transferring data internationally.
        </p>
      </Section>

      <Section id="rights" title="11. Your rights">
        <p>
          Subject to applicable law, you may ask us to give you a copy of your
          personal data, correct it, delete it, or restrict how we use it. You
          can withdraw analytics consent at any time through the cookie banner.
        </p>
        <p>
          You can delete runtimes and projects yourself from the dashboard. For
          anything else, write to{" "}
          <a href={`mailto:${legal.contact.privacy}`}>
            {legal.contact.privacy}
          </a>{" "}
          and we will respond within 30 days.
        </p>
      </Section>

      <Section id="children" title="12. Children">
        <p>
          The service is not for anyone under 18 and we do not knowingly collect
          their data. If you believe a child has given us personal data, write
          to{" "}
          <a href={`mailto:${legal.contact.privacy}`}>
            {legal.contact.privacy}
          </a>{" "}
          and we will delete it.
        </p>
      </Section>

      <Section id="contact" title="13. Contact">
        <p>
          {legal.operator.name}
          <br />
          {legal.operator.address}
          <br />
          <a href={`mailto:${legal.contact.privacy}`}>
            {legal.contact.privacy}
          </a>
        </p>
      </Section>
    </LegalPage>
  );
}
