import type { Metadata } from "next";
import { LegalPage, List, Section } from "@/components/legal/legal-page";
import { legal } from "@/lib/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Acceptable Use Policy",
  "What you may not do with Cheela, and what happens if you do.",
  { path: "/acceptable-use" },
);

export default function AcceptableUsePage() {
  return (
    <LegalPage
      description="What you may not do with Cheela, and what happens if you do."
      slug="acceptable-use"
      title="Acceptable Use Policy"
    >
      <Section id="scope" title="Scope">
        <p>
          This policy forms part of the Terms of Service and applies to
          everything you do through Cheela — the API, the CLI, the SDK, the
          dashboard, and any agent you run through the platform. It applies to
          what your own users do through your agent as well, because those
          executions run on our infrastructure and our provider credential.
        </p>
      </Section>

      <Section id="illegal" title="1. Illegal activity">
        <p>You must not use the service to do anything unlawful, including:</p>
        <List
          items={[
            "Anything that breaks the law in India or in any jurisdiction where you or your users operate.",
            "Producing, distributing or seeking child sexual abuse material. We report this to the authorities without notice.",
            "Facilitating human trafficking, terrorism, or violent extremism.",
            "Selling or arranging the sale of controlled substances, weapons, or stolen goods and data.",
            "Money laundering, fraud, or evading sanctions.",
          ]}
        />
      </Section>

      <Section id="spam" title="2. Spam and unsolicited messaging">
        <List
          items={[
            "Generating or sending bulk unsolicited email, messages, comments or reviews.",
            "Automating engagement on a platform in breach of its own terms.",
            "Producing content designed to manipulate search rankings deceptively.",
            "Impersonating a person or organisation, or misrepresenting your affiliation.",
          ]}
        />
      </Section>

      <Section id="malware" title="3. Malware and destructive code">
        <List
          items={[
            "Writing, hosting or distributing malware, ransomware, spyware or destructive payloads.",
            "Using a capability endpoint to stage or deliver an attack.",
            "Building tooling whose purpose is to compromise systems you do not own or have permission to test.",
          ]}
        />
      </Section>

      <Section id="phishing" title="4. Phishing and deception">
        <List
          items={[
            "Producing pages, emails or messages that impersonate a real service to obtain credentials, payment details or personal data.",
            "Generating fake identity documents, receipts, invoices or records presented as genuine.",
            "Creating synthetic media of a real person intended to deceive.",
          ]}
        />
      </Section>

      <Section id="copyright" title="5. Intellectual property">
        <List
          items={[
            "Sending content you do not have the rights to.",
            "Using the service to reproduce or distribute copyrighted work at scale without permission.",
            "Removing or circumventing attribution, watermarks or technical protection measures.",
          ]}
        />
        <p>
          Send infringement claims to{" "}
          <a href={`mailto:${legal.contact.abuse}`}>{legal.contact.abuse}</a>{" "}
          with enough detail to identify the work and the material complained
          of.
        </p>
      </Section>

      <Section id="unauthorized-access" title="6. Unauthorised access">
        <List
          items={[
            "Accessing another account, runtime, project or execution that is not yours.",
            "Probing, scanning or testing our infrastructure without written permission.",
            "Interfering with anyone else's use of the service.",
            "Reverse-engineering the service except where the law expressly permits it.",
            "Using another customer's public key, or an API key you were not issued.",
          ]}
        />
      </Section>

      <Section id="ai-abuse" title="7. Abuse of the AI systems">
        <List
          items={[
            "Attempting to extract system prompts, model weights or provider credentials.",
            "Deliberately circumventing a model's safety measures, or using the service to develop techniques for doing so.",
            "Generating content that sexualises minors, incites violence, or harasses an identifiable person.",
            "Presenting model output as human-written where doing so is deceptive or unlawful — see the AI Policy.",
            "Using the service to give medical, legal or financial advice to third parties without the qualifications and disclosures the law requires.",
          ]}
        />
      </Section>

      <Section id="resource-abuse" title="8. Resource abuse">
        <p>
          Executions run on our provider credential, so resource abuse is
          directly a cost to us and to other customers.
        </p>
        <List
          items={[
            "Circumventing quotas or rate limits, including by registering multiple accounts to obtain additional free allowance.",
            "Reselling raw model access obtained through the service.",
            "Running load tests or benchmarks against the platform without written permission.",
            "Using the service for cryptocurrency mining or unrelated general-purpose compute.",
            "Deliberately triggering long agent loops with no purpose other than consuming tokens.",
          ]}
        />
      </Section>

      <Section id="reporting" title="9. Reporting abuse">
        <p>
          Report anything on this page to{" "}
          <a href={`mailto:${legal.contact.abuse}`}>{legal.contact.abuse}</a>.
          Include the runtime identifier or execution identifier if you have
          one, and enough detail for us to reproduce or verify what you saw.
        </p>
      </Section>

      <Section id="enforcement" title="10. Enforcement">
        <p>
          What we do depends on what happened. Proportionate responses include a
          warning, rate limiting, suspending a runtime, suspending the account,
          or terminating it.
        </p>
        <p>
          For the most serious categories — child sexual abuse material,
          terrorism, and active attacks on other systems — we act immediately,
          without notice, and report to the authorities where the law requires.
          For everything else we will normally contact you first and give you a
          chance to put it right.
        </p>
        <p>
          We do not owe a refund for a window cut short by enforcement action
          under this policy.
        </p>
      </Section>
    </LegalPage>
  );
}
