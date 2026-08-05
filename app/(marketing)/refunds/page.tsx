import type { Metadata } from "next";
import { LegalPage, List, Section } from "@/components/legal/legal-page";
import { legal } from "@/lib/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Refund Policy",
  "How payments, cancellation and refunds work at Cheela Labs.",
  { path: "/refunds" },
);

export default function RefundPolicyPage() {
  return (
    <LegalPage
      description="How payments, cancellation and refunds work."
      slug="refunds"
      title="Refund Policy"
    >
      <Section id="model" title="How billing works">
        <p>
          <strong>
            Pro is a one-off purchase, not a recurring subscription.
          </strong>{" "}
          Paying grants Pro for a fixed window — 30 days for a monthly purchase,
          365 days for a yearly one. Nothing renews automatically and no card is
          kept on file for future charges.
        </p>
        <p>
          When the window ends the account returns to the Free plan and its
          limits. Your runtimes, keys and data are not deleted by the change of
          plan; the Free plan&rsquo;s limits simply start applying.
        </p>
        <p>
          Prices are shown in USD and charged in INR through Razorpay at the
          conversion rate configured at the time of purchase.
        </p>
      </Section>

      <Section id="cancellation" title="Cancellation">
        <p>
          There is nothing to cancel. Because nothing auto-renews, stopping is
          simply not buying again — you keep Pro until the window you paid for
          ends, and then the account reverts to Free.
        </p>
        <p>
          If you would rather leave entirely, delete your runtimes and projects
          from the dashboard. Deleting a runtime immediately invalidates its
          keys and deletes its execution traces.
        </p>
      </Section>

      <Section id="eligibility" title="Refund eligibility">
        <p>
          <strong>Payments are final and we do not offer refunds</strong> for
          change of mind, unused time in a paid window, or dissatisfaction with
          model output. Because nothing auto-renews, there is no situation where
          you are charged for a period you did not choose to buy.
        </p>
        <p>We will refund in these cases:</p>
        <List
          items={[
            <>
              <strong>Duplicate charges.</strong> If you were charged more than
              once for the same window, we refund the extra charges in full.
            </>,
            <>
              <strong>Charges you did not authorise.</strong> If a payment was
              made without your authorisation, tell us and we will refund it and
              secure the account.
            </>,
            <>
              <strong>Our failure.</strong> If a payment succeeded but the plan
              was not granted, and we cannot put that right, we refund it in
              full.
            </>,
            <>
              <strong>Where the law requires it.</strong> This policy does not
              limit any right you have under applicable consumer law in{" "}
              {legal.jurisdiction.country}.
            </>,
          ]}
        />
        <p>
          We do not refund a window cut short because the account was suspended
          or terminated for breaching the Terms of Service or the Acceptable Use
          Policy.
        </p>
      </Section>

      <Section id="requesting" title="Requesting a refund">
        <p>
          Write to{" "}
          <a href={`mailto:${legal.contact.support}`}>
            {legal.contact.support}
          </a>{" "}
          from the email address on the account, with the date of the payment
          and the Razorpay payment identifier if you have it.
        </p>
        <p>
          We will respond within 5 business days. An approved refund goes back
          to the original payment method through Razorpay, and typically takes 5
          to 10 business days to appear depending on your bank.
        </p>
      </Section>

      <Section id="disputes" title="Billing disputes">
        <p>
          If you think you have been charged incorrectly, contact us first at{" "}
          <a href={`mailto:${legal.contact.support}`}>
            {legal.contact.support}
          </a>
          . Almost every billing question is a mistake we can fix quickly, and
          contacting us is faster than a bank dispute.
        </p>
      </Section>

      <Section id="chargebacks" title="Chargebacks">
        <p>
          Raising a chargeback without contacting us first means we learn about
          the problem from the payment provider rather than from you, and it
          costs us a fee whatever the outcome.
        </p>
        <p>
          We may suspend an account with an open chargeback until it is
          resolved. If a chargeback is decided in your favour, the corresponding
          plan window ends.
        </p>
        <p>
          None of this is intended to discourage a genuine dispute. If something
          is wrong, tell us — we would rather fix it directly.
        </p>
      </Section>

      <Section id="changes" title="Changes to this policy">
        <p>
          We may update this policy. The version in force when you paid is the
          one that applies to that payment.
        </p>
      </Section>
    </LegalPage>
  );
}
