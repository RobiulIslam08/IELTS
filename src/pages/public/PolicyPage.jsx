import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-10 scroll-mt-24">
    <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-black text-slate-900">{title}</h2>
    <div className="space-y-4 text-sm leading-8 text-slate-600">{children}</div>
  </section>
);

const Clause = ({ children }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 size={15} className="mt-1 shrink-0 text-emerald-400" />
    <p>{children}</p>
  </div>
);

const toc = [
  { id: "intro",       label: "1. Introduction"                          },
  { id: "collection",  label: "2. Information We Collect"                },
  { id: "usage",       label: "3. How We Use Your Information"           },
  { id: "legal-basis", label: "4. Legal Basis for Processing"           },
  { id: "sharing",     label: "5. Data Sharing & Third Parties"          },
  { id: "cookies",     label: "6. Cookies & Tracking Technologies"       },
  { id: "payments",    label: "7. Payment Data & Security"              },
  { id: "retention",   label: "8. Data Retention"                        },
  { id: "rights",      label: "9. Your Rights"                          },
  { id: "children",    label: "10. Children's Privacy"                  },
  { id: "security",    label: "11. Security Measures"                   },
  { id: "transfers",   label: "12. International Data Transfers"         },
  { id: "third-links", label: "13. Third-Party Links"                   },
  { id: "changes",     label: "14. Changes to This Policy"              },
  { id: "contact",     label: "15. Contact & DPO"                        },
];

