import type { Metadata } from "next";
import { LegalPage, List, Section } from "@/components/legal/legal-page";
import { legal } from "@/lib/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Terms of Service",
  "The agreement between you and Cheela Labs.",
  { path: "/terms" },
);

export default function TermsPage() {
  return (
    <LegalPage
      description="The agreement between you and Cheela Labs."
      slug="terms"
      title="Terms of Service"
    >
      <Section id="acceptance" title="1. Acceptance of terms">
        <p>
          These terms are an agreement between you and {legal.entity.name} (
          &ldquo;{legal.entity.tradingName}&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;). By creating an account, calling the API, or using
          the CLI, SDK or dashboard, you accept them. If you do not accept them,
          do not use the service.
        </p>
        <p>
          If you are accepting on behalf of a company, you confirm you are
          authorised to bind it, and &ldquo;you&rdquo; means that company.
        </p>
      </Section>

      <Section id="eligibility" title="2. Eligibility">
        <p>
          You must be at least 18 years old and legally capable of entering a
          contract. You must not be barred from receiving the service under the
          laws of {legal.jurisdiction.country} or any other applicable
          jurisdiction, and you must not be subject to sanctions that would
          prohibit us from dealing with you.
        </p>
      </Section>

      <Section id="account" title="3. Account registration">
        <p>
          You register with an email address and password, or through Google or
          GitHub. You must give accurate details and keep them current. We
          require you to verify your email address before you can create a
          runtime.
        </p>
        <p>
          You are responsible for everything that happens under your account.
          Tell us at{" "}
          <a href={`mailto:${legal.contact.security}`}>
            {legal.contact.security}
          </a>{" "}
          as soon as you believe it has been accessed without your permission.
        </p>
      </Section>

      <Section id="responsibilities" title="4. Your responsibilities">
        <List
          items={[
            <>
              <strong>Your credentials.</strong> Each runtime has a deploy key
              (secret) and a public key (embeddable). The public key is designed
              to be exposed in a web page and can execute but not deploy.
              Restrict it with an allowed-origins list. The deploy key must
              never be published.
            </>,
            <>
              <strong>Your endpoint.</strong> Capability code runs on your
              infrastructure, not ours. You are responsible for what it does,
              what it can reach, and for verifying the request signatures we
              send.
            </>,
            <>
              <strong>Your end users.</strong> If you send us data belonging to
              your own users, you are responsible for having the right to do so
              and for telling them about it. See the Privacy Policy for what we
              do and do not retain.
            </>,
            <>
              <strong>Your content.</strong> You must have the rights to
              everything you send through the service.
            </>,
          ]}
        />
      </Section>

      <Section id="api" title="5. API usage rules">
        <p>
          Your plan carries an hourly execution allowance and a runtime limit,
          both published on the pricing page and enforced by the service.
          Exceeding the allowance results in requests being refused, not in
          additional charges.
        </p>
        <List
          items={[
            "Do not attempt to circumvent quotas, rate limits or the runtime ceiling, including by registering additional accounts to obtain more free allowance.",
            "Do not resell raw model access obtained through the service.",
            "Do not use the service to build a directly competing agent gateway.",
            "Do not probe, scan or load-test our infrastructure without written permission.",
          ]}
        />
        <p>
          The Acceptable Use Policy forms part of these terms and sets out what
          you may not do with the service.
        </p>
      </Section>

      <Section id="ip" title="6. Intellectual property">
        <p>
          We own the service — the control plane, dashboard, documentation and
          the Cheela name and marks. You own your capability code, your runtime
          configuration, and the content you send and receive.
        </p>
        <p>
          Our open-source packages (the SDK, CLI, protocol and provider
          libraries) are licensed under their published licences, and nothing
          here narrows those.
        </p>
        <p>
          You grant us a limited licence to process your content only so far as
          it is needed to operate the service — routing an execution, storing
          what the Privacy Policy says we store, and metering usage.
        </p>
      </Section>

      <Section id="payments" title="7. Payments and subscriptions">
        <p>
          Prices are listed in USD on the pricing page and charged in INR
          through Razorpay at the conversion rate configured at the time of
          purchase.
        </p>
        <p>
          <strong>
            Pro is a one-off purchase, not a recurring subscription.
          </strong>{" "}
          A payment grants Pro for a fixed window — 30 days for monthly, 365
          days for yearly. Nothing auto-renews and nothing is charged again.
          When the window ends, the account returns to the Free plan and its
          limits.
        </p>
        <p>
          We may change prices at any time. A change never affects a window you
          have already paid for. Refunds are governed by the Refund Policy.
        </p>
      </Section>

      <Section id="third-parties" title="8. Third-party services">
        <p>
          The service depends on third parties to function, including model
          inference, payments, authentication, email and hosting. They are named
          in the Privacy Policy. We are not responsible for their acts or
          omissions, and their availability is outside our control.
        </p>
        <p>
          Model output comes from third-party providers. See the AI Policy for
          what that means for accuracy and for your obligations.
        </p>
      </Section>

      <Section id="termination" title="9. Suspension and termination">
        <p>
          You may stop using the service and delete your runtimes at any time.
          Deleting a runtime immediately invalidates its keys and deletes its
          execution traces.
        </p>
        <p>
          We may suspend or terminate an account that breaches these terms or
          the Acceptable Use Policy. Where the breach is serious — in particular
          anything in the Acceptable Use Policy&rsquo;s prohibited list — we may
          act immediately and without notice. Otherwise we will give you notice
          and a reasonable opportunity to fix it.
        </p>
        <p>
          On termination your access ends. Data is deleted on the retention
          schedule in the Privacy Policy.
        </p>
      </Section>

      <Section id="warranties" title="10. Disclaimer of warranties">
        <p>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;, without warranties of any kind, whether express or
          implied, to the fullest extent permitted by law.
        </p>
        <p>
          We do not warrant that the service will be uninterrupted or
          error-free, that model output will be accurate, or that it will meet
          your requirements. We publish no uptime commitment and offer no
          service level agreement.
        </p>
      </Section>

      <Section id="liability" title="11. Limitation of liability">
        <p>
          To the fullest extent permitted by law, we are not liable for
          indirect, incidental, special, consequential or punitive damages, or
          for lost profits, revenue, data or goodwill.
        </p>
        <p>
          Our total liability arising out of or relating to the service is
          limited to the greater of the amount you paid us in the twelve months
          before the claim, or USD 100.
        </p>
        <p>
          Nothing here excludes liability that cannot lawfully be excluded,
          including for fraud or for death or personal injury caused by
          negligence.
        </p>
      </Section>

      <Section id="changes" title="12. Changes to these terms">
        <p>
          We may update these terms. The effective date at the top of this page
          shows when the current version took effect. Material changes will be
          notified by email or in the dashboard. Continuing to use the service
          after a change means you accept it.
        </p>
      </Section>

      <Section id="governing-law" title="13. Governing law">
        <p>
          These terms are governed by the laws of {legal.jurisdiction.country}.
          The courts of {legal.jurisdiction.courts} have exclusive jurisdiction
          over any dispute arising out of them.
        </p>
      </Section>

      <Section id="contact" title="14. Contact">
        <p>
          {legal.entity.name}
          <br />
          {legal.entity.address}
          <br />
          <a href={`mailto:${legal.contact.general}`}>
            {legal.contact.general}
          </a>
        </p>
      </Section>
    </LegalPage>
  );
}