const PolicyPage = () => {
  const effective = "1 January 2025";
  return (
    <div className="bg-white text-slate-800">

      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 to-sky-50 pb-16 pt-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
              <ShieldCheck size={26} className="text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Our Policy</h1>
          </div>
          <p className="text-slate-500">
            <strong>Band9Test.com Privacy &amp; Cookie Policy</strong> · Effective Date: <strong>{effective}</strong>
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            This Policy explains how Band9Test.com collects, uses, stores, and protects your personal
            information when you use our Platform. We are committed to full transparency and to protecting
            your privacy rights. Please read this document carefully.
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">

          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">Contents</p>
              <nav className="space-y-1">
                {toc.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <article>

            <Section id="intro" title="1. Introduction">
              <p>
                Band9Test.com (&quot;we,&quot; &quot;us,&quot; or &quot;Company&quot;) is a Bangladesh-based IELTS preparation
                platform that offers online and offline English language courses, full-length mock tests,
                and associated educational services. We operate both a digital platform (band9test.com)
                and a physical coaching center in Dhaka, Bangladesh.
              </p>
              <p>
                This Privacy &amp; Policy document (&quot;Policy&quot;) describes our practices regarding the
                collection, processing, storage, and disclosure of personal information for users
                (&quot;you,&quot; &quot;your,&quot; or &quot;User&quot;) of our Platform. This Policy applies to all services
                offered by Band9Test.com, whether accessed via our website, mobile interface, or at
                our physical center.
              </p>
              <p>
                By creating an account or using the Platform in any way, you confirm that you have read
                and understood this Policy and consent to the data practices described herein.
              </p>
            </Section>

            <Section id="collection" title="2. Information We Collect">
              <h3 className="font-bold text-slate-800 mb-2">2.1 Information You Provide Directly</h3>
              <Clause><strong>Registration data:</strong> Full name, email address, phone number, and country when you create an account.</Clause>
              <Clause><strong>Profile information:</strong> Profile photo, date of birth, and target exam date (optional).</Clause>
              <Clause><strong>Course enrollment data:</strong> Course selections, enrollment dates, and progress records.</Clause>
              <Clause><strong>Payment information:</strong> Billing name, address, and transaction reference numbers. We do not store full card numbers (see Section 7).</Clause>
              <Clause><strong>Contact form submissions:</strong> Messages, queries, and feedback you send us.</Clause>
              <Clause><strong>Tabby / BNPL data:</strong> If you pay via Tabby or Tabby Tamara, relevant transaction IDs are shared between Band9Test.com and Tabby for fulfillment purposes.</Clause>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">2.2 Information Collected Automatically</h3>
              <Clause><strong>Usage data:</strong> Pages visited, features used, time spent, and click paths on the Platform.</Clause>
              <Clause><strong>Device information:</strong> Browser type, operating system, screen resolution, and device identifiers.</Clause>
              <Clause><strong>IP address and location:</strong> Approximate geolocation derived from your IP address.</Clause>
              <Clause><strong>Session data:</strong> Login/logout times, session duration, and authentication tokens.</Clause>
              <Clause><strong>Performance data:</strong> Mock test responses, scores, time per question, and learning analytics.</Clause>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">2.3 Information from Third Parties</h3>
              <Clause>If you sign in using Google OAuth or Facebook Login, we receive your name and email address from those providers — subject to your privacy settings with them.</Clause>
              <Clause>Payment processors (PayPal, Visa/Mastercard networks, Tabby) may share transaction status confirmations with us.</Clause>
            </Section>

            <Section id="usage" title="3. How We Use Your Information">
              <p>We use the personal information we collect for the following purposes:</p>
              <Clause><strong>Service delivery:</strong> To create and manage your account, enroll you in courses, and provide access to mock tests and study materials.</Clause>
              <Clause><strong>Personalization:</strong> To tailor course recommendations, study plans, and performance insights to your individual needs and progress.</Clause>
              <Clause><strong>Communication:</strong> To send you course updates, schedule reminders, support responses, receipts, and important policy notifications.</Clause>
              <Clause><strong>Payment processing:</strong> To process course fees, mock test payments, and manage installment plans via Tabby.</Clause>
              <Clause><strong>Analytics &amp; improvement:</strong> To analyze how our Platform is used and improve content quality, user experience, and technical performance.</Clause>
              <Clause><strong>Legal compliance:</strong> To comply with applicable laws, respond to legal requests, and enforce our Terms and Conditions.</Clause>
              <Clause><strong>Marketing:</strong> To send you promotional communications about new courses or features — only where you have opted in. You may unsubscribe at any time.</Clause>
              <Clause><strong>Safety:</strong> To detect, investigate, and prevent fraud, abuse, or security threats.</Clause>
            </Section>

            <Section id="legal-basis" title="4. Legal Basis for Processing">
              <p>Where applicable data protection laws require a legal basis for processing personal data, Band9Test.com relies on the following:</p>
              <Clause><strong>Contract performance:</strong> Processing necessary to deliver the courses and services you have enrolled in.</Clause>
              <Clause><strong>Legitimate interests:</strong> Analytics, fraud prevention, and service improvement, balanced against your rights.</Clause>
              <Clause><strong>Consent:</strong> Marketing communications and optional data sharing — you may withdraw consent at any time.</Clause>
              <Clause><strong>Legal obligation:</strong> Processing required by Bangladeshi law or applicable regulations.</Clause>
            </Section>

            <Section id="sharing" title="5. Data Sharing & Third Parties">
              <p>
                We do not sell, rent, or trade your personal information to third parties for their marketing
                purposes. We may share your information with the following categories of recipients only as
                described below:
              </p>
              <Clause><strong>Service providers:</strong> Trusted vendors who process data on our behalf — including cloud hosting (e.g., AWS), email delivery, analytics, and video conferencing platforms (Zoom, Google Meet). These providers operate under data processing agreements.</Clause>
              <Clause><strong>Payment processors:</strong> PayPal, Visa, Mastercard, and Tabby receive payment data necessary to process transactions. All processors are PCI-DSS compliant.</Clause>
              <Clause><strong>Authentication providers:</strong> Google and Facebook receive minimal data when you use social login. Their use of that data is governed by their own policies.</Clause>
              <Clause><strong>Legal authorities:</strong> We may disclose data when required by law, court order, or to protect the rights, property, or safety of Band9Test.com, its users, or the public.</Clause>
              <Clause><strong>Business transfers:</strong> In the event of a merger, acquisition, or asset sale, your information may be transferred. We will notify you before your data is transferred and becomes subject to a different policy.</Clause>
            </Section>

            <Section id="cookies" title="6. Cookies & Tracking Technologies">
              <h3 className="font-bold text-slate-800 mb-2">6.1 What Are Cookies?</h3>
              <p>
                Cookies are small text files placed on your device by websites you visit. They allow the
                website to remember your preferences, keep you logged in, and collect analytics data.
              </p>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">6.2 Cookies We Use</h3>
              <Clause><strong>Essential cookies:</strong> Required for login sessions and core Platform functionality. Cannot be disabled.</Clause>
              <Clause><strong>Performance cookies:</strong> Collect anonymous usage statistics to help us improve the Platform (e.g., Google Analytics).</Clause>
              <Clause><strong>Functional cookies:</strong> Remember your preferences (language, notification settings, etc.).</Clause>
              <Clause><strong>Marketing cookies:</strong> Used to show relevant advertisements. Only activated with your explicit consent.</Clause>

              <h3 className="font-bold text-slate-800 mt-5 mb-2">6.3 Managing Cookies</h3>
              <p>
                You can control and delete cookies through your browser settings. Note that disabling
                essential cookies may prevent you from using certain features of the Platform, including
                logging in and accessing course content. For detailed instructions, visit your browser&apos;s
                help documentation.
              </p>
              <p>
                We use Google Analytics to understand Platform usage patterns. You can opt out of Google
                Analytics tracking by installing the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:underline">
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </Section>

            <Section id="payments" title="7. Payment Data & Security">
              <p>
                Band9Test.com takes the security of your payment information extremely seriously. Our
                payment handling practices are as follows:
              </p>
              <Clause>We do not store full credit or debit card numbers on our servers at any time.</Clause>
              <Clause>All card payments are processed by PCI-DSS Level 1 certified payment processors (PayPal, Stripe, Visa/Mastercard networks).</Clause>
              <Clause>Tabby and Tabby Tamara payments are governed by Tabby&apos;s own PCI-DSS compliant infrastructure.</Clause>
              <Clause>All payment pages use HTTPS with TLS 1.2 or higher encryption.</Clause>
              <Clause>We retain only transaction reference IDs, amounts, and dates for accounting and refund purposes.</Clause>
              <Clause>In the event of a suspected payment security breach, we will notify affected users within 72 hours of discovery.</Clause>
            </Section>

            <Section id="retention" title="8. Data Retention">
              <p>We retain personal data for as long as necessary to fulfill the purposes outlined in this Policy:</p>
              <Clause><strong>Active accounts:</strong> Data is retained throughout the lifetime of your account.</Clause>
              <Clause><strong>Closed accounts:</strong> Non-financial account data is deleted within 90 days of account closure at your request.</Clause>
              <Clause><strong>Financial records:</strong> Transaction records are retained for 7 years to comply with Bangladeshi financial regulations.</Clause>
              <Clause><strong>Course performance data:</strong> Retained for 2 years post-course completion to issue certificates and handle disputes.</Clause>
              <Clause><strong>Marketing data:</strong> Retained until you unsubscribe or request deletion.</Clause>
              <p>
                After the applicable retention period, data is securely deleted or anonymized.
              </p>
            </Section>

            <Section id="rights" title="9. Your Rights">
              <p>
                Depending on your jurisdiction, you may have the following rights regarding your personal data.
                We are committed to honoring these rights without undue delay (within 30 days):
              </p>
              <Clause><strong>Right of access:</strong> Request a copy of the personal data we hold about you.</Clause>
              <Clause><strong>Right to rectification:</strong> Correct inaccurate or incomplete personal data.</Clause>
              <Clause><strong>Right to erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;), subject to legal retention requirements.</Clause>
              <Clause><strong>Right to restrict processing:</strong> Ask us to limit how we use your data in certain circumstances.</Clause>
              <Clause><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format.</Clause>
              <Clause><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing purposes.</Clause>
              <Clause><strong>Right to withdraw consent:</strong> Withdraw consent for marketing or optional processing at any time without affecting the lawfulness of prior processing.</Clause>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:privacy@band9test.com" className="font-semibold text-indigo-600 hover:underline">
                  privacy@band9test.com
                </a>. We will respond within 30 days and may request identity verification before processing your request.
              </p>
            </Section>

            <Section id="children" title="10. Children's Privacy">
              <p>
                Band9Test.com is intended for students preparing for the IELTS examination. While there is no
                minimum age requirement set by us, we recognize special obligations regarding children:
              </p>
              <Clause>Students under 18 years of age must have verifiable parental or guardian consent before registering and making payments.</Clause>
              <Clause>We do not knowingly collect personal data from children under 13 without explicit parental consent.</Clause>
              <Clause>If we become aware that personal data of a child under 13 has been collected without parental consent, we will delete it promptly.</Clause>
              <Clause>Parents or guardians may contact us at <a href="mailto:privacy@band9test.com" className="font-semibold text-indigo-600 hover:underline">privacy@band9test.com</a> to review, modify, or delete information about their child.</Clause>
            </Section>

            <Section id="security" title="11. Security Measures">
              <p>We implement industry-standard technical and organizational measures to protect your data:</p>
              <Clause>All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher.</Clause>
              <Clause>Passwords are stored using bcrypt hashing — we cannot see your plain-text password.</Clause>
              <Clause>Access to production databases is restricted to authorized staff with multi-factor authentication.</Clause>
              <Clause>Regular security audits and penetration testing are conducted on our Platform infrastructure.</Clause>
              <Clause>Automated intrusion detection systems monitor for suspicious access patterns.</Clause>
              <Clause>Data backups are encrypted and stored in geographically separate locations.</Clause>
              <p>
                While we employ best-practice security measures, no online system is 100% immune to risk.
                We encourage you to use a strong, unique password and to log out of shared devices.
              </p>
            </Section>

            <Section id="transfers" title="12. International Data Transfers">
              <p>
                Your data may be processed or stored on servers outside Bangladesh, including in the
                European Union, United States, or Singapore, when using third-party service providers
                (cloud hosting, analytics, video conferencing). In such cases, we ensure:
              </p>
              <Clause>Transfers occur only to providers with adequate data protection standards.</Clause>
              <Clause>Appropriate safeguards (such as Standard Contractual Clauses) are in place where required.</Clause>
              <Clause>We select service providers who comply with internationally recognized security standards.</Clause>
            </Section>

            <Section id="third-links" title="13. Third-Party Links">
              <p>
                Our Platform may contain links to external websites — including YouTube videos, Google Forms,
                or partner organizations. Band9Test.com is not responsible for the privacy practices of
                these external sites. We encourage you to review the privacy policies of any third-party
                sites you visit through links on our Platform.
              </p>
            </Section>

            <Section id="changes" title="14. Changes to This Policy">
              <p>
                Band9Test.com reserves the right to update this Policy at any time. When material changes
                are made, we will:
              </p>
              <Clause>Update the &quot;Effective Date&quot; at the top of this page.</Clause>
              <Clause>Send an email notification to all registered users describing the key changes.</Clause>
              <Clause>Display an in-platform banner for 14 days after significant changes.</Clause>
              <p>
                Your continued use of the Platform after any changes constitutes acceptance of the updated
                Policy. If you object to the changes, please contact us to close your account.
              </p>
            </Section>

            <Section id="contact" title="15. Contact & Data Protection Officer">
              <p>
                For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact:
              </p>
              <Clause><strong>Privacy queries:</strong> <a href="mailto:privacy@band9test.com" className="font-semibold text-indigo-600 hover:underline">privacy@band9test.com</a></Clause>
              <Clause><strong>General support:</strong> <a href="mailto:support@band9test.com" className="font-semibold text-indigo-600 hover:underline">support@band9test.com</a></Clause>
              <Clause><strong>Phone:</strong> +880 1700-000000</Clause>
              <Clause><strong>Address:</strong> Band9Test.com, Mirpur-1, Dhaka-1216, Bangladesh</Clause>
              <p>
                We aim to respond to all privacy-related inquiries within <strong>5 business days</strong>.
                For data deletion or access requests, please allow up to <strong>30 days</strong>.
              </p>
            </Section>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
              <strong>Effective Date:</strong> {effective}. This Policy supersedes all prior versions.
              See also: <Link to="/terms-and-conditions" className="font-semibold text-indigo-600 hover:underline">Terms &amp; Conditions</Link> ·{" "}
              <Link to="/terms-and-conditions#refund" className="font-semibold text-indigo-600 hover:underline">Refund Policy</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
